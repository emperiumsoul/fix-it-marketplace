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

    const services = await client.fetch(
      `*[_type == "service"] | order(_createdAt desc){
        _id,
        title,
        "slug": slug.current,
        startingPrice,
        currency,
        status,
        serviceAreas,
        "categoryTitle": category->title,
        "providerName": provider->displayName,
        "providerVerified": provider->verified,
        _createdAt
      }`
    )

    return NextResponse.json({ success: true, services })
  } catch (error) {
    console.error('[ADMIN_GET_SERVICES_ERROR]', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
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
    const { serviceId, status } = body

    if (!serviceId) {
      return NextResponse.json(
        { error: 'Service ID is required' },
        { status: 400 }
      )
    }

    if (!['draft', 'published'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid service status' },
        { status: 400 }
      )
    }

    const client = getServerClient({ useWriteToken: true })

    await client
      .patch(serviceId)
      .set({ status })
      .commit()

    return NextResponse.json({
      success: true,
      serviceId,
      status,
      message: `Service status updated to ${status}`,
    })
  } catch (error) {
    console.error('[ADMIN_UPDATE_SERVICE_ERROR]', error)
    return NextResponse.json(
      { error: 'Failed to update service status' },
      { status: 500 }
    )
  }
}
