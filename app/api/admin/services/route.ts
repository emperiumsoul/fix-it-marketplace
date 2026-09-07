import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { checkAdminAccess } from '@/lib/auth/admin'
import { getServerClient } from '@/sanity/lib/server-client'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { isAdmin, userId } = await checkAdminAccess()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 })
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
        "categorySlug": category->slug.current,
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
    const { isAdmin, userId } = await checkAdminAccess()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 })
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

    // Find service category slug for targeted cache revalidation
    const service = await client.fetch<{ categorySlug?: string } | null>(
      `*[_type == "service" && _id == $serviceId][0]{ "categorySlug": category->slug.current }`,
      { serviceId }
    )

    await client
      .patch(serviceId)
      .set({ status })
      .commit()

    // Revalidate category and marketplace paths
    try {
      if (service?.categorySlug) {
        revalidatePath(`/categories/${service.categorySlug}`)
      }
      revalidatePath('/categories/[slug]', 'page')
      revalidatePath('/')
      revalidatePath('/search')
    } catch (revalErr) {
      console.warn('[ADMIN_REVALIDATE_WARN]', revalErr)
    }

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

