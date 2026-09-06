"use client";

import * as React from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import {
  ShieldCheck,
  Star,
  MapPin,
  Languages,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Edit3,
  Briefcase,
  Award,
  Share2,
} from "lucide-react";
import { DashboardHeader } from "@/components/provider/dashboard-header";
import { Footer } from "@/components/navigation/footer";

export default function ProviderProfilePage() {
  const { user } = useUser();

  const [copied, setCopied] = React.useState(false);

  // Derive provider attributes from metadata or sensible Ghana defaults
  const meta = (user?.unsafeMetadata || {}) as {
    displayName?: string;
    headline?: string;
    languages?: string[];
    primaryService?: string;
    startingPriceGhs?: number;
  };

  const displayName =
    meta.displayName ||
    user?.fullName ||
    user?.firstName ||
    "Kingsley Acheampong";

  const username =
    user?.username || (user?.firstName ? user.firstName.toLowerCase() : "ksoul1");

  const headline = meta.headline || meta.primaryService || "Home Cleaning & Facility Maintenance Specialist";

  const languages = meta.languages || ["English", "Twi", "Ga"];
  const startingPrice = meta.startingPriceGhs || 150;

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F8] flex flex-col font-sans">
      <DashboardHeader />

      <main className="flex-1 max-w-[1140px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        {/* Navigation & Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/provider/dashboard"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[#74767E] hover:text-[#222325] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] bg-white border border-[#DADBDD] text-[13px] font-semibold text-[#222325] hover:bg-[#F9FAFB] transition-colors shadow-xs cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>{copied ? "Link Copied!" : "Share Profile"}</span>
            </button>

            <Link
              href="/provider/onboarding"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] bg-[#18181B] hover:bg-[#27272A] text-[13px] font-semibold text-white transition-colors shadow-xs"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </Link>
          </div>
        </div>

        {/* Hero Card */}
        <div className="w-full bg-white rounded-[16px] border border-[#E5E7EB] p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar with Available Presence indicator */}
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#3F3F46] text-white font-bold text-[32px] flex items-center justify-center border-4 border-white shadow-md">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <span
                className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[#008744] border-2 border-white"
                title="Available for bookings"
              />
            </div>

            {/* Provider Details */}
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-grotesque font-bold text-[24px] sm:text-[28px] text-[#222325]">
                  {displayName}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F8F0] text-[#008744] text-[12px] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Provider
                </span>
              </div>

              <p className="text-[14px] text-[#74767E] mt-0.5">
                @{username} • <span className="font-medium text-[#222325]">{headline}</span>
              </p>

              {/* Badges & Meta */}
              <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#62646A] mt-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#FFBE5B] text-[#FFBE5B]" />
                  <span className="font-bold text-[#222325]">4.9</span>
                  <span className="text-[#74767E]">(28 completed jobs)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-[#74767E]" />
                  <span>Accra & Greater Accra, Ghana</span>
                </div>
                <div className="flex items-center gap-1">
                  <Languages className="w-4 h-4 text-[#74767E]" />
                  <span>{languages.join(", ")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Pricing Card on Right */}
          <div className="self-stretch md:self-auto p-4 rounded-[12px] bg-[#FAFAFA] border border-[#E5E7EB] flex flex-col justify-center min-w-[200px]">
            <span className="text-[12px] text-[#74767E] uppercase tracking-wider font-semibold">
              Starting Rate
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-grotesque font-bold text-[24px] text-[#222325]">
                GHS {startingPrice}
              </span>
              <span className="text-[13px] text-[#74767E]">/ session</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[12px] text-[#008744] font-medium mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Direct MoMo or Escrow
            </span>
          </div>
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Left Column (2 Cols) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* About Section */}
            <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 shadow-xs">
              <h2 className="font-grotesque font-bold text-[18px] text-[#222325] mb-3">
                About Kingsley
              </h2>
              <p className="text-[14px] text-[#404145] leading-relaxed">
                Professional service provider dedicated to delivering thorough, reliable residential and commercial maintenance across Greater Accra. Equipped with industrial cleaning machinery, certified eco-friendly sanitizers, and comprehensive technical training. Known for punctuality, attention to detail, and transparent pricing in Ghana Cedis.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#F3F4F6]">
                <div className="flex items-center gap-2 text-[13px] text-[#222325]">
                  <CheckCircle2 className="w-4 h-4 text-[#008744]" />
                  <span>Fully vetted Ghana Card identity verified</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#222325]">
                  <CheckCircle2 className="w-4 h-4 text-[#008744]" />
                  <span>Supplies and protective gear provided</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#222325]">
                  <CheckCircle2 className="w-4 h-4 text-[#008744]" />
                  <span>On-time arrival guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#222325]">
                  <CheckCircle2 className="w-4 h-4 text-[#008744]" />
                  <span>Free re-clean / touch-up within 24 hours</span>
                </div>
              </div>
            </div>

            {/* Services & Packages Offered */}
            <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 shadow-xs flex flex-col gap-4">
              <h2 className="font-grotesque font-bold text-[18px] text-[#222325]">
                Services & Packages Offered
              </h2>

              <div className="space-y-4">
                <div className="p-4 rounded-[12px] border border-[#E5E7EB] bg-[#FAFAFA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-grotesque font-bold text-[15px] text-[#222325]">
                      Standard Residential Maintenance Clean
                    </h3>
                    <p className="text-[13px] text-[#62646A] mt-0.5 max-w-lg">
                      Dusting, vacuuming, floor mopping, kitchen surface degreasing, bathroom wash, and trash disposal.
                    </p>
                    <span className="inline-block text-[12px] text-[#74767E] mt-1 font-medium">
                      Duration: ~2 to 3 hours
                    </span>
                  </div>
                  <div className="shrink-0 text-left sm:text-right">
                    <span className="font-grotesque font-bold text-[18px] text-[#222325]">
                      GHS 180
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-[12px] border border-[#E5E7EB] bg-[#FAFAFA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-grotesque font-bold text-[15px] text-[#222325]">
                      Intensive Deep Home Cleaning
                    </h3>
                    <p className="text-[13px] text-[#62646A] mt-0.5 max-w-lg">
                      Deep limescale scrubbing, kitchen appliance interior cleaning (oven, fridge), window washing, and grout scrub.
                    </p>
                    <span className="inline-block text-[12px] text-[#74767E] mt-1 font-medium">
                      Duration: ~4 to 6 hours
                    </span>
                  </div>
                  <div className="shrink-0 text-left sm:text-right">
                    <span className="font-grotesque font-bold text-[18px] text-[#222325]">
                      GHS 350
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-[12px] border border-[#E5E7EB] bg-[#FAFAFA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-grotesque font-bold text-[15px] text-[#222325]">
                      Move-In / Move-Out Turnkey Sanitize
                    </h3>
                    <p className="text-[13px] text-[#62646A] mt-0.5 max-w-lg">
                      Full property deep sanitize before handover or tenant move-in, including cabinets and disinfection.
                    </p>
                    <span className="inline-block text-[12px] text-[#74767E] mt-1 font-medium">
                      Duration: Full day
                    </span>
                  </div>
                  <div className="shrink-0 text-left sm:text-right">
                    <span className="font-grotesque font-bold text-[18px] text-[#222325]">
                      GHS 600
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio Showcase */}
            <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 shadow-xs flex flex-col gap-4">
              <h2 className="font-grotesque font-bold text-[18px] text-[#222325]">
                Portfolio Showcase
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-[12px] border border-[#E5E7EB] overflow-hidden group">
                  <div className="h-44 bg-[#F3F4F6] relative overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80"
                      alt="Living room cleaning project"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-grotesque font-bold text-[14px] text-[#222325]">
                      Modern Apartment Deep Clean in Cantonments
                    </h3>
                    <p className="text-[12px] text-[#62646A] mt-1">
                      Post-renovation dust extraction and wood flooring shine restoration.
                    </p>
                  </div>
                </div>

                <div className="rounded-[12px] border border-[#E5E7EB] overflow-hidden group">
                  <div className="h-44 bg-[#F3F4F6] relative overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80"
                      alt="Commercial office cleaning project"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-grotesque font-bold text-[14px] text-[#222325]">
                      Corporate Workspace Sanitization in Airport City
                    </h3>
                    <p className="text-[12px] text-[#62646A] mt-1">
                      Multi-station desk sterilization, glass partitions polish, and carpet wash.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience & Certifications */}
            <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 shadow-xs flex flex-col gap-5">
              <h2 className="font-grotesque font-bold text-[18px] text-[#222325]">
                Qualifications & Experience
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-[8px] bg-[#F3F4F6] text-[#222325] flex items-center justify-center shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[14px] text-[#222325]">
                      Lead Facility Technician • Prime Clean Ghana Ltd
                    </h3>
                    <p className="text-[12px] text-[#74767E]">2021 – Present • 3+ years</p>
                    <p className="text-[13px] text-[#62646A] mt-1">
                      Managed residential deep clean operations and client sanitation standards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-[8px] bg-[#F3F4F6] text-[#222325] flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[14px] text-[#222325]">
                      Occupational Health & Hygiene Standards Certificate
                    </h3>
                    <p className="text-[12px] text-[#74767E]">Ghana Environmental Health Directorate • Verified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar (1 Col) */}
          <div className="flex flex-col gap-6">
            {/* Service Areas & Availability */}
            <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 shadow-xs flex flex-col gap-4">
              <h3 className="font-grotesque font-bold text-[16px] text-[#222325]">
                Service Areas in Accra
              </h3>
              <p className="text-[13px] text-[#62646A]">
                Accepts on-site service bookings in the following Greater Accra communities:
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  "East Legon",
                  "Airport Residential",
                  "Cantonments",
                  "Osu",
                  "Labone",
                  "Spintex",
                  "Dzorwulu",
                  "Roman Ridge",
                ].map((area) => (
                  <span
                    key={area}
                    className="px-2.5 py-1 rounded-[6px] bg-[#F4F4F5] text-[12px] font-medium text-[#404145]"
                  >
                    {area}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-[#F3F4F6] flex flex-col gap-2">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#74767E] flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> Response Time
                  </span>
                  <span className="font-semibold text-[#222325]">Under 1 hour</span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#74767E] flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" /> Working Days
                  </span>
                  <span className="font-semibold text-[#222325]">Mon – Sat, 7am – 6pm</span>
                </div>
              </div>
            </div>

            {/* Provider Support Card */}
            <div className="bg-[#EBF5FF] rounded-[16px] border border-[#BFDBFE] p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#1E40AF] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-grotesque font-bold text-[14px] text-[#1E40AF]">
                    Fix it Ghana Guarantee
                  </h4>
                  <p className="text-[12px] text-[#1E3A8A] mt-1 leading-relaxed">
                    All jobs booked through Fix it are covered by payment escrow protection and direct dispute support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
