import { NextResponse } from 'next/server'
import { getServerClient } from '@/sanity/lib/server-client'
import { getAuthenticatedUserId } from '@/lib/auth/get-user'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const client = getServerClient()

    // 1. Fetch provider profile
    const profile = await client.fetch(
      `*[_type == "providerProfile" && clerkUserId == $userId][0]{
        _id,
        displayName,
        headline,
        clerkUserId,
        expertise,
        languages,
        serviceAreas,
        availability,
        onboardingStatus,
        verificationStatus,
        verified,
        rating,
        completedJobsCount,
        "photoUrl": photo.asset->url,
        "bioText": pt::text(bio),
        workExperience,
        education,
        certifications
      }`,
      { userId }
    )

    const profileId = profile?._id || ''

    // 2. Fetch provider's published or created services
    const services = await client.fetch(
      `*[_type == "service" && (provider->clerkUserId == $userId || provider._ref == $profileId)]{
        _id,
        title,
        "slug": slug.current,
        startingPrice,
        currency,
        status,
        serviceAreas,
        "categoryTitle": category->title,
        packages
      }`,
      { userId, profileId }
    )

interface BookingRecord {
  _id: string
  customerName?: string
  customerEmail?: string
  customerPhone?: string
  serviceTitle?: string
  agreedPackageName?: string
  agreedScope?: string
  agreedPrice?: number
  currency?: string
  scheduledTime?: string
  serviceAddress?: string
  jobStatus?: string
  paymentStatus?: string
  paymentReference?: string
}

    // 3. Fetch real bookings
    const bookings = await client.fetch<BookingRecord[]>(
      `*[_type == "booking" && (
        provider->clerkUserId == $userId ||
        provider._ref == $profileId ||
        providerClerkUserId == $userId ||
        service->provider->clerkUserId == $userId ||
        service->provider._ref == $profileId
      )] | order(_createdAt desc, scheduledTime desc){
        _id,
        "customerName": customer->fullName,
        "customerEmail": customer->email,
        "customerPhone": customer->phone,
        "serviceTitle": service->title,
        agreedPackageName,
        agreedScope,
        agreedPrice,
        currency,
        scheduledTime,
        serviceAddress,
        jobStatus,
        paymentStatus,
        paymentReference
      }`,
      { userId, profileId }
    )

    // 4. Calculate metrics dynamically
    const ordersCount = bookings.length
    const newRequestsCount = bookings.filter((b) => b.jobStatus === 'requested').length

    const availableBalance = bookings
      .filter((b) => b.jobStatus === 'completed' && b.paymentStatus === 'paid')
      .reduce((sum, b) => sum + (b.agreedPrice || 0), 0)

    const pendingEscrow = bookings
      .filter((b) => (b.jobStatus === 'confirmed' || b.jobStatus === 'in_progress') && b.paymentStatus === 'paid')
      .reduce((sum, b) => sum + (b.agreedPrice || 0), 0)

    const lifetimeEarned = bookings
      .filter((b) => b.jobStatus === 'completed')
      .reduce((sum, b) => sum + (b.agreedPrice || 0), 0)

    // Calculate real Profile Strength out of 12
    let strengthScore = 0
    if (profile?.displayName) strengthScore += 2
    if (profile?.photoUrl) strengthScore += 2
    if (profile?.headline) strengthScore += 2
    if (profile?.bioText) strengthScore += 2
    if (profile?.expertise && profile.expertise.length > 0) strengthScore += 2
    if (services.length > 0) strengthScore += 2

    return NextResponse.json({
      success: true,
      profile,
      services,
      bookings,
      metrics: {
        ordersCount,
        newRequestsCount,
        availableBalance,
        pendingEscrow,
        lifetimeEarned,
        hasService: services.length > 0,
        isIdentityVerified: profile?.verificationStatus === 'verified' || profile?.verified === true,
        verificationStatus: profile?.verificationStatus || (profile?.verified ? 'verified' : 'unverified'),
        isAreasHoursSet: Boolean(profile?.serviceAreas && profile.serviceAreas.length > 0 && profile?.availability),
        isPublished: services.length > 0 && services.some((s: { status: string }) => s.status === 'published') && profile?.onboardingStatus === 'completed',
        profileStrength: strengthScore,
      },
    })
  } catch (error) {
    console.error('[DASHBOARD_DATA_GET_ERROR]', error)
    return NextResponse.json(
      { error: 'Failed to fetch provider dashboard data' },
      { status: 500 }
    )
  }
}
