import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function ProBanner() {
  const benefits = [
    "Get matched with trusted local professionals",
    "Compare skills, reviews and prices",
    "Find reliable help for any home project",
  ];

  return (
    <section id="fix-it-pro" className="w-full py-6">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="relative w-full rounded-[16px] bg-[#003912] p-8 md:p-12 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 shadow-lg">
          {/* Left Content */}
          <div className="flex flex-col items-start gap-6 max-w-xl z-10">
            {/* Tag */}
            <div className="flex items-center gap-1">
              <span className="font-grotesque font-bold text-[22px] tracking-tight text-white">
                fix it pro
              </span>
              <span className="w-2 h-2 rounded-full bg-[#3DD6F2] inline-block mb-1" />
            </div>

            {/* Heading */}
            <h2 className="font-grotesque font-bold text-[30px] sm:text-[36px] leading-[1.18] text-white">
              Let experts find the right professional for you
            </h2>

            {/* Bullets */}
            <ul className="flex flex-col gap-2.5 text-[15px] text-white/90">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#3DD6F2] shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Link
              href="/search?pro=true"
              className="mt-2 inline-flex items-center justify-center bg-white hover:bg-[#F3FDF9] text-[#003912] font-semibold text-[14px] h-[44px] px-6 rounded-[8px] shadow-sm transition-colors"
            >
              Find a professional
            </Link>

            {/* Guarantee Badge */}
            <div className="flex items-center gap-2 text-white/90 text-[13px] pt-1">
              <ShieldCheck className="w-4 h-4 text-[#3DD6F2]" />
              <span>100% money-back guarantee</span>
            </div>
          </div>

          {/* Right Visual: Vetted Professional Mockup */}
          <div className="relative w-full lg:w-[480px] h-[320px] flex items-center justify-center">
            {/* Background layered cards */}
            <div className="absolute w-[180px] h-[240px] rounded-[12px] bg-white/10 backdrop-blur-xs border border-white/20 -translate-x-20 rotate-[-6deg] overflow-hidden opacity-60">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                alt="Professional"
                fill
                sizes="180px"
                className="object-cover"
              />
            </div>
            <div className="absolute w-[180px] h-[240px] rounded-[12px] bg-white/10 backdrop-blur-xs border border-white/20 translate-x-20 rotate-[6deg] overflow-hidden opacity-60">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
                alt="Professional"
                fill
                sizes="180px"
                className="object-cover"
              />
            </div>

            {/* Main Featured Card */}
            <div className="relative z-10 w-[210px] h-[270px] rounded-[12px] bg-[#1B3824] border border-white/30 shadow-2xl overflow-hidden flex flex-col justify-end p-3.5">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80"
                alt="Lilian · Home professional"
                fill
                sizes="210px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 flex flex-col gap-0.5 text-white">
                <span className="font-grotesque font-bold text-[14px]">Lilian</span>
                <span className="text-[12px] text-white/80">Home professional</span>
              </div>

              {/* Cursor accent */}
              <div className="absolute -bottom-1 -right-1 w-8 h-8 text-[#3DD6F2]">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 0l16 12-7 2-4 9-5-23z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
