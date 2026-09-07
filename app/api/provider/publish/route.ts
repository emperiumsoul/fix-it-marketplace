import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getServerClient } from '@/sanity/lib/server-client'

export async function POST() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const client = getServerClient({ useWriteToken: true })

    const profile = await client.fetch<{ _id: string } | null>(
      `*[_type == "providerProfile" && clerkUserId == $userId][0]{ _id }`,
      { userId }
    )

    if (!profile) {
      return NextResponse.json(
        { error: 'Provider profile not found.' },
        { status: 404 }
      )
    }

    const services = await client.fetch<{ _id: string; title: string; status: string }[]>(
      `*[_type == "service" && (provider->clerkUserId == $userId || provider._ref == $profileId)]{ _id, title, status }`,
      { userId, profileId: profile._id }
    )

    if (!services || services.length === 0) {
      return NextResponse.json(
        { error: 'Please create at least one service before publishing.' },
        { status: 400 }
      )
    }

    // Publish all provider services
    for (const service of services) {
      await client
        .patch(service._id)
        .set({ status: 'published' })
        .commit()
    }

    // Mark provider onboarding status as completed
    await client
      .patch(profile._id)
      .set({ onboardingStatus: 'completed' })
      .commit()

    return NextResponse.json({
      success: true,
      publishedCount: services.length,
      message: 'Services published successfully! Your profile is now live.',
    })
  } catch (error) {
    console.error('[PROVIDER_PUBLISH_ERROR]', error)
    return NextResponse.json(
      { error: 'Failed to publish services' },
      { status: 500 }
    )
  }
}
