"use client";

import * as React from "react";
import Link from "next/link";
import { Shield, Calendar, Info, ChevronRight, Check } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export interface DashboardProfileBannerProps {
  profile?: {
    displayName?: string;
    photoUrl?: string;
  } | null;
}

export function DashboardProfileBanner({ profile }: DashboardProfileBannerProps) {
  const { user } = useUser();

  const [availabilityStatus, setAvailabilityStatus] = React.useState<"Available" | "Busy" | "Away">("Available");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = React.useState(false);

  // Read name & username from profile / clerk
  const displayName = profile?.displayName || user?.fullName || user?.firstName || "Provider";
  const username = user?.username || (user?.firstName ? user.firstName.toLowerCase() : "provider");
  const initial = displayName.charAt(0).toUpperCase();
  const photoUrl = profile?.photoUrl || user?.imageUrl || "";

  return (
    <div className="w-full bg-white rounded-[16px] border border-[#E5E7EB] p-6 shadow-xs flex flex-col gap-4">
      {/* Top Details Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Avatar circle */}
          <div className="w-13 h-13 rounded-full bg-[#52525B] text-white flex items-center justify-center font-bold text-[20px] shrink-0 overflow-hidden border border-[#E5E7EB]">
            {photoUrl ? (
              <img src={photoUrl} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              <span>{initial}</span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="font-grotesque font-bold text-[20px] text-[#222325]">
                {displayName}
              </h2>

              {/* New Provider Green Badge matching 7.png */}
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F8F0] text-[#008744] text-[12px] font-semibold">
                <Shield className="w-3.5 h-3.5 fill-current" />
                <span>New provider</span>
              </div>

              {/* View profile link */}
              <Link
                href="/provider/profile"
                className="text-[13px] text-[#222325] font-semibold underline hover:text-[#008744] transition-colors ml-1"
              >
                View profile
              </Link>
            </div>

            <span className="text-[13px] text-[#74767E] mt-0.5">
              @{username}
            </span>
          </div>
        </div>

        {/* Right side: Available > status selector */}
        <div className="relative self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[8px] border border-[#E5E7EB] hover:border-[#222325] bg-white text-[13px] font-medium text-[#222325] transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#74767E]" />
            <span>{availabilityStatus}</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#74767E]" />
          </button>

          {isStatusDropdownOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-40 bg-white border border-[#E5E7EB] rounded-[10px] shadow-lg py-1 z-50 text-[13px]">
              {(["Available", "Busy", "Away"] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => {
                    setAvailabilityStatus(status);
                    setIsStatusDropdownOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-[#F9FAFB] cursor-pointer"
                >
                  <span className={status === "Available" ? "text-[#008744] font-medium" : "text-[#404145]"}>
                    {status}
                  </span>
                  {availabilityStatus === status && <Check className="w-3.5 h-3.5 text-[#008744]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Blue Alert Banner matching 7.png */}
      <div className="flex items-center gap-2.5 p-3.5 rounded-[10px] bg-[#EFF6FF] border border-[#BFDBFE]/60 text-[#1E40AF] text-[13px] sm:text-[14px]">
        <Info className="w-4 h-4 shrink-0 text-[#2563EB]" />
        <span>
          You&apos;re not visible yet. Complete the steps below so customers can find you.
        </span>
      </div>
    </div>
  );
}
