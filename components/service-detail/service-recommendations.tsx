"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart } from "lucide-react";

interface MiniServiceCardProps {
  slug: string;
  title: string;
  rating: number;
  reviews: number;
  price: number;
  imageUrl: string;
}

function MiniServiceCard({
  slug,
  title,
  rating,
  reviews,
  price,
  imageUrl,
}: MiniServiceCardProps) {
  const [saved, setSaved] = React.useState(false);

  return (
    <div className="group relative flex flex-col bg-white border border-[#E5E7EB] hover:border-[#DADBDD] rounded-[12px] overflow-hidden shadow-xs hover:shadow-sm transition-all">
      <div className="relative w-full aspect-[16/10] bg-[#F7F7F7] overflow-hidden">
        <Link href={`/services/${slug}`} className="block relative w-full h-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        </Link>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setSaved(!saved);
          }}
          aria-label={saved ? "Remove from saved" : "Save service"}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#222325] hover:bg-white hover:scale-105 transition-all shadow-xs cursor-pointer z-10"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              saved ? "fill-[#B42318] text-[#B42318]" : "text-[#222325]"
            }`}
          />
        </button>
      </div>

      <div className="p-3.5 flex flex-col gap-1.5">
        <h4 className="font-grotesque font-bold text-[14px] leading-snug text-[#222325] line-clamp-1 group-hover:text-[#008744] transition-colors">
          <Link href={`/services/${slug}`}>{title}</Link>
        </h4>

        <div className="flex items-center gap-1 text-[12px] leading-none">
          <Star className="w-3.5 h-3.5 fill-[#EAB308] text-[#EAB308]" />
          <span className="font-semibold text-[#222325]">{rating}</span>
          <span className="text-[#74767E]">({reviews})</span>
        </div>

        <div className="text-[13px] leading-none pt-1">
          <span className="text-[#74767E]">From </span>
          <span className="font-bold text-[#222325]">GH₵{price}</span>
        </div>
      </div>
    </div>
  );
}

export function ServiceRecommendations() {
  const recommendedServices = [
    {
      slug: "sofa-carpet-cleaning",
      title: "Sofa and carpet cleaning",
      rating: 4.8,
      reviews: 16,
      price: 200,
      imageUrl: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=600&q=80",
    },
    {
      slug: "move-in-out-cleaning",
      title: "Move-in and move-out cleaning",
      rating: 4.9,
      reviews: 26,
      price: 350,
      imageUrl: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const moreCleaningServices = [
    {
      slug: "general-home-cleaning",
      title: "General home cleaning",
      rating: 4.8,
      reviews: 32,
      price: 150,
      imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
    },
    {
      slug: "sofa-upholstery-cleaning",
      title: "Sofa and upholstery cleaning",
      rating: 4.7,
      reviews: 19,
      price: 200,
      imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    },
    {
      slug: "office-cleaning",
      title: "Office cleaning",
      rating: 4.8,
      reviews: 14,
      price: 250,
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const peopleAlsoViewed = [
    {
      slug: "bathroom-deep-cleaning",
      title: "Bathroom deep cleaning",
      rating: 4.8,
      reviews: 21,
      price: 180,
      imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
    },
    {
      slug: "window-cleaning",
      title: "Window cleaning",
      rating: 4.6,
      reviews: 12,
      price: 120,
      imageUrl: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80",
    },
    {
      slug: "end-of-tenancy-cleaning",
      title: "End of tenancy cleaning",
      rating: 4.9,
      reviews: 19,
      price: 300,
      imageUrl: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Recommended for you matching 5.png */}
      <div className="flex flex-col gap-4">
        <h3 className="font-grotesque font-bold text-[20px] text-[#222325]">
          Recommended for you
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recommendedServices.map((service, idx) => (
            <MiniServiceCard key={idx} {...service} />
          ))}
        </div>
      </div>

      {/* More cleaning services matching 5.png */}
      <div className="flex flex-col gap-4">
        <h3 className="font-grotesque font-bold text-[20px] text-[#222325]">
          More cleaning services
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {moreCleaningServices.map((service, idx) => (
            <MiniServiceCard key={idx} {...service} />
          ))}
        </div>
      </div>

      {/* People also viewed matching 5.png */}
      <div className="flex flex-col gap-4">
        <h3 className="font-grotesque font-bold text-[20px] text-[#222325]">
          People also viewed
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {peopleAlsoViewed.map((service, idx) => (
            <MiniServiceCard key={idx} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
}
