import * as React from "react";
import Image from "next/image";
import Link from "next/link";

export function BigProjectBanner() {
  const pros = [
    {
      name: "The Visionaries",
      label: "Real Stories",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Billy Brennan",
      label: "Master Electrician",
      imageUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Marc Austin",
      label: "Lead Contractor",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Joey Seko",
      label: "Plumbing Specialist",
      imageUrl:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <section className="w-full py-6">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="relative w-full rounded-[16px] bg-[#0A0A0A] p-8 md:p-12 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 shadow-lg border border-white/10">
          {/* Left Content */}
          <div className="flex flex-col items-start gap-4 max-w-md z-10">
            <h2 className="font-grotesque font-bold text-[30px] sm:text-[36px] leading-[1.18] text-white">
              Big home project? <br />
              We handle it.
            </h2>
            <p className="text-[15px] leading-[22px] text-[#A1A1AA]">
              Find local professionals for cleaning, repairs, moving and more.
            </p>
            <Link
              href="/search"
              className="mt-2 inline-flex items-center justify-center bg-white hover:bg-[#F3F4F6] text-[#222325] font-semibold text-[14px] h-[40px] px-6 rounded-[8px] transition-colors"
            >
              Explore services
            </Link>
          </div>

          {/* Right Provider Portraits Strip */}
          <div className="flex items-center gap-3 overflow-x-auto max-w-full pb-2">
            {pros.map((pro) => (
              <div
                key={pro.name}
                className="relative w-[110px] sm:w-[125px] h-[170px] sm:h-[190px] rounded-[10px] overflow-hidden bg-[#1F1F1F] border border-white/20 shrink-0 group flex flex-col justify-end p-2.5"
              >
                <Image
                  src={pro.imageUrl}
                  alt={pro.name}
                  fill
                  sizes="125px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="relative z-10 flex flex-col text-white">
                  <span className="font-grotesque font-bold text-[12px] leading-[15px] truncate">
                    {pro.name}
                  </span>
                  <span className="text-[10px] text-white/70 truncate">
                    {pro.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
