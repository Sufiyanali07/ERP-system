import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import Fee from '@/models/Fee'
import Document from '@/models/Document'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    // Get total counts
    const totalStudents = await User.countDocuments({ userType: 'student' })
    const totalFaculty = await User.countDocuments({ userType: 'faculty' })
    
    // Get fee statistics
    const pendingFees = await Fee.aggregate([
      { $match: { status: 'pending' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ])
    
    const collectedFees = await Fee.aggregate([
      { $match: { status: 'paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ])
    
    // Get pending requests
    const pendingDocuments = await Document.countDocuments({ status: 'pending' })
    
    // Department-wise statistics
    const departmentStats = await User.aggregate([
      { $match: { userType: { $in: ['student', 'faculty'] } } },
      { 
        $group: {
          _id: { department: '$profile.department', userType: '$userType' },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.department',
          students: {
            $sum: { $cond: [{ $eq: ['$_id.userType', 'student'] }, '$count', 0] }
          },
          faculty: {
            $sum: { $cond: [{ $eq: ['$_id.userType', 'faculty'] }, '$count', 0] }
          }
        }
      }
    ])
    
    return NextResponse.json({
      success: true,
      data: {
        totalStudents,
        totalFaculty,
        pendingFees: pendingFees[0]?.total || 0,
        collectedFees: collectedFees[0]?.total || 0,
        pendingDocuments,
        departmentStats
      }
    })

  } catch (error) {
    console.error('Admin overview error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
