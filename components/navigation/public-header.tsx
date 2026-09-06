"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Globe,
  Menu,
  X,
  Search,
  Mail,
  Heart,
  Check,
} from "lucide-react";
import { SignInButton, SignUpButton, Show, UserButton, useUser } from "@clerk/nextjs";
import { HeaderNotifications } from "./header-notifications";

function LanguageSelector() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentLang, setCurrentLang] = React.useState("EN");
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const languages = [
    { code: "EN", name: "English" },
    { code: "TW", name: "Twi (Akan)" },
    { code: "GA", name: "Ga" },
    { code: "EW", name: "Ewe" },
  ];

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 cursor-pointer hover:text-[#222325] text-[13px] text-[#404145] py-1 px-1.5 rounded-[4px] hover:bg-[#F7F7F7] transition-colors"
      >
        <Globe className="w-4 h-4 text-[#74767E]" />
        <span className="font-semibold">{currentLang}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[160px] bg-white rounded-[8px] border border-[#DADBDD] shadow-lg py-1 z-50 animate-in fade-in duration-100">
          <div className="px-3 py-1 text-[11px] font-bold text-[#74767E] uppercase tracking-wider border-b border-[#F0F0F0]">
            Marketplace Language
          </div>
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                setCurrentLang(lang.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-[13px] flex items-center justify-between hover:bg-[#F7F7F7] transition-colors cursor-pointer ${
                currentLang === lang.code ? "text-[#008744] font-semibold bg-[#F4F9F5]" : "text-[#222325]"
              }`}
            >
              <span>{lang.name}</span>
              {currentLang === lang.code && <Check className="w-3.5 h-3.5 text-[#008744]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export interface PublicHeaderProps {
  initialQuery?: string;
  showSearch?: boolean;
}

export function PublicHeader({
  initialQuery = "",
  showSearch = true,
}: PublicHeaderProps) {
  const router = useRouter();
  const { user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState(initialQuery);

  const handleBecomeProvider = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      try {
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            role: "provider",
          },
        });
      } catch (err) {
        console.error("Failed to set provider role", err);
      }
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("fixit_role", "provider");
      localStorage.setItem("fixit_role_modal_dismissed", "true");
    }
    setMobileMenuOpen(false);
    router.push("/provider/onboarding");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      router.push("/search");
      return;
    }
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#DADBDD]/80 backdrop-blur-md">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-[64px] flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0.5 group shrink-0">
          <span className="font-grotesque font-bold text-[24px] tracking-tight text-[#222325]">
            Fix it
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#008744] inline-block mb-1.5 ml-0.5" />
        </Link>

        {/* Search Bar (as shown in 4.png) */}
        {showSearch && (
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center flex-1 max-w-[480px] mx-2 lg:mx-6"
          >
            <div className="relative w-full flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What service do you need today?"
                className="w-full h-[40px] pl-4 pr-12 rounded-[8px] border border-[#DADBDD] text-[14px] text-[#222325] placeholder:text-[#74767E] focus:outline-none focus:border-[#222325] transition-colors"
              />
              <button
                type="submit"
                aria-label="Search services"
                className="absolute right-1 top-1 bottom-1 w-9 bg-[#222325] hover:bg-black text-white rounded-[6px] flex items-center justify-center transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-[14px] leading-[20px] font-medium text-[#404145]">
          <button
            type="button"
            onClick={handleBecomeProvider}
            className="hover:text-[#008744] transition-colors text-[13px] font-semibold text-[#008744] shrink-0 cursor-pointer"
          >
            Become a Provider
          </button>

          <Show when="signed-in">
            {/* Quick utility icons matching 4.png (only for authenticated users) */}
            <div className="flex items-center gap-3 text-[#62646A] border-l border-[#E5E7EB] pl-4">
              <HeaderNotifications />
              
              <Link
                href="/messages"
                aria-label="Messages"
                className="hover:text-[#222325] transition-colors p-1 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
              </Link>

              <Link
                href="/saved"
                aria-label="Saved services"
                className="hover:text-[#222325] transition-colors p-1 cursor-pointer"
              >
                <Heart className="w-4 h-4" />
              </Link>

              <Link
                href="/bookings"
                className="hover:text-[#008744] transition-colors text-[14px] font-medium ml-1"
              >
                Bookings
              </Link>
            </div>
          </Show>

          {/* Language Selector */}
          <LanguageSelector />

          <Show when="signed-out">
            <div className="flex items-center gap-3 ml-1">
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="hover:text-[#222325] transition-colors font-medium text-[14px] cursor-pointer"
                >
                  Sign in
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button
                  type="button"
                  className="inline-flex items-center justify-center bg-[#222325] text-white text-[14px] font-medium h-[36px] px-4 rounded-[8px] hover:bg-black transition-colors cursor-pointer"
                >
                  Join
                </button>
              </SignUpButton>
            </div>
          </Show>

          <Show when="signed-in">
            <div className="ml-1">
              <UserButton />
            </div>
          </Show>
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

      {/* Mobile Search Bar & Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#DADBDD] px-6 py-4 flex flex-col gap-3 text-[14px] font-medium text-[#404145]">
          <form onSubmit={handleSearch} className="mb-2">
            <div className="relative w-full flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What service do you need today?"
                className="w-full h-[40px] pl-4 pr-12 rounded-[8px] border border-[#DADBDD] text-[14px] text-[#222325] focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-1 top-1 bottom-1 w-9 bg-[#222325] text-white rounded-[6px] flex items-center justify-center"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          <button
            type="button"
            onClick={handleBecomeProvider}
            className="py-1.5 text-[#008744] font-semibold text-left cursor-pointer"
          >
            Become a Provider
          </button>
          <Show when="signed-in">
            <Link
              href="/bookings"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#008744]"
            >
              My Bookings & Orders
            </Link>
            <Link
              href="/messages"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#008744]"
            >
              Messages & Chat
            </Link>
            <Link
              href="/saved"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#008744]"
            >
              Saved Services
            </Link>
          </Show>
          <Link
            href="/search"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1.5 hover:text-[#222325]"
          >
            All Services
          </Link>
          <Link
            href="/design-system"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1.5 text-[#008744]"
          >
            Design System Preview
          </Link>

          <Show when="signed-out">
            <div className="flex items-center gap-3 pt-3 border-t border-[#DADBDD]">
              <SignInButton mode="modal">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2 text-center border border-[#DADBDD] rounded-[8px] hover:bg-[#F7F7F7] font-medium text-[14px] cursor-pointer"
                >
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2 text-center bg-[#222325] text-white rounded-[8px] hover:bg-black font-medium text-[14px] cursor-pointer"
                >
                  Join
                </button>
              </SignUpButton>
            </div>
          </Show>
          <Show when="signed-in">
            <div className="flex items-center justify-between pt-3 border-t border-[#DADBDD]">
              <span className="text-[14px] font-medium text-[#404145]">Account</span>
              <UserButton />
            </div>
          </Show>
        </div>
      )}
    </header>
  );
}
