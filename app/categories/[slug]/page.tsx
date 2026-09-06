import * as React from "react";
import type { Metadata } from "next";
import { getServerClient } from "@/sanity/lib/server-client";
import { urlFor } from "@/sanity/lib/image";
import { PublicHeader } from "@/components/navigation/public-header";
import { CategoryNav } from "@/components/navigation/category-nav";
import { CategoryHero } from "@/components/category/category-hero";
import { PopularSubcategories } from "@/components/category/popular-subcategories";
import { BigProjectCard } from "@/components/category/big-project-card";
import { ExploreGrid } from "@/components/category/explore-grid";
import { CategoryGuides } from "@/components/category/category-guides";
import { CategoryFAQs } from "@/components/category/category-faqs";
import { CategoryTags } from "@/components/category/category-tags";
import { HelpOptions } from "@/components/category/help-options";
import { Footer } from "@/components/navigation/footer";

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

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const mappedSlug = CATEGORY_SLUG_MAP[slug] || slug;

  let title = "Local Services in Ghana | Fix it";
  let description = "Find and hire verified local service professionals in Ghana.";

  try {
    const client = getServerClient();
    const category = await client.fetch(
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

  const client = getServerClient();

  // Query category document from Sanity
  const category = await client.fetch(
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

  // Fallback defaults if category document not yet in database
  const isCleaning =
    slug === "cleaning" ||
    slug === "house-cleaning" ||
    category?.slug === "house-cleaning";

  const categoryTitle = category?.title || (isCleaning ? "Cleaning" : slug.replace(/-/g, " "));
  const categoryDescription =
    category?.description ||
    (isCleaning
      ? "A cleaner space, without the hassle."
      : `Find verified local ${categoryTitle.toLowerCase()} professionals across Ghana.`);

  let heroImageUrl: string | undefined = undefined;
  if (category?.image) {
    try {
      heroImageUrl = urlFor(category.image).width(720).height(540).quality(85).url();
    } catch {
      // Fall back to default
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#404145] font-satoshi selection:bg-[#F3FDF9] selection:text-[#003912]">
      {/* Top Navigation */}
      <PublicHeader />

      {/* Category Sub-Navigation Strip */}
      <CategoryNav activeSlug={slug} />

      {/* Main Category Flow matching 4.png desktop reference */}
      <main className="flex-1 flex flex-col">
        {/* Dark green hero banner with booking search widget */}
        <CategoryHero
          categoryTitle={isCleaning ? "Cleaning" : categoryTitle}
          categorySlug={slug}
          subtitle={categoryDescription}
          heroImageUrl={heroImageUrl}
        />

        {/* Most popular in [Category] pills */}
        <PopularSubcategories
          categoryTitle={isCleaning ? "Cleaning" : categoryTitle}
          categorySlug={slug}
        />

        {/* Big project? We'll handle it promo card with provider previews */}
        <BigProjectCard
          categoryTitle={isCleaning ? "cleaning" : categoryTitle}
          categorySlug={slug}
        />

        {/* Explore [Category] 12-item rich grid */}
        <ExploreGrid
          categoryTitle={isCleaning ? "Cleaning" : categoryTitle}
          categorySlug={slug}
        />

        {/* Guides related to [Category] */}
        <CategoryGuides
          categoryTitle={isCleaning ? "Cleaning" : categoryTitle}
        />

        {/* [Category] FAQs accordion */}
        <CategoryFAQs
          categoryTitle={isCleaning ? "Cleaning" : categoryTitle}
        />

        {/* Tag Cloud: You might be interested in [Category] */}
        <CategoryTags
          categoryTitle={isCleaning ? "Cleaning" : categoryTitle}
          categorySlug={slug}
        />

        {/* Find local help — your way */}
        <HelpOptions
          categoryTitle={isCleaning ? "Cleaning" : categoryTitle}
          categorySlug={slug}
        />
      </main>

      {/* Standard Footer */}
      <Footer />
    </div>
  );
}
