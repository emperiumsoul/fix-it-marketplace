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
import { detectTradeConfig } from "@/components/provider/onboarding-profile-view";

const TRADE_PACKAGES: Record<
  string,
  {
    title: string;
    desc: string;
    duration: string;
    price: number;
  }[]
> = {
  plumbing: [
    {
      title: "Routine Pipe & Leak Repair",
      desc: "Repairing leaking washbasin traps, sink drain sealing, and tap washer replacement.",
      duration: "~1 to 2 hours",
      price: 180,
    },
    {
      title: "Drain Snaking & Blockage Clearing",
      desc: "Mechanical drain snaking of bathroom or kitchen waste lines and grease trap cleanout.",
      duration: "~2 to 3 hours",
      price: 350,
    },
    {
      title: "Complete Bathroom / Kitchen Fixture Overhaul",
      desc: "Installation and pressure testing of new faucets, P-traps, water heater lines, and shutoff valves.",
      duration: "~4 to 6 hours",
      price: 650,
    },
  ],
  cleaning: [
    {
      title: "Standard Residential Maintenance Clean",
      desc: "Dusting, vacuuming, floor mopping, kitchen surface degreasing, bathroom wash, and trash disposal.",
      duration: "~2 to 3 hours",
      price: 180,
    },
    {
      title: "Intensive Deep Home Cleaning",
      desc: "Deep limescale scrubbing, kitchen appliance interior cleaning (oven, fridge), window washing, and grout scrub.",
      duration: "~4 to 6 hours",
      price: 350,
    },
    {
      title: "Move-In / Move-Out Turnkey Sanitize",
      desc: "Full property deep sanitize before handover or tenant move-in, including cabinets and disinfection.",
      duration: "Full day",
      price: 600,
    },
  ],
  electrical: [
    {
      title: "Diagnostic & Socket / Switch Replacement",
      desc: "Troubleshooting dead circuits, replacing faulty wall sockets, switches, and earth wire checks.",
      duration: "~1 to 2 hours",
      price: 160,
    },
    {
      title: "Breaker Panel & Distribution Board Re-balancing",
      desc: "Diagnosing tripping MCB breakers, load balancing across 3-phase board, and surge protector installation.",
      duration: "~2 to 4 hours",
      price: 380,
    },
    {
      title: "Whole-House Lighting & Ceiling Fan Installation",
      desc: "Wiring and mounting up to 8 lighting points, chandeliers, or energy-efficient ceiling fans.",
      duration: "~4 to 6 hours",
      price: 600,
    },
  ],
  painting: [
    {
      title: "Single Room Refresh & Minor Crack Patching",
      desc: "Surface sanding, acrylic primer coat, and 2 finish coats on walls and ceiling of 1 standard room.",
      duration: "1 day",
      price: 250,
    },
    {
      title: "Multi-Room Interior Painting (2-3 Bedrooms)",
      desc: "Comprehensive surface preparation, skimming minor imperfections, and premium washable emulsion paint.",
      duration: "2 to 3 days",
      price: 750,
    },
    {
      title: "Exterior Weatherproofing & Perimeter Wall Painting",
      desc: "Pressure wash wall clean, waterproofing sealant primer, and mold-resistant exterior paint.",
      duration: "3 to 4 days",
      price: 1400,
    },
  ],
};

export default function ProviderProfilePage() {
  const { user } = useUser();

  const [copied, setCopied] = React.useState(false);

  // Derive provider attributes from metadata or sensible defaults
  const meta = (user?.unsafeMetadata || {}) as {
    displayName?: string;
    headline?: string;
    languages?: string[];
    primaryService?: string;
    startingPriceGhs?: number;
    providerProfile?: {
      displayName?: string;
      headline?: string;
      primaryService?: string;
      languages?: string[];
    };
  };

  const displayName =
    meta.providerProfile?.displayName ||
    meta.displayName ||
    user?.fullName ||
    user?.firstName ||
    "Clear";

  const username =
    user?.username || (user?.firstName ? user.firstName.toLowerCase() : "ksoul1");

  const rawHeadline =
    meta.providerProfile?.headline ||
    meta.headline ||
    meta.providerProfile?.primaryService ||
    meta.primaryService ||
    "Plumbing";

  const activeTrade = detectTradeConfig(rawHeadline);

  const headline = rawHeadline;
  const languages = meta.providerProfile?.languages || meta.languages || ["English", "Twi"];
  const startingPrice = meta.startingPriceGhs || (activeTrade.id === "plumbing" ? 180 : 150);

  const packages =
    TRADE_PACKAGES[activeTrade.id] || TRADE_PACKAGES.plumbing;

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
                About {displayName}
              </h2>
              <p className="text-[14px] text-[#404145] leading-relaxed">
                Professional {activeTrade.label.toLowerCase()} specialist dedicated to delivering thorough, reliable services across Greater Accra. Equipped with professional tools, certified materials, and comprehensive technical training. Known for punctuality, attention to detail, and transparent pricing in Ghana Cedis.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#F3F4F6]">
                <div className="flex items-center gap-2 text-[13px] text-[#222325]">
                  <CheckCircle2 className="w-4 h-4 text-[#008744]" />
                  <span>Fully vetted Ghana Card identity verified</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#222325]">
                  <CheckCircle2 className="w-4 h-4 text-[#008744]" />
                  <span>Tools and standard equipment provided</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#222325]">
                  <CheckCircle2 className="w-4 h-4 text-[#008744]" />
                  <span>On-time arrival guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#222325]">
                  <CheckCircle2 className="w-4 h-4 text-[#008744]" />
                  <span>Free inspection & follow-up within 24 hours</span>
                </div>
              </div>
            </div>

            {/* Services & Packages Offered */}
            <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 shadow-xs flex flex-col gap-4">
              <h2 className="font-grotesque font-bold text-[18px] text-[#222325]">
                Services & Packages Offered ({activeTrade.label})
              </h2>

              <div className="space-y-4">
                {packages.map((pkg, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-[12px] border border-[#E5E7EB] bg-[#FAFAFA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="font-grotesque font-bold text-[15px] text-[#222325]">
                        {pkg.title}
                      </h3>
                      <p className="text-[13px] text-[#62646A] mt-0.5 max-w-lg">
                        {pkg.desc}
                      </p>
                      <span className="inline-block text-[12px] text-[#74767E] mt-1 font-medium">
                        Duration: {pkg.duration}
                      </span>
                    </div>
                    <div className="shrink-0 text-left sm:text-right">
                      <span className="font-grotesque font-bold text-[18px] text-[#222325]">
                        GHS {pkg.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio Showcase */}
            <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 shadow-xs flex flex-col gap-4">
              <h2 className="font-grotesque font-bold text-[18px] text-[#222325]">
                Portfolio Showcase ({activeTrade.label})
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-[12px] border border-[#E5E7EB] overflow-hidden group">
                  <div className="h-44 bg-[#F3F4F6] relative overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80"
                      alt="Project demonstration"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-grotesque font-bold text-[14px] text-[#222325]">
                      Residential Project in Cantonments
                    </h3>
                    <p className="text-[12px] text-[#62646A] mt-1">
                      Completed execution and quality assurance check.
                    </p>
                  </div>
                </div>

                <div className="rounded-[12px] border border-[#E5E7EB] overflow-hidden group">
                  <div className="h-44 bg-[#F3F4F6] relative overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80"
                      alt="Commercial project demonstration"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-grotesque font-bold text-[14px] text-[#222325]">
                      Commercial Facility Service in Airport City
                    </h3>
                    <p className="text-[12px] text-[#62646A] mt-1">
                      Multi-zone maintenance and technical certification handover.
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
                      Lead {activeTrade.label} Technician • Accra Technical Services
                    </h3>
                    <p className="text-[12px] text-[#74767E]">2021 – Present • 3+ years</p>
                    <p className="text-[13px] text-[#62646A] mt-1">
                      Managed residential operations and client quality standards across Greater Accra.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-[8px] bg-[#F3F4F6] text-[#222325] flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[14px] text-[#222325]">
                      Certified {activeTrade.label} Standards & Safety Certificate
                    </h3>
                    <p className="text-[12px] text-[#74767E]">National Vocational Training Institute (NVTI) • Verified</p>
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
