"use client";

import * as React from "react";
import { Star, Search, ChevronDown } from "lucide-react";

interface CustomerReview {
  id: string;
  name: string;
  avatarLetter: string;
  avatarBg: string;
  rating: number;
  location: string;
  timeAgo: string;
  comment: string;
}

const DEFAULT_REVIEWS: CustomerReview[] = [
  {
    id: "rev-1",
    name: "Ama K.",
    avatarLetter: "A",
    avatarBg: "bg-[#71717A]",
    rating: 5.0,
    location: "Accra",
    timeAgo: "2 weeks ago",
    comment:
      "Very thorough and professional. My house looks and smells so fresh. Great attention to detail.",
  },
  {
    id: "rev-2",
    name: "Kofi M.",
    avatarLetter: "K",
    avatarBg: "bg-[#831843]",
    rating: 5.0,
    location: "Tema",
    timeAgo: "1 month ago",
    comment:
      "Punctual, friendly and did an excellent job. Highly recommend!",
  },
  {
    id: "rev-3",
    name: "Efua S.",
    avatarLetter: "E",
    avatarBg: "bg-[#9D174D]",
    rating: 4.0,
    location: "Accra",
    timeAgo: "1 month ago",
    comment: "Good service and clear communication. Will book again.",
  },
  {
    id: "rev-4",
    name: "Daniel A.",
    avatarLetter: "D",
    avatarBg: "bg-[#991B1B]",
    rating: 5.0,
    location: "East Legon",
    timeAgo: "2 months ago",
    comment: "Reliable and hardworking. My apartment was spotless.",
  },
];

export function ServiceReviews() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [starFilter, setStarFilter] = React.useState<string>("all");
  const [visibleCount, setVisibleCount] = React.useState(4);

  const filteredReviews = DEFAULT_REVIEWS.filter((rev) => {
    const matchesSearch =
      rev.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rev.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStar =
      starFilter === "all" || rev.rating >= parseFloat(starFilter);
    return matchesSearch && matchesStar;
  });

  return (
    <div className="rounded-[16px] border border-[#E5E7EB] p-6 sm:p-7 bg-white shadow-xs flex flex-col gap-6">
      <h3 className="font-grotesque font-bold text-[20px] text-[#222325]">
        Customer reviews
      </h3>

      {/* Score and Stars Header */}
      <div className="flex items-center gap-3">
        <span className="font-grotesque font-bold text-[36px] sm:text-[40px] leading-none text-[#222325]">
          4.9
        </span>
        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-[#008744]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="text-[12px] text-[#74767E] mt-0.5">
            Based on 24 reviews
          </span>
        </div>
      </div>

      {/* Distribution Bars matching 5.png */}
      <div className="flex flex-col gap-1.5 text-[12px] text-[#62646A]">
        {/* 5 star */}
        <div className="flex items-center gap-2">
          <span className="w-8">5 star</span>
          <div className="flex-1 h-2 rounded-full bg-[#E5E7EB] overflow-hidden">
            <div className="h-full bg-[#0B3B24] rounded-full" style={{ width: "83%" }} />
          </div>
          <span className="w-4 text-right">20</span>
        </div>

        {/* 4 star */}
        <div className="flex items-center gap-2">
          <span className="w-8">4 star</span>
          <div className="flex-1 h-2 rounded-full bg-[#E5E7EB] overflow-hidden">
            <div className="h-full bg-[#0B3B24] rounded-full" style={{ width: "13%" }} />
          </div>
          <span className="w-4 text-right">3</span>
        </div>

        {/* 3 star */}
        <div className="flex items-center gap-2">
          <span className="w-8">3 star</span>
          <div className="flex-1 h-2 rounded-full bg-[#E5E7EB] overflow-hidden">
            <div className="h-full bg-[#0B3B24] rounded-full" style={{ width: "4%" }} />
          </div>
          <span className="w-4 text-right">1</span>
        </div>

        {/* 2 star */}
        <div className="flex items-center gap-2">
          <span className="w-8">2 star</span>
          <div className="flex-1 h-2 rounded-full bg-[#E5E7EB] overflow-hidden">
            <div className="h-full bg-[#0B3B24] rounded-full" style={{ width: "0%" }} />
          </div>
          <span className="w-4 text-right">0</span>
        </div>

        {/* 1 star */}
        <div className="flex items-center gap-2">
          <span className="w-8">1 star</span>
          <div className="flex-1 h-2 rounded-full bg-[#E5E7EB] overflow-hidden">
            <div className="h-full bg-[#0B3B24] rounded-full" style={{ width: "0%" }} />
          </div>
          <span className="w-4 text-right">0</span>
        </div>
      </div>

      {/* Filter and Search Bar matching 5.png */}
      <div className="flex items-center gap-2 pt-2">
        <div className="relative">
          <select
            value={starFilter}
            onChange={(e) => setStarFilter(e.target.value)}
            className="appearance-none h-[38px] pl-3 pr-8 rounded-[8px] border border-[#E5E7EB] text-[13px] font-medium text-[#222325] bg-white focus:outline-none focus:border-[#222325] cursor-pointer"
          >
            <option value="all">All reviews</option>
            <option value="5">5 stars</option>
            <option value="4">4+ stars</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#74767E] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reviews..."
            className="w-full h-[38px] pl-8 pr-3 rounded-[8px] border border-[#E5E7EB] text-[13px] text-[#222325] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#222325]"
          />
          <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Reviews List */}
      <div className="divide-y divide-[#F3F4F6] pt-1">
        {filteredReviews.slice(0, visibleCount).map((rev) => (
          <div key={rev.id} className="py-4 first:pt-2 last:pb-0 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-full ${rev.avatarBg} text-white font-bold flex items-center justify-center text-[12px]`}
                >
                  {rev.avatarLetter}
                </div>
                <span className="font-semibold text-[14px] text-[#222325]">
                  {rev.name}
                </span>
                <div className="flex items-center gap-0.5 text-[#008744]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < rev.rating ? "fill-current" : "text-[#E5E7EB]"
                      }`}
                    />
                  ))}
                  <span className="font-bold text-[12px] text-[#222325] ml-1">
                    {rev.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-[12px] text-[#74767E]">
              {rev.location} · {rev.timeAgo}
            </div>

            <p className="text-[13px] leading-[20px] text-[#404145]">
              {rev.comment}
            </p>
          </div>
        ))}
      </div>

      {/* Show more reviews CTA matching 5.png */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setVisibleCount((prev) => prev + 4)}
          className="w-full py-2.5 rounded-[8px] border border-[#222325] text-[#222325] font-semibold text-[13px] hover:bg-[#F7F7F7] transition-colors cursor-pointer"
        >
          Show more reviews
        </button>
        <p className="text-[11px] text-[#74767E] text-center mt-3">
          These are illustrative reviews from real customers on Fix it.
        </p>
      </div>
    </div>
  );
}
