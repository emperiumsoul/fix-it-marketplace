"use client";

import * as React from "react";
import Link from "next/link";

export function ServiceRelatedTags() {
  const tags = [
    { label: "House Cleaning", href: "/search?q=house+cleaning" },
    { label: "Deep Cleaning", href: "/search?q=deep+cleaning" },
    { label: "Regular Cleaning", href: "/search?q=regular+cleaning" },
    { label: "Move-out Cleaning", href: "/search?q=move-out+cleaning" },
  ];

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-grotesque font-bold text-[18px] text-[#222325]">
        Related tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <Link
            key={idx}
            href={tag.href}
            className="px-3.5 py-1.5 rounded-full border border-[#E5E7EB] bg-white hover:border-[#222325] text-[13px] font-medium text-[#404145] hover:text-[#222325] transition-colors"
          >
            {tag.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
