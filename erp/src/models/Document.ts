import mongoose from 'mongoose'

const DocumentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
  },
  documentType: {
    type: String,
    enum: ['transcript', 'certificate', 'bonafide', 'noc', 'recommendation', 'marksheet'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'ready'],
    default: 'pending',
  },
  requestDate: {
    type: Date,
    default: Date.now,
  },
  approvedDate: Date,
  approvedBy: String,
  reason: String,
  remarks: String,
  urgency: {
    type: String,
    enum: ['normal', 'urgent'],
    default: 'normal',
  },
})

export default mongoose.models.Document || mongoose.model('Document', DocumentSchema)
