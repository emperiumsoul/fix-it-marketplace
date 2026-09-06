"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, ChevronDown, Play } from "lucide-react";

export interface CategoryHeroProps {
  categoryTitle: string;
  categorySlug: string;
  subtitle?: string;
  heroImageUrl?: string;
}

const GHANA_LOCATIONS = [
  "Accra",
  "East Legon",
  "Cantonments",
  "Osu",
  "Tema",
  "Kumasi",
  "Spintex",
  "Takoradi",
];

export function CategoryHero({
  categoryTitle = "Cleaning",
  categorySlug = "cleaning",
  subtitle = "A cleaner space, without the hassle.",
  heroImageUrl,
}: CategoryHeroProps) {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = React.useState("Accra");
  const [selectedDate, setSelectedDate] = React.useState("Fri, 12 Apr");
  const [showHowItWorksModal, setShowHowItWorksModal] = React.useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("category", categorySlug);
    if (selectedLocation) params.set("location", selectedLocation);
    if (selectedDate) params.set("date", selectedDate);
    router.push(`/search?${params.toString()}`);
  };

  // Determine booking card title based on category
  const bookCardTitle = categoryTitle.toLowerCase().includes("clean")
    ? "Book a cleaner"
    : categoryTitle.toLowerCase().includes("plumb")
    ? "Book a plumber"
    : categoryTitle.toLowerCase().includes("electric")
    ? "Book an electrician"
    : categoryTitle.toLowerCase().includes("paint")
    ? "Book a painter"
    : categoryTitle.toLowerCase().includes("mov")
    ? "Book a mover"
    : categoryTitle.toLowerCase().includes("garden")
    ? "Book a gardener"
    : `Book a ${categoryTitle.toLowerCase()} pro`;

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 my-6">
      <div className="relative w-full rounded-[20px] bg-[#072F1D] bg-radial-[at_top_right] from-[#0E4A2E] to-[#062919] overflow-hidden shadow-md px-6 py-8 sm:px-10 sm:py-12 lg:py-14">
        {/* Subtle decorative glow overlay */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left: Floating Quick Booking Search Card */}
          <div className="w-full lg:w-[320px] shrink-0 bg-[#083522]/95 border border-[#16563A] rounded-[16px] p-5 sm:p-6 shadow-xl backdrop-blur-xs flex flex-col gap-4">
            <h2 className="font-grotesque font-bold text-[18px] text-white tracking-tight">
              {bookCardTitle}
            </h2>

            <form onSubmit={handleSearch} className="flex flex-col gap-3">
              {/* Location Selector */}
              <div className="relative">
                <div className="flex items-center gap-2.5 bg-white text-[#222325] rounded-[8px] px-3.5 py-2.5 text-[14px] font-medium border border-[#DADBDD] shadow-2xs">
                  <MapPin className="w-4 h-4 text-[#74767E] shrink-0" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-transparent focus:outline-none appearance-none cursor-pointer pr-5 text-[#222325]"
                  >
                    {GHANA_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc} className="text-[#222325]">
                        {loc}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#74767E] absolute right-3 pointer-events-none" />
                </div>
              </div>

              {/* Date Selector */}
              <div className="relative">
                <div className="flex items-center gap-2.5 bg-white text-[#222325] rounded-[8px] px-3.5 py-2.5 text-[14px] font-medium border border-[#DADBDD] shadow-2xs">
                  <Calendar className="w-4 h-4 text-[#74767E] shrink-0" />
                  <input
                    type="text"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    placeholder="Preferred Date"
                    className="w-full bg-transparent focus:outline-none text-[#222325]"
                  />
                  <ChevronDown className="w-4 h-4 text-[#74767E] shrink-0 pointer-events-none" />
                </div>
              </div>

              {/* Search CTA */}
              <button
                type="submit"
                className="w-full bg-[#1DBF73] hover:bg-[#19A463] text-white font-semibold text-[15px] py-3 rounded-[8px] transition-colors shadow-sm cursor-pointer mt-1"
              >
                Search
              </button>
            </form>
          </div>

          {/* Center: Title, Subtitle, Video Link */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-3.5 max-w-[460px]">
            <h1 className="font-grotesque font-extrabold text-[42px] sm:text-[50px] lg:text-[56px] leading-[1.05] text-white tracking-tight">
              {categoryTitle}
            </h1>
            <p className="text-[16px] sm:text-[18px] text-white/85 font-normal max-w-md">
              {subtitle}
            </p>

            <button
              type="button"
              onClick={() => setShowHowItWorksModal(true)}
              className="inline-flex items-center gap-2.5 border border-white/40 bg-white/10 hover:bg-white/20 text-white text-[14px] font-medium px-5 py-2.5 rounded-full transition-all mt-2 cursor-pointer backdrop-blur-xs"
            >
              <div className="w-5 h-5 rounded-full bg-white text-[#072F1D] flex items-center justify-center">
                <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
              </div>
              <span>How Fix it Works</span>
            </button>
          </div>

          {/* Right: Category Hero Art (Matching 4.png clean bucket, spray bottle, mop) */}
          <div className="relative w-full sm:w-[320px] lg:w-[360px] aspect-[4/3] flex items-center justify-center shrink-0">
            <div className="relative w-full h-full rounded-[16px] overflow-hidden flex items-center justify-center">
              <Image
                src={
                  heroImageUrl ||
                  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=80"
                }
                alt={`${categoryTitle} services in Ghana`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 360px"
                className="object-cover rounded-[16px] brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#072F1D]/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Modal Dialog */}
      {showHowItWorksModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
        >
          <div className="bg-white rounded-[16px] max-w-md w-full p-6 text-[#222325] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-grotesque font-bold text-[20px] mb-3">
              How Fix it Works
            </h3>
            <ul className="space-y-3 text-[14px] text-[#404145] mb-6">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#E8F8F0] text-[#008744] font-bold text-[12px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <span>Select your required service and preferred time in Ghana.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#E8F8F0] text-[#008744] font-bold text-[12px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <span>Compare verified local trade professionals and package prices in GHS.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#E8F8F0] text-[#008744] font-bold text-[12px] flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <span>Chat directly, track job progress, and pay safely through verified server escrow.</span>
              </li>
            </ul>
            <button
              type="button"
              onClick={() => setShowHowItWorksModal(false)}
              className="w-full py-2.5 bg-[#003912] hover:bg-[#00280D] text-white font-medium text-[14px] rounded-[8px] transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
