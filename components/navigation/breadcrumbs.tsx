import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center gap-2 text-[14px] leading-[20px] ${className}`.trim()}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-[#62646A] hover:text-[#003912] transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "font-medium text-[#222325]" : "text-[#62646A]"}>
                {item.label}
              </span>
            )}
            {!isLast && (
              <ChevronRight className="w-3.5 h-3.5 text-[#DADBDD] shrink-0" />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
