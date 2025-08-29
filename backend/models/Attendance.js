const mongoose = require('mongoose');

const attendanceRecordSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late'],
    required: true
  },
  remarks: String
});

const attendanceSchema = new mongoose.Schema({
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
  date: {
    type: Date,
    required: true
  },
  records: [attendanceRecordSchema],
  totalStudents: {
    type: Number,
    default: 0
  },
  presentCount: {
    type: Number,
    default: 0
  },
  absentCount: {
    type: Number,
    default: 0
  },
  lateCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Pre-save middleware to calculate counts
attendanceSchema.pre('save', function(next) {
  this.totalStudents = this.records.length;
  this.presentCount = this.records.filter(r => r.status === 'present').length;
  this.absentCount = this.records.filter(r => r.status === 'absent').length;
  this.lateCount = this.records.filter(r => r.status === 'late').length;
  next();
});

// Indexes
attendanceSchema.index({ class: 1, date: 1 }, { unique: true });
attendanceSchema.index({ faculty: 1, date: 1 });
attendanceSchema.index({ 'records.student': 1 });

module.exports = mongoose.model('Attendance', attendanceSchema);
