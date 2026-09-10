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
          className="self-start sm:self-auto px-5 py-2 rounded-[8px] border border-[#25D366] bg-[#F0FDF4] hover:bg-[#DCFCE7] font-semibold text-[14px] text-[#15803D] transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#25D366]" aria-hidden="true">
            <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.275-.1-.475-.15-.675.15-.2.301-.776.978-.951 1.179-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.799-1.5-1.786-1.676-2.087-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.101-.2.05-.376-.025-.527-.075-.15-.676-1.63-1.026-2.233-.251-.602-.501-.52-.676-.52-.175 0-.376-.025-.577-.025-.2 0-.526.075-.801.376-.275.301-1.052 1.028-1.052 2.508 0 1.48 1.077 2.91 1.228 3.11.15.2 2.118 3.234 5.132 4.536.717.31 1.277.495 1.714.634.72.229 1.375.197 1.894.121.577-.087 1.78-.727 2.03-1.43.25-.702.25-1.304.175-1.43-.075-.125-.275-.2-.576-.35z" />
            <path d="M12.004 0C5.384 0 0 5.385 0 12.006c0 2.115.552 4.179 1.602 6.001L.06 24l6.168-1.618c1.758.96 3.743 1.465 5.776 1.465 6.618 0 12.002-5.385 12.002-12.006S18.622 0 12.004 0zm0 21.968c-1.803 0-3.57-.486-5.11-1.405l-.367-.218-3.799.996 1.014-3.702-.239-.38A9.927 9.927 0 012.04 12.006c0-5.494 4.47-9.965 9.964-9.965 5.495 0 9.966 4.471 9.966 9.965 0 5.495-4.471 9.962-9.966 9.962z" />
          </svg>
          <span>Chat on WhatsApp</span>
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
