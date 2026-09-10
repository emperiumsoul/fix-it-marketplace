import { NextResponse } from 'next/server'
import { checkAdminAccess } from '@/lib/auth/admin'
import { getServerClient } from '@/sanity/lib/server-client'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { isAdmin, userId } = await checkAdminAccess(request)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 })
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
    const { isAdmin, userId } = await checkAdminAccess(request)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 })
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

    if (isVerified) {
      // Publish any services owned by this newly verified provider so they immediately appear
      const providerServices = await client.fetch<{ _id: string }[]>(
        `*[_type == "service" && (provider._ref == $providerId || provider->clerkUserId == $providerId)]{ _id }`,
        { providerId }
      )
      for (const srv of providerServices) {
        await client.patch(srv._id).set({ status: 'published' }).commit()
      }
    }

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
