import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Document from '@/models/Document'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const facultyId = searchParams.get('facultyId')
    
    // Get all pending document requests for faculty review
    const applications = await Document.find({ 
      status: { $in: ['pending', 'approved', 'rejected'] }
    }).sort({ requestDate: -1 })
    
    return NextResponse.json({
      success: true,
      applications
    })

  } catch (error) {
    console.error('Faculty applications error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect()
    
    const { applicationId, action, remarks, facultyId } = await request.json()
    
    const application = await Document.findById(applicationId)
    
    if (!application) {
      return NextResponse.json(
        { success: false, message: 'Application not found' },
        { status: 404 }
      )
    }

    application.status = action // 'approved' or 'rejected'
    application.approvedDate = new Date()
    application.approvedBy = facultyId
    application.remarks = remarks
    
    await application.save()
    
    return NextResponse.json({
      success: true,
      message: `Application ${action} successfully`,
      application
    })

  } catch (error) {
    console.error('Application update error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update application' },
      { status: 500 }
    )
  }
}
