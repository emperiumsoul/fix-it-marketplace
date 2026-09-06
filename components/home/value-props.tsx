"use client";

import * as React from "react";
import Link from "next/link";
import { MapPin, Users, Calendar, ShieldCheck } from "lucide-react";
import { SignUpButton, Show } from "@clerk/nextjs";

export function ValueProps() {
  const props = [
    {
      icon: MapPin,
      title: "Find help near you",
      description: "Discover trusted professionals in your area",
    },
    {
      icon: Users,
      title: "Choose your professional",
      description: "Compare skills, reviews and prices",
    },
    {
      icon: Calendar,
      title: "Book a convenient time",
      description: "Schedule when it works for you",
    },
    {
      icon: ShieldCheck,
      title: "Pay securely",
      description: "Safe and secure payments on Fix it",
    },
  ];

  return (
    <section className="w-full py-12 bg-white border-t border-[#DADBDD]">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col gap-10">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="font-grotesque font-bold text-[24px] sm:text-[30px] leading-[38px] text-[#222325]">
            Make it all happen with local professionals
          </h2>

          <Show when="signed-out">
            <SignUpButton mode="modal">
              <button
                type="button"
                className="inline-flex items-center justify-center bg-[#222325] hover:bg-black text-white text-[14px] font-medium h-[40px] px-5 rounded-[8px] transition-colors shrink-0 cursor-pointer"
              >
                Join now
              </button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <Link
              href="/search"
              className="inline-flex items-center justify-center bg-[#222325] hover:bg-black text-white text-[14px] font-medium h-[40px] px-5 rounded-[8px] transition-colors shrink-0"
            >
              Explore Services
            </Link>
          </Show>
        </div>

        {/* 4 Feature Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {props.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full border border-[#DADBDD] bg-[#F7F7F7] flex items-center justify-center text-[#222325]">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-grotesque font-bold text-[16px] leading-[22px] text-[#222325]">
                  {p.title}
                </h3>
                <p className="text-[14px] leading-[20px] text-[#62646A] max-w-[220px]">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
