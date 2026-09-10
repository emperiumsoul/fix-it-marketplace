"use client";

import * as React from "react";
import { Calendar, Clock, ChevronDown, Info } from "lucide-react";
import { ServicePackageData } from "./types";
import { ServiceReviews } from "./service-reviews";

export interface ServiceBookingSidebarProps {
  packages?: ServicePackageData[];
  selectedPackageIndex: number;
  onSelectPackageIndex: (idx: number) => void;
  currency?: string;
  categoryTitle?: string;
  categorySlug?: string;
  location?: string;
  onRequestBooking: (data: {
    propertySize: string;
    selectedDate: string;
    selectedTime: string;
  }) => void;
  onContactProvider: () => void;
}

export function ServiceBookingSidebar({
  packages = [],
  selectedPackageIndex,
  onSelectPackageIndex,
  currency = "GH₵",
  categoryTitle = "Cleaning",
  categorySlug = "cleaning",
  onRequestBooking,
  onContactProvider,
}: ServiceBookingSidebarProps) {
  const [propertySize, setPropertySize] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState("");
  const [selectedTime, setSelectedTime] = React.useState("");

  const displayPackages: ServicePackageData[] =
    packages && packages.length > 0
      ? packages
      : [
          {
            name: "Regular Service",
            price: 150,
            description: "Standard single session maintenance and upkeep.",
            includedTasks: [
              "Initial diagnostic and assessment",
              "Standard repair and execution",
              "Testing and cleanup",
            ],
          },
          {
            name: "Comprehensive Service",
            price: 300,
            description: "In-depth multi-point service and detailed overhaul.",
            includedTasks: [
              "Comprehensive diagnostic inspection",
              "Multi-point parts and repair servicing",
              "System pressure/performance test",
              "Extended quality assurance",
            ],
          },
          {
            name: "Full Overhaul / Premium",
            price: 450,
            description: "Complete full-compound service with thorough inspection.",
            includedTasks: [
              "Full residence audit and service",
              "Component replacement & deep tuning",
              "Post-service calibration",
              "Priority support guarantee",
            ],
          },
        ];

  const currentPkg = displayPackages[selectedPackageIndex] || displayPackages[0];

  const handleBookingClick = () => {
    onRequestBooking({
      propertySize: propertySize || "Standard residential space",
      selectedDate: selectedDate || new Date().toISOString().split("T")[0],
      selectedTime: selectedTime || "Morning slot (9:00 AM - 12:00 PM)",
    });
  };

  // Short tab label extractor
  const getTabLabel = (name: string, index: number) => {
    const parts = name.split(" ");
    if (parts[0].length <= 9) return parts[0];
    if (index === 0) return "Basic";
    if (index === 1) return "Standard";
    return "Premium";
  };

  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-20">
      {/* Booking Form Card matching 5.png */}
      <div className="rounded-[16px] border border-[#E5E7EB] bg-white shadow-xs overflow-hidden flex flex-col">
        {/* Dynamic Package Selector Tabs */}
        <div
          className="grid border-b border-[#E5E7EB] text-center text-[13px] sm:text-[14px] font-medium bg-[#FAFAFA]"
          style={{ gridTemplateColumns: `repeat(${displayPackages.length}, minmax(0, 1fr))` }}
        >
          {displayPackages.map((pkg, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectPackageIndex(idx)}
              className={`py-3.5 px-2 transition-colors cursor-pointer truncate ${
                selectedPackageIndex === idx
                  ? "font-semibold text-[#222325] border-b-2 border-[#222325] bg-white"
                  : "text-[#74767E] hover:text-[#222325]"
              }`}
            >
              {getTabLabel(pkg.name, idx)}
            </button>
          ))}
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col gap-5">
          {/* Header Title & Price */}
          <div>
            <h3 className="font-grotesque font-bold text-[18px] text-[#222325]">
              {currentPkg.name}
            </h3>
            <div className="font-grotesque font-bold text-[28px] sm:text-[32px] text-[#222325] mt-1">
              {currency}{currentPkg.price}
            </div>
            <p className="text-[13px] leading-[19px] text-[#62646A] mt-2">
              {currentPkg.description || currentPkg.scope || "Professional service tailored to your requirements."}
            </p>
          </div>

          {/* This includes bullet list */}
          {currentPkg.includedTasks && currentPkg.includedTasks.length > 0 && (
            <div className="pt-2 border-t border-[#F3F4F6]">
              <h4 className="font-semibold text-[13px] text-[#222325] mb-2">
                This includes:
              </h4>
              <ul className="space-y-1.5 text-[13px] text-[#404145]">
                {currentPkg.includedTasks.slice(0, 5).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#008744] font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Form Fields matching 5.png */}
          <div className="flex flex-col gap-3.5 pt-2 border-t border-[#F3F4F6]">
            {/* Property Size / Scope */}
            <div>
              <label className="block text-[12px] font-semibold text-[#62646A] mb-1">
                Property size / Service scope
              </label>
              <div className="relative">
                <select
                  value={propertySize}
                  onChange={(e) => setPropertySize(e.target.value)}
                  className="w-full h-[40px] pl-3 pr-8 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] bg-white appearance-none focus:outline-none focus:border-[#222325] cursor-pointer"
                >
                  <option value="">Select scope</option>
                  <option value="Single room / 1 Bedroom">Single room / 1 Bedroom</option>
                  <option value="2-3 Bedrooms / Standard Compound">2-3 Bedrooms / Standard Compound</option>
                  <option value="4+ Bedrooms / Large Residence">4+ Bedrooms / Large Residence</option>
                  <option value="Commercial Office / Store">Commercial Office / Store</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#74767E] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Choose a date */}
            <div>
              <label className="block text-[12px] font-semibold text-[#62646A] mb-1">
                Choose a date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full h-[40px] pl-3 pr-9 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] bg-white focus:outline-none focus:border-[#222325] cursor-pointer"
                />
                <Calendar className="w-4 h-4 text-[#74767E] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Select a time */}
            <div>
              <label className="block text-[12px] font-semibold text-[#62646A] mb-1">
                Select a time
              </label>
              <div className="relative">
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full h-[40px] pl-3 pr-8 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] bg-white appearance-none focus:outline-none focus:border-[#222325] cursor-pointer"
                >
                  <option value="">Select a time</option>
                  <option value="Morning (8:00 AM - 11:00 AM)">Morning (8:00 AM - 11:00 AM)</option>
                  <option value="Midday (11:00 AM - 2:00 PM)">Midday (11:00 AM - 2:00 PM)</option>
                  <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                </select>
                <Clock className="w-4 h-4 text-[#74767E] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Action CTAs matching 5.png */}
          <div className="flex flex-col gap-2.5 pt-2">
            <button
              type="button"
              onClick={handleBookingClick}
              className="w-full py-3 bg-[#0B3B24] hover:bg-[#062919] text-white font-semibold text-[14px] rounded-[8px] transition-colors shadow-sm cursor-pointer"
            >
              Request booking
            </button>

            <button
              type="button"
              onClick={onContactProvider}
              className="w-full py-2.5 rounded-[8px] border border-[#25D366] bg-[#F0FDF4] hover:bg-[#DCFCE7] font-semibold text-[14px] text-[#15803D] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#25D366]" aria-hidden="true">
                <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.275-.1-.475-.15-.675.15-.2.301-.776.978-.951 1.179-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.799-1.5-1.786-1.676-2.087-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.101-.2.05-.376-.025-.527-.075-.15-.676-1.63-1.026-2.233-.251-.602-.501-.52-.676-.52-.175 0-.376-.025-.577-.025-.2 0-.526.075-.801.376-.275.301-1.052 1.028-1.052 2.508 0 1.48 1.077 2.91 1.228 3.11.15.2 2.118 3.234 5.132 4.536.717.31 1.277.495 1.714.634.72.229 1.375.197 1.894.121.577-.087 1.78-.727 2.03-1.43.25-.702.25-1.304.175-1.43-.075-.125-.275-.2-.576-.35z" />
                <path d="M12.004 0C5.384 0 0 5.385 0 12.006c0 2.115.552 4.179 1.602 6.001L.06 24l6.168-1.618c1.758.96 3.743 1.465 5.776 1.465 6.618 0 12.002-5.385 12.002-12.006S18.622 0 12.004 0zm0 21.968c-1.803 0-3.57-.486-5.11-1.405l-.367-.218-3.799.996 1.014-3.702-.239-.38A9.927 9.927 0 012.04 12.006c0-5.494 4.47-9.965 9.964-9.965 5.495 0 9.966 4.471 9.966 9.965 0 5.495-4.471 9.962-9.966 9.962z" />
              </svg>
              <span>Chat on WhatsApp</span>
            </button>
          </div>

          {/* Bottom Info note */}
          <div className="flex items-center gap-1.5 text-[12px] text-[#74767E] pt-1">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>Confirm scope and supplies before booking.</span>
          </div>
        </div>
      </div>

      {/* Customer reviews card placed in right column matching 5.png */}
      <ServiceReviews categoryTitle={categoryTitle} categorySlug={categorySlug} />
    </div>
  );
}
