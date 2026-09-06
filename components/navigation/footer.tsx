import * as React from "react";
import Link from "next/link";
import { Globe, ChevronDown } from "lucide-react";

export function Footer() {
  const footerColumns = [
    {
      title: "Categories",
      links: [
        "House Cleaning",
        "Plumbing",
        "Electrical Repairs",
        "Painting",
        "Moving",
        "Furniture Assembly",
        "Gardening",
        "Repairs",
        "More Services",
      ],
    },
    {
      title: "For Customers",
      links: [
        "How Fix it Works",
        "Find a Professional",
        "Customer Support",
        "Safety & Trust",
        "Service Areas",
        "Fix it Pro",
        "Help Center",
        "Contact Us",
      ],
    },
    {
      title: "For Providers",
      links: [
        "Become a Provider",
        "How to Get Started",
        "Provider Resources",
        "Community",
        "Success Stories",
        "Earnings",
        "Forum",
        "Events",
      ],
    },
    {
      title: "Business Solutions",
      links: [
        "Property Management",
        "Real Estate Services",
        "Business Maintenance",
        "Custom Solutions",
        "Bulk Bookings",
        "Partner with Us",
        "Enterprise Support",
        "Contact Sales",
      ],
    },
    {
      title: "Company",
      links: [
        "About Fix it",
        "Our Mission",
        "Careers",
        "Press & News",
        "Trust & Safety",
        "Terms of Service",
        "Privacy Policy",
        "Partnerships",
        "Investor Relations",
      ],
    },
  ];

  return (
    <footer className="w-full bg-white border-t border-[#DADBDD] pt-16 pb-12">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col gap-12">
        {/* Navigation Links Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {footerColumns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h4 className="font-grotesque font-bold text-[14px] leading-[20px] text-[#222325]">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2 text-[13px] leading-[18px] text-[#62646A]">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="hover:text-[#003912] transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Utility Bar */}
        <div className="pt-8 border-t border-[#DADBDD] flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-0.5">
              <span className="font-grotesque font-bold text-[20px] tracking-tight text-[#222325]">
                Fix it
              </span>
              <span className="w-2 h-2 rounded-full bg-[#003912] inline-block mb-1 ml-0.5" />
            </Link>
            <span className="text-[13px] text-[#74767E]">© Fix it 2026</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-[#62646A]">
            {/* TikTok */}
            <Link
              href="#"
              aria-label="TikTok"
              className="hover:text-[#222325] transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.35 22a6.34 6.34 0 0 0 6.33-6.32V8.9a8.28 8.28 0 0 0 4.91 1.57v-3.45a4.8 4.8 0 0 1-1-.33z" />
              </svg>
            </Link>
            {/* Instagram */}
            <Link
              href="#"
              aria-label="Instagram"
              className="hover:text-[#222325] transition-colors"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </Link>
            {/* LinkedIn */}
            <Link
              href="#"
              aria-label="LinkedIn"
              className="hover:text-[#222325] transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </Link>
            {/* YouTube */}
            <Link
              href="#"
              aria-label="YouTube"
              className="hover:text-[#222325] transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </Link>
            {/* Facebook */}
            <Link
              href="#"
              aria-label="Facebook"
              className="hover:text-[#222325] transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </Link>
            {/* X / Twitter */}
            <Link
              href="#"
              aria-label="X"
              className="hover:text-[#222325] transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
          </div>

          {/* Language & Currency */}
          <div className="flex items-center gap-4 text-[13px] font-medium text-[#62646A]">
            <button
              type="button"
              className="flex items-center gap-1.5 hover:text-[#222325] transition-colors"
            >
              <Globe className="w-4 h-4 text-[#74767E]" />
              <span>English</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-1 hover:text-[#222325] transition-colors"
            >
              <span>GHS</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#74767E]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
