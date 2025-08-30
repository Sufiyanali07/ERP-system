import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Exam, Result } from '@/models/Exam'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get('studentId')
    const department = searchParams.get('department')
    const semester = searchParams.get('semester')
    
    let query = {}
    
    if (department && semester) {
      query = { department, semester: parseInt(semester) }
    }
    
    const exams = await Exam.find(query).sort({ examDate: 1 })
    
    // If studentId is provided, also get results
    let results = []
    if (studentId) {
      results = await Result.find({ studentId }).populate('examId')
    }
    
    return NextResponse.json({
      success: true,
      exams,
      results
    })

  } catch (error) {
    console.error('Exams fetch error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
