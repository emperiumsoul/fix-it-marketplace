import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getServerClient } from '@/sanity/lib/server-client'

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { ghanaCardNumber } = body

    if (!ghanaCardNumber || typeof ghanaCardNumber !== 'string' || ghanaCardNumber.trim().length < 5) {
      return NextResponse.json(
        { error: 'A valid Ghana Card number is required (e.g., GHA-712345678-9)' },
        { status: 400 }
      )
    }

    const client = getServerClient({ useWriteToken: true })

    const existing = await client.fetch<{ _id: string } | null>(
      `*[_type == "providerProfile" && clerkUserId == $userId][0]{ _id }`,
      { userId }
    )

    if (!existing) {
      return NextResponse.json(
        { error: 'Provider profile not found. Please create your profile first.' },
        { status: 404 }
      )
    }

    await client
      .patch(existing._id)
      .set({
        verificationStatus: 'verified',
        verified: true,
      })
      .commit()

    return NextResponse.json({
      success: true,
      verificationStatus: 'verified',
      message: 'Identity verification approved successfully',
    })
  } catch (error) {
    console.error('[PROVIDER_VERIFY_IDENTITY_ERROR]', error)
    return NextResponse.json(
      { error: 'Failed to submit identity verification' },
      { status: 500 }
    )
  }
}
