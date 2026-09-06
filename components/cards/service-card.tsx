"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Star } from "lucide-react";

export interface ServiceCardProps {
  id?: string;
  slug?: string;
  title: string;
  category?: string;
  providerName?: string;
  price: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  location: string;
  imageUrl?: string;
  isSample?: boolean;
  onSave?: (saved: boolean) => void;
}

export function ServiceCard({
  id,
  slug,
  title = "Home cleaning",
  category,
  providerName,
  price = 150,
  currency = "GH₵",
  rating = 4.8,
  reviewCount = 120,
  location = "Accra",
  imageUrl = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
  isSample = true,
  onSave,
}: ServiceCardProps) {
  const [saved, setSaved] = React.useState(false);

  const handleToggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextSaved = !saved;
    setSaved(nextSaved);
    onSave?.(nextSaved);
  };

  return (
    <div
      id={id}
      data-service-id={id}
      className="group relative flex flex-col bg-white border border-[#DADBDD] rounded-[12px] overflow-hidden hover:border-[#62646A] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)] w-full"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-[4/3] bg-[#F7F7F7] overflow-hidden">
        {slug ? (
          <Link href={`/services/${slug}`} className="block relative w-full h-full">
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
          </Link>
        ) : (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        )}
        {/* Heart Save Button */}
        <button
          type="button"
          onClick={handleToggleSave}
          aria-label={saved ? "Remove from saved" : "Save service"}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#222325] hover:bg-white hover:scale-105 transition-all shadow-xs z-10 cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              saved ? "fill-[#B42318] text-[#B42318]" : "text-[#222325]"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        {category && (
          <span className="text-[11px] font-semibold text-[#008744] uppercase tracking-wider">
            {category}
          </span>
        )}
        <h3 className="font-grotesque font-bold text-[16px] leading-[22px] text-[#222325] line-clamp-1">
          {slug ? (
            <Link href={`/services/${slug}`} className="hover:text-[#008744] transition-colors">
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>

        {providerName && (
          <div className="text-[13px] text-[#62646A] -mt-1">
            By <span className="font-medium text-[#222325]">{providerName}</span>
          </div>
        )}

        <div className="flex items-baseline gap-1 text-[14px] leading-[20px]">
          <span className="text-[#62646A]">From</span>
          <span className="font-bold text-[#222325]">
            {currency}{price}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[13px] leading-[18px]">
          <Star className="w-3.5 h-3.5 fill-[#EAB308] text-[#EAB308]" />
          <span className="font-semibold text-[#222325]">{rating}</span>
          <span className="text-[#74767E]">({reviewCount})</span>
        </div>

        {isSample && (
          <div className="text-[12px] leading-[16px] text-[#74767E]">
            Sample listing
          </div>
        )}

        <div className="flex items-center gap-1.5 text-[13px] leading-[18px] text-[#62646A] pt-1 border-t border-[#F3F4F6]">
          <MapPin className="w-3.5 h-3.5 text-[#74767E]" />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
}
