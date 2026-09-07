"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Bell, Mail, HelpCircle, Shield } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export interface DashboardHeaderProps {
  activeTab?: "overview" | "orders" | "earnings";
  onSelectTab?: (tab: "overview" | "orders" | "earnings") => void;
}

export function DashboardHeader({ activeTab = "overview", onSelectTab }: DashboardHeaderProps) {
  const { user } = useUser();
  const initial = (user?.firstName || user?.username || "K").charAt(0).toUpperCase();

  const userIsAdminRole = user?.publicMetadata?.role === "admin";
  const [isAdminApi, setIsAdminApi] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    if (!user) return;
    let isCancelled = false;
    fetch("/api/admin/check")
      .then((res) => res.json())
      .then((data) => {
        if (!isCancelled) {
          setIsAdminApi(Boolean(data?.isAdmin));
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setIsAdminApi(false);
        }
      });
    return () => {
      isCancelled = true;
    };
  }, [user]);

  const isAdmin = !user
    ? false
    : isAdminApi !== null
    ? isAdminApi
    : Boolean(userIsAdminRole);

  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

  const handleTabClick = (tab: "overview" | "orders" | "earnings") => {
    setActiveMenu(null);
    onSelectTab?.(tab);
  };

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
              href="/provider/dashboard?tab=overview"
              onClick={() => handleTabClick("overview")}
              className={`transition-colors ${
                activeTab === "overview"
                  ? "text-[#222325] font-semibold border-b-2 border-[#222325] pb-0.5"
                  : "hover:text-black"
              }`}
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
                <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-[#E5E7EB] rounded-[10px] shadow-lg py-1.5 z-50 text-[13px]">
                  <Link
                    href="/provider/profile"
                    onClick={() => setActiveMenu(null)}
                    className="block px-4 py-2 hover:bg-[#F9FAFB] text-[#008744] font-semibold"
                  >
                    View Public Profile →
                  </Link>
                  <Link
                    href="/provider/onboarding"
                    onClick={() => setActiveMenu(null)}
                    className="block px-4 py-2 hover:bg-[#F9FAFB] text-[#222325]"
                  >
                    Edit Profile Details
                  </Link>
                  <Link
                    href="/provider/dashboard?tab=overview"
                    onClick={() => handleTabClick("overview")}
                    className="block px-4 py-2 hover:bg-[#F9FAFB] text-[#222325]"
                  >
                    Services & Packages
                  </Link>
                </div>
              )}
            </div>

            {/* Bookings Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveMenu(activeMenu === "bookings" ? null : "bookings")}
                className={`flex items-center gap-1 transition-colors cursor-pointer ${
                  activeTab === "orders" ? "text-[#222325] font-semibold" : "hover:text-[#222325]"
                }`}
              >
                <span>Bookings</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#74767E]" />
              </button>

              {activeMenu === "bookings" && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-[#E5E7EB] rounded-[10px] shadow-lg py-1.5 z-50 text-[13px]">
                  <Link
                    href="/provider/dashboard?tab=orders"
                    onClick={() => handleTabClick("orders")}
                    className="block px-4 py-2 hover:bg-[#F9FAFB] text-[#222325] font-semibold"
                  >
                    Orders Received (All)
                  </Link>
                  <Link
                    href="/provider/dashboard?tab=orders&status=requested"
                    onClick={() => handleTabClick("orders")}
                    className="block px-4 py-2 hover:bg-[#F9FAFB] text-[#222325]"
                  >
                    Active Requests
                  </Link>
                  <Link
                    href="/provider/dashboard?tab=orders&status=completed"
                    onClick={() => handleTabClick("orders")}
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
                className={`flex items-center gap-1 transition-colors cursor-pointer ${
                  activeTab === "earnings" ? "text-[#222325] font-semibold" : "hover:text-[#222325]"
                }`}
              >
                <span>Earnings</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#74767E]" />
              </button>

              {activeMenu === "earnings" && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-[#E5E7EB] rounded-[10px] shadow-lg py-1.5 z-50 text-[13px]">
                  <div className="px-4 py-2 text-[#74767E] bg-[#FAFAFA]">
                    Available: <span className="font-bold text-[#008744]">GHS 882.00</span>
                  </div>
                  <Link
                    href="/provider/dashboard?tab=earnings"
                    onClick={() => handleTabClick("earnings")}
                    className="block px-4 py-2 hover:bg-[#F9FAFB] text-[#222325] font-semibold border-t border-[#F3F4F6]"
                  >
                    Earnings & Payouts Statement
                  </Link>
                  <Link
                    href="/provider/dashboard?tab=earnings"
                    onClick={() => handleTabClick("earnings")}
                    className="block px-4 py-2 hover:bg-[#F9FAFB] text-[#222325]"
                  >
                    Mobile Money Wallet Settings
                  </Link>
                </div>
              )}
            </div>
            {isAdmin && (
              <Link
                href="/admin"
                className="text-[#008744] hover:text-[#005c2e] font-semibold flex items-center gap-1 transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Operations</span>
              </Link>
            )}
          </nav>
        </div>

        {/* Right Side: Utility Icons & User Avatar with Green Active Dot */}
        <div className="flex items-center gap-3 text-[#62646A]">
          {isAdmin && (
            <Link
              href="/admin"
              className="hidden sm:inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#18181B] bg-[#F3F4F6] hover:bg-[#E5E7EB] px-3 py-1.5 rounded-[8px] transition-colors border border-[#E5E7EB]"
            >
              <Shield className="w-3.5 h-3.5 text-[#008744]" />
              <span>Admin Operations</span>
            </Link>
          )}

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
