"use client";

import * as React from "react";
import { Home } from "lucide-react";

export interface ServiceProviderCardProps {
  onContact?: () => void;
  location?: string;
}

export function ServiceProviderCard({
  onContact,
  location = "Accra",
}: ServiceProviderCardProps) {
  return (
    <div className="rounded-[16px] border border-[#E5E7EB] p-6 sm:p-7 flex flex-col gap-6">
      <h3 className="font-grotesque font-bold text-[20px] text-[#222325]">
        Meet Neat Home
      </h3>

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-full bg-[#008744] flex items-center justify-center text-white shadow-xs shrink-0">
            <Home className="w-7 h-7" />
          </div>
          <div>
            <h4 className="font-grotesque font-bold text-[18px] text-[#222325]">
              Neat Home
            </h4>
            <p className="text-[13px] text-[#62646A]">
              Clean Homes. Brighter Days.
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
          <div className="text-[14px] font-semibold text-[#222325] mt-0.5">{location}</div>
        </div>
        <div>
          <div className="text-[12px] text-[#74767E]">Languages</div>
          <div className="text-[14px] font-semibold text-[#222325] mt-0.5">English</div>
        </div>
        <div>
          <div className="text-[12px] text-[#74767E]">Services</div>
          <div className="text-[14px] font-semibold text-[#222325] mt-0.5">Home cleaning</div>
        </div>
        <div>
          <div className="text-[12px] text-[#74767E]">Scheduling</div>
          <div className="text-[14px] font-semibold text-[#222325] mt-0.5">By appointment</div>
        </div>
      </div>

      {/* Provider Bio */}
      <p className="text-[14px] leading-[22px] text-[#404145]">
        Neat Home provides reliable and detail-oriented cleaning services for homes and apartments in {location}.
        We take pride in creating clean, comfortable spaces so you can focus on what matters most.
      </p>
    </div>
  );
}
