import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET - List all classes or search by class code
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const classCode = searchParams.get('classCode')
    const search = searchParams.get('search')

    if (classCode) {
      // Search by exact class code
      const classItem = await db.classData.findUnique({
        where: { classCode }
      })
      return NextResponse.json({ success: true, data: classItem })
    }

    if (search) {
      // Search by partial class code
      const classes = await db.classData.findMany({
        where: {
          classCode: {
            contains: search
          }
        },
        orderBy: { createdAt: 'desc' }
      })
      return NextResponse.json({ 
        success: true, 
        classes: classes.map(c => ({
          id: c.id,
          code: c.classCode,
          name: c.name || c.classCode
        })),
        data: classes 
      })
    }

    // Get all classes
    const classes = await db.classData.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json({ success: true, data: classes })
  } catch (error) {
    console.error('Get classes error:', error)
    return NextResponse.json({ success: false, message: 'Lỗi hệ thống' }, { status: 500 })
  }
}

// POST - Create new class
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { classCode, name, teacher, schedule, status, sheetId } = body

    if (!classCode) {
      return NextResponse.json(
        { success: false, message: 'Mã lớp là bắt buộc' },
        { status: 400 }
      )
    }

    // Check if class code already exists
    const existing = await db.classData.findUnique({
      where: { classCode }
    })

    if (existing) {
      return NextResponse.json(
        { success: false, message: 'Mã lớp đã tồn tại' },
        { status: 400 }
      )
    }

    const newClass = await db.classData.create({
      data: {
        classCode,
        name: name || '',
        teacher: teacher || '',
        schedule: schedule || '',
        status: status || 'active',
        sheetId: sheetId || ''
      }
    })

    return NextResponse.json({ success: true, data: newClass })
  } catch (error) {
    console.error('Create class error:', error)
    return NextResponse.json({ success: false, message: 'Lỗi hệ thống' }, { status: 500 })
  }
}

// PUT - Update class
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, classCode, name, teacher, schedule, status, sheetId } = body

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Thiếu ID' },
        { status: 400 }
      )
    }

    // Build update data with only provided fields
    const updateData: Record<string, unknown> = {}
    if (classCode !== undefined) updateData.classCode = classCode
    if (name !== undefined) updateData.name = name
    if (teacher !== undefined) updateData.teacher = teacher
    if (schedule !== undefined) updateData.schedule = schedule
    if (status !== undefined) updateData.status = status
    if (sheetId !== undefined) updateData.sheetId = sheetId

    const updatedClass = await db.classData.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json({ success: true, data: updatedClass })
  } catch (error) {
    console.error('Update class error:', error)
    return NextResponse.json({ success: false, message: 'Lỗi hệ thống' }, { status: 500 })
  }
}

// DELETE - Delete class
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Thiếu ID' },
        { status: 400 }
      )
    }

    await db.classData.delete({
      where: { id }
    })

    return NextResponse.json({ success: true, message: 'Đã xóa thành công' })
  } catch (error) {
    console.error('Delete class error:', error)
    return NextResponse.json({ success: false, message: 'Lỗi hệ thống' }, { status: 500 })
  }
}
