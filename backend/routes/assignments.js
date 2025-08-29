const express = require('express');
const { body, validationResult } = require('express-validator');
const Assignment = require('../models/Assignment');
const Class = require('../models/Class');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const { authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/assignments
// @desc    Get assignments
// @access  Private
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let filter = {};
    if (req.query.class) filter.class = req.query.class;
    if (req.query.status) filter.status = req.query.status;

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

    const assignments = await Assignment.find(filter)
      .populate('class', 'className subject')
      .populate('faculty', 'user designation')
      .populate({
        path: 'faculty',
        populate: {
          path: 'user',
          select: 'firstName lastName'
        }
      })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Assignment.countDocuments(filter);

    res.json({
      success: true,
      data: {
        assignments,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get assignments error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching assignments'
    });
  }
});

// @route   GET /api/assignments/:id
// @desc    Get assignment by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate('class', 'className subject students')
      .populate('faculty', 'user designation')
      .populate({
        path: 'faculty',
        populate: {
          path: 'user',
          select: 'firstName lastName email'
        }
      })
      .populate({
        path: 'submissions.student',
        populate: {
          path: 'user',
          select: 'firstName lastName email'
        }
      });

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }

    // Check authorization
    if (req.user.role === 'student') {
      const student = await Student.findOne({ user: req.user._id });
      if (!student || !student.enrolledClasses.includes(assignment.class._id)) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }
    } else if (req.user.role === 'faculty') {
      const faculty = await Faculty.findOne({ user: req.user._id });
      if (!faculty || assignment.faculty._id.toString() !== faculty._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }
    }

    res.json({
      success: true,
      data: assignment
    });
  } catch (error) {
    console.error('Get assignment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching assignment'
    });
  }
});

// @route   POST /api/assignments
// @desc    Create new assignment
// @access  Private (Faculty/Admin)
router.post('/', authorizeRoles('faculty', 'admin'), [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('class').notEmpty().withMessage('Class is required'),
  body('dueDate').isISO8601().withMessage('Valid due date is required'),
  body('maxMarks').isInt({ min: 1 }).withMessage('Max marks must be positive')
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

    // Get faculty info
    const faculty = await Faculty.findOne({ user: req.user._id });
    if (!faculty && req.user.role === 'faculty') {
      return res.status(404).json({
        success: false,
        message: 'Faculty profile not found'
      });
    }

    // Verify class exists and faculty has access
    const classObj = await Class.findById(req.body.class);
    if (!classObj) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    if (req.user.role === 'faculty' && classObj.faculty.toString() !== faculty._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only create assignments for your assigned classes'
      });
    }

    const assignment = new Assignment({
      ...req.body,
      faculty: faculty ? faculty._id : req.body.faculty
    });

    await assignment.save();

    const populatedAssignment = await Assignment.findById(assignment._id)
      .populate('class', 'className subject')
      .populate('faculty', 'user designation');

    // Emit assignment creation event
    const io = req.app.get('io');
    if (io) {
      io.to('student').emit('new-assignment', {
        assignmentId: assignment._id,
        title: assignment.title,
        className: classObj.className,
        dueDate: assignment.dueDate,
        timestamp: new Date()
      });
    }

    res.status(201).json({
      success: true,
      message: 'Assignment created successfully',
      data: populatedAssignment
    });
  } catch (error) {
    console.error('Create assignment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating assignment'
    });
  }
});

// @route   PUT /api/assignments/:id
// @desc    Update assignment
// @access  Private (Faculty/Admin)
router.put('/:id', authorizeRoles('faculty', 'admin'), async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }

    // Check authorization for faculty
    if (req.user.role === 'faculty') {
      const faculty = await Faculty.findOne({ user: req.user._id });
      if (!faculty || assignment.faculty.toString() !== faculty._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }
    }

    const allowedUpdates = [
      'title', 'description', 'instructions', 'dueDate', 'maxMarks',
      'attachments', 'status'
    ];

    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const updatedAssignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('class', 'className subject');

    res.json({
      success: true,
      message: 'Assignment updated successfully',
      data: updatedAssignment
    });
  } catch (error) {
    console.error('Update assignment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating assignment'
    });
  }
});

// @route   POST /api/assignments/:id/submit
// @desc    Submit assignment
// @access  Private (Student)
router.post('/:id/submit', authorizeRoles('student'), [
  body('content').optional().notEmpty().withMessage('Content cannot be empty if provided'),
  body('attachments').optional().isArray().withMessage('Attachments must be an array')
], async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }

    // Check if assignment is still open
    if (assignment.status !== 'active' || new Date() > assignment.dueDate) {
      return res.status(400).json({
        success: false,
        message: 'Assignment submission is closed'
      });
    }

    const student = await Student.findOne({ user: req.user._id });
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student profile not found'
      });
    }

    // Check if student is enrolled in the class
    const classObj = await Class.findById(assignment.class);
    if (!classObj.students.includes(student._id)) {
      return res.status(403).json({
        success: false,
        message: 'You are not enrolled in this class'
      });
    }

    // Check if already submitted
    const existingSubmission = assignment.submissions.find(
      sub => sub.student.toString() === student._id.toString()
    );

    if (existingSubmission) {
      return res.status(400).json({
        success: false,
        message: 'Assignment already submitted'
      });
    }

    // Add submission
    assignment.submissions.push({
      student: student._id,
      content: req.body.content,
      attachments: req.body.attachments || [],
      submittedAt: new Date()
    });

    await assignment.save();

    // Emit submission event
    const io = req.app.get('io');
    if (io) {
      io.to('faculty').emit('assignment-submitted', {
        assignmentId: assignment._id,
        studentId: student._id,
        title: assignment.title,
        timestamp: new Date()
      });
    }

    res.json({
      success: true,
      message: 'Assignment submitted successfully'
    });
  } catch (error) {
    console.error('Submit assignment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting assignment'
    });
  }
});

// @route   PUT /api/assignments/:id/grade/:submissionId
// @desc    Grade assignment submission
// @access  Private (Faculty/Admin)
router.put('/:id/grade/:submissionId', authorizeRoles('faculty', 'admin'), [
  body('marks').isInt({ min: 0 }).withMessage('Marks must be non-negative'),
  body('feedback').optional().notEmpty().withMessage('Feedback cannot be empty if provided')
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

    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }

    // Check authorization for faculty
    if (req.user.role === 'faculty') {
      const faculty = await Faculty.findOne({ user: req.user._id });
      if (!faculty || assignment.faculty.toString() !== faculty._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }
    }

    const submission = assignment.submissions.id(req.params.submissionId);
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    // Validate marks don't exceed max marks
    if (req.body.marks > assignment.maxMarks) {
      return res.status(400).json({
        success: false,
        message: 'Marks cannot exceed maximum marks'
      });
    }

    submission.marks = req.body.marks;
    submission.feedback = req.body.feedback;
    submission.gradedAt = new Date();
    submission.status = 'graded';

    await assignment.save();

    // Emit grading event
    const io = req.app.get('io');
    if (io) {
      io.to(`student-${submission.student}`).emit('assignment-graded', {
        assignmentId: assignment._id,
        title: assignment.title,
        marks: submission.marks,
        maxMarks: assignment.maxMarks,
        timestamp: new Date()
      });
    }

    res.json({
      success: true,
      message: 'Assignment graded successfully'
    });
  } catch (error) {
    console.error('Grade assignment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error grading assignment'
    });
  }
});

module.exports = router;
