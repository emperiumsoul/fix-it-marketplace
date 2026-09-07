import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getServerClient } from '@/sanity/lib/server-client'

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 })
    }

    // Validate MIME type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, or GIF are accepted.' },
        { status: 400 }
      )
    }

    // Validate size (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds maximum limit of 5MB.' },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const client = getServerClient({ useWriteToken: true })

    const asset = await client.assets.upload('image', buffer, {
      filename: file.name || 'profile-photo.jpg',
      contentType: file.type,
    })

    return NextResponse.json({
      success: true,
      assetId: asset._id,
      url: asset.url,
    })
  } catch (error) {
    console.error('[IMAGE_UPLOAD_ERROR]', error)
    return NextResponse.json(
      { error: 'Failed to upload image to Sanity' },
      { status: 500 }
    )
  }
}
