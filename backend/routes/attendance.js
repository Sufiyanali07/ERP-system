const express = require('express');
const { body, validationResult } = require('express-validator');
const Attendance = require('../models/Attendance');
const Class = require('../models/Class');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const { authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/attendance
// @desc    Get attendance records
// @access  Private
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let filter = {};
    if (req.query.class) filter.class = req.query.class;
    if (req.query.date) {
      const date = new Date(req.query.date);
      filter.date = {
        $gte: new Date(date.setHours(0, 0, 0, 0)),
        $lt: new Date(date.setHours(23, 59, 59, 999))
      };
    }

    // Role-based filtering
    if (req.user.role === 'faculty') {
      const faculty = await Faculty.findOne({ user: req.user._id });
      if (faculty) {
        filter.faculty = faculty._id;
      }
    } else if (req.user.role === 'student') {
      const student = await Student.findOne({ user: req.user._id });
      if (student) {
        filter.class = { $in: student.enrolledClasses };
      }
    }

    const attendance = await Attendance.find(filter)
      .populate('class', 'className subject')
      .populate('faculty', 'user designation')
      .populate({
        path: 'faculty',
        populate: {
          path: 'user',
          select: 'firstName lastName'
        }
      })
      .populate({
        path: 'records.student',
        populate: {
          path: 'user',
          select: 'firstName lastName'
        }
      })
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 });

    const total = await Attendance.countDocuments(filter);

    res.json({
      success: true,
      data: {
        attendance,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching attendance'
    });
  }
});

// @route   POST /api/attendance
// @desc    Mark attendance
// @access  Private (Faculty/Admin)
router.post('/', authorizeRoles('faculty', 'admin'), [
  body('class').notEmpty().withMessage('Class is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('records').isArray().withMessage('Records must be an array'),
  body('records.*.student').notEmpty().withMessage('Student ID is required'),
  body('records.*.status').isIn(['present', 'absent', 'late']).withMessage('Invalid status')
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

    const { class: classId, date, records } = req.body;

    // Get faculty info
    const faculty = await Faculty.findOne({ user: req.user._id });
    if (!faculty && req.user.role === 'faculty') {
      return res.status(404).json({
        success: false,
        message: 'Faculty profile not found'
      });
    }

    // Verify class exists and faculty has access
    const classObj = await Class.findById(classId);
    if (!classObj) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    if (req.user.role === 'faculty' && classObj.faculty.toString() !== faculty._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only mark attendance for your assigned classes'
      });
    }

    // Check if attendance already exists for this date and class
    const existingAttendance = await Attendance.findOne({
      class: classId,
      date: {
        $gte: new Date(new Date(date).setHours(0, 0, 0, 0)),
        $lt: new Date(new Date(date).setHours(23, 59, 59, 999))
      }
    });

    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        message: 'Attendance already marked for this date'
      });
    }

    const attendance = new Attendance({
      class: classId,
      faculty: faculty ? faculty._id : req.body.faculty,
      date: new Date(date),
      records
    });

    await attendance.save();

    // Update student attendance percentages
    for (const record of records) {
      const student = await Student.findById(record.student);
      if (student) {
        const totalAttendance = await Attendance.countDocuments({
          'records.student': student._id
        });
        const presentCount = await Attendance.countDocuments({
          'records': {
            $elemMatch: {
              student: student._id,
              status: { $in: ['present', 'late'] }
            }
          }
        });
        
        student.attendancePercentage = totalAttendance > 0 ? Math.round((presentCount / totalAttendance) * 100) : 0;
        await student.save();
      }
    }

    const populatedAttendance = await Attendance.findById(attendance._id)
      .populate('class', 'className subject')
      .populate('faculty', 'user designation');

    // Emit attendance event
    const io = req.app.get('io');
    if (io) {
      io.to('admin').emit('attendance-marked', {
        attendanceId: attendance._id,
        className: classObj.className,
        date: attendance.date,
        timestamp: new Date()
      });
    }

    res.status(201).json({
      success: true,
      message: 'Attendance marked successfully',
      data: populatedAttendance
    });
  } catch (error) {
    console.error('Mark attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking attendance'
    });
  }
});

// @route   PUT /api/attendance/:id
// @desc    Update attendance
// @access  Private (Faculty/Admin)
router.put('/:id', authorizeRoles('faculty', 'admin'), async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }

    // Check authorization for faculty
    if (req.user.role === 'faculty') {
      const faculty = await Faculty.findOne({ user: req.user._id });
      if (!faculty || attendance.faculty.toString() !== faculty._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }
    }

    const allowedUpdates = ['records'];
    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const updatedAttendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('class', 'className subject');

    // Update student attendance percentages
    if (updates.records) {
      for (const record of updates.records) {
        const student = await Student.findById(record.student);
        if (student) {
          const totalAttendance = await Attendance.countDocuments({
            'records.student': student._id
          });
          const presentCount = await Attendance.countDocuments({
            'records': {
              $elemMatch: {
                student: student._id,
                status: { $in: ['present', 'late'] }
              }
            }
          });
          
          student.attendancePercentage = totalAttendance > 0 ? Math.round((presentCount / totalAttendance) * 100) : 0;
          await student.save();
        }
      }
    }

    res.json({
      success: true,
      message: 'Attendance updated successfully',
      data: updatedAttendance
    });
  } catch (error) {
    console.error('Update attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating attendance'
    });
  }
});

// @route   GET /api/attendance/student/:studentId
// @desc    Get student attendance summary
// @access  Private
router.get('/student/:studentId', async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
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

    const attendanceRecords = await Attendance.find({
      'records.student': student._id
    }).populate('class', 'className subject');

    const summary = {
      totalClasses: 0,
      present: 0,
      absent: 0,
      late: 0,
      percentage: 0,
      classWise: {}
    };

    attendanceRecords.forEach(attendance => {
      const record = attendance.records.find(r => r.student.toString() === student._id.toString());
      if (record) {
        summary.totalClasses++;
        summary[record.status]++;
        
        const className = attendance.class.className;
        if (!summary.classWise[className]) {
          summary.classWise[className] = { total: 0, present: 0, absent: 0, late: 0 };
        }
        summary.classWise[className].total++;
        summary.classWise[className][record.status]++;
      }
    });

    summary.percentage = summary.totalClasses > 0 ? 
      Math.round(((summary.present + summary.late) / summary.totalClasses) * 100) : 0;

    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    console.error('Get student attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching student attendance'
    });
  }
});

// @route   GET /api/attendance/stats/overview
// @desc    Get attendance statistics
// @access  Private (Faculty/Admin)
router.get('/stats/overview', authorizeRoles('faculty', 'admin'), async (req, res) => {
  try {
    let filter = {};
    
    // Faculty can only see stats for their classes
    if (req.user.role === 'faculty') {
      const faculty = await Faculty.findOne({ user: req.user._id });
      if (faculty) {
        filter.faculty = faculty._id;
      }
    }

    const totalRecords = await Attendance.countDocuments(filter);
    
    // Today's attendance
    const today = new Date();
    const todayFilter = {
      ...filter,
      date: {
        $gte: new Date(today.setHours(0, 0, 0, 0)),
        $lt: new Date(today.setHours(23, 59, 59, 999))
      }
    };
    const todayRecords = await Attendance.countDocuments(todayFilter);

    // Overall attendance percentage
    const attendanceStats = await Attendance.aggregate([
      { $match: filter },
      { $unwind: '$records' },
      { $group: {
        _id: '$records.status',
        count: { $sum: 1 }
      }}
    ]);

    const stats = {
      present: 0,
      absent: 0,
      late: 0
    };

    attendanceStats.forEach(stat => {
      stats[stat._id] = stat.count;
    });

    const totalStudentRecords = stats.present + stats.absent + stats.late;
    const overallPercentage = totalStudentRecords > 0 ? 
      Math.round(((stats.present + stats.late) / totalStudentRecords) * 100) : 0;

    res.json({
      success: true,
      data: {
        totalRecords,
        todayRecords,
        overallPercentage,
        presentCount: stats.present,
        absentCount: stats.absent,
        lateCount: stats.late,
        totalStudentRecords
      }
    });
  } catch (error) {
    console.error('Get attendance stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching attendance statistics'
    });
  }
});

module.exports = router;
