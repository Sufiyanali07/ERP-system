import mongoose from 'mongoose'

const FeeSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
  },
  feeType: {
    type: String,
    enum: ['tuition', 'hostel', 'library', 'exam', 'lab', 'miscellaneous'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'overdue'],
    default: 'pending',
  },
  paymentDate: Date,
  transactionId: String,
  semester: {
    type: Number,
    required: true,
  },
  academicYear: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Fee || mongoose.model('Fee', FeeSchema)
