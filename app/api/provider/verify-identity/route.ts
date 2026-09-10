import { NextResponse } from 'next/server'
import { getAuthenticatedUserId } from '@/lib/auth/get-user'
import { getServerClient } from '@/sanity/lib/server-client'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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
        verificationStatus: 'pending',
        verified: false,
      })
      .commit()

    return NextResponse.json({
      success: true,
      verificationStatus: 'pending',
      message: 'Verification request submitted! An administrator will review your provider profile.',
    })
  } catch (error) {
    console.error('[PROVIDER_VERIFY_IDENTITY_ERROR]', error)
    return NextResponse.json(
      { error: 'Failed to submit provider verification request' },
      { status: 500 }
    )
  }
}
