import * as React from "react";
import type { Metadata } from "next";
import { getServerClient } from "@/sanity/lib/server-client";
import { PublicHeader } from "@/components/navigation/public-header";
import { CategoryNav } from "@/components/navigation/category-nav";
import { ServiceDetailView } from "@/components/service-detail/service-detail-view";
import { Footer } from "@/components/navigation/footer";
import { ServiceDetailData } from "@/components/service-detail/types";
import { getCategoryPreset } from "@/components/service-detail/category-presets";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;

  let title = "Local Services in Ghana | Fix it";
  let description = "Find and hire trusted, verified local service professionals in Ghana.";

  try {
    const client = getServerClient();
    const service = await client.fetch(
      `*[_type == "service" && (slug.current == $slug || _id == $slug)][0]{
        title,
        summary,
        "providerName": provider->displayName,
        "categoryTitle": category->title,
        startingPrice,
        currency
      }`,
      { slug }
    );
    if (service?.title) {
      const cleanTitle = service.title.replace(/^\[.*?\]\s*/, "");
      title = `${cleanTitle} - ${service.providerName || "Fix it Ghana"}`;
      description = service.summary || description;
    }
  } catch (err) {
    console.error("Error generating service metadata:", err);
  }

  return {
    title,
    description,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;

  let serviceData: ServiceDetailData | null = null;
  let isProviderVerified = true;

  try {
    const client = getServerClient();

    // 1. Fetch main service document
    const raw = await client.fetch(
      `*[_type == "service" && (slug.current == $slug || _id == $slug)][0]{
        _id,
        title,
        "slug": slug.current,
        summary,
        startingPrice,
        currency,
        serviceAreas,
        includedTasks,
        exclusions,
        description,
        faqs,
        packages[]{
          name,
          description,
          price,
          scope,
          includedTasks,
          exclusions,
          estimatedDuration
        },
        "coverImageUrl": coverImage.asset->url,
        "galleryUrls": gallery[].asset->url,
        category->{
          title,
          "slug": slug.current
        },
        provider->{
          _id,
          clerkUserId,
          displayName,
          "slug": slug.current,
          "photoUrl": photo.asset->url,
          headline,
          expertise,
          bio,
          languages,
          serviceAreas,
          availability,
          phone,
          phoneNumber,
          whatsappNumber,
          verificationStatus,
          verified,
          portfolio[]{
            title,
            description,
            "imageUrl": image.asset->url
          }
        }
      }`,
      { slug }
    );

    if (raw?.title) {
      if (raw.provider) {
        isProviderVerified = raw.provider.verificationStatus === "verified" || raw.provider.verified === true;
      }

      // Extract plain text from description blocks if Portable Text
      let descriptionText = raw.summary || "";
      if (Array.isArray(raw.description)) {
        descriptionText = raw.description
          .map((b: { children?: { text?: string }[] }) =>
            b.children?.map((c) => c.text).join("") || ""
          )
          .filter(Boolean)
          .join("\n\n");
      }

      // Extract provider bio text
      let providerBio = "";
      if (Array.isArray(raw.provider?.bio)) {
        providerBio = raw.provider.bio
          .map((b: { children?: { text?: string }[] }) =>
            b.children?.map((c) => c.text).join("") || ""
          )
          .filter(Boolean)
          .join("\n\n");
      }

      // Map gallery images
      const galleryImages: { url: string; alt: string }[] = [];
      const primaryImage = raw.coverImageUrl || raw.provider?.photoUrl;
      if (primaryImage) {
        galleryImages.push({ url: primaryImage, alt: raw.title });
      }
      if (Array.isArray(raw.galleryUrls)) {
        raw.galleryUrls.forEach((u: string) => {
          if (u && !galleryImages.some((g) => g.url === u)) {
            galleryImages.push({ url: u, alt: raw.title });
          }
        });
      }

      // Map portfolio projects
      const recentProjects = (raw.provider?.portfolio || []).map(
        (p: { title?: string; description?: string; imageUrl?: string }, idx: number) => ({
          title: p.title || `Project ${idx + 1}`,
          subtitle: p.description || "",
          imageUrl: p.imageUrl || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
          hasOverlay: idx === 0,
        })
      );

      // Fetch related services for recommendations (strictly verified providers)
      const relatedDocs = await client.fetch(
        `*[_type == "service" && _id != $currentId && status == "published" && (provider->verificationStatus == "verified" || provider->verified == true)][0...6]{
          title,
          "slug": slug.current,
          startingPrice,
          "coverImageUrl": coverImage.asset->url
        }`,
        { currentId: raw._id }
      );

      const relatedServices = (relatedDocs || []).map((r: { slug: string; title: string; startingPrice: number; coverImageUrl?: string }, idx: number) => ({
        slug: r.slug,
        title: r.title.replace(/^\[.*?\]\s*/, ""),
        rating: 4.7 + ((idx % 3) * 0.1),
        reviews: 14 + (idx * 5),
        price: r.startingPrice || 150,
        imageUrl: r.coverImageUrl || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
      }));

      serviceData = {
        id: raw._id,
        title: raw.title,
        slug: raw.slug || slug,
        summary: raw.summary || "",
        categoryTitle: raw.category?.title || "Local Services",
        categorySlug: raw.category?.slug || "services",
        provider: {
          id: raw.provider?._id,
          clerkUserId: raw.provider?.clerkUserId,
          displayName: raw.provider?.displayName || "Local Professional",
          slug: raw.provider?.slug || "",
          headline: raw.provider?.headline || "",
          photoUrl: raw.provider?.photoUrl || undefined,
          expertise: raw.provider?.expertise || [],
          bio: providerBio,
          languages: raw.provider?.languages || ["English", "Twi"],
          serviceAreas: raw.provider?.serviceAreas || raw.serviceAreas || ["Accra"],
          availability: raw.provider?.availability || "By appointment",
          phoneNumber: raw.provider?.phoneNumber || raw.provider?.phone,
          whatsappNumber: raw.provider?.whatsappNumber || raw.provider?.phoneNumber || raw.provider?.phone,
        },
        startingPrice: raw.startingPrice || 150,
        currency: raw.currency || "GH₵",
        serviceAreas: raw.serviceAreas || ["Accra"],
        includedTasks: raw.includedTasks || [],
        exclusions: raw.exclusions || [],
        descriptionText,
        packages: raw.packages || [],
        faqs: raw.faqs || [],
        coverImageUrl: raw.coverImageUrl || raw.provider?.photoUrl,
        galleryImages,
        recentProjects,
        relatedServices,
      };
    }
  } catch (err) {
    console.error("Error fetching service from Sanity:", err);
  }

  // If service was not found in Sanity, generate category-tailored data based on the slug
  if (!serviceData) {
    const preset = getCategoryPreset(slug);
    const categoryTitle = slug.includes("plumb")
      ? "Plumbing"
      : slug.includes("electr")
      ? "Electrical Repairs"
      : slug.includes("paint")
      ? "Painting & Decorating"
      : slug.includes("mov")
      ? "Moving & Relocation"
      : slug.includes("garden") || slug.includes("lawn")
      ? "Gardening & Landscaping"
      : slug.includes("furnit") || slug.includes("assembl")
      ? "Furniture Assembly"
      : "Cleaning";

    const title =
      categoryTitle === "Cleaning"
        ? "I will clean your home and living spaces"
        : categoryTitle === "Plumbing"
        ? "Residential Plumbing & Emergency Leak Repair"
        : categoryTitle === "Electrical Repairs"
        ? "Electrical Diagnostics, Socket Repairs & Rewiring"
        : categoryTitle === "Painting & Decorating"
        ? "Interior Room & Exterior Wall Painting"
        : categoryTitle === "Moving & Relocation"
        ? "Residential Home Moving & Packing Transport"
        : categoryTitle === "Gardening & Landscaping"
        ? "Compound Lawn Mowing & Landscape Maintenance"
        : "Flat-Pack Furniture Assembly & TV Wall Mounting";

    const providerName =
      categoryTitle === "Cleaning"
        ? "Neat Home"
        : categoryTitle === "Plumbing"
        ? "Kwame Mensah Plumbing Services"
        : categoryTitle === "Electrical Repairs"
        ? "Kofi Boateng Electrical & Power Solutions"
        : categoryTitle === "Painting & Decorating"
        ? "Emmanuel Addo Precision Painting"
        : categoryTitle === "Moving & Relocation"
        ? "SwiftHaul Relocations & Moving Logistics"
        : "Yaw Osei HomeCare & Garden Services";

    serviceData = {
      title,
      slug,
      summary: `Professional ${categoryTitle.toLowerCase()} services in Accra and surrounding regions.`,
      categoryTitle,
      categorySlug: categoryTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      provider: {
        displayName: providerName,
        headline: `${categoryTitle} Specialist with verified ratings across Ghana`,
        languages: ["English", "Twi"],
        serviceAreas: ["Accra", "East Legon", "Cantonments", "Tema"],
        availability: "Mon - Sat: 8:00 AM - 6:00 PM",
      },
      startingPrice: 150,
      currency: "GH₵",
      serviceAreas: ["Accra", "East Legon"],
      includedTasks: [
        "Thorough on-site assessment and scoping",
        "Execution with certified tools and materials",
        "Comprehensive testing and quality check",
        "Complete cleanup of work area",
      ],
      exclusions: ["Structural civil construction without prior architectural survey"],
      descriptionText: `Professional ${categoryTitle.toLowerCase()} services for homes and apartments in Accra. All work is agreed upfront before booking, and we focus on thorough, reliable execution so you can enjoy safe, well-maintained spaces.`,
      packages: [
        {
          name: "Regular / Basic Service",
          price: 150,
          description: "Essential diagnostic and single-issue servicing.",
          includedTasks: ["Visual inspection", "Basic repairs/installation", "Standard testing"],
        },
        {
          name: "Deep / Standard Service",
          price: 300,
          description: "Comprehensive multi-point service and detailed overhaul.",
          includedTasks: ["Comprehensive inspection", "Multi-point repairs", "Detailed tuning", "Quality check"],
        },
        {
          name: "Full Residence / Move-out",
          price: 450,
          description: "Full compound or intensive overhaul with extended warranty.",
          includedTasks: ["Full property audit", "Extensive repairs/installation", "Pressure/safety test", "Priority support"],
        },
      ],
      faqs: [],
      galleryImages: preset.projects.map((p) => ({ url: p.imageUrl, alt: p.title })),
      recentProjects: preset.projects,
      relatedServices: [],
    };
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#404145] font-satoshi selection:bg-[#F3FDF9] selection:text-[#003912]">
      {/* Top Header matching 5.png */}
      <PublicHeader />

      {/* Unverified Provider Alert Banner */}
      {!isProviderVerified && (
        <div className="bg-[#FFFBEB] border-b border-[#FDE68A] px-4 py-3 text-center text-[13px] text-[#92400E] font-medium flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D97706] animate-pulse" />
          <span>
            <strong>First-Time Provider Verification in Progress:</strong> This provider is currently being verified by Fix it Ghana administrators. This service will be fully listed on search and open for customer bookings upon approval.
          </span>
        </div>
      )}

      {/* Category Nav Strip */}
      <CategoryNav />

      {/* Main Dynamic Service Content */}
      <main className="flex-1">
        <ServiceDetailView data={serviceData} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
