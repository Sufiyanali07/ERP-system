const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
    required: true
  },
  examType: {
    type: String,
    enum: ['quiz', 'assignment', 'midterm', 'final', 'project', 'lab', 'presentation'],
    required: true
  },
  marks: {
    type: Number,
    required: true,
    min: 0
  },
  maxMarks: {
    type: Number,
    required: true,
    min: 1
  },
  percentage: {
    type: Number,
    min: 0,
    max: 100
  },
  grade: {
    type: String,
    enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F']
  },
  semester: {
    type: Number,
    required: true,
    min: 1,
    max: 8
  },
  academicYear: {
    type: String,
    required: true
  },
  remarks: String,
  gradedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate grades for same exam
gradeSchema.index({ 
  student: 1, 
  class: 1, 
  examType: 1, 
  semester: 1, 
  academicYear: 1 
}, { unique: true });

// Other indexes
gradeSchema.index({ student: 1, semester: 1 });
gradeSchema.index({ class: 1 });
gradeSchema.index({ faculty: 1 });

module.exports = mongoose.model('Grade', gradeSchema);
