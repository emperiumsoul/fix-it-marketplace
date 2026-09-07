import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getServerClient } from '@/sanity/lib/server-client'

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
      startingPrice = 150,
      description = '',
      serviceArea = 'Accra',
      includedTasks = [],
    } = body

    if (!title || typeof title !== 'string') {
      return NextResponse.json({ error: 'Service title is required' }, { status: 400 })
    }

    const client = getServerClient({ useWriteToken: true })

    // 1. Find provider profile ID
    const provider = await client.fetch<{ _id: string } | null>(
      `*[_type == "providerProfile" && clerkUserId == $userId][0]{ _id }`,
      { userId }
    )

    if (!provider) {
      return NextResponse.json(
        { error: 'Please complete your provider profile before publishing a service.' },
        { status: 400 }
      )
    }

    // 2. Find matching category or fallback to first available category
    const catQuery = categoryName ? categoryName.toLowerCase() : 'home'
    let category = await client.fetch<{ _id: string } | null>(
      `*[_type == "category" && (lower(title) match $cat || slug.current match $cat)][0]{ _id }`,
      { cat: `*${catQuery}*` }
    )

    if (!category) {
      category = await client.fetch<{ _id: string } | null>(
        `*[_type == "category"][0]{ _id }`
      )
    }

    const baseSlug = slugify(title)
    const slug = `${baseSlug}-${Date.now().toString(36)}`

    const serviceDoc = {
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

    return NextResponse.json({ success: true, serviceId: created._id })
  } catch (error) {
    console.error('[PROVIDER_SERVICE_CREATE_ERROR]', error)
    return NextResponse.json(
      { error: 'Failed to create service in Sanity' },
      { status: 500 }
    )
  }
}
