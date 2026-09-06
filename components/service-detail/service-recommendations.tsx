"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart } from "lucide-react";
import { RecommendedServiceItem } from "./types";

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

export interface ServiceRecommendationsProps {
  relatedServices?: RecommendedServiceItem[];
  categoryTitle?: string;
}

export function ServiceRecommendations({
  relatedServices = [],
  categoryTitle = "Cleaning",
}: ServiceRecommendationsProps) {
  // Default fallback recommendation sets
  const defaultRecommended: RecommendedServiceItem[] = [
    {
      slug: "sample-deep-home-cleaning-sanitization",
      title: "Full House Deep Cleaning & Sanitization",
      rating: 4.9,
      reviews: 28,
      price: 450,
      imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
    },
    {
      slug: "sample-routine-home-cleaning",
      title: "Routine Weekly Home Maintenance",
      rating: 4.8,
      reviews: 19,
      price: 220,
      imageUrl: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const defaultMoreServices: RecommendedServiceItem[] = [
    {
      slug: "sample-residential-plumbing-leak-repair",
      title: "Residential Plumbing & Leak Repair",
      rating: 4.9,
      reviews: 34,
      price: 180,
      imageUrl: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=600&q=80",
    },
    {
      slug: "sample-electrical-fault-finding-repairs",
      title: "Electrical Fault Diagnostics & Rewiring",
      rating: 4.8,
      reviews: 22,
      price: 150,
      imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
    },
    {
      slug: "sample-interior-exterior-painting",
      title: "Interior & Exterior Wall Painting",
      rating: 4.9,
      reviews: 17,
      price: 400,
      imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const defaultPeopleViewed: RecommendedServiceItem[] = [
    {
      slug: "sample-furniture-assembly-tv-mounting",
      title: "Flat-Pack Furniture Assembly & TV Mounting",
      rating: 4.8,
      reviews: 15,
      price: 150,
      imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
    },
    {
      slug: "sample-lawn-mowing-gardening-care",
      title: "Lawn Mowing & Compound Landscaping",
      rating: 4.7,
      reviews: 12,
      price: 160,
      imageUrl: "https://images.unsplash.com/photo-1557429287-b2e26467fc2b?auto=format&fit=crop&w=600&q=80",
    },
    {
      slug: "sample-residential-moving-transport",
      title: "Residential Home Moving & Packing",
      rating: 4.9,
      reviews: 26,
      price: 600,
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const firstTwo = relatedServices.length >= 2 ? relatedServices.slice(0, 2) : defaultRecommended;
  const nextThree = relatedServices.length >= 5 ? relatedServices.slice(2, 5) : defaultMoreServices;
  const lastThree = relatedServices.length >= 8 ? relatedServices.slice(5, 8) : defaultPeopleViewed;

  return (
    <div className="flex flex-col gap-10">
      {/* Recommended for you matching 5.png */}
      <div className="flex flex-col gap-4">
        <h3 className="font-grotesque font-bold text-[20px] text-[#222325]">
          Recommended for you
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {firstTwo.map((service, idx) => (
            <MiniServiceCard key={idx} {...service} />
          ))}
        </div>
      </div>

      {/* More {category} services matching 5.png */}
      <div className="flex flex-col gap-4">
        <h3 className="font-grotesque font-bold text-[20px] text-[#222325]">
          More {categoryTitle.toLowerCase()} services
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {nextThree.map((service, idx) => (
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
          {lastThree.map((service, idx) => (
            <MiniServiceCard key={idx} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
}
