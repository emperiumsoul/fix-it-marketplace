"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Check, ShieldCheck, Sparkles, Clock } from "lucide-react";

export interface GalleryImage {
  url: string;
  alt: string;
}

export interface ServiceGalleryProps {
  images?: GalleryImage[];
}

const DEFAULT_IMAGES: GalleryImage[] = [
  {
    url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
    alt: "Bright modern living room cleaned with cleaning bucket and supplies",
  },
  {
    url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    alt: "Spotless modern kitchen countertops",
  },
  {
    url: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80",
    alt: "Kitchen and dining space deep cleaned",
  },
  {
    url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    alt: "Pristine bathroom with shining tiles",
  },
  {
    url: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80",
    alt: "Vacuum cleaner on living room floor",
  },
  {
    url: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=800&q=80",
    alt: "Eco-friendly cleaning supplies and caddy",
  },
  {
    url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
    alt: "Tidied master bedroom and fresh linens",
  },
];

export function ServiceGallery({ images = DEFAULT_IMAGES }: ServiceGalleryProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeImage = images[activeIndex] || images[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Container */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/10] rounded-[16px] overflow-hidden bg-[#F7F7F7] border border-[#E5E7EB]">
        <Image
          src={activeImage.url}
          alt={activeImage.alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
          className="object-cover transition-all duration-300"
        />

        {/* Branded Promotional Badge overlay matching 5.png */}
        <div className="absolute top-6 left-6 z-10 bg-[#0B3B24]/95 backdrop-blur-md text-white p-5 sm:p-6 rounded-[14px] max-w-[240px] sm:max-w-[260px] shadow-lg pointer-events-none">
          <h2 className="font-grotesque font-bold text-[20px] sm:text-[24px] leading-tight text-white mb-1">
            Home cleaning
          </h2>
          <p className="text-[13px] sm:text-[14px] text-[#A7F3D0] mb-4 leading-snug">
            A cleaner home. A happier you.
          </p>

          <ul className="space-y-2 text-[13px] font-medium text-white/95">
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#10B981] flex items-center justify-center text-white shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
              <span>Reliable</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#10B981] flex items-center justify-center text-white shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
              <span>Detail oriented</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#10B981] flex items-center justify-center text-white shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
              <span>Sparkling results</span>
            </li>
          </ul>
        </div>

        {/* Carousel Arrow Controls */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#222325] shadow-md flex items-center justify-center transition-all cursor-pointer z-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next image"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#222325] shadow-md flex items-center justify-center transition-all cursor-pointer z-10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnails Row matching 5.png */}
      <div className="grid grid-cols-6 gap-2 sm:gap-3">
        {images.slice(0, 6).map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={`relative aspect-[4/3] rounded-[8px] overflow-hidden transition-all cursor-pointer ${
              activeIndex === idx
                ? "ring-2 ring-[#222325] opacity-100 shadow-xs"
                : "opacity-70 hover:opacity-100 ring-1 ring-[#E5E7EB]"
            }`}
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              sizes="120px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* 3 Service Highlights matching 5.png */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#F3F4F6]">
        <div className="flex items-center gap-3 p-3 rounded-[10px] bg-[#F9FAFB]">
          <div className="w-8 h-8 rounded-full bg-[#E8F8F0] text-[#008744] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 stroke-[2]" />
          </div>
          <span className="text-[13px] font-medium text-[#222325]">
            Regular and deep cleaning options
          </span>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-[10px] bg-[#F9FAFB]">
          <div className="w-8 h-8 rounded-full bg-[#E8F8F0] text-[#008744] flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 stroke-[2]" />
          </div>
          <span className="text-[13px] font-medium text-[#222325]">
            Kitchen, bathroom and living-space cleaning
          </span>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-[10px] bg-[#F9FAFB]">
          <div className="w-8 h-8 rounded-full bg-[#E8F8F0] text-[#008744] flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 stroke-[2]" />
          </div>
          <span className="text-[13px] font-medium text-[#222325]">
            Choose a convenient date and time
          </span>
        </div>
      </div>
    </div>
  );
}
