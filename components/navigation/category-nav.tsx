"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface CategoryNavItem {
  title: string;
  slug: string;
}

const CATEGORY_ITEMS: CategoryNavItem[] = [
  { title: "Plumbing", slug: "plumbing" },
  { title: "Cleaning", slug: "cleaning" },
  { title: "Electrical Repairs", slug: "electrical-repairs" },
  { title: "Painting", slug: "painting-decorating" },
  { title: "Moving", slug: "moving-relocation" },
  { title: "Furniture Assembly", slug: "furniture-assembly" },
  { title: "Gardening", slug: "gardening-landscaping" },
  { title: "Home Repairs", slug: "appliance-home-repairs" },
];

export function CategoryNav({ activeSlug }: { activeSlug?: string }) {
  const pathname = usePathname();

  // Determine active item from prop or pathname
  const currentSlug =
    activeSlug ||
    (pathname?.startsWith("/categories/") ? pathname.split("/")[2] : undefined);

  return (
    <nav
      aria-label="Category Navigation"
      className="w-full bg-white border-b border-[#DADBDD] overflow-x-auto no-scrollbar"
    >
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between gap-6 whitespace-nowrap text-[14px] leading-[20px] font-medium text-[#404145]">
        {CATEGORY_ITEMS.map((item) => {
          const isActive =
            currentSlug === item.slug ||
            (item.slug === "cleaning" && (currentSlug === "house-cleaning" || currentSlug === "cleaning")) ||
            (item.slug === "electrical-repairs" && currentSlug === "electrical") ||
            (item.slug === "painting-decorating" && currentSlug === "painting") ||
            (item.slug === "moving-relocation" && currentSlug === "moving") ||
            (item.slug === "gardening-landscaping" && currentSlug === "gardening") ||
            (item.slug === "appliance-home-repairs" && currentSlug === "home-repairs");

          return (
            <Link
              key={item.slug}
              href={`/categories/${item.slug}`}
              className={`py-3.5 transition-colors relative hover:text-[#008744] flex items-center ${
                isActive
                  ? "text-[#008744] font-semibold"
                  : "text-[#404145]"
              }`}
            >
              <span>{item.title}</span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#008744] rounded-t-sm" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
