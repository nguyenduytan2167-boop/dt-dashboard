import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import crypto from 'crypto'

// Simple hash function for password
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex')
}

// Expected credentials (stored securely)
const ADMIN_USERNAME = 'Admin'
// Hash of '8934588063o60'
const ADMIN_PASSWORD_HASH = hashPassword('8934588063o60')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Verify credentials
    if (username !== ADMIN_USERNAME || hashPassword(password) !== ADMIN_PASSWORD_HASH) {
      return NextResponse.json(
        { success: false, message: 'Sai tên đăng nhập hoặc mật khẩu' },
        { status: 401 }
      )
    }

    // Create session token
    const sessionToken = crypto.randomBytes(32).toString('hex')

    // Store or update admin session in database
    const existingAdmin = await db.admin.findFirst()
    
    if (existingAdmin) {
      await db.admin.update({
        where: { id: existingAdmin.id },
        data: {
          passwordHash: sessionToken, // Using this field to store session token
          updatedAt: new Date()
        }
      })
    } else {
      await db.admin.create({
        data: {
          username: ADMIN_USERNAME,
          passwordHash: sessionToken
        }
      })
    }

    // Set cookie
    const response = NextResponse.json({ 
      success: true, 
      message: 'Đăng nhập thành công',
      sessionToken 
    })
    
    response.cookies.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/'
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'Lỗi hệ thống' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('admin_session')?.value
    
    if (!sessionToken) {
      return NextResponse.json({ authenticated: false })
    }

    // Verify session
    const admin = await db.admin.findFirst({
      where: { passwordHash: sessionToken }
    })

    if (!admin) {
      return NextResponse.json({ authenticated: false })
    }

    return NextResponse.json({ 
      authenticated: true,
      username: admin.username 
    })
  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json({ authenticated: false })
  }
}

export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ success: true, message: 'Đăng xuất thành công' })
  response.cookies.delete('admin_session')
  return response
}
