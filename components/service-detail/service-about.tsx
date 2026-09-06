"use client";

import * as React from "react";
import { Check, MapPin, Home, Calendar, Star } from "lucide-react";

export interface ServiceAboutProps {
  location?: string;
}

export function ServiceAbout({ location = "Accra" }: ServiceAboutProps) {
  return (
    <div className="flex flex-col gap-8 pt-6">
      {/* What customers are saying spotlight card matching 5.png */}
      <div className="rounded-[14px] bg-[#FAFAFA] border border-[#E5E7EB] p-6 sm:p-7">
        <h3 className="font-grotesque font-bold text-[17px] text-[#222325] mb-3">
          What customers are saying
        </h3>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#52525B] text-white font-bold flex items-center justify-center shrink-0 text-[16px]">
            A
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="flex items-center gap-0.5 text-[#008744]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-bold text-[14px] text-[#222325]">5.0</span>
            </div>
            <p className="text-[14px] sm:text-[15px] text-[#404145] italic leading-relaxed">
              &ldquo;Clear communication and careful attention to detail. My apartment looks amazing!&rdquo;
            </p>
            <p className="text-[13px] text-[#74767E] mt-2 font-medium">
              — Ama, {location}
            </p>
          </div>
        </div>
      </div>

      {/* About this service text and checklist matching 5.png */}
      <div className="flex flex-col gap-6">
        <h2 className="font-grotesque font-bold text-[22px] sm:text-[24px] text-[#222325]">
          About this service
        </h2>

        <div className="text-[14px] sm:text-[15px] leading-[24px] text-[#404145] space-y-3">
          <p>
            I provide professional house cleaning services for homes and apartments in {location}.
            The scope of work is agreed before booking, and I focus on thorough, reliable cleaning so
            you can enjoy a fresh, healthy space.
          </p>
          <p>
            My service includes routine surface cleaning, vacuuming and mopping, kitchen and bathroom cleaning,
            and general tidying of bedrooms and living areas. Deep cleaning and other specific requests can also be arranged.
          </p>
        </div>

        {/* 2-Column Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="flex items-center gap-2.5 text-[14px] text-[#222325]">
            <span className="w-5 h-5 rounded-full bg-[#E8F8F0] text-[#008744] flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
            <span>Dusting and surface cleaning</span>
          </div>

          <div className="flex items-center gap-2.5 text-[14px] text-[#222325]">
            <span className="w-5 h-5 rounded-full bg-[#E8F8F0] text-[#008744] flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
            <span>Kitchen and bathroom cleaning</span>
          </div>

          <div className="flex items-center gap-2.5 text-[14px] text-[#222325]">
            <span className="w-5 h-5 rounded-full bg-[#E8F8F0] text-[#008744] flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
            <span>Vacuuming and mopping</span>
          </div>

          <div className="flex items-center gap-2.5 text-[14px] text-[#222325]">
            <span className="w-5 h-5 rounded-full bg-[#E8F8F0] text-[#008744] flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
            <span>Bedroom and living-area tidying</span>
          </div>
        </div>

        {/* 3 Meta Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E5E7EB]">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#74767E] shrink-0 mt-0.5" />
            <div>
              <div className="text-[12px] text-[#74767E]">Service area</div>
              <div className="text-[14px] font-semibold text-[#222325]">{location}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Home className="w-5 h-5 text-[#74767E] shrink-0 mt-0.5" />
            <div>
              <div className="text-[12px] text-[#74767E]">Property types</div>
              <div className="text-[14px] font-semibold text-[#222325]">Homes and apartments</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-[#74767E] shrink-0 mt-0.5" />
            <div>
              <div className="text-[12px] text-[#74767E]">Scheduling</div>
              <div className="text-[14px] font-semibold text-[#222325]">By appointment</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
