import { NextResponse } from 'next/server'
import { getServerClient } from '@/sanity/lib/server-client'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const client = getServerClient()

    const services = await client.fetch<Array<{
      _id: string
      title: string
      slug: string
      startingPrice?: number
      currency?: string
      categoryTitle?: string
      categorySlug?: string
      imageUrl?: string
      serviceAreas?: string[]
      provider?: {
        displayName?: string
        photoUrl?: string
        verificationStatus?: string
        verified?: boolean
        rating?: number
        completedJobsCount?: number
      }
    }>>(`
      *[_type == "service" && status == "published" && (provider->verificationStatus == "verified" || provider->verified == true)] | order(_createdAt desc){
        _id,
        title,
        "slug": slug.current,
        startingPrice,
        currency,
        "categoryTitle": category->title,
        "categorySlug": category->slug.current,
        "imageUrl": coverImage.asset->url,
        serviceAreas,
        "provider": provider->{
          displayName,
          "photoUrl": photo.asset->url,
          verificationStatus,
          verified,
          rating,
          completedJobsCount
        }
      }
    `)

    return NextResponse.json({ services })
  } catch (error) {
    console.error('[POPULAR_SERVICES_ERROR]', error)
    return NextResponse.json({ services: [] }, { status: 500 })
  }
}
