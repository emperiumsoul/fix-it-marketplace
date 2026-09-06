"use client";

import * as React from "react";
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Heart,
  Briefcase,
  User,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProgressBar, BookingStatusPill } from "@/components/ui/progress";
import { Callout } from "@/components/ui/callout";
import { ServiceCard } from "@/components/cards/service-card";
import {
  ProviderTaskCard,
  ProviderProfileCard,
} from "@/components/cards/provider-cards";
import { BookingCard } from "@/components/cards/booking-card";
import { CustomerNavbar, ProviderNavbar } from "@/components/navigation/navbar";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Pagination } from "@/components/navigation/pagination";

export default function DesignSystemPage() {
  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#404145] font-satoshi selection:bg-[#F3FDF9] selection:text-[#003912]">
      {/* Header Banner */}
      <section className="border-b border-[#DADBDD] bg-[#F7F7F7] py-12 px-6 sm:px-8">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <span className="font-grotesque font-bold text-[36px] sm:text-[44px] tracking-tight text-[#222325]">
                Fix it
              </span>
              <span className="w-3 h-3 rounded-full bg-[#003912] inline-block mb-1" />
              <span className="font-grotesque font-semibold text-[32px] sm:text-[40px] text-[#222325] ml-2">
                Design System
              </span>
            </div>
            <p className="text-[16px] sm:text-[18px] text-[#62646A] max-w-xl">
              A consistent foundation for finding and providing local services in
              Ghana.
            </p>
            <div className="text-[12px] font-medium tracking-wide uppercase text-[#74767E] pt-2">
              VERSION 1.0 · SEPTEMBER 2026
            </div>
          </div>

          <div className="bg-white border border-[#DADBDD] rounded-[12px] p-4 shadow-xs flex flex-col gap-1">
            <span className="font-grotesque font-bold text-[14px] text-[#222325]">
              Local People. Real Help.
            </span>
            <span className="text-[13px] text-[#003912] font-semibold flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-[#003912] rounded-full inline-block" />
              A Better Home.
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="max-w-[1280px] mx-auto px-6 sm:px-8 py-12 flex flex-col gap-16">
        {/* ================= 01 COLORS ================= */}
        <section id="colors" className="flex flex-col gap-6">
          <div className="border-b border-[#DADBDD] pb-3 flex items-baseline justify-between">
            <h2 className="font-grotesque font-bold text-[24px] text-[#222325]">
              <span className="text-[#74767E] mr-2">01</span> COLORS
            </h2>
            <span className="text-[13px] text-[#74767E]">
              Primary, Marketing Accents, Neutrals & Semantic tokens
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Primary Green */}
            <div className="flex flex-col gap-3 p-4 rounded-[12px] border border-[#DADBDD] bg-white">
              <h3 className="text-[14px] font-semibold text-[#222325]">
                Primary (Brand Green)
              </h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[8px] bg-[#003912] shadow-xs" />
                  <div>
                    <p className="text-[13px] font-medium text-[#222325]">Primary</p>
                    <p className="text-[12px] font-mono text-[#74767E]">#003912</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[8px] bg-[#00280D] shadow-xs" />
                  <div>
                    <p className="text-[13px] font-medium text-[#222325]">Hover</p>
                    <p className="text-[12px] font-mono text-[#74767E]">#00280D</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[8px] bg-[#F3FDF9] border border-[#DADBDD] shadow-xs" />
                  <div>
                    <p className="text-[13px] font-medium text-[#222325]">Tint</p>
                    <p className="text-[12px] font-mono text-[#74767E]">#F3FDF9</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Accents */}
            <div className="flex flex-col gap-3 p-4 rounded-[12px] border border-[#DADBDD] bg-white">
              <div>
                <h3 className="text-[14px] font-semibold text-[#222325]">
                  Accents (Marketing)
                </h3>
                <p className="text-[11px] text-[#74767E]">
                  Dark text on cyan and orange.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[8px] bg-[#3DD6F2] shadow-xs" />
                  <div>
                    <p className="text-[13px] font-medium text-[#222325]">Cyan</p>
                    <p className="text-[12px] font-mono text-[#74767E]">#3DD6F2</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[8px] bg-[#4D1727] shadow-xs" />
                  <div>
                    <p className="text-[13px] font-medium text-[#222325]">Burgundy</p>
                    <p className="text-[12px] font-mono text-[#74767E]">#4D1727</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[8px] bg-[#FF7646] shadow-xs" />
                  <div>
                    <p className="text-[13px] font-medium text-[#222325]">Orange</p>
                    <p className="text-[12px] font-mono text-[#74767E]">#FF7646</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Neutrals */}
            <div className="flex flex-col gap-3 p-4 rounded-[12px] border border-[#DADBDD] bg-white">
              <h3 className="text-[14px] font-semibold text-[#222325]">Neutral</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-[6px] bg-[#222325]" />
                  <div>
                    <p className="text-[11px] font-medium">Headings</p>
                    <p className="text-[10px] font-mono text-[#74767E]">#222325</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-[6px] bg-[#404145]" />
                  <div>
                    <p className="text-[11px] font-medium">Body</p>
                    <p className="text-[10px] font-mono text-[#74767E]">#404145</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-[6px] bg-[#62646A]" />
                  <div>
                    <p className="text-[11px] font-medium">Secondary</p>
                    <p className="text-[10px] font-mono text-[#74767E]">#62646A</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-[6px] bg-[#74767E]" />
                  <div>
                    <p className="text-[11px] font-medium">Muted</p>
                    <p className="text-[10px] font-mono text-[#74767E]">#74767E</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-[6px] bg-[#DADBDD]" />
                  <div>
                    <p className="text-[11px] font-medium">Border</p>
                    <p className="text-[10px] font-mono text-[#74767E]">#DADBDD</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-[6px] bg-[#F7F7F7] border border-[#DADBDD]" />
                  <div>
                    <p className="text-[11px] font-medium">Surface</p>
                    <p className="text-[10px] font-mono text-[#74767E]">#F7F7F7</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Semantic */}
            <div className="flex flex-col gap-3 p-4 rounded-[12px] border border-[#DADBDD] bg-white">
              <h3 className="text-[14px] font-semibold text-[#222325]">Semantic</h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-[6px] bg-[#166334]" />
                  <div>
                    <p className="text-[12px] font-medium text-[#222325]">Success</p>
                    <p className="text-[11px] font-mono text-[#74767E]">#166334</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-[6px] bg-[#92400E]" />
                  <div>
                    <p className="text-[12px] font-medium text-[#222325]">Warning</p>
                    <p className="text-[11px] font-mono text-[#74767E]">#92400E</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-[6px] bg-[#B42318]" />
                  <div>
                    <p className="text-[12px] font-medium text-[#222325]">Error</p>
                    <p className="text-[11px] font-mono text-[#74767E]">#B42318</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-[6px] bg-[#1D4EDB]" />
                  <div>
                    <p className="text-[12px] font-medium text-[#222325]">Info</p>
                    <p className="text-[11px] font-mono text-[#74767E]">#1D4EDB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 02 & 03 TYPOGRAPHY & TYPE SCALE ================= */}
        <section id="typography" className="flex flex-col gap-6">
          <div className="border-b border-[#DADBDD] pb-3 flex items-baseline justify-between">
            <h2 className="font-grotesque font-bold text-[24px] text-[#222325]">
              <span className="text-[#74767E] mr-2">02 & 03</span> TYPOGRAPHY &
              TYPE SCALE
            </h2>
            <span className="text-[13px] text-[#74767E]">
              Grotesque (Headings) · Satoshi (Body & UI)
            </span>
          </div>

          <div className="overflow-x-auto border border-[#DADBDD] rounded-[12px] bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#DADBDD] bg-[#F7F7F7] text-[13px] text-[#62646A] font-medium">
                  <th className="py-3 px-4">Style</th>
                  <th className="py-3 px-4">Font</th>
                  <th className="py-3 px-4">Size / Line height</th>
                  <th className="py-3 px-4">Weight</th>
                  <th className="py-3 px-4">Sample Preview</th>
                  <th className="py-3 px-4">Use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADBDD] text-[14px]">
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#222325]">Display</td>
                  <td className="py-3 px-4 text-[#62646A]">Grotesque</td>
                  <td className="py-3 px-4 font-mono text-[13px]">48 / 56px</td>
                  <td className="py-3 px-4 font-mono text-[13px]">700</td>
                  <td className="py-3 px-4">
                    <span className="text-display block text-[32px] sm:text-[48px] leading-tight">
                      Local Services
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#74767E] text-[13px]">
                    Page titles, hero headlines
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#222325]">H1</td>
                  <td className="py-3 px-4 text-[#62646A]">Grotesque</td>
                  <td className="py-3 px-4 font-mono text-[13px]">32 / 40px</td>
                  <td className="py-3 px-4 font-mono text-[13px]">700</td>
                  <td className="py-3 px-4">
                    <span className="text-h1 block">Plumbing & Repairs</span>
                  </td>
                  <td className="py-3 px-4 text-[#74767E] text-[13px]">
                    Section titles
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#222325]">H2</td>
                  <td className="py-3 px-4 text-[#62646A]">Grotesque</td>
                  <td className="py-3 px-4 font-mono text-[13px]">24 / 32px</td>
                  <td className="py-3 px-4 font-mono text-[13px]">700</td>
                  <td className="py-3 px-4">
                    <span className="text-h2 block">Service Offerings</span>
                  </td>
                  <td className="py-3 px-4 text-[#74767E] text-[13px]">
                    Card titles, large headings
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#222325]">H3</td>
                  <td className="py-3 px-4 text-[#62646A]">Grotesque</td>
                  <td className="py-3 px-4 font-mono text-[13px]">20 / 28px</td>
                  <td className="py-3 px-4 font-mono text-[13px]">600</td>
                  <td className="py-3 px-4">
                    <span className="text-h3 block">Home cleaning package</span>
                  </td>
                  <td className="py-3 px-4 text-[#74767E] text-[13px]">
                    Sub section titles
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#222325]">Body</td>
                  <td className="py-3 px-4 text-[#62646A]">Satoshi</td>
                  <td className="py-3 px-4 font-mono text-[13px]">16 / 24px</td>
                  <td className="py-3 px-4 font-mono text-[13px]">400</td>
                  <td className="py-3 px-4">
                    <span className="text-body block max-w-sm">
                      Trusted professionals in your neighborhood ready to fix,
                      clean, and assemble.
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#74767E] text-[13px]">
                    Body copy
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#222325]">UI</td>
                  <td className="py-3 px-4 text-[#62646A]">Satoshi</td>
                  <td className="py-3 px-4 font-mono text-[13px]">14 / 20px</td>
                  <td className="py-3 px-4 font-mono text-[13px]">500</td>
                  <td className="py-3 px-4">
                    <span className="text-ui block">Request booking button</span>
                  </td>
                  <td className="py-3 px-4 text-[#74767E] text-[13px]">
                    Labels, buttons, inputs
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#222325]">Caption</td>
                  <td className="py-3 px-4 text-[#62646A]">Satoshi</td>
                  <td className="py-3 px-4 font-mono text-[13px]">12 / 16px</td>
                  <td className="py-3 px-4 font-mono text-[13px]">400</td>
                  <td className="py-3 px-4">
                    <span className="text-caption block">
                      Sample listing · Accra, Greater Accra
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#74767E] text-[13px]">
                    Helper text, metadata
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ================= 04 SPACING & 05 RADIUS & ELEVATION ================= */}
        <section id="spacing-radius" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Spacing & Layout */}
          <div className="flex flex-col gap-4">
            <div className="border-b border-[#DADBDD] pb-3">
              <h2 className="font-grotesque font-bold text-[20px] text-[#222325]">
                <span className="text-[#74767E] mr-2">04</span> SPACING & LAYOUT
              </h2>
              <p className="text-[13px] text-[#74767E]">
                4px base · 24px desktop gutters · 1280px max desktop
              </p>
            </div>
            <div className="p-4 bg-white border border-[#DADBDD] rounded-[12px] flex flex-col gap-4">
              <div className="flex items-end gap-3 flex-wrap">
                {[
                  { label: "4px", size: "w-4 h-4" },
                  { label: "8px", size: "w-6 h-6" },
                  { label: "12px", size: "w-8 h-8" },
                  { label: "16px", size: "w-10 h-10" },
                  { label: "24px", size: "w-12 h-12" },
                  { label: "32px", size: "w-14 h-14" },
                  { label: "48px", size: "w-16 h-16" },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col items-center gap-1">
                    <div className={`${s.size} bg-[#F3FDF9] border border-[#003912] rounded-[4px]`} />
                    <span className="text-[11px] font-mono text-[#62646A]">{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#DADBDD] text-[12px]">
                <div className="p-2 bg-[#F7F7F7] rounded-[6px]">
                  <span className="font-semibold block text-[#222325]">Desktop</span>
                  <span className="text-[#74767E]">12 cols / max 1280px</span>
                </div>
                <div className="p-2 bg-[#F7F7F7] rounded-[6px]">
                  <span className="font-semibold block text-[#222325]">Onboarding</span>
                  <span className="text-[#74767E]">max 960px</span>
                </div>
                <div className="p-2 bg-[#F7F7F7] rounded-[6px]">
                  <span className="font-semibold block text-[#222325]">Service Grid</span>
                  <span className="text-[#74767E]">4 desk · 2 tab · 1 mob</span>
                </div>
              </div>
            </div>
          </div>

          {/* Radius & Elevation */}
          <div className="flex flex-col gap-4">
            <div className="border-b border-[#DADBDD] pb-3">
              <h2 className="font-grotesque font-bold text-[20px] text-[#222325]">
                <span className="text-[#74767E] mr-2">05</span> RADIUS & ELEVATION
              </h2>
              <p className="text-[13px] text-[#74767E]">
                Use borders first; shadows sparingly.
              </p>
            </div>
            <div className="p-4 bg-white border border-[#DADBDD] rounded-[12px] flex flex-col gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 border-2 border-[#DADBDD] rounded-[4px] bg-[#F7F7F7]" />
                  <span className="text-[11px] font-medium text-[#62646A]">4px (Badges)</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 border-2 border-[#DADBDD] rounded-[8px] bg-[#F7F7F7]" />
                  <span className="text-[11px] font-medium text-[#62646A]">8px (Controls)</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 border-2 border-[#DADBDD] rounded-[12px] bg-[#F7F7F7]" />
                  <span className="text-[11px] font-medium text-[#62646A]">12px (Cards)</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 border-2 border-[#DADBDD] rounded-[16px] bg-[#F7F7F7]" />
                  <span className="text-[11px] font-medium text-[#62646A]">16px (Panels)</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 border-2 border-[#DADBDD] rounded-full bg-[#F7F7F7]" />
                  <span className="text-[11px] font-medium text-[#62646A]">Full (Avatars)</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#DADBDD]">
                <div className="p-3 bg-white border border-[#DADBDD] rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                  <span className="text-[12px] font-semibold block text-[#222325]">Small Shadow</span>
                  <span className="text-[11px] font-mono text-[#74767E]">0 2px 8px rgba(0,0,0,0.06)</span>
                </div>
                <div className="p-3 bg-white border border-[#DADBDD] rounded-[8px] shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
                  <span className="text-[12px] font-semibold block text-[#222325]">Medium Shadow</span>
                  <span className="text-[11px] font-mono text-[#74767E]">0 4px 16px rgba(0,0,0,0.10)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 06 ICONS ================= */}
        <section id="icons" className="flex flex-col gap-4">
          <div className="border-b border-[#DADBDD] pb-3 flex items-baseline justify-between">
            <h2 className="font-grotesque font-bold text-[20px] text-[#222325]">
              <span className="text-[#74767E] mr-2">06</span> ICONS
            </h2>
            <span className="text-[13px] text-[#74767E]">
              24px grid · 1.5–2px stroke · 16px inline
            </span>
          </div>
          <div className="p-6 bg-white border border-[#DADBDD] rounded-[12px] flex flex-col gap-4">
            <div className="flex items-center gap-8 flex-wrap">
              {[
                { name: "Search", icon: <Search className="w-6 h-6 stroke-[1.5]" /> },
                { name: "Location", icon: <MapPin className="w-6 h-6 stroke-[1.5]" /> },
                { name: "Calendar", icon: <Calendar className="w-6 h-6 stroke-[1.5]" /> },
                { name: "Time", icon: <Clock className="w-6 h-6 stroke-[1.5]" /> },
                { name: "Saved", icon: <Heart className="w-6 h-6 stroke-[1.5]" /> },
                { name: "Work", icon: <Briefcase className="w-6 h-6 stroke-[1.5]" /> },
                { name: "Profile", icon: <User className="w-6 h-6 stroke-[1.5]" /> },
                { name: "Verified", icon: <ShieldCheck className="w-6 h-6 stroke-[1.5]" /> },
              ].map((item) => (
                <div key={item.name} className="flex flex-col items-center gap-2 text-[#222325]">
                  <div className="w-12 h-12 rounded-[8px] bg-[#F7F7F7] border border-[#DADBDD] flex items-center justify-center text-[#222325]">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-medium text-[#62646A]">{item.name}</span>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-[#74767E] pt-2 border-t border-[#DADBDD]">
              Shared illustrations: profile documents, work history, checklists. No trade-specific tools.
            </p>
          </div>
        </section>

        {/* ================= 07 BUTTONS & 08 INPUTS ================= */}
        <section id="interactive-controls" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 07 BUTTONS */}
          <div className="flex flex-col gap-4">
            <div className="border-b border-[#DADBDD] pb-3">
              <h2 className="font-grotesque font-bold text-[20px] text-[#222325]">
                <span className="text-[#74767E] mr-2">07</span> BUTTONS
              </h2>
              <p className="text-[13px] text-[#74767E]">
                Height 44px · Radius 8px · Padding 16px · Satoshi 14/20 medium
              </p>
            </div>

            <div className="p-6 bg-white border border-[#DADBDD] rounded-[12px] flex flex-col gap-6">
              <div className="grid grid-cols-3 gap-4 text-center font-medium text-[13px] text-[#74767E] border-b border-[#DADBDD] pb-2">
                <span>Primary</span>
                <span>Secondary</span>
                <span>Text</span>
              </div>

              {/* Default */}
              <div className="flex items-center justify-between gap-4">
                <span className="text-[12px] text-[#74767E] w-16">Default</span>
                <Button variant="primary">Request booking</Button>
                <Button variant="secondary">Contact provider</Button>
                <Button variant="text">View profile</Button>
              </div>

              {/* Hover Demonstration */}
              <div className="flex items-center justify-between gap-4">
                <span className="text-[12px] text-[#74767E] w-16">Hover state</span>
                <Button variant="primary" className="bg-[#00280D]">Request booking</Button>
                <Button variant="secondary" className="bg-[#F7F7F7]">Contact provider</Button>
                <Button variant="text" className="underline">View profile</Button>
              </div>

              {/* Disabled */}
              <div className="flex items-center justify-between gap-4">
                <span className="text-[12px] text-[#74767E] w-16">Disabled</span>
                <Button variant="primary" disabled>Request booking</Button>
                <Button variant="secondary" disabled>Contact provider</Button>
                <Button variant="text" disabled>View profile</Button>
              </div>
            </div>
          </div>

          {/* 08 INPUTS */}
          <div className="flex flex-col gap-4">
            <div className="border-b border-[#DADBDD] pb-3">
              <h2 className="font-grotesque font-bold text-[20px] text-[#222325]">
                <span className="text-[#74767E] mr-2">08</span> INPUTS
              </h2>
              <p className="text-[13px] text-[#74767E]">
                Height 44–48px · Radius 8px · 44px min touch targets
              </p>
            </div>

            <div className="p-6 bg-white border border-[#DADBDD] rounded-[12px] flex flex-col gap-4">
              <Input
                label="Search services"
                placeholder="What service do you need?"
                icon={<Search className="w-4 h-4" />}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Location"
                  defaultValue="Accra"
                  icon={<MapPin className="w-4 h-4" />}
                />
                <Input
                  label="Preferred date"
                  type="date"
                  icon={<Calendar className="w-4 h-4" />}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#DADBDD]">
                <Input
                  label="Error State"
                  defaultValue="Accra"
                  error="Choose a location"
                  icon={<MapPin className="w-4 h-4" />}
                />
                <Input
                  label="Disabled State"
                  defaultValue="Accra"
                  disabled
                  icon={<MapPin className="w-4 h-4" />}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= 09 BADGES & 10 PROGRESS & FEEDBACK ================= */}
        <section id="badges-feedback" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 09 BADGES & STATUS */}
          <div className="flex flex-col gap-4">
            <div className="border-b border-[#DADBDD] pb-3">
              <h2 className="font-grotesque font-bold text-[20px] text-[#222325]">
                <span className="text-[#74767E] mr-2">09</span> BADGES & STATUS
              </h2>
              <p className="text-[13px] text-[#74767E]">
                Radius 4px · Verification badges require completed checks
              </p>
            </div>

            <div className="p-6 bg-white border border-[#DADBDD] rounded-[12px] flex flex-col gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="plumbing">Plumbing</Badge>
                <Badge variant="cleaning">Cleaning</Badge>
                <Badge variant="new-provider">New provider</Badge>
                <Badge variant="identity-verified">Identity verified</Badge>
                <Badge variant="pending">Pending</Badge>
                <Badge variant="unavailable">Unavailable</Badge>
              </div>

              <p className="text-[12px] text-[#74767E] pt-2 border-t border-[#DADBDD]">
                Verification badges require completed checks. Never imply guarantees.
              </p>
            </div>
          </div>

          {/* 10 PROGRESS & FEEDBACK */}
          <div className="flex flex-col gap-4">
            <div className="border-b border-[#DADBDD] pb-3">
              <h2 className="font-grotesque font-bold text-[20px] text-[#222325]">
                <span className="text-[#74767E] mr-2">10</span> PROGRESS & FEEDBACK
              </h2>
              <p className="text-[13px] text-[#74767E]">
                Onboarding progress, info callouts, and booking status pills
              </p>
            </div>

            <div className="p-6 bg-white border border-[#DADBDD] rounded-[12px] flex flex-col gap-5">
              <ProgressBar current={7} total={12} />

              <Callout>Complete your profile to become visible.</Callout>

              <div className="flex items-center gap-3 flex-wrap pt-1">
                <span className="text-[13px] text-[#62646A] mr-2">Booking status:</span>
                <BookingStatusPill status="requested" />
                <BookingStatusPill status="confirmed" />
                <BookingStatusPill status="completed" />
              </div>
            </div>
          </div>
        </section>

        {/* ================= 11 CARDS AND BOOKING ================= */}
        <section id="cards-booking" className="flex flex-col gap-6">
          <div className="border-b border-[#DADBDD] pb-3 flex items-baseline justify-between">
            <h2 className="font-grotesque font-bold text-[24px] text-[#222325]">
              <span className="text-[#74767E] mr-2">11</span> CARDS AND BOOKING
            </h2>
            <span className="text-[13px] text-[#74767E]">
              Marketplace Service Cards, Provider Cards & Booking Experience
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {/* Service Listing Card */}
            <ServiceCard
              title="Home cleaning"
              price={150}
              currency="GH₵"
              rating={4.8}
              reviewCount={120}
              location="Accra"
              isSample={true}
            />

            {/* Provider Task Card */}
            <ProviderTaskCard
              title="Showcase your work"
              description="Add photos of past jobs to attract more clients."
              actionText="Add portfolio"
            />

            {/* Provider Profile Card */}
            <ProviderProfileCard
              title="Add display name"
              description="Tell customers about yourself and your services."
              actionText="Add your services"
            />

            {/* Booking Card */}
            <BookingCard startingPrice={150} currency="GH₵" />
          </div>
        </section>

        {/* ================= 12 NAVIGATION ================= */}
        <section id="navigation" className="flex flex-col gap-6">
          <div className="border-b border-[#DADBDD] pb-3 flex items-baseline justify-between">
            <h2 className="font-grotesque font-bold text-[24px] text-[#222325]">
              <span className="text-[#74767E] mr-2">12</span> NAVIGATION
            </h2>
            <span className="text-[13px] text-[#74767E]">
              Customer header, Provider dashboard bar, Breadcrumbs & Pagination
            </span>
          </div>

          <div className="flex flex-col gap-6">
            {/* Customer Public Header */}
            <div className="flex flex-col gap-2">
              <span className="text-[13px] font-semibold text-[#62646A]">
                Customer (Public Site)
              </span>
              <div className="rounded-[12px] border border-[#DADBDD] overflow-hidden shadow-xs">
                <CustomerNavbar />
              </div>
            </div>

            {/* Provider Dashboard Navbar */}
            <div className="flex flex-col gap-2">
              <span className="text-[13px] font-semibold text-[#62646A]">
                Provider (Dashboard)
              </span>
              <div className="rounded-[12px] border border-[#DADBDD] overflow-hidden shadow-xs">
                <ProviderNavbar activeTab="dashboard" />
              </div>
            </div>

            {/* Breadcrumbs & Pagination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white border border-[#DADBDD] rounded-[12px] items-center">
              <div className="flex flex-col gap-2">
                <span className="text-[13px] font-semibold text-[#62646A]">
                  Breadcrumbs
                </span>
                <Breadcrumbs
                  items={[
                    { label: "Home", href: "/" },
                    { label: "Cleaning", href: "#" },
                    { label: "House Cleaning" },
                  ]}
                />
              </div>

              <div className="flex flex-col gap-2 md:items-end">
                <span className="text-[13px] font-semibold text-[#62646A]">
                  Pagination
                </span>
                <Pagination
                  currentPage={currentPage}
                  totalPages={3}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= 13 IMAGERY RULES & 14 PRINCIPLES ================= */}
        <section id="rules-principles" className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#DADBDD]">
          <div className="flex flex-col gap-3">
            <h3 className="font-grotesque font-bold text-[18px] text-[#222325]">
              <span className="text-[#74767E] mr-2">13</span> IMAGERY RULES
            </h3>
            <ul className="flex flex-col gap-2 text-[14px] text-[#62646A] list-disc list-inside">
              <li><strong className="text-[#222325]">Shared pages:</strong> category-neutral graphics.</li>
              <li><strong className="text-[#222325]">Service pages:</strong> imagery matches the selected service.</li>
              <li><strong className="text-[#222325]">People only:</strong> in reference-designated placements; use real sourced photos, not AI faces.</li>
              <li>Keep reference section order and composition.</li>
              <li>Graphic hero stays graphic; portfolio thumbnails stay service-relevant.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-grotesque font-bold text-[18px] text-[#222325]">
              <span className="text-[#74767E] mr-2">14</span> PRINCIPLES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
              <div className="p-3 bg-[#F7F7F7] rounded-[8px] border border-[#DADBDD]">
                <strong className="block text-[#222325] mb-1">Clear hierarchy</strong>
                Guide users to the next step with visual clarity.
              </div>
              <div className="p-3 bg-[#F7F7F7] rounded-[8px] border border-[#DADBDD]">
                <strong className="block text-[#222325] mb-1">Consistent components</strong>
                Use shared, reusable UI patterns across all pages.
              </div>
              <div className="p-3 bg-[#F7F7F7] rounded-[8px] border border-[#DADBDD]">
                <strong className="block text-[#222325] mb-1">Text before extra icons</strong>
                Be clear and direct.
              </div>
              <div className="p-3 bg-[#F7F7F7] rounded-[8px] border border-[#DADBDD]">
                <strong className="block text-[#222325] mb-1">Accessible by design</strong>
                44px targets · Visible keyboard focus · Check text contrast.
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#DADBDD] bg-[#F7F7F7] py-8 px-6 text-center text-[13px] text-[#74767E]">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>Fix it. Design System — Version 1.0 (September 2026)</span>
          <span>Ghana Local Services Marketplace</span>
        </div>
      </footer>
    </div>
  );
}
