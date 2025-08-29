const express = require('express');
const { body, validationResult } = require('express-validator');
const Grade = require('../models/Grade');
const Student = require('../models/Student');
const Class = require('../models/Class');
const Faculty = require('../models/Faculty');
const { authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/grades
// @desc    Get grades
// @access  Private
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let filter = {};
    if (req.query.student) filter.student = req.query.student;
    if (req.query.class) filter.class = req.query.class;
    if (req.query.semester) filter.semester = parseInt(req.query.semester);
    if (req.query.academicYear) filter.academicYear = req.query.academicYear;

    // Role-based filtering
    if (req.user.role === 'student') {
      const student = await Student.findOne({ user: req.user._id });
      if (student) {
        filter.student = student._id;
      }
    } else if (req.user.role === 'faculty') {
      const faculty = await Faculty.findOne({ user: req.user._id });
      if (faculty) {
        filter.faculty = faculty._id;
      }
    }

    const grades = await Grade.find(filter)
      .populate('student', 'user rollNumber')
      .populate({
        path: 'student',
        populate: {
          path: 'user',
          select: 'firstName lastName'
        }
      })
      .populate('class', 'className subject')
      .populate('faculty', 'user designation')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Grade.countDocuments(filter);

    res.json({
      success: true,
      data: {
        grades,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get grades error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching grades'
    });
  }
});

// @route   POST /api/grades
// @desc    Create/Update grade
// @access  Private (Faculty/Admin)
router.post('/', authorizeRoles('faculty', 'admin'), [
  body('student').notEmpty().withMessage('Student is required'),
  body('class').notEmpty().withMessage('Class is required'),
  body('examType').isIn(['quiz', 'assignment', 'midterm', 'final', 'project']).withMessage('Invalid exam type'),
  body('marks').isNumeric().withMessage('Marks must be numeric'),
  body('maxMarks').isNumeric().withMessage('Max marks must be numeric'),
  body('semester').isInt({ min: 1, max: 8 }).withMessage('Semester must be between 1 and 8'),
  body('academicYear').notEmpty().withMessage('Academic year is required')
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

    const { student: studentId, class: classId, examType, marks, maxMarks } = req.body;

    // Get faculty info
    const faculty = await Faculty.findOne({ user: req.user._id });
    if (!faculty && req.user.role === 'faculty') {
      return res.status(404).json({
        success: false,
        message: 'Faculty profile not found'
      });
    }

    // Verify student and class exist
    const student = await Student.findById(studentId);
    const classObj = await Class.findById(classId);

    if (!student || !classObj) {
      return res.status(404).json({
        success: false,
        message: 'Student or class not found'
      });
    }

    // Check if faculty has access to this class
    if (req.user.role === 'faculty' && classObj.faculty.toString() !== faculty._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only grade students in your assigned classes'
      });
    }

    // Check if student is enrolled in the class
    if (!student.enrolledClasses.includes(classId)) {
      return res.status(400).json({
        success: false,
        message: 'Student is not enrolled in this class'
      });
    }

    // Validate marks
    if (marks > maxMarks) {
      return res.status(400).json({
        success: false,
        message: 'Marks cannot exceed maximum marks'
      });
    }

    // Check if grade already exists for this combination
    const existingGrade = await Grade.findOne({
      student: studentId,
      class: classId,
      examType,
      semester: req.body.semester,
      academicYear: req.body.academicYear
    });

    let grade;
    if (existingGrade) {
      // Update existing grade
      existingGrade.marks = marks;
      existingGrade.maxMarks = maxMarks;
      existingGrade.percentage = Math.round((marks / maxMarks) * 100);
      existingGrade.grade = calculateGrade(existingGrade.percentage);
      existingGrade.remarks = req.body.remarks;
      existingGrade.gradedAt = new Date();
      
      grade = await existingGrade.save();
    } else {
      // Create new grade
      grade = new Grade({
        ...req.body,
        faculty: faculty ? faculty._id : req.body.faculty,
        percentage: Math.round((marks / maxMarks) * 100),
        grade: calculateGrade(Math.round((marks / maxMarks) * 100)),
        gradedAt: new Date()
      });
      
      await grade.save();
    }

    // Update student CGPA
    await updateStudentCGPA(studentId);

    const populatedGrade = await Grade.findById(grade._id)
      .populate('student', 'user rollNumber')
      .populate('class', 'className subject')
      .populate('faculty', 'user designation');

    // Emit grade event
    const io = req.app.get('io');
    if (io) {
      io.to(`student-${studentId}`).emit('grade-updated', {
        gradeId: grade._id,
        className: classObj.className,
        examType: grade.examType,
        marks: grade.marks,
        maxMarks: grade.maxMarks,
        grade: grade.grade,
        timestamp: new Date()
      });
    }

    res.status(existingGrade ? 200 : 201).json({
      success: true,
      message: `Grade ${existingGrade ? 'updated' : 'created'} successfully`,
      data: populatedGrade
    });
  } catch (error) {
    console.error('Create/Update grade error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing grade'
    });
  }
});

// @route   GET /api/grades/student/:studentId
// @desc    Get student grades summary
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

    const grades = await Grade.find({ student: student._id })
      .populate('class', 'className subject credits')
      .populate('faculty', 'user designation')
      .sort({ semester: 1, createdAt: -1 });

    // Group by semester and class
    const groupedGrades = {};
    let totalCredits = 0;
    let totalGradePoints = 0;

    grades.forEach(grade => {
      const semester = grade.semester;
      const className = grade.class.className;
      
      if (!groupedGrades[semester]) {
        groupedGrades[semester] = {};
      }
      
      if (!groupedGrades[semester][className]) {
        groupedGrades[semester][className] = [];
      }
      
      groupedGrades[semester][className].push(grade);
      
      // Calculate CGPA contribution
      if (grade.class.credits) {
        totalCredits += grade.class.credits;
        totalGradePoints += getGradePoint(grade.grade) * grade.class.credits;
      }
    });

    const cgpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;

    res.json({
      success: true,
      data: {
        student: {
          _id: student._id,
          rollNumber: student.rollNumber,
          user: student.user
        },
        grades: groupedGrades,
        cgpa: parseFloat(cgpa),
        totalCredits
      }
    });
  } catch (error) {
    console.error('Get student grades error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching student grades'
    });
  }
});

// @route   GET /api/grades/class/:classId
// @desc    Get class grades summary
// @access  Private (Faculty/Admin)
router.get('/class/:classId', authorizeRoles('faculty', 'admin'), async (req, res) => {
  try {
    const classObj = await Class.findById(req.params.classId);
    if (!classObj) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    // Check authorization for faculty
    if (req.user.role === 'faculty') {
      const faculty = await Faculty.findOne({ user: req.user._id });
      if (!faculty || classObj.faculty.toString() !== faculty._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }
    }

    const grades = await Grade.find({ class: classObj._id })
      .populate('student', 'user rollNumber')
      .populate({
        path: 'student',
        populate: {
          path: 'user',
          select: 'firstName lastName'
        }
      })
      .sort({ 'student.rollNumber': 1, examType: 1 });

    // Group by student
    const studentGrades = {};
    grades.forEach(grade => {
      const studentId = grade.student._id.toString();
      if (!studentGrades[studentId]) {
        studentGrades[studentId] = {
          student: grade.student,
          grades: []
        };
      }
      studentGrades[studentId].grades.push(grade);
    });

    res.json({
      success: true,
      data: {
        class: {
          _id: classObj._id,
          className: classObj.className,
          subject: classObj.subject
        },
        studentGrades: Object.values(studentGrades)
      }
    });
  } catch (error) {
    console.error('Get class grades error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching class grades'
    });
  }
});

// @route   DELETE /api/grades/:id
// @desc    Delete grade
// @access  Private (Faculty/Admin)
router.delete('/:id', authorizeRoles('faculty', 'admin'), async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if (!grade) {
      return res.status(404).json({
        success: false,
        message: 'Grade not found'
      });
    }

    // Check authorization for faculty
    if (req.user.role === 'faculty') {
      const faculty = await Faculty.findOne({ user: req.user._id });
      if (!faculty || grade.faculty.toString() !== faculty._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }
    }

    const studentId = grade.student;
    await Grade.findByIdAndDelete(req.params.id);

    // Update student CGPA
    await updateStudentCGPA(studentId);

    res.json({
      success: true,
      message: 'Grade deleted successfully'
    });
  } catch (error) {
    console.error('Delete grade error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting grade'
    });
  }
});

// Helper function to calculate letter grade
function calculateGrade(percentage) {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C+';
  if (percentage >= 40) return 'C';
  if (percentage >= 35) return 'D';
  return 'F';
}

// Helper function to get grade points
function getGradePoint(grade) {
  const gradePoints = {
    'A+': 10, 'A': 9, 'B+': 8, 'B': 7,
    'C+': 6, 'C': 5, 'D': 4, 'F': 0
  };
  return gradePoints[grade] || 0;
}

// Helper function to update student CGPA
async function updateStudentCGPA(studentId) {
  try {
    const student = await Student.findById(studentId).populate('enrolledClasses', 'credits');
    const grades = await Grade.find({ student: studentId }).populate('class', 'credits');
    
    let totalCredits = 0;
    let totalGradePoints = 0;
    
    grades.forEach(grade => {
      if (grade.class && grade.class.credits) {
        totalCredits += grade.class.credits;
        totalGradePoints += getGradePoint(grade.grade) * grade.class.credits;
      }
    });
    
    const cgpa = totalCredits > 0 ? (totalGradePoints / totalCredits) : 0;
    
    student.cgpa = Math.round(cgpa * 100) / 100; // Round to 2 decimal places
    student.totalCredits = totalCredits;
    await student.save();
  } catch (error) {
    console.error('Error updating student CGPA:', error);
  }
}

module.exports = router;
