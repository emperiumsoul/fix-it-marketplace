"use client";

import * as React from "react";
import Image from "next/image";

export function ServiceRecentProjects() {
  const projects = [
    {
      url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
      alt: "Kitchen and living room refresh",
      title: "Kitchen and living-room refresh",
      subtitle: "A cleaner, brighter space.",
      hasOverlay: true,
    },
    {
      url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
      alt: "Bathroom clean and polish",
      hasOverlay: false,
    },
    {
      url: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=600&q=80",
      alt: "Cleaning supplies in bright hallway",
      hasOverlay: false,
    },
    {
      url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80",
      alt: "Bedrooms organized and tidied",
      hasOverlay: false,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-grotesque font-bold text-[20px] text-[#222325]">
        Recent cleaning projects
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {/* Project 1: Wide card with badge */}
        <div className="relative col-span-2 aspect-[16/9] sm:aspect-[16/10] rounded-[12px] overflow-hidden bg-[#F7F7F7] border border-[#E5E7EB]">
          <Image
            src={projects[0].url}
            alt={projects[0].alt}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
          {/* Green banner overlay matching 5.png */}
          <div className="absolute bottom-0 inset-x-0 bg-[#0B3B24]/90 backdrop-blur-xs p-3 sm:p-4 text-white">
            <h4 className="font-grotesque font-bold text-[14px] sm:text-[15px] leading-snug text-white">
              {projects[0].title}
            </h4>
            <p className="text-[12px] text-[#A7F3D0]">
              {projects[0].subtitle}
            </p>
          </div>
        </div>

        {/* Project 2 */}
        <div className="relative aspect-[4/3] sm:aspect-auto rounded-[12px] overflow-hidden bg-[#F7F7F7] border border-[#E5E7EB]">
          <Image
            src={projects[1].url}
            alt={projects[1].alt}
            fill
            sizes="200px"
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Project 3 */}
        <div className="relative aspect-[4/3] sm:aspect-auto rounded-[12px] overflow-hidden bg-[#F7F7F7] border border-[#E5E7EB]">
          <Image
            src={projects[2].url}
            alt={projects[2].alt}
            fill
            sizes="200px"
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
}
