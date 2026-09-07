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
    const { serviceAreas, availability } = body

    if (!Array.isArray(serviceAreas) || serviceAreas.length === 0) {
      return NextResponse.json(
        { error: 'Please select at least one service area in Ghana' },
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

    // Update provider profile
    await client
      .patch(existing._id)
      .set({
        serviceAreas,
        availability: availability || 'Mon - Sat: 8:00 AM - 6:00 PM',
      })
      .commit()

    // Also update any services created by this provider with the new service areas
    const services = await client.fetch<{ _id: string }[]>(
      `*[_type == "service" && (provider->clerkUserId == $userId || provider._ref == $profileId)]{ _id }`,
      { userId, profileId: existing._id }
    )

    for (const s of services) {
      await client
        .patch(s._id)
        .set({ serviceAreas })
        .commit()
    }

    return NextResponse.json({
      success: true,
      serviceAreas,
      availability: availability || 'Mon - Sat: 8:00 AM - 6:00 PM',
    })
  } catch (error) {
    console.error('[PROVIDER_AREAS_HOURS_ERROR]', error)
    return NextResponse.json(
      { error: 'Failed to update service areas and working hours' },
      { status: 500 }
    )
  }
}
