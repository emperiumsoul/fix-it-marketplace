"use client";

import * as React from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { getCategoryPreset } from "./category-data-presets";

export interface PopularSubcategoryItem {
  name: string;
  query: string;
  icon?: LucideIcon;
}

export interface PopularSubcategoriesProps {
  categoryTitle?: string;
  categorySlug?: string;
  items?: PopularSubcategoryItem[];
}

export function PopularSubcategories({
  categoryTitle = "Cleaning",
  categorySlug = "cleaning",
  items,
}: PopularSubcategoriesProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const preset = React.useMemo(() => getCategoryPreset(categorySlug), [categorySlug]);
  const displayItems = items && items.length > 0 ? items : preset.popularSubcategories;

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -260 : 260;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 my-8">
      {/* Header with Title and Scroll Arrows */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="font-grotesque font-bold text-[20px] sm:text-[22px] text-[#222325]">
          Most popular in {categoryTitle}
        </h2>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label="Previous items"
            className="w-8 h-8 rounded-full border border-[#DADBDD] bg-white flex items-center justify-center text-[#404145] hover:bg-[#F7F7F7] hover:border-[#62646A] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label="Next items"
            className="w-8 h-8 rounded-full border border-[#DADBDD] bg-white flex items-center justify-center text-[#404145] hover:bg-[#F7F7F7] hover:border-[#62646A] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={scrollRef}
        className="flex items-center gap-3.5 overflow-x-auto no-scrollbar pb-1"
      >
        {displayItems.map((item) => {
          const Icon = item.icon || Sparkles;
          return (
            <Link
              key={item.name}
              href={`/search?category=${categorySlug}&q=${encodeURIComponent(item.query)}`}
              className="group shrink-0 bg-white border border-[#DADBDD] hover:border-[#008744] hover:bg-[#F3FDF9] rounded-[12px] px-5 py-3.5 flex items-center gap-3 transition-all shadow-2xs cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#F7F7F7] group-hover:bg-[#E8F8F0] flex items-center justify-center text-[#404145] group-hover:text-[#008744] transition-colors">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[14px] font-medium text-[#222325] group-hover:text-[#008744] transition-colors whitespace-nowrap">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
