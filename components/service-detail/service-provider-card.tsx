"use client";

import * as React from "react";
import Image from "next/image";
import { Wrench, Zap, Paintbrush, Truck, Leaf, Hammer, Home } from "lucide-react";
import { ServiceProviderData } from "./types";
import { getCategoryPreset } from "./category-presets";

export interface ServiceProviderCardProps {
  provider?: ServiceProviderData;
  categoryTitle?: string;
  categorySlug?: string;
  location?: string;
  onContact?: () => void;
}

export function ServiceProviderCard({
  provider,
  categoryTitle = "Cleaning",
  categorySlug = "cleaning",
  location = "Accra",
  onContact,
}: ServiceProviderCardProps) {
  const preset = getCategoryPreset(categorySlug || categoryTitle);

  const displayName = provider?.displayName || "Local Professional";
  const headline = provider?.headline || `${categoryTitle} Specialist`;
  const bio =
    provider?.bio ||
    `${displayName} provides reliable and detail-oriented ${categoryTitle.toLowerCase()} services for homes and offices in ${location}. We take pride in delivering clean, dependable work so you can focus on what matters most.`;
  const languages = provider?.languages && provider.languages.length > 0 ? provider.languages.join(", ") : "English, Twi";
  const availability = provider?.availability || "By appointment";
  const primaryArea = provider?.serviceAreas?.[0] || location;

  const renderIcon = () => {
    if (preset.icon === "wrench") return <Wrench className="w-7 h-7" />;
    if (preset.icon === "zap") return <Zap className="w-7 h-7" />;
    if (preset.icon === "paintbrush") return <Paintbrush className="w-7 h-7" />;
    if (preset.icon === "truck") return <Truck className="w-7 h-7" />;
    if (preset.icon === "leaf") return <Leaf className="w-7 h-7" />;
    if (preset.icon === "hammer") return <Hammer className="w-7 h-7" />;
    return <Home className="w-7 h-7" />;
  };

  return (
    <div className="rounded-[16px] border border-[#E5E7EB] p-6 sm:p-7 flex flex-col gap-6">
      <h3 className="font-grotesque font-bold text-[20px] text-[#222325]">
        Meet {displayName}
      </h3>

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          {provider?.photoUrl ? (
            <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-[#DADBDD]">
              <Image
                src={provider.photoUrl}
                alt={displayName}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-full bg-[#008744] flex items-center justify-center text-white shadow-xs shrink-0">
              {renderIcon()}
            </div>
          )}
          <div>
            <h4 className="font-grotesque font-bold text-[18px] text-[#222325]">
              {displayName}
            </h4>
            <p className="text-[13px] text-[#62646A] line-clamp-1">
              {headline}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onContact}
          className="self-start sm:self-auto px-5 py-2 rounded-[8px] border border-[#222325] hover:bg-[#F7F7F7] font-semibold text-[14px] text-[#222325] transition-colors cursor-pointer"
        >
          Contact provider
        </button>
      </div>

      {/* 4-Column Meta Grid matching 5.png */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-[#F3F4F6]">
        <div>
          <div className="text-[12px] text-[#74767E]">Location</div>
          <div className="text-[14px] font-semibold text-[#222325] mt-0.5 line-clamp-1">{primaryArea}</div>
        </div>
        <div>
          <div className="text-[12px] text-[#74767E]">Languages</div>
          <div className="text-[14px] font-semibold text-[#222325] mt-0.5 line-clamp-1">{languages}</div>
        </div>
        <div>
          <div className="text-[12px] text-[#74767E]">Services</div>
          <div className="text-[14px] font-semibold text-[#222325] mt-0.5 line-clamp-1">{categoryTitle}</div>
        </div>
        <div>
          <div className="text-[12px] text-[#74767E]">Scheduling</div>
          <div className="text-[14px] font-semibold text-[#222325] mt-0.5 line-clamp-1">{availability}</div>
        </div>
      </div>

      {/* Provider Bio */}
      <p className="text-[14px] leading-[22px] text-[#404145] whitespace-pre-line">
        {bio}
      </p>
    </div>
  );
}
