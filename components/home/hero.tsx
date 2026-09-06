"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";

export function Hero() {
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  const quickServices = [
    { label: "Plumbing", href: "/categories/plumbing" },
    { label: "House Cleaning", href: "/categories/cleaning" },
    { label: "Electrical Repairs", href: "/categories/electrical-repairs" },
    { label: "Painting", href: "/categories/painting-decorating" },
    { label: "Moving", href: "/categories/moving-relocation" },
  ];

  const popularLocations = ["Accra", "Kumasi", "Tema", "Takoradi"];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative w-full min-h-[540px] md:min-h-[580px] flex items-center justify-center overflow-hidden bg-[#171717]">
      {/* Background Image with dark overlay */}
      <Image
        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=80"
        alt="Local professionals at work"
        fill
        priority
        className="object-cover object-center opacity-40 mix-blend-luminosity scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/40 to-black/60" />

      {/* Content Container */}
      <div className="relative z-10 max-w-[1280px] w-full mx-auto px-6 py-16 flex flex-col items-start gap-6">
        {/* Main Headline */}
        <h1 className="font-grotesque font-bold text-[36px] sm:text-[46px] md:text-[54px] leading-[1.12] text-white max-w-2xl tracking-tight">
          Our local professionals <br />
          will take it from here
        </h1>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-2xl flex items-center bg-white rounded-[8px] p-1.5 shadow-xl border border-white/20"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What service do you need?"
            className="flex-1 px-4 py-3 text-[16px] text-[#222325] placeholder-[#74767E] bg-transparent focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Search"
            className="w-12 h-12 rounded-[6px] bg-[#222325] hover:bg-[#003912] text-white flex items-center justify-center transition-colors shrink-0"
          >
            <Search className="w-5 h-5 stroke-[2]" />
          </button>
        </form>

        {/* Quick Service Pills */}
        <div className="flex items-center gap-2.5 flex-wrap pt-1">
          {quickServices.map((svc) => (
            <Link
              key={svc.label}
              href={svc.href}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white text-[13px] font-medium transition-all hover:border-white/40"
            >
              <span>{svc.label}</span>
              <ArrowRight className="w-3 h-3 text-white/80" />
            </Link>
          ))}
        </div>

        {/* Popular Locations */}
        <div className="flex items-center gap-3 text-[13px] text-white/80 pt-2 flex-wrap">
          <span className="text-white/60">Find help across Ghana:</span>
          {popularLocations.map((loc) => (
            <Link
              key={loc}
              href={`/search?location=${encodeURIComponent(loc)}`}
              className="text-white font-medium hover:underline hover:text-[#3DD6F2] transition-colors"
            >
              {loc}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
