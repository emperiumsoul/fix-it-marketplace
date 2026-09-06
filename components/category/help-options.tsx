"use client";

import * as React from "react";
import Link from "next/link";
import { FileText, User, Calendar } from "lucide-react";

export interface HelpOptionsProps {
  categoryTitle?: string;
  categorySlug?: string;
}

export function HelpOptions({
  categoryTitle = "Cleaning",
  categorySlug = "cleaning",
}: HelpOptionsProps) {
  const normalizedTitle = categoryTitle.toLowerCase();

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 my-16">
      <h2 className="font-grotesque font-bold text-[22px] sm:text-[26px] text-[#222325] mb-8">
        Find local help — your way
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Option 1: Post a job request */}
        <div className="flex flex-col justify-between p-6 sm:p-7 rounded-[16px] bg-white border border-[#E5E7EB] hover:border-[#DADBDD] transition-all shadow-xs">
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#F7F7F7] flex items-center justify-center text-[#222325] mb-4">
              <FileText className="w-5 h-5 stroke-[1.75]" />
            </div>
            <h3 className="font-grotesque font-bold text-[18px] text-[#222325] mb-2">
              Post a job request
            </h3>
            <p className="text-[14px] leading-[22px] text-[#62646A]">
              Tell us what you need and receive quotes from local {normalizedTitle} professionals.
            </p>
          </div>
          <div className="mt-8">
            <Link
              href={`/search?category=${categorySlug}&action=post-job`}
              className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-[8px] border border-[#222325] text-[#222325] font-semibold text-[14px] hover:bg-[#F7F7F7] transition-colors"
            >
              Post a request
            </Link>
          </div>
        </div>

        {/* Option 2: Find a professional */}
        <div className="flex flex-col justify-between p-6 sm:p-7 rounded-[16px] bg-white border border-[#E5E7EB] hover:border-[#DADBDD] transition-all shadow-xs">
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#F7F7F7] flex items-center justify-center text-[#222325] mb-4">
              <User className="w-5 h-5 stroke-[1.75]" />
            </div>
            <h3 className="font-grotesque font-bold text-[18px] text-[#222325] mb-2">
              Find a {normalizedTitle} professional
            </h3>
            <p className="text-[14px] leading-[22px] text-[#62646A]">
              Browse verified professionals, view profiles and send a message.
            </p>
          </div>
          <div className="mt-8">
            <Link
              href={`/search?category=${categorySlug}`}
              className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-[8px] border border-[#222325] text-[#222325] font-semibold text-[14px] hover:bg-[#F7F7F7] transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>

        {/* Option 3: Plan a larger project */}
        <div className="flex flex-col justify-between p-6 sm:p-7 rounded-[16px] bg-white border border-[#E5E7EB] hover:border-[#DADBDD] transition-all shadow-xs">
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#F7F7F7] flex items-center justify-center text-[#222325] mb-4">
              <Calendar className="w-5 h-5 stroke-[1.75]" />
            </div>
            <h3 className="font-grotesque font-bold text-[18px] text-[#222325] mb-2">
              Plan a larger {normalizedTitle} project
            </h3>
            <p className="text-[14px] leading-[22px] text-[#62646A]">
              Discuss your space, get advice and coordinate your project in one place.
            </p>
          </div>
          <div className="mt-8">
            <Link
              href={`/search?category=${categorySlug}&discuss=true`}
              className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-[8px] border border-[#222325] text-[#222325] font-semibold text-[14px] hover:bg-[#F7F7F7] transition-colors"
            >
              Discuss your project
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
