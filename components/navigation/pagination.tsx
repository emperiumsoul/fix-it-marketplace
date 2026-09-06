"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage = 1,
  totalPages = 3,
  onPageChange,
  className = "",
}: PaginationProps) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`.trim()}>
      {/* Prev */}
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange?.(currentPage - 1)}
        aria-label="Previous page"
        className="w-9 h-9 rounded-[8px] border border-[#DADBDD] flex items-center justify-center text-[#222325] hover:bg-[#F7F7F7] disabled:text-[#DADBDD] disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Pages */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange?.(page)}
            aria-current={isActive ? "page" : undefined}
            className={`w-9 h-9 rounded-[8px] text-[14px] font-medium transition-colors ${
              isActive
                ? "bg-[#003912] text-white"
                : "border border-[#DADBDD] text-[#222325] hover:bg-[#F7F7F7]"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
        aria-label="Next page"
        className="w-9 h-9 rounded-[8px] border border-[#DADBDD] flex items-center justify-center text-[#222325] hover:bg-[#F7F7F7] disabled:text-[#DADBDD] disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
