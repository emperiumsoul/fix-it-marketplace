"use client";

import * as React from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";
import { PublicHeader } from "@/components/navigation/public-header";
import { Footer } from "@/components/navigation/footer";

const TRADES = [
  "House Cleaning",
  "Plumbing",
  "Electrical Repairs",
  "Painting & Decorating",
  "Moving & Relocation",
  "Furniture Assembly",
  "Gardening & Landscaping",
  "Appliance & Home Repairs",
];

const GHANA_LOCALITIES = [
  "Accra",
  "East Legon",
  "Cantonments",
  "Osu",
  "Tema",
  "Kumasi",
  "Spintex",
  "Takoradi",
];

export default function ProviderOnboardingPage() {
  const { user } = useUser();

  const [step, setStep] = React.useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [customName, setCustomName] = React.useState<string | null>(null);
  const displayName = customName !== null ? customName : (user?.fullName || user?.username || "");
  const [headline, setHeadline] = React.useState("");
  const [selectedTrade, setSelectedTrade] = React.useState("House Cleaning");
  const [selectedAreas, setSelectedAreas] = React.useState<string[]>([
    "Accra",
    "East Legon",
  ]);
  const [availability, setAvailability] = React.useState(
    "Mon - Sat: 8:00 AM - 6:00 PM"
  );
  const [bio, setBio] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const toggleArea = (loc: string) => {
    if (selectedAreas.includes(loc)) {
      setSelectedAreas(selectedAreas.filter((a) => a !== loc));
    } else {
      setSelectedAreas([...selectedAreas, loc]);
    }
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save provider profile to local state
    if (typeof window !== "undefined") {
      const profile = {
        displayName: displayName || "Local Pro",
        headline: headline || `${selectedTrade} Specialist`,
        trade: selectedTrade,
        serviceAreas: selectedAreas,
        availability,
        bio,
        onboardingStatus: "completed",
        verificationStatus: "unverified",
      };
      localStorage.setItem("fixit_provider_profile", JSON.stringify(profile));
      localStorage.setItem("fixit_role", "provider");
      localStorage.setItem("fixit_role_modal_dismissed", "true");
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] text-[#404145] font-satoshi">
      {/* Top Header */}
      <PublicHeader showSearch={false} />

      {/* Onboarding Container */}
      <main className="flex-1 max-w-[800px] w-full mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Progress Bar & Breadcrumb */}
        {step < 4 && (
          <div className="mb-8">
            <div className="flex items-center justify-between text-[13px] font-semibold text-[#74767E] mb-3">
              <span>Step {step} of 3</span>
              <span>
                {step === 1
                  ? "Professional Details"
                  : step === 2
                  ? "Service Areas & Hours"
                  : "Profile Biography"}
              </span>
            </div>
            <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#008744] rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Step 1: Professional Details */}
        {step === 1 && (
          <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 sm:p-10 shadow-xs animate-in fade-in duration-200">
            <div className="mb-6">
              <h1 className="font-grotesque font-bold text-[24px] sm:text-[28px] text-[#222325]">
                Let&apos;s build your service provider profile
              </h1>
              <p className="text-[14px] text-[#62646A] mt-1">
                Tell clients across Ghana about your expertise and professional skills.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-[13px] font-semibold text-[#222325] mb-1.5">
                  Display / Business Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Kwame Mensah or Accra Sparkling Cleaners"
                  className="w-full h-[44px] px-4 rounded-[8px] border border-[#DADBDD] text-[14px] text-[#222325] focus:outline-none focus:border-[#008744]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#222325] mb-1.5">
                  Professional Headline
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="e.g. Certified Electrician with 8+ years domestic experience"
                  className="w-full h-[44px] px-4 rounded-[8px] border border-[#DADBDD] text-[14px] text-[#222325] focus:outline-none focus:border-[#008744]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#222325] mb-2">
                  Primary Trade / Category
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {TRADES.map((trade) => {
                    const isSelected = selectedTrade === trade;
                    return (
                      <button
                        key={trade}
                        type="button"
                        onClick={() => setSelectedTrade(trade)}
                        className={`p-3 rounded-[8px] border text-left text-[14px] font-medium transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? "bg-[#E8F8F0] border-[#008744] text-[#008744]"
                            : "border-[#E5E7EB] text-[#404145] hover:border-[#DADBDD]"
                        }`}
                      >
                        <span>{trade}</span>
                        {isSelected && <Check className="w-4 h-4 stroke-[2.5]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#003912] hover:bg-[#00280D] text-white font-semibold text-[14px] rounded-[8px] transition-colors cursor-pointer"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Service Areas & Hours */}
        {step === 2 && (
          <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 sm:p-10 shadow-xs animate-in fade-in duration-200">
            <div className="mb-6">
              <h2 className="font-grotesque font-bold text-[24px] sm:text-[28px] text-[#222325]">
                Where and when do you work?
              </h2>
              <p className="text-[14px] text-[#62646A] mt-1">
                Select your service coverage areas in Ghana and weekly working availability.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[13px] font-semibold text-[#222325] mb-2">
                  Service Areas in Ghana (select all that apply)
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {GHANA_LOCALITIES.map((loc) => {
                    const isSelected = selectedAreas.includes(loc);
                    return (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => toggleArea(loc)}
                        className={`px-4 py-2 rounded-full border text-[13px] font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? "bg-[#008744] border-[#008744] text-white"
                            : "bg-white border-[#DADBDD] text-[#404145] hover:border-[#62646A]"
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{loc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#222325] mb-1.5">
                  Availability / Working Schedule
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    placeholder="e.g. Mon - Sat: 8:00 AM - 6:00 PM"
                    className="w-full h-[44px] pl-10 pr-4 rounded-[8px] border border-[#DADBDD] text-[14px] text-[#222325] focus:outline-none focus:border-[#008744]"
                  />
                  <Clock className="w-4 h-4 text-[#74767E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1 text-[14px] font-medium text-[#74767E] hover:text-[#222325] cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={selectedAreas.length === 0}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#003912] hover:bg-[#00280D] disabled:opacity-50 text-white font-semibold text-[14px] rounded-[8px] transition-colors cursor-pointer"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Bio & Review */}
        {step === 3 && (
          <form
            onSubmit={handleFinish}
            className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 sm:p-10 shadow-xs animate-in fade-in duration-200"
          >
            <div className="mb-6">
              <h2 className="font-grotesque font-bold text-[24px] sm:text-[28px] text-[#222325]">
                Complete your profile bio
              </h2>
              <p className="text-[14px] text-[#62646A] mt-1">
                Write a brief summary to welcome clients and outline your experience.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-[13px] font-semibold text-[#222325] mb-1.5">
                  Professional Biography
                </label>
                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell clients about your background, certifications, and commitment to top-notch work in Ghana..."
                  className="w-full p-4 rounded-[8px] border border-[#DADBDD] text-[14px] text-[#222325] focus:outline-none focus:border-[#008744]"
                />
              </div>

              {/* Summary Card */}
              <div className="p-4 rounded-[12px] bg-[#F7F7F7] border border-[#E5E7EB] text-[13px] space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#74767E]">Display Name:</span>
                  <span className="font-semibold text-[#222325]">{displayName || "Not specified"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#74767E]">Primary Trade:</span>
                  <span className="font-semibold text-[#008744]">{selectedTrade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#74767E]">Service Areas:</span>
                  <span className="font-semibold text-[#222325]">{selectedAreas.join(", ")}</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1 text-[14px] font-medium text-[#74767E] hover:text-[#222325] cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-8 py-2.5 bg-[#008744] hover:bg-[#007038] text-white font-semibold text-[14px] rounded-[8px] transition-colors shadow-sm cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Saving Profile...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Finish & Publish Profile</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Step 4: Success Screen */}
        {step === 4 && (
          <div className="bg-white rounded-[20px] border border-[#DCFCE7] p-8 sm:p-12 text-center shadow-md animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#E8F8F0] text-[#008744] flex items-center justify-center mx-auto mb-5 shadow-xs">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <h2 className="font-grotesque font-bold text-[26px] sm:text-[32px] text-[#222325] mb-2">
              Profile Created Successfully!
            </h2>
            <p className="text-[15px] text-[#62646A] max-w-md mx-auto mb-8">
              Congratulations! Your service provider profile is live. Customers in {selectedAreas.join(", ")} can now discover your services and request bookings.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/?preview=welcome"
                className="w-full sm:w-auto px-6 py-2.5 bg-[#222325] hover:bg-black text-white font-semibold text-[14px] rounded-[8px] transition-colors"
              >
                Go to Welcome Homepage
              </Link>
              <Link
                href={`/categories/${selectedTrade.toLowerCase().includes("clean") ? "cleaning" : "plumbing"}`}
                className="w-full sm:w-auto px-6 py-2.5 border border-[#DADBDD] bg-white hover:bg-[#F7F7F7] text-[#222325] font-semibold text-[14px] rounded-[8px] transition-colors"
              >
                View Category Page
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
