const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true
  },
  admissionDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  academicYear: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    required: true,
    min: 1,
    max: 8
  },
  department: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  batch: {
    type: String,
    required: true
  },
  currentYear: {
    type: Number,
    required: true,
    min: 1,
    max: 4
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'graduated', 'suspended', 'dropped'],
    default: 'active'
  },
  // Academic Information
  cgpa: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  totalCredits: {
    type: Number,
    default: 0
  },
  // Guardian Information
  guardian: {
    name: {
      type: String,
      required: true
    },
    relation: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: String,
    occupation: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    }
  },
  // Emergency Contact
  emergencyContact: {
    name: String,
    phone: String,
    relation: String
  },
  // Fee Information
  feeStatus: {
    type: String,
    enum: ['paid', 'pending', 'overdue', 'partial'],
    default: 'pending'
  },
  totalFees: {
    type: Number,
    default: 0
  },
  paidFees: {
    type: Number,
    default: 0
  },
  pendingFees: {
    type: Number,
    default: 0
  },
  // Classes enrolled
  enrolledClasses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  }],
  // Attendance summary
  attendancePercentage: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  // Documents
  documents: [{
    name: String,
    type: String,
    url: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  // Medical Information
  medicalInfo: {
    bloodGroup: String,
    allergies: [String],
    medications: [String],
    emergencyMedicalContact: String
  },
  // Academic History
  previousEducation: [{
    institution: String,
    degree: String,
    year: Number,
    percentage: Number
  }]
}, {
  timestamps: true
});

// Indexes for better query performance (studentId and rollNumber already indexed by unique: true)
studentSchema.index({ department: 1, course: 1 });
studentSchema.index({ academicYear: 1, semester: 1 });
studentSchema.index({ status: 1 });

// Virtual for remaining fees
studentSchema.virtual('remainingFees').get(function() {
  return this.totalFees - this.paidFees;
});

module.exports = mongoose.model('Student', studentSchema);
