"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

export interface CategoryGuidesProps {
  categoryTitle?: string;
}

export function CategoryGuides({ categoryTitle = "Cleaning" }: CategoryGuidesProps) {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 my-12">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="font-grotesque font-bold text-[22px] sm:text-[24px] text-[#222325]">
          Guides related to {categoryTitle}
        </h2>
        <Link
          href="#guides"
          className="text-[14px] font-semibold text-[#008744] hover:underline"
        >
          See more guides
        </Link>
      </div>

      {/* 3 Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Guide 1: Budget Guide */}
        <div className="group flex flex-col cursor-pointer">
          <div className="relative w-full aspect-[16/10] rounded-[16px] bg-gradient-to-br from-[#FCE7F3] via-[#FDF2F8] to-[#EDE9FE] overflow-hidden p-6 flex items-center justify-center border border-[#F3E8FF]">
            {/* Background art */}
            <div className="absolute inset-0 opacity-40 mix-blend-multiply">
              <Image
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80"
                alt="Cleaning cost estimate"
                fill
                sizes="380px"
                className="object-cover"
              />
            </div>
            {/* Floating Cost Estimate Card */}
            <div className="relative z-10 w-[200px] bg-white/95 rounded-[12px] p-3.5 shadow-md border border-[#E5E7EB] backdrop-blur-xs flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold text-[#74767E] uppercase tracking-wider">
                Cleaning cost estimate
              </span>
              <div className="flex items-center gap-1.5 text-[12px] text-[#222325] bg-[#F7F7F7] px-2 py-1 rounded">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span>Home cleaning</span>
              </div>
              <span className="font-grotesque font-bold text-[15px] text-[#003912] mt-0.5">
                GHS 250 - 400
              </span>
            </div>
          </div>
          <h3 className="font-grotesque font-bold text-[16px] text-[#222325] mt-3 group-hover:text-[#008744] transition-colors">
            How to plan your cleaning budget
          </h3>
        </div>

        {/* Guide 2: Choosing Service */}
        <div className="group flex flex-col cursor-pointer">
          <div className="relative w-full aspect-[16/10] rounded-[16px] bg-gradient-to-br from-[#ECFDF5] via-[#F0FDF4] to-[#E0F2FE] overflow-hidden p-6 flex items-center justify-center border border-[#DCFCE7]">
            {/* Background art */}
            <div className="absolute inset-0 opacity-40 mix-blend-multiply">
              <Image
                src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80"
                alt="Cleaning checklist"
                fill
                sizes="380px"
                className="object-cover"
              />
            </div>
            {/* Floating Checklist Card */}
            <div className="relative z-10 w-[190px] bg-white/95 rounded-[12px] p-3.5 shadow-md border border-[#E5E7EB] backdrop-blur-xs flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold text-[#74767E] uppercase tracking-wider">
                Cleaning checklist
              </span>
              <div className="space-y-1 text-[12px] text-[#222325]">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-[#10B981]" />
                  <span>Kitchens</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-[#10B981]" />
                  <span>Bathrooms</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-[#10B981]" />
                  <span>Living areas</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-[#10B981]" />
                  <span>Bedrooms</span>
                </div>
              </div>
            </div>
          </div>
          <h3 className="font-grotesque font-bold text-[16px] text-[#222325] mt-3 group-hover:text-[#008744] transition-colors">
            Choosing the right cleaning service
          </h3>
        </div>

        {/* Guide 3: Preparation Tips */}
        <div className="group flex flex-col cursor-pointer">
          <div className="relative w-full aspect-[16/10] rounded-[16px] bg-gradient-to-br from-[#FEF3C7] via-[#FFFBEB] to-[#FEF9C3] overflow-hidden p-6 flex items-center justify-center border border-[#FDE68A]">
            {/* Background art */}
            <div className="absolute inset-0 opacity-40 mix-blend-multiply">
              <Image
                src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80"
                alt="Preparing your home"
                fill
                sizes="380px"
                className="object-cover"
              />
            </div>
            {/* Floating Prep Card */}
            <div className="relative z-10 w-[190px] bg-white/95 rounded-[12px] p-3.5 shadow-md border border-[#E5E7EB] backdrop-blur-xs flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold text-[#74767E] uppercase tracking-wider">
                A cleaner home
              </span>
              <div className="space-y-1 text-[12px] text-[#222325]">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-[#10B981]" />
                  <span>Declutter</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-[#10B981]" />
                  <span>Deep clean</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-[#10B981]" />
                  <span>Set a schedule</span>
                </div>
              </div>
            </div>
          </div>
          <h3 className="font-grotesque font-bold text-[16px] text-[#222325] mt-3 group-hover:text-[#008744] transition-colors">
            Preparing your home for a cleaner
          </h3>
        </div>
      </div>
    </section>
  );
}
