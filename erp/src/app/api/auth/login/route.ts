import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    console.log('🔐 Login attempt initiated')
    await dbConnect()
    console.log('📡 Database connected for login')
    
    const { email, password, userType } = await request.json()
    console.log('📝 Login request:', { email: email.replace(/(.{2}).*(@.*)/, '$1***$2'), userType })

    // Check for admin credentials
    if (email === 'admin@gmail.com' && password === 'admin') {
      console.log('👑 Admin login successful')
      return NextResponse.json({
        success: true,
        user: {
          email: 'admin@gmail.com',
          userType: 'admin',
          name: 'Admin User'
        },
        redirect: '/admin-dashboard'
      })
    }

    // Find user in database
    console.log('🔍 Searching for user in database...')
    const user = await User.findOne({ email, userType })
    
    if (!user) {
      console.log('❌ User not found:', { email: email.replace(/(.{2}).*(@.*)/, '$1***$2'), userType })
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    console.log('👤 User found:', { id: user._id, userType: user.userType })

    // Verify password
    console.log('🔒 Verifying password...')
    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if (!isPasswordValid) {
      console.log('❌ Invalid password for user:', user.email)
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    console.log('✅ Password verified successfully')

    // Determine redirect URL
    let redirectUrl = '/dashboard'
    if (userType === 'student') {
      redirectUrl = '/student-dashboard'
    } else if (userType === 'faculty') {
      redirectUrl = '/faculty-dashboard'
    } else if (userType === 'admin') {
      redirectUrl = '/admin-dashboard'
    }

    console.log('🎉 Login successful, redirecting to:', redirectUrl)
    
    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        userType: user.userType,
        name: `${user.profile.firstName} ${user.profile.lastName}`,
        profile: user.profile
      },
      redirect: redirectUrl
    })

  } catch (error) {
    console.error('❌ Login error:', error)
    console.error('🔍 Error details:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
