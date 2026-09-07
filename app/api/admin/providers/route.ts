import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getServerClient } from '@/sanity/lib/server-client'

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const client = getServerClient()

    const providers = await client.fetch(
      `*[_type == "providerProfile"] | order(_createdAt desc){
        _id,
        displayName,
        "slug": slug.current,
        clerkUserId,
        headline,
        "photoUrl": photo.asset->url,
        expertise,
        serviceAreas,
        verificationStatus,
        verified,
        onboardingStatus,
        rating,
        completedJobsCount,
        "servicesCount": count(*[_type == "service" && (provider->clerkUserId == ^.clerkUserId || provider._ref == ^._id)]),
        _createdAt
      }`
    )

    return NextResponse.json({ success: true, providers })
  } catch (error) {
    console.error('[ADMIN_GET_PROVIDERS_ERROR]', error)
    return NextResponse.json(
      { error: 'Failed to fetch providers' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { providerId, verificationStatus } = body

    if (!providerId) {
      return NextResponse.json(
        { error: 'Provider ID is required' },
        { status: 400 }
      )
    }

    const validStatuses = ['unverified', 'pending', 'verified']
    if (!validStatuses.includes(verificationStatus)) {
      return NextResponse.json(
        { error: 'Invalid verification status' },
        { status: 400 }
      )
    }

    const isVerified = verificationStatus === 'verified'

    const client = getServerClient({ useWriteToken: true })

    await client
      .patch(providerId)
      .set({
        verificationStatus,
        verified: isVerified,
      })
      .commit()

    return NextResponse.json({
      success: true,
      providerId,
      verificationStatus,
      verified: isVerified,
      message: `Provider status updated to ${verificationStatus}`,
    })
  } catch (error) {
    console.error('[ADMIN_UPDATE_PROVIDER_ERROR]', error)
    return NextResponse.json(
      { error: 'Failed to update provider status' },
      { status: 500 }
    )
  }
}
