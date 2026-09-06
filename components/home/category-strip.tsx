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
    { label: "Plumbing", icon: Wrench, href: "/categories/plumbing" },
    { label: "Cleaning", icon: Sparkles, href: "/categories/cleaning" },
    { label: "Electrical", icon: Zap, href: "/categories/electrical-repairs" },
    { label: "Painting", icon: Paintbrush, href: "/categories/painting-decorating" },
    { label: "Moving", icon: Truck, href: "/categories/moving-relocation" },
    { label: "Assembly", icon: Hammer, href: "/categories/furniture-assembly" },
    { label: "Gardening", icon: Leaf, href: "/categories/gardening-landscaping" },
    { label: "Repairs", icon: Settings, href: "/categories/appliance-home-repairs" },
    { label: "More Services", icon: LayoutGrid, href: "/search" },
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
