"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Globe, Menu, X } from "lucide-react";

export function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#DADBDD]/80 backdrop-blur-md">
      <div className="max-w-[1280px] mx-auto px-6 h-[64px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0.5 group">
          <span className="font-grotesque font-bold text-[24px] tracking-tight text-[#222325]">
            Fix it
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#003912] inline-block mb-1.5 ml-0.5" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[14px] leading-[20px] font-medium text-[#404145]">
          <div className="relative group cursor-pointer flex items-center gap-1 hover:text-[#222325] py-2">
            <span>Fix it Pro</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#74767E] group-hover:text-[#222325] transition-transform duration-200 group-hover:rotate-180" />
            <div className="absolute top-full left-0 hidden group-hover:flex flex-col bg-white border border-[#DADBDD] rounded-[8px] shadow-md py-2 w-48 text-[13px] z-50">
              <Link href="#fix-it-pro" className="px-4 py-2 hover:bg-[#F7F7F7] text-[#222325]">
                What is Fix it Pro?
              </Link>
              <Link href="#pro-matching" className="px-4 py-2 hover:bg-[#F7F7F7] text-[#222325]">
                Get Matched with Pros
              </Link>
            </div>
          </div>

          <div className="relative group cursor-pointer flex items-center gap-1 hover:text-[#222325] py-2">
            <span>Explore</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#74767E] group-hover:text-[#222325] transition-transform duration-200 group-hover:rotate-180" />
            <div className="absolute top-full left-0 hidden group-hover:flex flex-col bg-white border border-[#DADBDD] rounded-[8px] shadow-md py-2 w-48 text-[13px] z-50">
              <Link href="#popular-services" className="px-4 py-2 hover:bg-[#F7F7F7] text-[#222325]">
                Popular Services
              </Link>
              <Link href="#guides" className="px-4 py-2 hover:bg-[#F7F7F7] text-[#222325]">
                Home Guides
              </Link>
              <Link href="/design-system" className="px-4 py-2 hover:bg-[#F7F7F7] text-[#003912] font-semibold">
                Design System Preview
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-1.5 cursor-pointer hover:text-[#222325]">
            <Globe className="w-4 h-4 text-[#74767E]" />
            <span>EN</span>
          </div>

          <Link
            href="#become-a-provider"
            className="hover:text-[#222325] transition-colors"
          >
            Become a Provider
          </Link>

          <Link
            href="#sign-in"
            className="hover:text-[#222325] transition-colors"
          >
            Sign in
          </Link>

          <Link
            href="#join"
            className="inline-flex items-center justify-center bg-[#222325] text-white text-[14px] font-medium h-[38px] px-5 rounded-[8px] hover:bg-black transition-colors"
          >
            Join
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="lg:hidden p-2 text-[#222325]"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#DADBDD] px-6 py-4 flex flex-col gap-3 text-[14px] font-medium text-[#404145]">
          <Link
            href="#fix-it-pro"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1.5 hover:text-[#222325]"
          >
            Fix it Pro
          </Link>
          <Link
            href="#popular-services"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1.5 hover:text-[#222325]"
          >
            Explore Services
          </Link>
          <Link
            href="/design-system"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1.5 text-[#003912] font-semibold"
          >
            Design System Preview
          </Link>
          <Link
            href="#become-a-provider"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1.5 hover:text-[#222325]"
          >
            Become a Provider
          </Link>
          <div className="flex items-center gap-3 pt-3 border-t border-[#DADBDD]">
            <Link
              href="#sign-in"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2 text-center border border-[#DADBDD] rounded-[8px] hover:bg-[#F7F7F7]"
            >
              Sign in
            </Link>
            <Link
              href="#join"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2 text-center bg-[#222325] text-white rounded-[8px] hover:bg-black"
            >
              Join
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
