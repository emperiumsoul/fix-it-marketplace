"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Bell, Mail, HelpCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export function DashboardHeader() {
  const { user } = useUser();
  const initial = (user?.firstName || user?.username || "K").charAt(0).toUpperCase();

  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-[#E5E7EB] backdrop-blur-md">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-[64px] flex items-center justify-between gap-4">
        {/* Left Side: Logo & Main Nav */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0.5 group shrink-0">
            <span className="font-grotesque font-bold text-[24px] tracking-tight text-[#222325]">
              Fix it
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#008744] inline-block mb-1.5 ml-0.5" />
          </Link>

          {/* Nav Links matching 7.png */}
          <nav className="hidden md:flex items-center gap-6 text-[14px] font-medium text-[#404145]">
            <Link
              href="/provider/dashboard"
              className="text-[#222325] font-semibold hover:text-black transition-colors"
            >
              Dashboard
            </Link>

            {/* My Business Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveMenu(activeMenu === "business" ? null : "business")}
                className="flex items-center gap-1 hover:text-[#222325] transition-colors cursor-pointer"
              >
                <span>My Business</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#74767E]" />
              </button>

              {activeMenu === "business" && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-[#E5E7EB] rounded-[10px] shadow-lg py-1.5 z-50 text-[13px]">
                  <Link
                    href="/provider/dashboard"
                    onClick={() => setActiveMenu(null)}
                    className="block px-4 py-2 hover:bg-[#F9FAFB] text-[#222325]"
                  >
                    Services & Packages
                  </Link>
                  <Link
                    href="/provider/dashboard"
                    onClick={() => setActiveMenu(null)}
                    className="block px-4 py-2 hover:bg-[#F9FAFB] text-[#222325]"
                  >
                    Profile & Portfolio
                  </Link>
                  <Link
                    href="/provider/dashboard"
                    onClick={() => setActiveMenu(null)}
                    className="block px-4 py-2 hover:bg-[#F9FAFB] text-[#222325]"
                  >
                    Service Areas
                  </Link>
                </div>
              )}
            </div>

            {/* Bookings Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveMenu(activeMenu === "bookings" ? null : "bookings")}
                className="flex items-center gap-1 hover:text-[#222325] transition-colors cursor-pointer"
              >
                <span>Bookings</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#74767E]" />
              </button>

              {activeMenu === "bookings" && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-[#E5E7EB] rounded-[10px] shadow-lg py-1.5 z-50 text-[13px]">
                  <Link
                    href="/provider/dashboard"
                    onClick={() => setActiveMenu(null)}
                    className="block px-4 py-2 hover:bg-[#F9FAFB] text-[#222325]"
                  >
                    Active Requests (3)
                  </Link>
                  <Link
                    href="/provider/dashboard"
                    onClick={() => setActiveMenu(null)}
                    className="block px-4 py-2 hover:bg-[#F9FAFB] text-[#222325]"
                  >
                    Upcoming Scheduled
                  </Link>
                  <Link
                    href="/provider/dashboard"
                    onClick={() => setActiveMenu(null)}
                    className="block px-4 py-2 hover:bg-[#F9FAFB] text-[#222325]"
                  >
                    Completed Jobs
                  </Link>
                </div>
              )}
            </div>

            {/* Earnings Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveMenu(activeMenu === "earnings" ? null : "earnings")}
                className="flex items-center gap-1 hover:text-[#222325] transition-colors cursor-pointer"
              >
                <span>Earnings</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#74767E]" />
              </button>

              {activeMenu === "earnings" && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-[#E5E7EB] rounded-[10px] shadow-lg py-1.5 z-50 text-[13px]">
                  <div className="px-4 py-2 text-[#74767E]">
                    Available Balance: <span className="font-bold text-[#008744]">GH₵0.00</span>
                  </div>
                  <Link
                    href="/provider/dashboard"
                    onClick={() => setActiveMenu(null)}
                    className="block px-4 py-2 hover:bg-[#F9FAFB] text-[#222325] border-t border-[#F3F4F6]"
                  >
                    Payout Settings (Mobile Money)
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right Side: Utility Icons & User Avatar with Green Active Dot */}
        <div className="flex items-center gap-4 text-[#62646A]">
          <button
            type="button"
            aria-label="Notifications"
            className="hover:text-[#222325] transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
          </button>

          <button
            type="button"
            aria-label="Messages"
            className="hover:text-[#222325] transition-colors cursor-pointer"
          >
            <Mail className="w-4 h-4" />
          </button>

          <button
            type="button"
            aria-label="Help and support"
            className="hover:text-[#222325] transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* User Avatar with Green Presence Dot matching 7.png */}
          <div className="relative flex items-center justify-center pl-2">
            <div className="w-9 h-9 rounded-full bg-[#52525B] text-white flex items-center justify-center font-bold text-[14px]">
              {initial}
            </div>
            {/* Active presence dot */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#10B981] ring-2 ring-white" />
          </div>
        </div>
      </div>
    </header>
  );
}
