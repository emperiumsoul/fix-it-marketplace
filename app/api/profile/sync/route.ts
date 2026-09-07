import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { getServerClient } from '@/sanity/lib/server-client'

export async function POST() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await currentUser()
    const client = getServerClient({ useWriteToken: true })

    // Check if customer profile already exists for this Clerk user ID
    const existing = await client.fetch<{ _id: string; fullName?: string; email?: string } | null>(
      `*[_type == "customerProfile" && clerkUserId == $userId][0]{ _id, fullName, email }`,
      { userId }
    )

    const fullName =
      [user?.firstName, user?.lastName].filter(Boolean).join(' ').trim() ||
      user?.username ||
      'Valued Customer'
    const email = user?.emailAddresses?.[0]?.emailAddress || ''
    const phone = user?.phoneNumbers?.[0]?.phoneNumber || ''

    if (existing) {
      // If profile exists, ensure name and email are kept up to date
      if (!existing.fullName || !existing.email) {
        await client
          .patch(existing._id)
          .set({
            fullName: existing.fullName || fullName,
            email: existing.email || email,
            phone: phone || undefined,
          })
          .commit()
      }
      return NextResponse.json({ status: 'existing', profileId: existing._id })
    }

    // Create new customer profile in Sanity
    const created = await client.create({
      _type: 'customerProfile',
      clerkUserId: userId,
      fullName,
      email,
      phone,
      city: 'Accra',
    })

    return NextResponse.json({ status: 'created', profileId: created._id })
  } catch (error) {
    console.error('[PROFILE_SYNC_ERROR]', error)
    return NextResponse.json(
      { error: 'Failed to sync user profile to Sanity' },
      { status: 500 }
    )
  }
}
