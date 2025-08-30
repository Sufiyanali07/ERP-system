import mongoose from 'mongoose'

const ExamSchema = new mongoose.Schema({
  examName: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  examDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  examType: {
    type: String,
    enum: ['midterm', 'final', 'quiz', 'practical'],
    required: true,
  },
  maxMarks: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const ResultSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true,
  },
  marksObtained: {
    type: Number,
    required: true,
  },
  grade: {
    type: String,
    enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'],
  },
  status: {
    type: String,
    enum: ['pass', 'fail'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export const Exam = mongoose.models.Exam || mongoose.model('Exam', ExamSchema)
export const Result = mongoose.models.Result || mongoose.model('Result', ResultSchema)
