import * as React from "react";
import Link from "next/link";
import {
  Wrench,
  Sparkles,
  Zap,
  Paintbrush,
  Truck,
  Hammer,
  Leaf,
  Settings,
  LayoutGrid,
} from "lucide-react";

export function CategoryStrip() {
  const categories = [
    { label: "Plumbing", icon: Wrench, href: "/search?category=plumbing" },
    { label: "Cleaning", icon: Sparkles, href: "/search?category=cleaning" },
    { label: "Electrical", icon: Zap, href: "/search?category=electrical" },
    { label: "Painting", icon: Paintbrush, href: "/search?category=painting" },
    { label: "Moving", icon: Truck, href: "/search?category=moving" },
    { label: "Assembly", icon: Hammer, href: "/search?category=assembly" },
    { label: "Gardening", icon: Leaf, href: "/search?category=gardening" },
    { label: "Repairs", icon: Settings, href: "/search?category=repairs" },
    { label: "More Services", icon: LayoutGrid, href: "/categories" },
  ];

  return (
    <section className="w-full py-8 border-b border-[#DADBDD] bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.label}
                href={cat.href}
                className="flex flex-col items-center justify-center p-3 rounded-[8px] border border-[#DADBDD] bg-white hover:border-[#003912] hover:bg-[#F3FDF9] transition-all gap-2 text-center group"
              >
                <div className="text-[#404145] group-hover:text-[#003912] transition-colors">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <span className="text-[12px] leading-[16px] font-medium text-[#222325] group-hover:text-[#003912] transition-colors">
                  {cat.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
