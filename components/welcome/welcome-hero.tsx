"use client";

import * as React from "react";
import Link from "next/link";
import { FileText, Smartphone, Briefcase } from "lucide-react";

export interface WelcomeHeroProps {
  userName?: string;
  onOpenRoleModal?: () => void;
}

export function WelcomeHero({
  userName = "Kingsley",
  onOpenRoleModal,
}: WelcomeHeroProps) {
  return (
    <section className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 pt-8 pb-4">
      {/* Delicate background ambient glow */}
      <div className="absolute top-0 right-10 w-[400px] h-[300px] bg-gradient-to-bl from-[#E8F8F0]/80 via-[#FEF9C3]/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Greeting Title matching 3.png */}
      <div className="mb-8">
        <h1 className="font-grotesque font-bold text-[32px] sm:text-[38px] lg:text-[42px] tracking-tight text-[#222325]">
          Welcome to Fix it, {userName}
        </h1>
      </div>

      {/* 3 Recommended & Progress Cards matching 3.png */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Post a project brief */}
        <Link
          href="/search?action=post-job"
          className="flex flex-col justify-between p-5 sm:p-6 rounded-[14px] bg-white border border-[#E5E7EB] hover:border-[#DADBDD] hover:shadow-sm transition-all group cursor-pointer"
        >
          <span className="text-[11px] font-semibold text-[#74767E] uppercase tracking-wider mb-4 block">
            Recommended for you
          </span>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-[10px] bg-[#F7F7F7] group-hover:bg-[#E8F8F0] text-[#222325] group-hover:text-[#008744] flex items-center justify-center shrink-0 transition-colors">
              <FileText className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="font-grotesque font-bold text-[16px] text-[#222325] group-hover:text-[#008744] transition-colors">
                Post a project brief
              </h3>
              <p className="text-[13px] text-[#62646A] mt-1 leading-[18px]">
                Get tailored offers for your needs.
              </p>
            </div>
          </div>
        </Link>

        {/* Card 2: Download the Fix it app */}
        <div
          onClick={() => alert("Fix it mobile app for iOS and Android is coming soon to Ghana!")}
          className="flex flex-col justify-between p-5 sm:p-6 rounded-[14px] bg-white border border-[#E5E7EB] hover:border-[#DADBDD] hover:shadow-sm transition-all group cursor-pointer"
        >
          <span className="text-[11px] font-semibold text-[#74767E] uppercase tracking-wider mb-4 block">
            Recommended for you
          </span>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-[10px] bg-[#F7F7F7] group-hover:bg-[#E8F8F0] text-[#222325] group-hover:text-[#008744] flex items-center justify-center shrink-0 transition-colors">
              <Smartphone className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="font-grotesque font-bold text-[16px] text-[#222325] group-hover:text-[#008744] transition-colors">
                Download the Fix it app
              </h3>
              <p className="text-[13px] text-[#62646A] mt-1 leading-[18px]">
                Stay productive, anywhere you go.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Tailor Fix it to your needs */}
        <button
          type="button"
          onClick={onOpenRoleModal}
          className="flex flex-col justify-between p-5 sm:p-6 rounded-[14px] bg-white border border-[#E5E7EB] hover:border-[#008744] hover:bg-[#F3FDF9] hover:shadow-sm transition-all group text-left cursor-pointer"
        >
          <span className="text-[11px] font-semibold text-[#74767E] uppercase tracking-wider mb-4 block">
            Profile progress
          </span>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-[10px] bg-[#F7F7F7] group-hover:bg-[#E8F8F0] text-[#222325] group-hover:text-[#008744] flex items-center justify-center shrink-0 transition-colors">
              <Briefcase className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="font-grotesque font-bold text-[16px] text-[#222325] group-hover:text-[#008744] transition-colors">
                Tailor Fix it to your needs
              </h3>
              <p className="text-[13px] text-[#62646A] mt-1 leading-[18px]">
                Complete your profile.
              </p>
            </div>
          </div>
        </button>
      </div>
    </section>
  );
}
