"use client";

import * as React from "react";
import Link from "next/link";

export interface CategoryTagsProps {
  categoryTitle?: string;
  categorySlug?: string;
  tags?: string[];
}

const DEFAULT_CLEANING_TAGS: string[] = [
  "House Cleaning",
  "Deep Cleaning",
  "Sofa Cleaning",
  "Carpet Cleaning",
  "Window Cleaning",
  "Office Cleaning",
  "Move-out Cleaning",
  "Post-construction",
  "Laundry & Ironing",
  "Kitchen Cleaning",
  "Bathroom Cleaning",
  "Disinfection",
  "Mould Removal",
  "Driveway Cleaning",
  "Water Tank Cleaning",
  "Gutter Cleaning",
  "Regular Cleaning",
  "One-off Cleaning",
  "End-of-Tenancy",
  "After-event Cleaning",
  "Sanitisation",
  "Rug Cleaning",
  "Mattress Cleaning",
  "Bin Cleaning",
];

export function CategoryTags({
  categoryTitle = "Cleaning",
  categorySlug = "cleaning",
  tags,
}: CategoryTagsProps) {
  const displayTags = tags && tags.length > 0 ? tags : DEFAULT_CLEANING_TAGS;

  return (
    <section className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 my-16 text-center">
      <h2 className="font-grotesque font-bold text-[22px] sm:text-[26px] text-[#222325] mb-8">
        You might be interested in {categoryTitle}
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
        {displayTags.map((tag) => (
          <Link
            key={tag}
            href={`/search?category=${categorySlug}&q=${encodeURIComponent(tag)}`}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-[#E5E7EB] text-[13px] sm:text-[14px] font-medium text-[#404145] hover:text-[#008744] hover:border-[#008744] hover:bg-[#F3FDF9] transition-all shadow-2xs"
          >
            {tag}
          </Link>
        ))}
      </div>
    </section>
  );
}
