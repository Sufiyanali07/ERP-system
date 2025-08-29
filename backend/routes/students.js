const express = require('express');
const { body, validationResult } = require('express-validator');
const Student = require('../models/Student');
const User = require('../models/User');
const Class = require('../models/Class');
const { authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/students
// @desc    Get all students
// @access  Private (Faculty/Admin)
router.get('/', authorizeRoles('faculty', 'admin'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.department) filter.department = req.query.department;
    if (req.query.semester) filter.semester = parseInt(req.query.semester);
    if (req.query.status) filter.status = req.query.status;
    if (req.query.academicYear) filter.academicYear = req.query.academicYear;

    const students = await Student.find(filter)
      .populate('user', 'firstName lastName email phone profileImage')
      .populate('enrolledClasses', 'className subject')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Student.countDocuments(filter);

    res.json({
      success: true,
      data: {
        students,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching students'
    });
  }
});

// @route   GET /api/students/:id
// @desc    Get student by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('user', 'firstName lastName email phone profileImage dateOfBirth gender address')
      .populate('enrolledClasses', 'className subject faculty schedule');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Check authorization - students can only view their own profile
    if (req.user.role === 'student' && student.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error('Get student error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching student'
    });
  }
});

// @route   PUT /api/students/:id
// @desc    Update student profile
// @access  Private (Admin/Faculty or own profile)
router.put('/:id', [
  body('semester').optional().isInt({ min: 1, max: 8 }).withMessage('Semester must be between 1 and 8'),
  body('cgpa').optional().isFloat({ min: 0, max: 10 }).withMessage('CGPA must be between 0 and 10'),
  body('attendancePercentage').optional().isFloat({ min: 0, max: 100 }).withMessage('Attendance must be between 0 and 100')
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

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Check authorization
    if (req.user.role === 'student' && student.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const allowedUpdates = [
      'semester', 'section', 'cgpa', 'totalCredits', 'attendancePercentage',
      'guardian', 'emergencyContact', 'medicalInfo', 'documents'
    ];

    // Admin/Faculty can update more fields
    if (req.user.role === 'admin' || req.user.role === 'faculty') {
      allowedUpdates.push('department', 'course', 'batch', 'currentYear', 'status', 'feeStatus', 'totalFees', 'paidFees');
    }

    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    // Calculate pending fees if fee information is updated
    if (updates.totalFees !== undefined || updates.paidFees !== undefined) {
      const totalFees = updates.totalFees || student.totalFees;
      const paidFees = updates.paidFees || student.paidFees;
      updates.pendingFees = totalFees - paidFees;
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('user', 'firstName lastName email');

    // Emit student update event
    const io = req.app.get('io');
    if (io) {
      io.to('admin').emit('student-updated', {
        studentId: updatedStudent._id,
        updates,
        timestamp: new Date()
      });
    }

    res.json({
      success: true,
      message: 'Student updated successfully',
      data: updatedStudent
    });
  } catch (error) {
    console.error('Update student error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating student'
    });
  }
});

// @route   POST /api/students/:id/enroll-class
// @desc    Enroll student in a class
// @access  Private (Admin/Faculty)
router.post('/:id/enroll-class', authorizeRoles('admin', 'faculty'), [
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
    
    const student = await Student.findById(req.params.id);
    const classObj = await Class.findById(classId);

    if (!student || !classObj) {
      return res.status(404).json({
        success: false,
        message: 'Student or class not found'
      });
    }

    // Check if already enrolled
    if (student.enrolledClasses.includes(classId)) {
      return res.status(400).json({
        success: false,
        message: 'Student already enrolled in this class'
      });
    }

    // Check class capacity
    if (classObj.students.length >= classObj.maxStudents) {
      return res.status(400).json({
        success: false,
        message: 'Class is full'
      });
    }

    // Enroll student
    student.enrolledClasses.push(classId);
    classObj.students.push(student._id);

    await Promise.all([student.save(), classObj.save()]);

    // Emit enrollment event
    const io = req.app.get('io');
    if (io) {
      io.to('admin').emit('student-enrolled', {
        studentId: student._id,
        classId: classObj._id,
        timestamp: new Date()
      });
    }

    res.json({
      success: true,
      message: 'Student enrolled successfully'
    });
  } catch (error) {
    console.error('Enroll student error:', error);
    res.status(500).json({
      success: false,
      message: 'Error enrolling student'
    });
  }
});

// @route   DELETE /api/students/:id/unenroll-class/:classId
// @desc    Unenroll student from a class
// @access  Private (Admin/Faculty)
router.delete('/:id/unenroll-class/:classId', authorizeRoles('admin', 'faculty'), async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    const classObj = await Class.findById(req.params.classId);

    if (!student || !classObj) {
      return res.status(404).json({
        success: false,
        message: 'Student or class not found'
      });
    }

    // Remove from both collections
    student.enrolledClasses = student.enrolledClasses.filter(
      classId => classId.toString() !== req.params.classId
    );
    classObj.students = classObj.students.filter(
      studentId => studentId.toString() !== req.params.id
    );

    await Promise.all([student.save(), classObj.save()]);

    res.json({
      success: true,
      message: 'Student unenrolled successfully'
    });
  } catch (error) {
    console.error('Unenroll student error:', error);
    res.status(500).json({
      success: false,
      message: 'Error unenrolling student'
    });
  }
});

// @route   GET /api/students/stats/overview
// @desc    Get student statistics
// @access  Private (Admin/Faculty)
router.get('/stats/overview', authorizeRoles('admin', 'faculty'), async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const activeStudents = await Student.countDocuments({ status: 'active' });
    const graduatedStudents = await Student.countDocuments({ status: 'graduated' });
    
    // Department-wise count
    const departmentStats = await Student.aggregate([
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Semester-wise count
    const semesterStats = await Student.aggregate([
      { $group: { _id: '$semester', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    // Fee status
    const feeStats = await Student.aggregate([
      { $group: { _id: '$feeStatus', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        totalStudents,
        activeStudents,
        graduatedStudents,
        inactiveStudents: totalStudents - activeStudents - graduatedStudents,
        departmentStats,
        semesterStats,
        feeStats
      }
    });
  } catch (error) {
    console.error('Get student stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching student statistics'
    });
  }
});

module.exports = router;
