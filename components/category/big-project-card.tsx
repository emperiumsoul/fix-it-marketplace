"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

export interface BigProjectCardProps {
  categoryTitle?: string;
  categorySlug?: string;
}

const PREVIEWS = [
  {
    title: "Home cleaning",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
  {
    title: "Office cleaning",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
  },
  {
    title: "Deep cleaning",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
  },
];

export function BigProjectCard({
  categoryTitle = "cleaning",
  categorySlug = "cleaning",
}: BigProjectCardProps) {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 my-8">
      <div className="w-full rounded-[16px] bg-gradient-to-r from-[#F0FDF4] via-[#F7FEE7] to-[#ECFDF5] border border-[#DCFCE7] p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left: Proposition and Bullets */}
        <div className="flex-1 flex flex-col items-start gap-4">
          <div>
            <h2 className="font-grotesque font-bold text-[24px] sm:text-[28px] text-[#222325] leading-tight">
              Big {categoryTitle.toLowerCase()} project?{" "}
              <span className="text-[#008744]">We&apos;ll handle it</span>
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#62646A] mt-1">
              Find local professionals for your home, office or larger {categoryTitle.toLowerCase()} project.
            </p>
          </div>

          <ul className="space-y-2.5 my-1 text-[14px] text-[#222325]">
            <li className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#E8F8F0] text-[#008744] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
              <span>Choose the {categoryTitle.toLowerCase()} help you need</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#E8F8F0] text-[#008744] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
              <span>Discuss your space and schedule</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#E8F8F0] text-[#008744] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
              <span>Coordinate your project in one place</span>
            </li>
          </ul>

          <Link
            href={`/search?category=${categorySlug}&discuss=true`}
            className="inline-flex items-center justify-center bg-[#0B3B24] hover:bg-[#062617] text-white font-semibold text-[14px] px-6 py-3 rounded-[8px] transition-colors mt-2"
          >
            Discuss your project
          </Link>
        </div>

        {/* Right: 3 White Preview Cards */}
        <div className="shrink-0 flex flex-col items-center gap-2">
          <div className="flex items-center gap-3 sm:gap-4">
            {PREVIEWS.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-[14px] p-3.5 sm:p-4 shadow-xs border border-[#E5E7EB] flex flex-col items-center gap-2.5 w-[100px] sm:w-[115px] hover:shadow-md transition-shadow"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#1DBF73]/30">
                  <Image
                    src={card.avatar}
                    alt={card.title}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <span className="text-[12px] font-medium text-[#222325] text-center leading-[16px]">
                  {card.title}
                </span>
              </div>
            ))}
          </div>
          <span className="text-[12px] text-[#74767E] text-center mt-1">
            Professional profile previews
          </span>
        </div>
      </div>
    </section>
  );
}
