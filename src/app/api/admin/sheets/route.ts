import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET - List all Google Sheet links
export async function GET() {
  try {
    const sheets = await db.googleSheetLink.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json({ success: true, data: sheets })
  } catch (error) {
    console.error('Get sheets error:', error)
    return NextResponse.json({ success: false, message: 'Lỗi hệ thống' }, { status: 500 })
  }
}

// POST - Create new Google Sheet link
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, url, category, order } = body

    if (!name || !url || !category) {
      return NextResponse.json(
        { success: false, message: 'Thiếu thông tin bắt buộc' },
        { status: 400 }
      )
    }

    const sheet = await db.googleSheetLink.create({
      data: {
        name,
        description: description || '',
        url,
        category,
        order: order || 0
      }
    })

    return NextResponse.json({ success: true, data: sheet })
  } catch (error) {
    console.error('Create sheet error:', error)
    return NextResponse.json({ success: false, message: 'Lỗi hệ thống' }, { status: 500 })
  }
}

// PUT - Update Google Sheet link
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, name, description, url, category, order, isActive } = body

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Thiếu ID' },
        { status: 400 }
      )
    }

    // Build update data with only provided fields
    const updateData: Record<string, unknown> = {}
    if (name !== undefined) updateData.name = name
    if (description !== undefined) updateData.description = description
    if (url !== undefined) updateData.url = url
    if (category !== undefined) updateData.category = category
    if (order !== undefined) updateData.order = order
    if (isActive !== undefined) updateData.isActive = isActive

    const sheet = await db.googleSheetLink.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json({ success: true, data: sheet })
  } catch (error) {
    console.error('Update sheet error:', error)
    return NextResponse.json({ success: false, message: 'Lỗi hệ thống' }, { status: 500 })
  }
}

// DELETE - Delete Google Sheet link
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

    await db.googleSheetLink.delete({
      where: { id }
    })

    return NextResponse.json({ success: true, message: 'Đã xóa thành công' })
  } catch (error) {
    console.error('Delete sheet error:', error)
    return NextResponse.json({ success: false, message: 'Lỗi hệ thống' }, { status: 500 })
  }
}
