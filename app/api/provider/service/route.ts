import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs/server'
import { getServerClient } from '@/sanity/lib/server-client'

export const dynamic = 'force-dynamic'

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      title,
      categoryName,
      categorySlug,
      startingPrice = 150,
      description = '',
      serviceArea = 'Accra',
      includedTasks = [],
    } = body

    if (!title || typeof title !== 'string') {
      return NextResponse.json({ error: 'Service title is required' }, { status: 400 })
    }

    const client = getServerClient({ useWriteToken: true })

    // 1. Find provider profile ID and photo asset
    const provider = await client.fetch<{ _id: string; photoAsset?: string } | null>(
      `*[_type == "providerProfile" && clerkUserId == $userId][0]{ _id, "photoAsset": photo.asset._ref }`,
      { userId }
    )

    if (!provider) {
      return NextResponse.json(
        { error: 'Please complete your provider profile before publishing a service.' },
        { status: 400 }
      )
    }

    // 2. Find matching category
    const targetSlug = categorySlug || ''
    const targetTitle = categoryName || ''

    const tradeKeywords: Record<string, string> = {
      cleaning: 'clean*',
      'house-cleaning': 'clean*',
      plumbing: 'plumb*',
      electrical: 'electr*',
      'electrical-repairs': 'electr*',
      painting: 'paint*',
      'painting-decorating': 'paint*',
      moving: 'mov*',
      'moving-relocation': 'mov*',
      gardening: 'garden*',
      'gardening-landscaping': 'garden*',
      'furniture-assembly': 'assembl*',
      assembly: 'assembl*',
      'appliance-home-repairs': 'repair*',
      'home-repairs': 'repair*',
    }

    const keyword =
      tradeKeywords[targetSlug] ||
      (targetTitle ? `*${targetTitle.split(' ')[0].toLowerCase()}*` : '*home*')

    let category = await client.fetch<{ _id: string; slug: string } | null>(
      `*[_type == "category" && (
        slug.current == $targetSlug ||
        slug.current in [$targetSlug, "house-" + $targetSlug, $targetSlug + "-repairs", $targetSlug + "-landscaping", $targetSlug + "-decorating", $targetSlug + "-relocation"] ||
        title == $targetTitle ||
        lower(title) match $keyword ||
        lower(slug.current) match $keyword
      )][0]{ _id, "slug": slug.current }`,
      { targetSlug, targetTitle, keyword }
    )

    if (!category) {
      category = await client.fetch<{ _id: string; slug: string } | null>(
        `*[_type == "category"][0]{ _id, "slug": slug.current }`
      )
    }

    const baseSlug = slugify(title)
    const slug = `${baseSlug}-${Date.now().toString(36)}`

    const serviceDoc: Record<string, unknown> & { _type: 'service' } = {
      _type: 'service',
      title,
      slug: { _type: 'slug', current: slug },
      summary: description.slice(0, 160) || `Professional ${title} in ${serviceArea}, Ghana.`,
      startingPrice: Number(startingPrice) || 150,
      currency: 'GHS',
      status: 'published',
      provider: {
        _type: 'reference',
        _ref: provider._id,
      },
      ...(category ? { category: { _type: 'reference', _ref: category._id } } : {}),
      serviceAreas: [serviceArea],
      ...(provider?.photoAsset
        ? {
            coverImage: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: provider.photoAsset,
              },
            },
          }
        : {}),
      description: [
        {
          _type: 'block',
          _key: `block-${Date.now()}`,
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: `span-${Date.now()}`,
              text: description || `Professional ${title} service delivered across ${serviceArea}.`,
              marks: [],
            },
          ],
        },
      ],
      includedTasks: Array.isArray(includedTasks) && includedTasks.length > 0
        ? includedTasks
        : ['Initial diagnosis and scope assessment', 'Standard equipment and safety checks', 'Service execution and cleanup'],
      packages: [
        {
          _type: 'servicePackage',
          _key: `pkg-${Date.now()}`,
          name: 'Standard Package',
          description: description || `Standard full-service appointment for ${title}`,
          price: Number(startingPrice) || 150,
          scope: 'Standard on-site service and routine labor',
          duration: '1 - 2 hours',
          includedTasks: ['Standard diagnostic check', 'On-site execution', 'Workmanship guarantee'],
          exclusions: ['Specialized parts not included', 'Extensive architectural modifications'],
        },
      ],
    }

    const created = await client.create(serviceDoc)

    // Revalidate paths so the service immediately appears across the application
    try {
      if (category?.slug) {
        revalidatePath(`/categories/${category.slug}`)
      }
      if (targetSlug && targetSlug !== category?.slug) {
        revalidatePath(`/categories/${targetSlug}`)
      }
      revalidatePath('/categories/[slug]', 'page')
      revalidatePath('/provider/dashboard')
      revalidatePath('/provider/profile')
      revalidatePath('/')
      revalidatePath('/search')
    } catch (revalErr) {
      console.warn('[PROVIDER_SERVICE_REVALIDATE_WARN]', revalErr)
    }

    return NextResponse.json({ success: true, serviceId: created._id })
  } catch (error) {
    console.error('[PROVIDER_SERVICE_CREATE_ERROR]', error)
    return NextResponse.json(
      { error: 'Failed to create service in Sanity' },
      { status: 500 }
    )
  }
}
