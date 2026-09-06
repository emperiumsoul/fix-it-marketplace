import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Search as SearchIcon, RotateCcw } from "lucide-react";
import { getServerClient } from "@/sanity/lib/server-client";
import { urlFor } from "@/sanity/lib/image";
import { PublicHeader } from "@/components/navigation/public-header";
import { CategoryNav } from "@/components/navigation/category-nav";
import { SearchFilters, type CategoryOption } from "@/components/search/search-filters";
import { SearchSort } from "@/components/search/search-sort";
import { ServiceCard } from "@/components/cards/service-card";
import { Footer } from "@/components/navigation/footer";

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const category = typeof sp.category === "string" ? sp.category.trim() : "";
  const location = typeof sp.location === "string" ? sp.location.trim() : "";

  let title = "Search Local Services in Ghana | Fix it";
  if (q) {
    title = `"${q}" Services in Ghana | Fix it`;
  } else if (category) {
    title = `${category.replace(/-/g, " ")} in Ghana | Fix it`;
  }

  return {
    title,
    description: `Discover verified local tradespeople, cleaners, electricians, and plumbers in ${
      location || "Ghana"
    }. Compare quotes and book online.`,
  };
}

const CATEGORY_SLUG_MAP: Record<string, string> = {
  cleaning: "house-cleaning",
  electrical: "electrical-repairs",
  painting: "painting-decorating",
  moving: "moving-relocation",
  gardening: "gardening-landscaping",
  "home-repairs": "appliance-home-repairs",
};

interface RawService {
  _id: string;
  title: string;
  slug: string;
  summary?: string;
  startingPrice: number;
  currency?: string;
  serviceAreas?: string[];
  coverImage?: Parameters<typeof urlFor>[0];
  categoryTitle?: string;
  categorySlug?: string;
  provider?: {
    displayName?: string;
    slug?: string;
    verificationStatus?: string;
    photo?: Parameters<typeof urlFor>[0];
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const category = typeof sp.category === "string" ? sp.category.trim() : "";
  const location = typeof sp.location === "string" ? sp.location.trim() : "";
  const minPriceStr = typeof sp.minPrice === "string" ? sp.minPrice : "";
  const maxPriceStr = typeof sp.maxPrice === "string" ? sp.maxPrice : "";
  const sort = typeof sp.sort === "string" ? sp.sort.trim() : "relevance";

  const minPrice = minPriceStr ? parseFloat(minPriceStr) : undefined;
  const maxPrice = maxPriceStr ? parseFloat(maxPriceStr) : undefined;

  const client = getServerClient();

  // 1. Fetch all categories for sidebar filter
  let categories: CategoryOption[] = [];
  try {
    categories = await client.fetch<CategoryOption[]>(
      `*[_type == "category"] | order(title asc){ title, "slug": slug.current }`
    );
  } catch (err) {
    console.error("Error fetching categories:", err);
  }

  // 2. Construct GROQ Query for services
  const queryParams: Record<string, string | number> = {};
  const filterConditions: string[] = ['_type == "service"', "defined(slug.current)"];

  // Category filter
  if (category) {
    const mappedCat = CATEGORY_SLUG_MAP[category] || category;
    queryParams.category = category;
    queryParams.mappedCat = mappedCat;
    filterConditions.push(
      "(category->slug.current == $category || category->slug.current == $mappedCat)"
    );
  }

  // Location filter
  if (location) {
    queryParams.location = location;
    filterConditions.push("$location in serviceAreas");
  }

  // Price range filters
  if (minPrice !== undefined && !isNaN(minPrice)) {
    queryParams.minPrice = minPrice;
    filterConditions.push("startingPrice >= $minPrice");
  }
  if (maxPrice !== undefined && !isNaN(maxPrice)) {
    queryParams.maxPrice = maxPrice;
    filterConditions.push("startingPrice <= $maxPrice");
  }

  // Free-text / Token-based search
  if (q) {
    const tokens = q
      .toLowerCase()
      .split(/\s+/)
      .filter((t) => t.length > 0);

    const tokenOrConditions: string[] = [];
    tokens.forEach((token, idx) => {
      const key = `token_${idx}`;
      queryParams[key] = `*${token}*`;
      tokenOrConditions.push(
        `(title match $${key} || summary match $${key} || category->title match $${key} || provider->displayName match $${key} || provider->expertise match $${key} || count((includedTasks[])[@ match $${key}]) > 0)`
      );
    });

    if (tokenOrConditions.length > 0) {
      filterConditions.push(`(${tokenOrConditions.join(" || ")})`);
    }
  }

  // Sorting
  let orderClause = "order(_createdAt desc)";
  if (sort === "price_asc") {
    orderClause = "order(startingPrice asc)";
  } else if (sort === "price_desc") {
    orderClause = "order(startingPrice desc)";
  }

  const groq = `*[${filterConditions.join(" && ")}] | ${orderClause} {
    _id,
    title,
    "slug": slug.current,
    summary,
    startingPrice,
    currency,
    serviceAreas,
    coverImage,
    "categoryTitle": category->title,
    "categorySlug": category->slug.current,
    "provider": provider->{
      displayName,
      "slug": slug.current,
      verificationStatus,
      photo
    }
  }`;

  let services: RawService[] = [];
  try {
    services = await client.fetch<RawService[]>(groq, queryParams);
  } catch (err) {
    console.error("Error searching services:", err);
  }

  // Determine Title Heading
  let pageHeading = "All Services";
  if (q) {
    pageHeading = `Results for "${q}"`;
  } else if (category) {
    const foundCat = categories.find(
      (c) => c.slug === category || (category === "cleaning" && c.slug === "house-cleaning")
    );
    pageHeading = foundCat ? foundCat.title : category.replace(/-/g, " ");
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#404145] font-satoshi selection:bg-[#F3FDF9] selection:text-[#003912]">
      {/* Top Header with search bar initialized to current query */}
      <PublicHeader initialQuery={q} />

      {/* Category Nav Bar */}
      <CategoryNav activeSlug={category} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 py-8">
        {/* Results Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#E5E7EB] mb-8">
          <div>
            <h1 className="font-grotesque font-bold text-[24px] sm:text-[30px] text-[#222325] capitalize">
              {pageHeading}
            </h1>
            <p className="text-[14px] text-[#62646A] mt-1">
              Found {services.length} {services.length === 1 ? "service" : "services"}
              {location ? ` in ${location}` : " across Ghana"}
            </p>
          </div>

          {/* Sort Control */}
          <div className="shrink-0">
            <SearchSort currentSort={sort} />
          </div>
        </div>

        {/* Results Layout: Left Filters + Right Service Cards */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Filter Sidebar */}
          <SearchFilters
            categories={categories}
            currentCategory={category}
            currentLocation={location}
            currentMinPrice={minPriceStr}
            currentMaxPrice={maxPriceStr}
          />

          {/* Service Cards Grid or Empty State */}
          <div className="flex-1 w-full">
            {services.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => {
                  let imageUrl =
                    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80";
                  if (service.coverImage) {
                    try {
                      imageUrl = urlFor(service.coverImage)
                        .width(600)
                        .height(450)
                        .quality(80)
                        .url();
                    } catch {
                      // Fall back to default
                    }
                  }

                  const loc = service.serviceAreas?.[0] || "Accra";

                  return (
                    <ServiceCard
                      key={service._id}
                      id={service._id}
                      slug={service.slug}
                      title={service.title}
                      category={service.categoryTitle}
                      providerName={service.provider?.displayName}
                      price={service.startingPrice}
                      currency={service.currency === "GHS" ? "GH₵" : service.currency || "GH₵"}
                      location={loc}
                      imageUrl={imageUrl}
                      isSample={true}
                    />
                  );
                })}
              </div>
            ) : (
              /* Grounded Empty State */
              <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-[#F9FAFB] rounded-[16px] border border-[#E5E7EB]">
                <div className="w-14 h-14 rounded-full bg-white border border-[#DADBDD] flex items-center justify-center text-[#74767E] mb-4 shadow-2xs">
                  <SearchIcon className="w-6 h-6 stroke-[1.75]" />
                </div>
                <h3 className="font-grotesque font-bold text-[18px] text-[#222325] mb-2">
                  No services found
                </h3>
                <p className="text-[14px] text-[#62646A] max-w-md mb-6">
                  We couldn&apos;t find any active services matching your search criteria. Try adjusting your
                  keywords, widening your location, or resetting the filters.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/search"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] bg-[#222325] hover:bg-black text-white text-[14px] font-medium transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset all filters</span>
                  </Link>
                  <Link
                    href="/categories/cleaning"
                    className="inline-flex items-center px-4 py-2 rounded-[8px] border border-[#DADBDD] bg-white hover:bg-[#F7F7F7] text-[14px] font-medium text-[#222325] transition-colors"
                  >
                    Explore Cleaning
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
