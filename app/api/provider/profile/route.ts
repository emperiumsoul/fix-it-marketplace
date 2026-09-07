import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs/server'
import { getServerClient } from '@/sanity/lib/server-client'

interface WorkExperienceInput {
  title?: string
  role?: string
  company?: string
  period?: string
  startDate?: string
  endDate?: string
  description?: string
  location?: string
}

interface EducationInput {
  degree?: string
  degreeOrCertificate?: string
  institution?: string
  year?: string
}

interface CertificationInput {
  name?: string
  title?: string
  issuer?: string
  issuingOrganization?: string
  year?: string
  issueDate?: string
}

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
      displayName,
      headline,
      primaryService,
      tradeCategory,
      startingPrice = 150,
      languages = ['English', 'Twi'],
      location = 'Accra',
      skillLevels = {},
      workExperiences = [],
      educations = [],
      certifications = [],
      photoAssetId,
    } = body

    if (!displayName || typeof displayName !== 'string') {
      return NextResponse.json(
        { error: 'Display Name is required' },
        { status: 400 }
      )
    }

    const client = getServerClient({ useWriteToken: true })

    // Build skills / expertise array from skillLevels keys or primaryService
    const expertiseList = Object.keys(skillLevels).length > 0
      ? Object.keys(skillLevels)
      : primaryService ? [primaryService] : ['General Services']

    // Generate Portable Text bio
    const bioText = headline
      ? `${headline}. Verified ${primaryService || 'service'} specialist serving ${location} and surrounding areas.`
      : `Professional service provider specializing in ${primaryService || 'home services'} across ${location}.`

    const bio = [
      {
        _type: 'block',
        _key: 'bio-block-1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'bio-span-1',
            text: bioText,
            marks: [],
          },
        ],
      },
    ]

    // Format work experience according to workExperience schema
    const formattedWorkExperience = Array.isArray(workExperiences)
      ? (workExperiences as WorkExperienceInput[]).map((w, index) => ({
          _type: 'workExperience',
          _key: `work-${index}-${Date.now()}`,
          role: w.title || w.role || 'Service Technician',
          company: w.company || 'Self-Employed / Independent',
          startDate: w.period || w.startDate || '',
          endDate: w.endDate || 'Present',
          description: w.description || '',
          location: w.location || location,
        }))
      : []

    // Format education according to education schema
    const formattedEducation = Array.isArray(educations)
      ? (educations as EducationInput[]).map((e, index) => ({
          _type: 'education',
          _key: `edu-${index}-${Date.now()}`,
          degreeOrCertificate: e.degree || e.degreeOrCertificate || 'Vocational Training',
          institution: e.institution || 'Technical Institute',
          year: e.year || '',
        }))
      : []

    // Format certifications according to certification schema
    const formattedCertifications = Array.isArray(certifications)
      ? (certifications as CertificationInput[]).map((c, index) => ({
          _type: 'certification',
          _key: `cert-${index}-${Date.now()}`,
          title: c.name || c.title || 'Certified Professional',
          issuingOrganization: c.issuer || c.issuingOrganization || 'Ghana Trade Association',
          issueDate: c.year || c.issueDate || '',
        }))
      : []

    // Check if provider profile already exists for this Clerk User ID
    const existing = await client.fetch<{ _id: string } | null>(
      `*[_type == "providerProfile" && clerkUserId == $userId][0]{ _id }`,
      { userId }
    )

    const baseSlug = slugify(displayName) || 'provider'

    const docData: Record<string, unknown> = {
      displayName,
      slug: { _type: 'slug', current: `${baseSlug}-${userId.slice(-6).toLowerCase()}` },
      clerkUserId: userId,
      headline: headline || `${primaryService || 'Professional'} Specialist`,
      expertise: expertiseList,
      bio,
      languages: Array.isArray(languages) ? languages : ['English', 'Twi'],
      serviceAreas: [location],
      workExperience: formattedWorkExperience,
      education: formattedEducation,
      certifications: formattedCertifications,
      onboardingStatus: 'verified',
      verified: true,
    }

    if (photoAssetId) {
      docData.photo = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: photoAssetId,
        },
      }
    }

    let profileId: string
    if (existing) {
      const patched = await client
        .patch(existing._id)
        .set(docData)
        .commit()
      profileId = patched._id
    } else {
      const created = await client.create({
        _type: 'providerProfile',
        ...docData,
      })
      profileId = created._id
    }

    // Ensure initial published service exists for this provider in their category
    const existingService = await client.fetch<{ _id: string } | null>(
      `*[_type == "service" && (provider._ref == $profileId || provider->clerkUserId == $userId)][0]{ _id }`,
      { profileId, userId }
    )

    if (!existingService) {
      const tradeSlugMap: Record<string, string> = {
        cleaning: 'house-cleaning',
        'house-cleaning': 'house-cleaning',
        plumbing: 'plumbing',
        electrical: 'electrical-repairs',
        'electrical-repairs': 'electrical-repairs',
        painting: 'painting-decorating',
        'painting-decorating': 'painting-decorating',
        moving: 'moving-relocation',
        'moving-relocation': 'moving-relocation',
        gardening: 'gardening-landscaping',
        'gardening-landscaping': 'gardening-landscaping',
        furniture: 'furniture-assembly',
        'furniture-assembly': 'furniture-assembly',
        assembly: 'furniture-assembly',
        repairs: 'appliance-home-repairs',
        'home-repairs': 'appliance-home-repairs',
        'appliance-home-repairs': 'appliance-home-repairs',
      }

      const tradeKey = (tradeCategory || primaryService || '').toString().toLowerCase().trim()
      const targetSlug = tradeSlugMap[tradeKey] || tradeSlugMap[tradeKey.split(' ')[0]] || 'house-cleaning'

      const category = await client.fetch<{ _id: string; title: string; slug: string; image?: unknown } | null>(
        `*[_type == "category" && (
          slug.current == $targetSlug ||
          slug.current in [$targetSlug, "house-" + $targetSlug, $targetSlug + "-repairs", $targetSlug + "-landscaping", $targetSlug + "-decorating", $targetSlug + "-relocation"] ||
          lower(title) match "*" + $tradeKey + "*"
        )][0]{ _id, title, "slug": slug.current, image }`,
        { targetSlug, tradeKey: tradeKey.slice(0, 10) }
      )

      const serviceTitle = headline
        ? `${headline} by ${displayName}`
        : `Professional ${primaryService || 'Home Services'} by ${displayName}`

      const serviceBaseSlug = slugify(serviceTitle)
      const serviceSlug = `${serviceBaseSlug}-${Date.now().toString(36)}`
      const servicePrice = Number(startingPrice) || 150

      const serviceDoc: Record<string, unknown> & { _type: 'service' } = {
        _type: 'service',
        title: serviceTitle,
        slug: { _type: 'slug', current: serviceSlug },
        summary: `${headline || primaryService || 'Professional service'} delivered across ${location} and surrounding areas in Ghana.`,
        startingPrice: servicePrice,
        currency: 'GHS',
        status: 'published',
        provider: {
          _type: 'reference',
          _ref: profileId,
        },
        serviceAreas: [location || 'Accra'],
        description: bio,
        includedTasks: expertiseList.length > 0
          ? expertiseList
          : ['Initial diagnosis and scope assessment', 'Standard equipment and safety checks', 'Service execution and cleanup'],
        packages: [
          {
            _type: 'servicePackage',
            _key: `pkg-${Date.now()}`,
            name: 'Standard Package',
            description: `Full standard appointment for ${primaryService || 'service'} in ${location}`,
            price: servicePrice,
            scope: 'Standard on-site service and routine labor',
            duration: '1 - 2 hours',
            includedTasks: expertiseList.slice(0, 3),
            exclusions: ['Specialized parts not included', 'Extensive architectural modifications'],
          },
        ],
      }

      if (category) {
        serviceDoc.category = {
          _type: 'reference',
          _ref: category._id,
        }
      }

      if (photoAssetId) {
        serviceDoc.coverImage = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: photoAssetId,
          },
        }
      } else if (category?.image) {
        serviceDoc.coverImage = category.image
      }

      await client.create(serviceDoc)

      // Revalidate category and search pages so the new service is live immediately
      try {
        if (category?.slug) {
          revalidatePath(`/categories/${category.slug}`)
        }
        if (targetSlug) {
          revalidatePath(`/categories/${targetSlug}`)
        }
        revalidatePath('/categories/[slug]', 'page')
        revalidatePath('/')
        revalidatePath('/search')
      } catch (revalErr) {
        console.warn('[REVALIDATE_CATEGORY_SERVICES_WARN]', revalErr)
      }
    }

    return NextResponse.json({ success: true, profileId })
  } catch (error) {
    console.error('[PROVIDER_PROFILE_SAVE_ERROR]', error)
    return NextResponse.json(
      { error: 'Failed to save provider profile to Sanity' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const client = getServerClient()
    const profile = await client.fetch(
      `*[_type == "providerProfile" && clerkUserId == $userId][0]{
        _id,
        displayName,
        headline,
        clerkUserId,
        expertise,
        languages,
        serviceAreas,
        onboardingStatus,
        verified,
        rating,
        completedJobsCount,
        hourlyRate,
        workExperience,
        education,
        certifications,
        "photoUrl": photo.asset->url,
        "bioText": pt::text(bio)
      }`,
      { userId }
    )

    return NextResponse.json({ success: true, profile })
  } catch (error) {
    console.error('[PROVIDER_PROFILE_GET_ERROR]', error)
    return NextResponse.json(
      { error: 'Failed to fetch provider profile' },
      { status: 500 }
    )
  }
}
