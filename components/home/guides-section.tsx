import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function GuidesSection() {
  const guides = [
    {
      title: "Prepare your home for a cleaning",
      category: "Cleaning Tips",
      imageUrl:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      href: "#guide-cleaning",
    },
    {
      title: "Plan your next home project",
      category: "Home Improvement",
      imageUrl:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
      href: "#guide-planning",
    },
    {
      title: "Find the right professional",
      category: "Hiring Advice",
      imageUrl:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
      href: "#guide-hiring",
    },
  ];

  return (
    <section id="guides" className="w-full py-12 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col gap-6">
        {/* Header Row */}
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-grotesque font-bold text-[28px] sm:text-[32px] leading-[40px] text-[#222325]">
            Guides to help you at home
          </h2>
          <Link
            href="#all-guides"
            className="text-[14px] font-medium text-[#222325] hover:text-[#003912] flex items-center gap-1 transition-colors"
          >
            <span>See more guides</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Guide Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Link
              key={guide.title}
              href={guide.href}
              className="flex flex-col gap-3 group"
            >
              <div className="relative w-full aspect-[16/10] rounded-[12px] overflow-hidden bg-[#F7F7F7] border border-[#DADBDD]">
                <Image
                  src={guide.imageUrl}
                  alt={guide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-grotesque font-bold text-[16px] sm:text-[18px] leading-[24px] text-[#222325] group-hover:text-[#003912] transition-colors">
                {guide.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
