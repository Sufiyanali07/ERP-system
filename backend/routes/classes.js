const express = require('express');
const { body, validationResult } = require('express-validator');
const Class = require('../models/Class');
const Faculty = require('../models/Faculty');
const Student = require('../models/Student');
const { authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/classes
// @desc    Get all classes
// @access  Private
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.department) filter.department = req.query.department;
    if (req.query.semester) filter.semester = parseInt(req.query.semester);
    if (req.query.academicYear) filter.academicYear = req.query.academicYear;
    if (req.query.faculty) filter.faculty = req.query.faculty;

    // Faculty can only see their assigned classes
    if (req.user.role === 'faculty') {
      const faculty = await Faculty.findOne({ user: req.user._id });
      if (faculty) {
        filter._id = { $in: faculty.assignedClasses };
      }
    }

    const classes = await Class.find(filter)
      .populate('faculty', 'user designation department')
      .populate({
        path: 'faculty',
        populate: {
          path: 'user',
          select: 'firstName lastName email'
        }
      })
      .populate('students', 'user rollNumber')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Class.countDocuments(filter);

    res.json({
      success: true,
      data: {
        classes,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get classes error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching classes'
    });
  }
});

// @route   GET /api/classes/:id
// @desc    Get class by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const classObj = await Class.findById(req.params.id)
      .populate({
        path: 'faculty',
        populate: {
          path: 'user',
          select: 'firstName lastName email phone'
        }
      })
      .populate({
        path: 'students',
        populate: {
          path: 'user',
          select: 'firstName lastName email'
        }
      });

    if (!classObj) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    // Check authorization for faculty
    if (req.user.role === 'faculty') {
      const faculty = await Faculty.findOne({ user: req.user._id });
      if (!faculty || !faculty.assignedClasses.includes(classObj._id)) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }
    }

    res.json({
      success: true,
      data: classObj
    });
  } catch (error) {
    console.error('Get class error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching class'
    });
  }
});

// @route   POST /api/classes
// @desc    Create new class
// @access  Private (Admin)
router.post('/', authorizeRoles('admin'), [
  body('className').notEmpty().withMessage('Class name is required'),
  body('classCode').notEmpty().withMessage('Class code is required'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('department').notEmpty().withMessage('Department is required'),
  body('semester').isInt({ min: 1, max: 8 }).withMessage('Semester must be between 1 and 8'),
  body('academicYear').notEmpty().withMessage('Academic year is required'),
  body('faculty').notEmpty().withMessage('Faculty is required'),
  body('credits').isInt({ min: 1, max: 6 }).withMessage('Credits must be between 1 and 6')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Check if class code already exists
    const existingClass = await Class.findOne({ classCode: req.body.classCode });
    if (existingClass) {
      return res.status(400).json({
        success: false,
        message: 'Class code already exists'
      });
    }

    // Verify faculty exists
    const faculty = await Faculty.findById(req.body.faculty);
    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty not found'
      });
    }

    const newClass = new Class(req.body);
    await newClass.save();

    // Add class to faculty's assigned classes
    faculty.assignedClasses.push(newClass._id);
    await faculty.save();

    const populatedClass = await Class.findById(newClass._id)
      .populate('faculty', 'user designation department');

    // Emit class creation event
    const io = req.app.get('io');
    if (io) {
      io.to('admin').emit('class-created', {
        classId: newClass._id,
        className: newClass.className,
        timestamp: new Date()
      });
    }

    res.status(201).json({
      success: true,
      message: 'Class created successfully',
      data: populatedClass
    });
  } catch (error) {
    console.error('Create class error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating class'
    });
  }
});

// @route   PUT /api/classes/:id
// @desc    Update class
// @access  Private (Admin)
router.put('/:id', authorizeRoles('admin'), [
  body('semester').optional().isInt({ min: 1, max: 8 }).withMessage('Semester must be between 1 and 8'),
  body('credits').optional().isInt({ min: 1, max: 6 }).withMessage('Credits must be between 1 and 6'),
  body('maxStudents').optional().isInt({ min: 1 }).withMessage('Max students must be positive')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const classObj = await Class.findById(req.params.id);
    if (!classObj) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    // If faculty is being changed, update both old and new faculty
    if (req.body.faculty && req.body.faculty !== classObj.faculty.toString()) {
      const oldFaculty = await Faculty.findById(classObj.faculty);
      const newFaculty = await Faculty.findById(req.body.faculty);

      if (!newFaculty) {
        return res.status(404).json({
          success: false,
          message: 'New faculty not found'
        });
      }

      // Remove from old faculty
      if (oldFaculty) {
        oldFaculty.assignedClasses = oldFaculty.assignedClasses.filter(
          classId => classId.toString() !== req.params.id
        );
        await oldFaculty.save();
      }

      // Add to new faculty
      newFaculty.assignedClasses.push(req.params.id);
      await newFaculty.save();
    }

    const allowedUpdates = [
      'className', 'subject', 'department', 'semester', 'academicYear',
      'faculty', 'schedule', 'maxStudents', 'credits', 'description',
      'syllabus', 'status'
    ];

    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('faculty', 'user designation department');

    res.json({
      success: true,
      message: 'Class updated successfully',
      data: updatedClass
    });
  } catch (error) {
    console.error('Update class error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating class'
    });
  }
});

// @route   DELETE /api/classes/:id
// @desc    Delete class
// @access  Private (Admin)
router.delete('/:id', authorizeRoles('admin'), async (req, res) => {
  try {
    const classObj = await Class.findById(req.params.id);
    if (!classObj) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    // Remove class from faculty's assigned classes
    if (classObj.faculty) {
      const faculty = await Faculty.findById(classObj.faculty);
      if (faculty) {
        faculty.assignedClasses = faculty.assignedClasses.filter(
          classId => classId.toString() !== req.params.id
        );
        await faculty.save();
      }
    }

    // Remove class from students' enrolled classes
    await Student.updateMany(
      { enrolledClasses: req.params.id },
      { $pull: { enrolledClasses: req.params.id } }
    );

    await Class.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Class deleted successfully'
    });
  } catch (error) {
    console.error('Delete class error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting class'
    });
  }
});

// @route   GET /api/classes/stats/overview
// @desc    Get class statistics
// @access  Private (Admin/Faculty)
router.get('/stats/overview', authorizeRoles('admin', 'faculty'), async (req, res) => {
  try {
    let filter = {};
    
    // Faculty can only see stats for their classes
    if (req.user.role === 'faculty') {
      const faculty = await Faculty.findOne({ user: req.user._id });
      if (faculty) {
        filter._id = { $in: faculty.assignedClasses };
      }
    }

    const totalClasses = await Class.countDocuments(filter);
    const activeClasses = await Class.countDocuments({ ...filter, status: 'active' });
    
    // Department-wise count
    const departmentStats = await Class.aggregate([
      { $match: filter },
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Semester-wise count
    const semesterStats = await Class.aggregate([
      { $match: filter },
      { $group: { _id: '$semester', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    // Average enrollment
    const enrollmentStats = await Class.aggregate([
      { $match: filter },
      { $group: { 
        _id: null, 
        avgEnrollment: { $avg: { $size: '$students' } },
        totalEnrollment: { $sum: { $size: '$students' } }
      }}
    ]);

    res.json({
      success: true,
      data: {
        totalClasses,
        activeClasses,
        inactiveClasses: totalClasses - activeClasses,
        departmentStats,
        semesterStats,
        averageEnrollment: enrollmentStats[0]?.avgEnrollment || 0,
        totalEnrollment: enrollmentStats[0]?.totalEnrollment || 0
      }
    });
  } catch (error) {
    console.error('Get class stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching class statistics'
    });
  }
});

module.exports = router;
