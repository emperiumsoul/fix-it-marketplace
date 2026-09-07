"use client";

import * as React from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
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
  Package,
} from "lucide-react";
import { DashboardHeader } from "@/components/provider/dashboard-header";
import { Footer } from "@/components/navigation/footer";

interface ProviderProfileData {
  _id?: string;
  displayName?: string;
  headline?: string;
  photoUrl?: string;
  bioText?: string;
  expertise?: string[];
  languages?: string[];
  serviceAreas?: string[];
  rating?: number;
  completedJobsCount?: number;
  workExperience?: Array<{
    _key?: string;
    role?: string;
    company?: string;
    startDate?: string;
    description?: string;
  }>;
  education?: Array<{
    _key?: string;
    degreeOrCertificate?: string;
    institution?: string;
    year?: string;
  }>;
  certifications?: Array<{
    _key?: string;
    title?: string;
    issuingOrganization?: string;
    issueDate?: string;
  }>;
}

interface ServiceData {
  _id: string;
  title: string;
  slug: string;
  startingPrice: number;
  currency: string;
  status: string;
  categoryTitle?: string;
  packages?: Array<{
    name: string;
    description?: string;
    price?: number;
    scope?: string;
  }>;
}

export default function ProviderProfilePage() {
  const { user } = useUser();
  const [copied, setCopied] = React.useState(false);
  const [profile, setProfile] = React.useState<ProviderProfileData | null>(null);
  const [services, setServices] = React.useState<ServiceData[]>([]);

  React.useEffect(() => {
    let isMounted = true;
    fetch("/api/provider/dashboard-data")
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data?.profile) setProfile(data.profile);
        if (Array.isArray(data?.services)) setServices(data.services);
      })
      .catch((err) => console.warn("Failed to load provider profile:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  const displayName =
    profile?.displayName ||
    user?.fullName ||
    user?.firstName ||
    "Provider";

  const username =
    user?.username || (user?.firstName ? user.firstName.toLowerCase() : "provider");

  const headline =
    profile?.headline || "Local Services Specialist";

  const photoUrl = profile?.photoUrl || user?.imageUrl || "";
  const languages = profile?.languages?.length ? profile.languages : ["English", "Twi"];
  const serviceAreas = profile?.serviceAreas?.length ? profile.serviceAreas : ["Accra", "Greater Accra"];
  const completedJobs = profile?.completedJobsCount || 0;
  const rating = profile?.rating;

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const primaryStartingPrice = services[0]?.startingPrice || 150;

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
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#3F3F46] text-white font-bold text-[32px] flex items-center justify-center border-4 border-white shadow-md overflow-hidden">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{displayName.charAt(0).toUpperCase()}</span>
                )}
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
                {completedJobs > 0 ? (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#FFBE5B] text-[#FFBE5B]" />
                    <span className="font-bold text-[#222325]">
                      {rating?.toFixed(1) || "5.0"}
                    </span>
                    <span className="text-[#74767E]">
                      ({completedJobs} completed jobs)
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-[#74767E]">
                    <span className="font-medium text-[#222325]">New Provider</span>
                    <span>• 0 completed jobs</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-[#74767E]" />
                  <span>{serviceAreas.join(", ")}, Ghana</span>
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
                GHS {primaryStartingPrice}
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
              {profile?.bioText ? (
                <p className="text-[14px] text-[#404145] leading-relaxed whitespace-pre-line">
                  {profile.bioText}
                </p>
              ) : (
                <div className="p-4 rounded-[10px] bg-[#F9FAFB] border border-[#E5E7EB] text-[13px] text-[#74767E] flex items-center justify-between">
                  <span>No bio provided yet. Complete your profile to introduce yourself to clients.</span>
                  <Link
                    href="/provider/onboarding"
                    className="text-[#008744] font-semibold hover:underline"
                  >
                    Add bio
                  </Link>
                </div>
              )}

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#F3F4F6]">
                <div className="flex items-center gap-2 text-[13px] text-[#222325]">
                  <CheckCircle2 className="w-4 h-4 text-[#008744]" />
                  <span>Fully vetted identity verified</span>
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
                  <span>Direct booking confirmation</span>
                </div>
              </div>
            </div>

            {/* Services & Packages Offered */}
            <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-grotesque font-bold text-[18px] text-[#222325]">
                  Services & Packages Offered
                </h2>
                <Link
                  href="/provider/dashboard?tab=services&action=new-service"
                  className="text-[13px] font-semibold text-[#008744] hover:underline flex items-center gap-1"
                >
                  + Add Service
                </Link>
              </div>

              {services.length > 0 ? (
                <div className="space-y-4">
                  {services.map((srv) => (
                    <div
                      key={srv._id}
                      className="p-5 rounded-[12px] border border-[#E5E7EB] bg-[#FAFAFA] flex flex-col gap-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#008744] bg-[#E8F8F0] px-2 py-0.5 rounded-full">
                            {srv.categoryTitle || "Service"}
                          </span>
                          <h3 className="font-grotesque font-bold text-[16px] text-[#222325] mt-1">
                            {srv.title}
                          </h3>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="font-grotesque font-bold text-[18px] text-[#222325]">
                            GHS {srv.startingPrice}
                          </span>
                          <span className="text-[12px] text-[#74767E]">starting</span>
                        </div>
                      </div>

                      {srv.packages && srv.packages.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#E5E7EB]">
                          {srv.packages.map((pkg, pIdx) => (
                            <div
                              key={pIdx}
                              className="p-3 bg-white rounded-[8px] border border-[#E5E7EB] text-[13px]"
                            >
                              <div className="font-semibold text-[#222325]">
                                {pkg.name}
                              </div>
                              <div className="text-[12px] text-[#74767E] mt-0.5">
                                {pkg.scope || pkg.description}
                              </div>
                              {pkg.price && (
                                <div className="text-[#008744] font-bold mt-1 text-[12px]">
                                  GHS {pkg.price}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 rounded-[12px] border border-dashed border-[#DADBDD] text-center flex flex-col items-center justify-center gap-2">
                  <Package className="w-8 h-8 text-[#9CA3AF]" />
                  <p className="text-[14px] font-medium text-[#222325]">
                    No services published yet
                  </p>
                  <p className="text-[12px] text-[#74767E] max-w-sm">
                    Create and publish your first service so customers across Accra can find and hire you.
                  </p>
                  <Link
                    href="/provider/dashboard?tab=overview"
                    className="mt-2 px-4 py-2 rounded-[8px] bg-[#18181B] text-white text-[13px] font-semibold hover:bg-[#27272A] transition-colors"
                  >
                    Create your first service
                  </Link>
                </div>
              )}
            </div>

            {/* Experience & Certifications */}
            <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 shadow-xs flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h2 className="font-grotesque font-bold text-[18px] text-[#222325]">
                  Qualifications & Experience
                </h2>
                <Link
                  href="/provider/onboarding"
                  className="text-[13px] font-semibold text-[#008744] hover:underline"
                >
                  Edit Qualifications
                </Link>
              </div>

              {profile?.workExperience && profile.workExperience.length > 0 ? (
                <div className="space-y-4">
                  {profile.workExperience.map((w, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-[8px] bg-[#F3F4F6] text-[#222325] flex items-center justify-center shrink-0">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[14px] text-[#222325]">
                          {w.role} • {w.company}
                        </h3>
                        {w.startDate && (
                          <p className="text-[12px] text-[#74767E]">{w.startDate}</p>
                        )}
                        {w.description && (
                          <p className="text-[13px] text-[#62646A] mt-1">{w.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-[10px] bg-[#F9FAFB] border border-[#E5E7EB] text-[13px] text-[#74767E]">
                  No work experience added yet. Click &quot;Edit Qualifications&quot; to add your professional history.
                </div>
              )}

              {profile?.certifications && profile.certifications.length > 0 && (
                <div className="space-y-3 pt-3 border-t border-[#F3F4F6]">
                  {profile.certifications.map((c, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-[8px] bg-[#F3F4F6] text-[#222325] flex items-center justify-center shrink-0">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[14px] text-[#222325]">
                          {c.title}
                        </h3>
                        <p className="text-[12px] text-[#74767E]">
                          {c.issuingOrganization} {c.issueDate ? `• ${c.issueDate}` : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
