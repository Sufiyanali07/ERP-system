import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Document from '@/models/Document'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get('studentId')
    
    if (!studentId) {
      return NextResponse.json(
        { success: false, message: 'Student ID is required' },
        { status: 400 }
      )
    }

    const documents = await Document.find({ studentId }).sort({ requestDate: -1 })
    
    return NextResponse.json({
      success: true,
      documents
    })

  } catch (error) {
    console.error('Documents fetch error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const { studentId, studentEmail, documentType, urgency, reason } = await request.json()
    
    const document = new Document({
      studentId,
      studentEmail,
      documentType,
      urgency: urgency || 'normal',
      reason,
      status: 'pending'
    })
    
    await document.save()
    
    return NextResponse.json({
      success: true,
      message: 'Document request submitted successfully',
      document
    })

  } catch (error) {
    console.error('Document request error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit document request' },
      { status: 500 }
    )
  }
}
