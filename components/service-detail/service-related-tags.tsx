"use client";

import * as React from "react";
import Link from "next/link";
import { getCategoryPreset } from "./category-presets";

export interface ServiceRelatedTagsProps {
  tags?: string[];
  categoryTitle?: string;
  categorySlug?: string;
}

export function ServiceRelatedTags({
  tags,
  categoryTitle = "Cleaning",
  categorySlug = "cleaning",
}: ServiceRelatedTagsProps) {
  const preset = getCategoryPreset(categorySlug || categoryTitle);

  const displayTags =
    tags && tags.length > 0 ? tags : preset.tags;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-grotesque font-bold text-[18px] text-[#222325]">
        Related tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {displayTags.map((tag, idx) => (
          <Link
            key={idx}
            href={`/search?q=${encodeURIComponent(tag)}`}
            className="px-3.5 py-1.5 rounded-full border border-[#E5E7EB] bg-white hover:border-[#222325] text-[13px] font-medium text-[#404145] hover:text-[#222325] transition-colors"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
}
