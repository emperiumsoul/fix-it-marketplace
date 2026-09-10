import { NextResponse } from 'next/server'
import { getServerClient } from '@/sanity/lib/server-client'
import { checkAdminAccess } from '@/lib/auth/admin'
import { getAuthenticatedUserId, getAuthenticatedUser } from '@/lib/auth/get-user'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role') // 'customer' | 'provider' | 'all'

    const client = getServerClient()

    let filter = `_type == "booking" && (customerClerkUserId == $userId || providerClerkUserId == $userId || provider->clerkUserId == $userId)`
    if (role === 'customer') {
      filter = `_type == "booking" && customerClerkUserId == $userId`
    } else if (role === 'provider') {
      filter = `_type == "booking" && (providerClerkUserId == $userId || provider->clerkUserId == $userId)`
    }

    const bookings = await client.fetch(
      `*[${filter}] | order(_createdAt desc){
        _id,
        customerClerkUserId,
        providerClerkUserId,
        "customerName": customer->fullName,
        "customerEmail": customer->email,
        "customerPhone": customer->phone,
        "providerName": provider->displayName,
        "providerPhotoUrl": provider->photo.asset->url,
        "serviceTitle": service->title,
        "serviceSlug": service->slug.current,
        agreedPackageName,
        agreedScope,
        agreedPrice,
        currency,
        scheduledTime,
        serviceAddress,
        jobStatus,
        paymentStatus,
        paymentReference,
        _createdAt
      }`,
      { userId }
    )

    return NextResponse.json({ success: true, bookings: bookings || [] })
  } catch (error) {
    console.error('[BOOKINGS_GET_ERROR]', error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in to book a service.' }, { status: 401 })
    }

    const body = await request.json()
    const {
      serviceId,
      serviceSlug,
      providerId,
      providerClerkUserId,
      agreedPackageName,
      agreedScope,
      agreedPrice,
      currency,
      scheduledTime,
      serviceAddress,
      customerNotes,
    } = body

    if (!serviceAddress || typeof serviceAddress !== 'string' || !serviceAddress.trim()) {
      return NextResponse.json({ error: 'Service delivery address is required.' }, { status: 400 })
    }

    if (!serviceId && !serviceSlug) {
      return NextResponse.json({ error: 'Service identifier is required.' }, { status: 400 })
    }

    const client = getServerClient({ useWriteToken: true })

    // 1. Resolve or create customerProfile for this Clerk user
    let customerProfile = await client.fetch<{ _id: string } | null>(
      `*[_type == "customerProfile" && clerkUserId == $userId][0]{ _id }`,
      { userId }
    )

    if (!customerProfile) {
      const user = await getAuthenticatedUser(request)
      const fullName =
        [user?.firstName, user?.lastName].filter(Boolean).join(' ').trim() ||
        user?.username ||
        'Valued Customer'
      const email = user?.emailAddresses?.[0]?.emailAddress || ''
      const phone = user?.phoneNumbers?.[0]?.phoneNumber || ''

      const createdCustomer = await client.create({
        _type: 'customerProfile',
        clerkUserId: userId,
        fullName,
        email,
        phone,
        city: 'Accra',
      })
      customerProfile = { _id: createdCustomer._id }
    }

    // 2. Resolve Service and Provider records from Sanity
    const serviceDoc = await client.fetch<{
      _id: string
      title: string
      currency?: string
      startingPrice?: number
      providerRef?: string
      providerClerkUserId?: string
    } | null>(
      `*[_type == "service" && (_id == $serviceId || slug.current == $serviceSlug || slug.current == $serviceId)][0]{
        _id,
        title,
        currency,
        startingPrice,
        "providerRef": provider._ref,
        "providerClerkUserId": provider->clerkUserId
      }`,
      {
        serviceId: serviceId || '',
        serviceSlug: serviceSlug || '',
      }
    )

    const resolvedServiceId = serviceDoc?._id || serviceId
    let resolvedProviderId = serviceDoc?.providerRef || providerId
    let resolvedProviderClerkUserId = serviceDoc?.providerClerkUserId || providerClerkUserId

    // Fallback resolution for provider if not linked directly on serviceDoc
    if (!resolvedProviderId && resolvedProviderClerkUserId) {
      const pProfile = await client.fetch<{ _id: string } | null>(
        `*[_type == "providerProfile" && clerkUserId == $resolvedProviderClerkUserId][0]{ _id }`,
        { resolvedProviderClerkUserId }
      )
      if (pProfile) resolvedProviderId = pProfile._id
    }

    if (!resolvedProviderClerkUserId && resolvedProviderId) {
      const pProfile = await client.fetch<{ clerkUserId: string } | null>(
        `*[_type == "providerProfile" && _id == $resolvedProviderId][0]{ clerkUserId }`,
        { resolvedProviderId }
      )
      if (pProfile?.clerkUserId) resolvedProviderClerkUserId = pProfile.clerkUserId
    }

    // If still no provider reference, grab the default or first provider in database
    if (!resolvedProviderId) {
      const defaultProvider = await client.fetch<{ _id: string; clerkUserId: string } | null>(
        `*[_type == "providerProfile"][0]{ _id, clerkUserId }`
      )
      if (defaultProvider) {
        resolvedProviderId = defaultProvider._id
        resolvedProviderClerkUserId = defaultProvider.clerkUserId
      } else {
        return NextResponse.json({ error: 'Could not assign a service provider for this booking.' }, { status: 400 })
      }
    }

    // Parse / normalize scheduledTime to ISO string
    let parsedScheduledTime: string
    if (scheduledTime && !isNaN(Date.parse(scheduledTime))) {
      parsedScheduledTime = new Date(scheduledTime).toISOString()
    } else {
      // Default to tomorrow 09:00 AM UTC
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(9, 0, 0, 0)
      parsedScheduledTime = tomorrow.toISOString()
    }

    const finalPrice =
      typeof agreedPrice === 'number' && agreedPrice >= 0
        ? agreedPrice
        : typeof serviceDoc?.startingPrice === 'number'
        ? serviceDoc.startingPrice
        : 150

    const finalScope = customerNotes
      ? `${agreedScope || agreedPackageName || 'Standard Service'} · Notes: ${customerNotes}`
      : agreedScope || 'Requested service appointment'

    // 3. Create the Sanity booking document
    const createdBooking = await client.create({
      _type: 'booking',
      customer: { _type: 'reference', _ref: customerProfile._id },
      customerClerkUserId: userId,
      provider: { _type: 'reference', _ref: resolvedProviderId },
      providerClerkUserId: resolvedProviderClerkUserId || '',
      service: { _type: 'reference', _ref: resolvedServiceId },
      agreedPackageName: agreedPackageName || 'Standard Service',
      agreedScope: finalScope,
      agreedPrice: finalPrice,
      currency: currency || serviceDoc?.currency || 'GHS',
      scheduledTime: parsedScheduledTime,
      serviceAddress: serviceAddress.trim(),
      jobStatus: 'requested',
      paymentStatus: 'unpaid',
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      bookingId: createdBooking._id,
      booking: createdBooking,
      message: 'Booking request created successfully.',
    })
  } catch (error) {
    console.error('[BOOKINGS_POST_ERROR]', error)
    return NextResponse.json({ error: 'Failed to create booking request' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { bookingId, jobStatus } = body

    if (!bookingId || !jobStatus) {
      return NextResponse.json({ error: 'Booking ID and jobStatus are required' }, { status: 400 })
    }

    const validStatuses = ['requested', 'confirmed', 'in_progress', 'completed', 'cancelled']
    if (!validStatuses.includes(jobStatus)) {
      return NextResponse.json({ error: 'Invalid job status value' }, { status: 400 })
    }

    const client = getServerClient({ useWriteToken: true })

    // Verify booking exists and user is participant or admin
    const booking = await client.fetch<{
      _id: string
      customerClerkUserId: string
      providerClerkUserId: string
      providerRefClerkUserId?: string
    } | null>(
      `*[_type == "booking" && _id == $bookingId][0]{
        _id,
        customerClerkUserId,
        providerClerkUserId,
        "providerRefClerkUserId": provider->clerkUserId
      }`,
      { bookingId }
    )

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    const isParticipant =
      booking.customerClerkUserId === userId ||
      booking.providerClerkUserId === userId ||
      booking.providerRefClerkUserId === userId

    if (!isParticipant) {
      const { isAdmin } = await checkAdminAccess()
      if (!isAdmin) {
        return NextResponse.json({ error: 'Forbidden: You cannot modify this booking' }, { status: 403 })
      }
    }

    await client
      .patch(bookingId)
      .set({ jobStatus })
      .commit()

    return NextResponse.json({
      success: true,
      bookingId,
      jobStatus,
      message: `Booking status updated to ${jobStatus}`,
    })
  } catch (error) {
    console.error('[BOOKINGS_PATCH_ERROR]', error)
    return NextResponse.json({ error: 'Failed to update booking status' }, { status: 500 })
  }
}
