const express = require('express');
const { body, validationResult } = require('express-validator');
const Faculty = require('../models/Faculty');
const User = require('../models/User');
const Class = require('../models/Class');
const { authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/faculty
// @desc    Get all faculty members
// @access  Private (Admin)
router.get('/', authorizeRoles('admin'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.department) filter.department = req.query.department;
    if (req.query.designation) filter.designation = req.query.designation;
    if (req.query.status) filter.status = req.query.status;

    const faculty = await Faculty.find(filter)
      .populate('user', 'firstName lastName email phone profileImage')
      .populate('assignedClasses', 'className subject semester')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Faculty.countDocuments(filter);

    res.json({
      success: true,
      data: {
        faculty,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get faculty error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching faculty'
    });
  }
});

// @route   GET /api/faculty/:id
// @desc    Get faculty by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id)
      .populate('user', 'firstName lastName email phone profileImage dateOfBirth gender address')
      .populate('assignedClasses', 'className subject semester students schedule');

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty not found'
      });
    }

    // Check authorization - faculty can only view their own profile unless admin
    if (req.user.role === 'faculty' && faculty.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: faculty
    });
  } catch (error) {
    console.error('Get faculty error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching faculty'
    });
  }
});

// @route   PUT /api/faculty/:id
// @desc    Update faculty profile
// @access  Private (Admin or own profile)
router.put('/:id', [
  body('salary').optional().isNumeric().withMessage('Salary must be a number'),
  body('experience').optional().isInt({ min: 0 }).withMessage('Experience must be a positive number'),
  body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5')
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

    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty not found'
      });
    }

    // Check authorization
    if (req.user.role === 'faculty' && faculty.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const allowedUpdates = [
      'qualification', 'specialization', 'experience', 'officeLocation', 
      'officeHours', 'researchAreas', 'publications', 'subjects'
    ];

    // Admin can update more fields
    if (req.user.role === 'admin') {
      allowedUpdates.push('designation', 'department', 'salary', 'status', 'rating');
    }

    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const updatedFaculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('user', 'firstName lastName email');

    // Emit faculty update event
    const io = req.app.get('io');
    if (io) {
      io.to('admin').emit('faculty-updated', {
        facultyId: updatedFaculty._id,
        updates,
        timestamp: new Date()
      });
    }

    res.json({
      success: true,
      message: 'Faculty updated successfully',
      data: updatedFaculty
    });
  } catch (error) {
    console.error('Update faculty error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating faculty'
    });
  }
});

// @route   POST /api/faculty/:id/assign-class
// @desc    Assign class to faculty
// @access  Private (Admin)
router.post('/:id/assign-class', authorizeRoles('admin'), [
  body('classId').notEmpty().withMessage('Class ID is required')
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

    const { classId } = req.body;
    
    const faculty = await Faculty.findById(req.params.id);
    const classObj = await Class.findById(classId);

    if (!faculty || !classObj) {
      return res.status(404).json({
        success: false,
        message: 'Faculty or class not found'
      });
    }

    // Check if already assigned
    if (faculty.assignedClasses.includes(classId)) {
      return res.status(400).json({
        success: false,
        message: 'Class already assigned to this faculty'
      });
    }

    // Assign class
    faculty.assignedClasses.push(classId);
    classObj.faculty = faculty._id;

    await Promise.all([faculty.save(), classObj.save()]);

    // Update total students count
    faculty.totalStudents = await Class.aggregate([
      { $match: { faculty: faculty._id } },
      { $group: { _id: null, total: { $sum: { $size: '$students' } } } }
    ]).then(result => result[0]?.total || 0);

    await faculty.save();

    // Emit assignment event
    const io = req.app.get('io');
    if (io) {
      io.to('admin').emit('class-assigned', {
        facultyId: faculty._id,
        classId: classObj._id,
        timestamp: new Date()
      });
    }

    res.json({
      success: true,
      message: 'Class assigned successfully'
    });
  } catch (error) {
    console.error('Assign class error:', error);
    res.status(500).json({
      success: false,
      message: 'Error assigning class'
    });
  }
});

// @route   DELETE /api/faculty/:id/unassign-class/:classId
// @desc    Unassign class from faculty
// @access  Private (Admin)
router.delete('/:id/unassign-class/:classId', authorizeRoles('admin'), async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    const classObj = await Class.findById(req.params.classId);

    if (!faculty || !classObj) {
      return res.status(404).json({
        success: false,
        message: 'Faculty or class not found'
      });
    }

    // Remove assignment
    faculty.assignedClasses = faculty.assignedClasses.filter(
      classId => classId.toString() !== req.params.classId
    );
    classObj.faculty = null;

    await Promise.all([faculty.save(), classObj.save()]);

    // Update total students count
    faculty.totalStudents = await Class.aggregate([
      { $match: { faculty: faculty._id } },
      { $group: { _id: null, total: { $sum: { $size: '$students' } } } }
    ]).then(result => result[0]?.total || 0);

    await faculty.save();

    res.json({
      success: true,
      message: 'Class unassigned successfully'
    });
  } catch (error) {
    console.error('Unassign class error:', error);
    res.status(500).json({
      success: false,
      message: 'Error unassigning class'
    });
  }
});

// @route   GET /api/faculty/stats/overview
// @desc    Get faculty statistics
// @access  Private (Admin)
router.get('/stats/overview', authorizeRoles('admin'), async (req, res) => {
  try {
    const totalFaculty = await Faculty.countDocuments();
    const activeFaculty = await Faculty.countDocuments({ status: 'active' });
    
    // Department-wise count
    const departmentStats = await Faculty.aggregate([
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Designation-wise count
    const designationStats = await Faculty.aggregate([
      { $group: { _id: '$designation', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Average experience
    const avgExperience = await Faculty.aggregate([
      { $group: { _id: null, avgExp: { $avg: '$experience' } } }
    ]);

    res.json({
      success: true,
      data: {
        totalFaculty,
        activeFaculty,
        inactiveFaculty: totalFaculty - activeFaculty,
        departmentStats,
        designationStats,
        averageExperience: avgExperience[0]?.avgExp || 0
      }
    });
  } catch (error) {
    console.error('Get faculty stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching faculty statistics'
    });
  }
});

module.exports = router;
