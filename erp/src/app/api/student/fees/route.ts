import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Fee from '@/models/Fee'

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

    const fees = await Fee.find({ studentId }).sort({ createdAt: -1 })
    
    return NextResponse.json({
      success: true,
      fees
    })

  } catch (error) {
    console.error('Fees fetch error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const { feeId, paymentMethod } = await request.json()
    
    const fee = await Fee.findById(feeId)
    
    if (!fee) {
      return NextResponse.json(
        { success: false, message: 'Fee not found' },
        { status: 404 }
      )
    }

    // Simulate payment processing
    const transactionId = `TXN${Date.now()}`
    
    fee.status = 'paid'
    fee.paymentDate = new Date()
    fee.transactionId = transactionId
    
    await fee.save()
    
    return NextResponse.json({
      success: true,
      message: 'Payment successful',
      transactionId,
      fee
    })

  } catch (error) {
    console.error('Payment error:', error)
    return NextResponse.json(
      { success: false, message: 'Payment failed' },
      { status: 500 }
    )
  }
}
