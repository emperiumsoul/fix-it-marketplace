"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

export interface ExploreCardItem {
  title: string;
  imageUrl: string;
  subItems: string[];
}

export interface ExploreGridProps {
  categoryTitle?: string;
  categorySlug?: string;
  cards?: ExploreCardItem[];
}

import { getCategoryPreset } from "./category-data-presets";

export function ExploreGrid({
  categoryTitle = "Cleaning",
  categorySlug = "cleaning",
  cards,
}: ExploreGridProps) {
  const preset = React.useMemo(() => getCategoryPreset(categorySlug), [categorySlug]);
  const displayCards = cards && cards.length > 0 ? cards : preset.exploreCards;

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 my-10">
      <h2 className="font-grotesque font-bold text-[22px] sm:text-[26px] text-[#222325] mb-6">
        Explore {categoryTitle}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayCards.map((card) => (
          <div
            key={card.title}
            className="flex flex-col rounded-[12px] bg-[#F7F7F7]/60 border border-[#E5E7EB] overflow-hidden hover:border-[#DADBDD] hover:bg-white hover:shadow-sm transition-all"
          >
            {/* Card Thumbnail */}
            <div className="relative w-full aspect-[16/10] bg-[#ECECEC] overflow-hidden">
              <Image
                src={card.imageUrl}
                alt={card.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content & Sub-items */}
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-grotesque font-bold text-[15px] leading-[20px] text-[#222325] mb-2.5">
                <Link
                  href={`/search?category=${categorySlug}&q=${encodeURIComponent(card.title)}`}
                  className="hover:text-[#008744] transition-colors"
                >
                  {card.title}
                </Link>
              </h3>

              <ul className="space-y-1.5 text-[13px] text-[#62646A]">
                {card.subItems.map((sub) => (
                  <li key={sub}>
                    <Link
                      href={`/search?category=${categorySlug}&q=${encodeURIComponent(sub)}`}
                      className="hover:text-[#008744] hover:underline transition-colors block py-0.5"
                    >
                      {sub}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
