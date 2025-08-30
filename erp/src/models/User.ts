import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ['student', 'faculty', 'admin'],
    required: true,
  },
  profile: {
    firstName: String,
    lastName: String,
    studentId: String,
    employeeId: String,
    department: String,
    course: String,
    semester: Number,
    phone: String,
    address: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
