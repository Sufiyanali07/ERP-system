const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  designation: {
    type: String,
    required: true,
    enum: ['Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer', 'Lab Assistant', 'Head of Department']
  },
  department: {
    type: String,
    required: true
  },
  joiningDate: {
    type: Date,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  specialization: [String],
  experience: {
    type: Number, // in years
    min: 0
  },
  salary: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'on_leave', 'terminated'],
    default: 'active'
  },
  // Classes taught
  assignedClasses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  }],
  // Subjects taught
  subjects: [String],
  // Office details
  officeLocation: String,
  officeHours: {
    monday: { start: String, end: String },
    tuesday: { start: String, end: String },
    wednesday: { start: String, end: String },
    thursday: { start: String, end: String },
    friday: { start: String, end: String },
    saturday: { start: String, end: String }
  },
  // Research information
  researchAreas: [String],
  publications: [{
    title: String,
    journal: String,
    year: Number,
    authors: [String],
    doi: String
  }],
  // Performance metrics
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  totalStudents: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes (employeeId already indexed by unique: true)
facultySchema.index({ department: 1 });
facultySchema.index({ designation: 1 });
facultySchema.index({ status: 1 });

module.exports = mongoose.model('Faculty', facultySchema);
