const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true
  },
  classCode: {
    type: String,
    required: true,
    unique: true
  },
  subject: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
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
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
    required: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  schedule: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    startTime: String,
    endTime: String,
    room: String
  }],
  maxStudents: {
    type: Number,
    default: 60
  },
  credits: {
    type: Number,
    required: true,
    min: 1,
    max: 6
  },
  description: String,
  syllabus: String,
  status: {
    type: String,
    enum: ['active', 'inactive', 'completed'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Virtual for enrolled student count
classSchema.virtual('enrolledCount').get(function() {
  return this.students.length;
});

// Indexes (classCode already indexed by unique: true)
classSchema.index({ department: 1, semester: 1 });
classSchema.index({ faculty: 1 });
classSchema.index({ academicYear: 1 });

module.exports = mongoose.model('Class', classSchema);
