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

const DEFAULT_CLEANING_EXPLORE_CARDS: ExploreCardItem[] = [
  {
    title: "Home Cleaning",
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=500&q=80",
    subItems: [
      "Regular Cleaning",
      "Deep Cleaning",
      "Kitchen Cleaning",
      "Bathroom Cleaning",
      "Bedroom Cleaning",
    ],
  },
  {
    title: "Office & Commercial Cleaning",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=500&q=80",
    subItems: [
      "Office Cleaning",
      "Shop Cleaning",
      "Shared Spaces",
      "Commercial Kitchens",
    ],
  },
  {
    title: "Move-in & Move-out Cleaning",
    imageUrl: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=500&q=80",
    subItems: [
      "Move-in Cleaning",
      "Move-out Cleaning",
      "End-of-Tenancy Cleaning",
      "Empty Property Cleaning",
    ],
  },
  {
    title: "Post-construction Cleaning",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=500&q=80",
    subItems: [
      "Renovation Cleanup",
      "Dust Removal",
      "Floor Cleaning",
      "Window Cleanup",
    ],
  },
  {
    title: "Sofa & Upholstery Cleaning",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=80",
    subItems: [
      "Sofa Cleaning",
      "Upholstery Cleaning",
      "Stain Removal",
      "Fabric Protection",
      "Mattress Cleaning",
    ],
  },
  {
    title: "Carpet & Rug Cleaning",
    imageUrl: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=500&q=80",
    subItems: [
      "Carpet Cleaning",
      "Rug Cleaning",
      "Stain Treatment",
      "Odour Removal",
      "Office Carpets",
    ],
  },
  {
    title: "Window & Glass Cleaning",
    imageUrl: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=500&q=80",
    subItems: [
      "Window Cleaning",
      "Glass Cleaning",
      "High-rise Cleaning",
      "Frame Cleaning",
      "Skylight Cleaning",
    ],
  },
  {
    title: "Laundry & Ironing",
    imageUrl: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=500&q=80",
    subItems: [
      "Laundry Service",
      "Ironing Service",
      "Wash & Fold",
      "Curtain Cleaning",
      "Bedding & Linens",
    ],
  },
  {
    title: "Outdoor Cleaning",
    imageUrl: "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=500&q=80",
    subItems: [
      "Driveway Cleaning",
      "Patio & Deck Cleaning",
      "Compound Cleaning",
      "Fence Cleaning",
      "Outdoor Furniture Cleaning",
    ],
  },
  {
    title: "Specialist Cleaning",
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=500&q=80",
    subItems: [
      "Steam Cleaning",
      "Sanitisation Service",
      "Mould Removal",
      "Disinfection Cleaning",
      "After-event Cleaning",
    ],
  },
  {
    title: "Cleaning Packages",
    imageUrl: "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=500&q=80",
    subItems: [
      "Regular Cleaning Plans",
      "Deep Cleaning Packages",
      "Move-in Packages",
      "Office Cleaning Plans",
      "Custom Cleaning Plans",
    ],
  },
  {
    title: "Other Cleaning Services",
    imageUrl: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=500&q=80",
    subItems: [
      "Bin Cleaning",
      "Water Tank Cleaning",
      "Gutter Cleaning",
      "Drain Cleaning",
      "Pest Control (Cleaning)",
    ],
  },
];

export function ExploreGrid({
  categoryTitle = "Cleaning",
  categorySlug = "cleaning",
  cards,
}: ExploreGridProps) {
  const displayCards = cards && cards.length > 0 ? cards : DEFAULT_CLEANING_EXPLORE_CARDS;

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
