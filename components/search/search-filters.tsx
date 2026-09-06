"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, RotateCcw } from "lucide-react";

export interface CategoryOption {
  title: string;
  slug: string;
}

export interface SearchFiltersProps {
  categories: CategoryOption[];
  currentCategory?: string;
  currentLocation?: string;
  currentMinPrice?: string;
  currentMaxPrice?: string;
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

export function SearchFilters({
  categories = [],
  currentCategory = "",
  currentLocation = "",
  currentMinPrice = "",
  currentMaxPrice = "",
}: SearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const updateParam = (key: string, value: string | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value.trim() !== "") {
      params.set(key, value.trim());
    } else {
      params.delete(key);
    }
    router.push(`/search?${params.toString()}`);
  };

  const handlePriceApply = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const minVal = formData.get("minPrice")?.toString().trim();
    const maxVal = formData.get("maxPrice")?.toString().trim();

    const params = new URLSearchParams(searchParams.toString());
    if (minVal) params.set("minPrice", minVal);
    else params.delete("minPrice");

    if (maxVal) params.set("maxPrice", maxVal);
    else params.delete("maxPrice");

    router.push(`/search?${params.toString()}`);
  };

  const handleResetFilters = () => {
    const params = new URLSearchParams();
    const q = searchParams.get("q");
    if (q) params.set("q", q);
    router.push(`/search?${params.toString()}`);
  };

  const hasActiveFilters = Boolean(
    currentCategory || currentLocation || currentMinPrice || currentMaxPrice
  );

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden w-full flex items-center justify-between pb-4 border-b border-[#E5E7EB] mb-6">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex items-center gap-2 px-4 py-2 border border-[#DADBDD] rounded-[8px] text-[14px] font-medium text-[#222325] bg-white shadow-2xs cursor-pointer"
        >
          <Filter className="w-4 h-4 text-[#74767E]" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-[#008744]" />
          )}
        </button>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-[13px] text-[#74767E] hover:text-[#222325] underline cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Sidebar Filter Container */}
      <aside
        className={`${
          mobileOpen ? "block" : "hidden"
        } lg:block w-full lg:w-[260px] shrink-0 space-y-6 bg-white lg:bg-transparent p-4 lg:p-0 rounded-[12px] border border-[#E5E7EB] lg:border-0 shadow-xs lg:shadow-none mb-6 lg:mb-0`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
          <h3 className="font-grotesque font-bold text-[16px] text-[#222325]">
            Filters
          </h3>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-[12px] font-medium text-[#74767E] hover:text-[#008744] cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Categories Filter */}
        <div className="space-y-2.5">
          <h4 className="font-grotesque font-bold text-[14px] text-[#222325]">
            Category
          </h4>
          <div className="space-y-1.5 text-[14px]">
            <button
              type="button"
              onClick={() => updateParam("category", undefined)}
              className={`w-full text-left py-1 px-2 rounded-md transition-colors cursor-pointer ${
                !currentCategory
                  ? "bg-[#E8F8F0] text-[#008744] font-semibold"
                  : "text-[#404145] hover:bg-[#F7F7F7]"
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => {
              const isSelected =
                currentCategory === cat.slug ||
                (currentCategory === "cleaning" && cat.slug === "house-cleaning");
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => updateParam("category", cat.slug)}
                  className={`w-full text-left py-1 px-2 rounded-md transition-colors cursor-pointer line-clamp-1 ${
                    isSelected
                      ? "bg-[#E8F8F0] text-[#008744] font-semibold"
                      : "text-[#404145] hover:bg-[#F7F7F7]"
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Location Filter */}
        <div className="space-y-2.5 pt-4 border-t border-[#E5E7EB]">
          <h4 className="font-grotesque font-bold text-[14px] text-[#222325]">
            Service Location
          </h4>
          <select
            value={currentLocation}
            onChange={(e) => updateParam("location", e.target.value)}
            className="w-full bg-white border border-[#DADBDD] rounded-[8px] px-3 py-2 text-[14px] text-[#222325] focus:outline-none focus:border-[#222325] cursor-pointer"
          >
            <option value="">All Locations in Ghana</option>
            {GHANA_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Budget Filter in GHS */}
        <div className="space-y-2.5 pt-4 border-t border-[#E5E7EB]">
          <h4 className="font-grotesque font-bold text-[14px] text-[#222325]">
            Budget (GHS)
          </h4>
          <form onSubmit={handlePriceApply} className="space-y-2.5">
            <div className="flex items-center gap-2">
              <input
                key={`min-${currentMinPrice}`}
                type="number"
                name="minPrice"
                placeholder="Min"
                defaultValue={currentMinPrice}
                className="w-1/2 bg-white border border-[#DADBDD] rounded-[8px] px-3 py-1.5 text-[14px] text-[#222325] placeholder:text-[#74767E] focus:outline-none focus:border-[#222325]"
                min={0}
              />
              <span className="text-[#74767E] text-[13px]">-</span>
              <input
                key={`max-${currentMaxPrice}`}
                type="number"
                name="maxPrice"
                placeholder="Max"
                defaultValue={currentMaxPrice}
                className="w-1/2 bg-white border border-[#DADBDD] rounded-[8px] px-3 py-1.5 text-[14px] text-[#222325] placeholder:text-[#74767E] focus:outline-none focus:border-[#222325]"
                min={0}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#222325] hover:bg-black text-white text-[13px] font-semibold rounded-[6px] transition-colors cursor-pointer"
            >
              Apply Price
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
