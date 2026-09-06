"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  Calendar,
  Menu,
  LayoutDashboard,
  Briefcase,
  TrendingUp,
} from "lucide-react";

export function CustomerNavbar() {
  return (
    <header className="w-full bg-white border-b border-[#DADBDD] px-6 py-3.5">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0.5">
          <span className="font-grotesque font-bold text-[22px] tracking-tight text-[#222325]">
            Fix it
          </span>
          <span className="w-2 h-2 rounded-full bg-[#003912] inline-block mb-1 ml-0.5" />
        </Link>

        {/* Search Bar / Trigger */}
        <div className="flex-1 max-w-md hidden sm:flex items-center relative">
          <Search className="absolute left-3.5 w-4 h-4 text-[#74767E] pointer-events-none" />
          <input
            type="text"
            placeholder="Search services"
            className="w-full h-[40px] pl-10 pr-4 rounded-[8px] border border-[#DADBDD] bg-[#F7F7F7] text-[14px] text-[#222325] placeholder-[#74767E] focus:outline-none focus:border-[#003912] focus:bg-white transition-colors"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/bookings"
            className="flex items-center gap-2 text-[14px] font-medium text-[#404145] hover:text-[#222325] transition-colors"
          >
            <Calendar className="w-4 h-4 text-[#62646A]" />
            <span className="hidden md:inline">Bookings</span>
          </Link>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            className="w-10 h-10 rounded-[8px] border border-[#DADBDD] flex items-center justify-center text-[#222325] hover:bg-[#F7F7F7] transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

export function ProviderNavbar({ activeTab = "dashboard" }: { activeTab?: string }) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "#" },
    { id: "business", label: "My Business", icon: Briefcase, href: "#" },
    { id: "bookings", label: "Bookings", icon: Calendar, href: "#" },
    { id: "earnings", label: "Earnings", icon: TrendingUp, href: "#" },
  ];

  return (
    <header className="w-full bg-white border-b border-[#DADBDD] px-6 py-3">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-6">
        {/* Navigation Items */}
        <nav className="flex items-center gap-1 sm:gap-6 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-2 py-2 px-3 rounded-[6px] text-[14px] font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? "text-[#003912] bg-[#F3FDF9]"
                    : "text-[#62646A] hover:text-[#222325] hover:bg-[#F7F7F7]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#003912]" : "text-[#74767E]"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Menu button */}
        <button
          type="button"
          aria-label="Provider settings menu"
          className="w-9 h-9 rounded-[8px] border border-[#DADBDD] flex items-center justify-center text-[#222325] hover:bg-[#F7F7F7] transition-colors"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
