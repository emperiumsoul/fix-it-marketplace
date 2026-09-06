"use client";

import * as React from "react";
import Link from "next/link";
import { Heart, Search, ArrowRight, Trash2 } from "lucide-react";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import { ServiceCard } from "@/components/cards/service-card";

export interface SavedServiceItem {
  id?: string;
  slug?: string;
  title: string;
  category?: string;
  providerName?: string;
  price: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  location: string;
  imageUrl?: string;
  isSample?: boolean;
}

const DEFAULT_SAVED_SERVICES: SavedServiceItem[] = [
  {
    id: "saved-1",
    slug: "standard-home-cleaning",
    title: "Professional House Cleaning",
    category: "Cleaning",
    providerName: "Akosua CleanCo",
    price: 360,
    currency: "GH₵",
    rating: 4.9,
    reviewCount: 38,
    location: "Accra",
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
    isSample: false,
  },
  {
    id: "saved-2",
    slug: "residential-plumbing-repairs",
    title: "Residential Plumbing & Pipe Repairs",
    category: "Plumbing",
    providerName: "Kwame Mensah",
    price: 350,
    currency: "GH₵",
    rating: 4.85,
    reviewCount: 42,
    location: "Accra",
    imageUrl: "https://images.unsplash.com/photo-1505798577917-a65157d3320a?auto=format&fit=crop&w=600&q=80",
    isSample: false,
  },
  {
    id: "saved-3",
    slug: "electrical-repairs-wiring",
    title: "Electrical Wiring & Breaker Panel Repair",
    category: "Electrical Repairs",
    providerName: "Kofi Boateng",
    price: 380,
    currency: "GH₵",
    rating: 4.95,
    reviewCount: 56,
    location: "Kumasi",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
    isSample: false,
  },
];

export function SavedView() {
  const { isLoaded, isSignedIn } = useUser();
  const [savedServices, setSavedServices] = React.useState<SavedServiceItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("fixit_saved_services");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch {
        // ignore
      }
    }
    return DEFAULT_SAVED_SERVICES;
  });

  React.useEffect(() => {
    const handleUpdate = () => {
      if (typeof window !== "undefined") {
        try {
          const stored = localStorage.getItem("fixit_saved_services");
          if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
              setSavedServices(parsed);
            }
          }
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener("fixit_saved_updated", handleUpdate);
    return () => window.removeEventListener("fixit_saved_updated", handleUpdate);
  }, []);

  const handleClearAll = () => {
    setSavedServices([]);
    if (typeof window !== "undefined") {
      localStorage.setItem("fixit_saved_services", JSON.stringify([]));
      window.dispatchEvent(new Event("fixit_saved_updated"));
    }
  };

  if (isLoaded && !isSignedIn) {
    return (
      <div className="bg-white rounded-[16px] border border-[#DADBDD] p-8 sm:p-12 text-center max-w-[560px] mx-auto shadow-xs my-8">
        <div className="w-16 h-16 rounded-full bg-[#FEE4E2] text-[#B42318] flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 fill-[#B42318]" />
        </div>
        <h2 className="text-[22px] font-bold text-[#222325] mb-2">
          Sign in to view your saved services
        </h2>
        <p className="text-[14px] text-[#62646A] leading-relaxed mb-6">
          Save your favorite Ghanaian plumbers, cleaners, electricians, and painters to quickly compare and book them when ready.
        </p>
        <div className="flex items-center justify-center gap-3">
          <SignInButton mode="modal">
            <button
              type="button"
              className="px-6 py-2.5 bg-[#222325] hover:bg-black text-white font-semibold text-[14px] rounded-[8px] transition-colors cursor-pointer"
            >
              Sign in
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button
              type="button"
              className="px-6 py-2.5 bg-[#008744] hover:bg-[#007038] text-white font-semibold text-[14px] rounded-[8px] transition-colors cursor-pointer"
            >
              Join Fix it
            </button>
          </SignUpButton>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-[16px] border border-[#DADBDD] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#FEE4E2] text-[#B42318] flex items-center justify-center">
              <Heart className="w-4 h-4 fill-[#B42318]" />
            </div>
            <h1 className="text-[24px] sm:text-[28px] font-bold text-[#222325]">
              Saved Services
            </h1>
          </div>
          <p className="text-[14px] text-[#74767E]">
            Keep track of top-rated Ghanaian service professionals and book whenever you are ready.
          </p>
        </div>

        {savedServices.length > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#B42318] hover:text-[#912018] bg-[#FEF3F2] hover:bg-[#FEE4E2] px-3.5 py-2 rounded-[8px] transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear All Saved
          </button>
        )}
      </div>

      {/* Services Grid or Empty State */}
      {savedServices.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[14px] font-semibold text-[#222325]">
              {savedServices.length} {savedServices.length === 1 ? "service" : "services"} saved
            </span>
            <Link
              href="/search"
              className="text-[13px] font-medium text-[#008744] hover:underline flex items-center gap-1"
            >
              Explore more services <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedServices.map((service, index) => (
              <ServiceCard
                key={service.id || service.slug || index}
                id={service.id}
                slug={service.slug}
                title={service.title}
                category={service.category}
                providerName={service.providerName}
                price={service.price}
                currency={service.currency || "GH₵"}
                rating={service.rating || 4.9}
                reviewCount={service.reviewCount || 24}
                location={service.location || "Accra"}
                imageUrl={service.imageUrl}
                isSample={service.isSample || false}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[16px] border border-[#DADBDD] p-12 text-center max-w-[600px] mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#F7F7F7] text-[#74767E] flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-[#DADBDD]" />
          </div>
          <h2 className="text-[20px] font-bold text-[#222325] mb-2">
            No saved services yet
          </h2>
          <p className="text-[14px] text-[#74767E] leading-relaxed mb-6">
            Click the heart icon on any service card while browsing to save plumbers, cleaners, electricians, and painters for later.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/categories/cleaning"
              className="px-4 py-2 bg-[#F7F7F7] hover:bg-[#EBF7EE] text-[#222325] hover:text-[#008744] text-[13px] font-medium rounded-full border border-[#DADBDD] transition-colors"
            >
              Cleaning
            </Link>
            <Link
              href="/categories/plumbing"
              className="px-4 py-2 bg-[#F7F7F7] hover:bg-[#EBF7EE] text-[#222325] hover:text-[#008744] text-[13px] font-medium rounded-full border border-[#DADBDD] transition-colors"
            >
              Plumbing
            </Link>
            <Link
              href="/categories/electrical-repairs"
              className="px-4 py-2 bg-[#F7F7F7] hover:bg-[#EBF7EE] text-[#222325] hover:text-[#008744] text-[13px] font-medium rounded-full border border-[#DADBDD] transition-colors"
            >
              Electrical
            </Link>
            <Link
              href="/search"
              className="px-4 py-2 bg-[#008744] hover:bg-[#007038] text-white text-[13px] font-medium rounded-full transition-colors flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" /> All Services
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
