import * as React from "react";
import type { Metadata } from "next";
import { getServerClient } from "@/sanity/lib/server-client";
import { urlFor } from "@/sanity/lib/image";
import { PublicHeader } from "@/components/navigation/public-header";
import { CategoryNav } from "@/components/navigation/category-nav";
import { CategoryHero } from "@/components/category/category-hero";
import { CategoryServicesList } from "@/components/category/category-services-list";
import { PopularSubcategories } from "@/components/category/popular-subcategories";
import { BigProjectCard } from "@/components/category/big-project-card";
import { ExploreGrid } from "@/components/category/explore-grid";
import { CategoryGuides } from "@/components/category/category-guides";
import { CategoryFAQs } from "@/components/category/category-faqs";
import { CategoryTags } from "@/components/category/category-tags";
import { HelpOptions } from "@/components/category/help-options";
import { Footer } from "@/components/navigation/footer";
import { getCategoryPreset } from "@/components/category/category-data-presets";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CATEGORY_SLUG_MAP: Record<string, string> = {
  cleaning: "house-cleaning",
  electrical: "electrical-repairs",
  painting: "painting-decorating",
  moving: "moving-relocation",
  gardening: "gardening-landscaping",
  "home-repairs": "appliance-home-repairs",
};

const CATEGORY_KEYWORD_MAP: Record<string, string> = {
  cleaning: "clean*",
  "house-cleaning": "clean*",
  plumbing: "plumb*",
  electrical: "electr*",
  "electrical-repairs": "electr*",
  painting: "paint*",
  "painting-decorating": "paint*",
  moving: "mov*",
  "moving-relocation": "mov*",
  gardening: "garden*",
  "gardening-landscaping": "garden*",
  "furniture-assembly": "assembl*",
  assembly: "assembl*",
  "home-repairs": "repair*",
  "appliance-home-repairs": "repair*",
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const mappedSlug = CATEGORY_SLUG_MAP[slug] || slug;
  const preset = getCategoryPreset(slug);

  let title = `${preset.title} Services in Ghana | Fix it`;
  let description = preset.heroSubtitle;

  try {
    const client = getServerClient();
    const category = await client.fetch<{ title?: string; description?: string } | null>(
      `*[_type == "category" && (slug.current == $slug || slug.current == $mappedSlug)][0]{ title, description }`,
      { slug, mappedSlug }
    );
    if (category?.title) {
      title = `${category.title} Services in Ghana | Fix it`;
      description = category.description || description;
    }
  } catch (e) {
    console.error("Error fetching category metadata:", e);
  }

  return {
    title,
    description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const mappedSlug = CATEGORY_SLUG_MAP[slug] || slug;
  const preset = getCategoryPreset(slug);

  const client = getServerClient();

  // 1. Query category document from Sanity
  interface CategoryDoc {
    _id: string;
    title: string;
    slug: string;
    description?: string;
    image?: unknown;
    iconName?: string;
    subcategories?: string[];
  }

  const category = await client.fetch<CategoryDoc | null>(
    `*[_type == "category" && (
      slug.current == $slug || 
      slug.current == $mappedSlug ||
      slug.current == "house-" + $slug ||
      slug.current == $slug + "-landscaping" ||
      slug.current == $slug + "-decorating" ||
      slug.current == $slug + "-relocation" ||
      slug.current == $slug + "-repairs"
    )][0]{
      _id,
      title,
      "slug": slug.current,
      description,
      image,
      iconName,
      subcategories
    }`,
    { slug, mappedSlug }
  );

  const categoryTitle = category?.title || preset.title;
  const categoryDescription = category?.description || preset.heroSubtitle;
  const categoryId = category?._id || "";

  let heroImageUrl: string | undefined = undefined;
  if (category?.image) {
    try {
      heroImageUrl = urlFor(category.image as Parameters<typeof urlFor>[0]).width(720).height(540).quality(85).url();
    } catch {
      // Fall back to default
    }
  }

  // 2. Query real published services in this category
  interface ServiceQueryDoc {
    _id: string;
    title: string;
    slug: string;
    startingPrice: number;
    currency?: string;
    summary?: string;
    coverImageUrl?: string;
    serviceAreas?: string[];
    categoryTitle?: string;
    provider?: {
      displayName?: string;
      slug?: string;
      photoUrl?: string;
      verificationStatus?: string;
      verified?: boolean;
      rating?: number;
      completedJobsCount?: number;
    } | null;
  }

  const tradeKeyword = CATEGORY_KEYWORD_MAP[slug] || CATEGORY_KEYWORD_MAP[mappedSlug] || "";

  const services = await client.fetch<ServiceQueryDoc[]>(
    `*[_type == "service" && (
      category->slug.current in [$slug, $mappedSlug, "house-" + $slug, $slug + "-repairs", $slug + "-landscaping", $slug + "-decorating", $slug + "-relocation"] ||
      category._ref == $categoryId ||
      lower(category->title) match $catLower ||
      lower(category->slug.current) match $catLower ||
      ($tradeKeyword != "" && (
        lower(title) match $tradeKeyword ||
        lower(summary) match $tradeKeyword
      ))
    ) && status == "published"] | order(_createdAt desc){
      _id,
      title,
      "slug": slug.current,
      startingPrice,
      currency,
      summary,
      "coverImageUrl": coverImage.asset->url,
      serviceAreas,
      "categoryTitle": category->title,
      "provider": provider->{
        displayName,
        "slug": slug.current,
        "photoUrl": photo.asset->url,
        verificationStatus,
        verified,
        rating,
        completedJobsCount
      }
    }`,
    {
      slug,
      mappedSlug,
      categoryId,
      catLower: categoryTitle.toLowerCase(),
      tradeKeyword,
    }
  );

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#404145] font-satoshi selection:bg-[#F3FDF9] selection:text-[#003912]">
      {/* Top Navigation */}
      <PublicHeader />

      {/* Category Sub-Navigation Strip */}
      <CategoryNav activeSlug={slug} />

      {/* Main Category Flow */}
      <main className="flex-1 flex flex-col">
        {/* Dark green hero banner with booking search widget */}
        <CategoryHero
          categoryTitle={categoryTitle}
          categorySlug={slug}
          subtitle={categoryDescription}
          heroImageUrl={heroImageUrl}
        />

        {/* Real Published Services Grid for this Category */}
        <CategoryServicesList
          categoryTitle={categoryTitle}
          categorySlug={slug}
          services={services || []}
        />

        {/* Most popular subcategories in this Category */}
        <PopularSubcategories
          categoryTitle={categoryTitle}
          categorySlug={slug}
        />

        {/* Big project assistance banner */}
        <BigProjectCard
          categoryTitle={categoryTitle}
          categorySlug={slug}
        />

        {/* Explore [Category] rich grid with trade-specific sub-items */}
        <ExploreGrid
          categoryTitle={categoryTitle}
          categorySlug={slug}
        />

        {/* Guides related to [Category] */}
        <CategoryGuides
          categoryTitle={categoryTitle}
        />

        {/* Trade-specific FAQs accordion */}
        <CategoryFAQs
          categoryTitle={categoryTitle}
          categorySlug={slug}
        />

        {/* Trade-specific Tag Cloud */}
        <CategoryTags
          categoryTitle={categoryTitle}
          categorySlug={slug}
        />

        {/* Find local help — your way */}
        <HelpOptions
          categoryTitle={categoryTitle}
          categorySlug={slug}
        />
      </main>

      {/* Standard Footer */}
      <Footer />
    </div>
  );
}
