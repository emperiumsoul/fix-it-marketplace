"use client";

import * as React from "react";
import Link from "next/link";
import { ServiceCard } from "@/components/cards/service-card";
import { Wrench, PlusCircle, ArrowRight } from "lucide-react";

export interface CategoryServiceItem {
  _id: string;
  title: string;
  slug: string;
  startingPrice: number;
  currency?: string;
  summary?: string;
  coverImageUrl?: string;
  serviceAreas?: string[];
  categoryTitle?: string;
  provider?: {
    displayName?: string;
    photoUrl?: string;
    verified?: boolean;
    verificationStatus?: string;
    rating?: number;
    completedJobsCount?: number;
  } | null;
}

export interface CategoryServicesListProps {
  categoryTitle: string;
  categorySlug: string;
  services: CategoryServiceItem[];
}

export function CategoryServicesList({
  categoryTitle,
  categorySlug,
  services = [],
}: CategoryServicesListProps) {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 my-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-3 border-b border-[#E5E7EB]">
        <div>
          <h2 className="font-grotesque font-bold text-[22px] sm:text-[26px] text-[#222325]">
            Available {categoryTitle} Services
          </h2>
          <p className="text-[14px] text-[#62646A] mt-1">
            Browse and book verified {categoryTitle.toLowerCase()} specialists across Accra and Ghana.
          </p>
        </div>

        {services.length > 0 && (
          <span className="text-[13px] font-semibold text-[#008744] bg-[#E8F8F0] px-3 py-1 rounded-full self-start sm:self-auto shrink-0">
            {services.length} {services.length === 1 ? "service available" : "services available"}
          </span>
        )}
      </div>

      {services.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const loc = service.serviceAreas?.[0] || "Accra";
            const isVerified =
              service.provider?.verificationStatus === "verified" ||
              service.provider?.verified === true;

            return (
              <ServiceCard
                key={service._id}
                id={service._id}
                slug={service.slug}
                title={service.title}
                category={service.categoryTitle || categoryTitle}
                providerName={service.provider?.displayName || "Local Specialist"}
                isVerified={isVerified}
                price={service.startingPrice}
                currency={service.currency === "GHS" ? "GH₵" : service.currency || "GH₵"}
                location={loc}
                imageUrl={
                  service.coverImageUrl ||
                  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80"
                }
                isSample={false}
              />
            );
          })}
        </div>
      ) : (
        <div className="p-8 sm:p-10 rounded-[16px] bg-[#F9FAFB] border border-[#E5E7EB] text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-[#E8F8F0] text-[#008744] flex items-center justify-center mb-3">
            <Wrench className="w-6 h-6 stroke-[1.75]" />
          </div>
          <h3 className="font-grotesque font-bold text-[18px] text-[#222325]">
            No live {categoryTitle.toLowerCase()} services yet
          </h3>
          <p className="text-[14px] text-[#62646A] max-w-md mt-1.5 mb-6">
            Are you a skilled {categoryTitle.toLowerCase()} provider in Ghana? Be the first verified professional in your area to publish your services!
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/provider/onboarding"
              className="px-5 py-2.5 rounded-[10px] bg-[#18181B] hover:bg-[#27272A] text-white text-[14px] font-semibold transition-colors cursor-pointer shadow-xs flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Become a Provider in {categoryTitle}
            </Link>
            <Link
              href={categorySlug ? `/search?category=${categorySlug}` : "/search"}
              className="px-4 py-2.5 rounded-[10px] bg-white border border-[#DADBDD] hover:border-[#18181B] text-[#222325] text-[14px] font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              Browse all services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
