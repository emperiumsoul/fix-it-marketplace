"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

export interface SearchSortProps {
  currentSort?: string;
}

export function SearchSort({ currentSort = "relevance" }: SearchSortProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextSort = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (nextSort && nextSort !== "relevance") {
      params.set("sort", nextSort);
    } else {
      params.delete("sort");
    }
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="relative inline-flex items-center gap-2">
      <span className="text-[13px] text-[#62646A] hidden sm:inline">Sort by:</span>
      <div className="relative">
        <select
          value={currentSort}
          onChange={handleSortChange}
          className="appearance-none bg-white border border-[#DADBDD] rounded-[8px] pl-3 pr-8 py-1.5 text-[13px] sm:text-[14px] font-medium text-[#222325] focus:outline-none focus:border-[#222325] cursor-pointer"
        >
          <option value="relevance">Most relevant</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
        <ChevronDown className="w-4 h-4 text-[#74767E] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
}
