"use client";

import * as React from "react";
import { Calendar, Clock, ChevronDown, Info } from "lucide-react";
import { PackageType } from "./service-package-comparison";
import { ServiceReviews } from "./service-reviews";

export interface ServiceBookingSidebarProps {
  selectedPackage: PackageType;
  onSelectPackage: (pkg: PackageType) => void;
  onRequestBooking: (data: {
    propertySize: string;
    selectedDate: string;
    selectedTime: string;
  }) => void;
  onContactProvider: () => void;
}

export function ServiceBookingSidebar({
  selectedPackage,
  onSelectPackage,
  onRequestBooking,
  onContactProvider,
}: ServiceBookingSidebarProps) {
  const [propertySize, setPropertySize] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState("");
  const [selectedTime, setSelectedTime] = React.useState("");

  const packagesInfo: Record<
    PackageType,
    {
      title: string;
      price: number;
      description: string;
      inclusions: string[];
    }
  > = {
    regular: {
      title: "Regular home cleaning",
      price: 150,
      description:
        "Keep your home fresh and tidy with our regular cleaning service. Ideal for weekly or bi-weekly maintenance.",
      inclusions: [
        "Dusting and surface cleaning",
        "Vacuuming and mopping",
        "Kitchen and bathroom cleaning",
        "Bedroom and living-area tidying",
      ],
    },
    deep: {
      title: "Deep home cleaning",
      price: 300,
      description:
        "Intensive scrubbing for grout, tile descaling, inside oven, baseboards, and comprehensive sanitization.",
      inclusions: [
        "Dusting and surface cleaning",
        "Vacuuming and mopping",
        "Kitchen and bathroom cleaning",
        "Detailed grout & appliance cleaning",
      ],
    },
    moveout: {
      title: "Move-out home cleaning",
      price: 400,
      description:
        "Complete empty-property scrub and preparation for handover, new tenants, or property sales.",
      inclusions: [
        "Dusting and surface cleaning",
        "Vacuuming and mopping",
        "Kitchen and bathroom cleaning",
        "Empty-property cabinet & window detailing",
      ],
    },
  };

  const currentPkg = packagesInfo[selectedPackage];

  const handleBookingClick = () => {
    onRequestBooking({
      propertySize: propertySize || "Standard (2-3 Bedroom)",
      selectedDate: selectedDate || new Date().toISOString().split("T")[0],
      selectedTime: selectedTime || "Morning (9:00 AM - 12:00 PM)",
    });
  };

  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-20">
      {/* Booking Form Card matching 5.png */}
      <div className="rounded-[16px] border border-[#E5E7EB] bg-white shadow-xs overflow-hidden flex flex-col">
        {/* Top 3 Package Selector Tabs */}
        <div className="grid grid-cols-3 border-b border-[#E5E7EB] text-center text-[14px] font-medium bg-[#FAFAFA]">
          <button
            type="button"
            onClick={() => onSelectPackage("regular")}
            className={`py-3.5 transition-colors cursor-pointer ${
              selectedPackage === "regular"
                ? "font-semibold text-[#222325] border-b-2 border-[#222325] bg-white"
                : "text-[#74767E] hover:text-[#222325]"
            }`}
          >
            Regular
          </button>
          <button
            type="button"
            onClick={() => onSelectPackage("deep")}
            className={`py-3.5 transition-colors cursor-pointer ${
              selectedPackage === "deep"
                ? "font-semibold text-[#222325] border-b-2 border-[#222325] bg-white"
                : "text-[#74767E] hover:text-[#222325]"
            }`}
          >
            Deep
          </button>
          <button
            type="button"
            onClick={() => onSelectPackage("moveout")}
            className={`py-3.5 transition-colors cursor-pointer ${
              selectedPackage === "moveout"
                ? "font-semibold text-[#222325] border-b-2 border-[#222325] bg-white"
                : "text-[#74767E] hover:text-[#222325]"
            }`}
          >
            Move-out
          </button>
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col gap-5">
          {/* Header Title & Price */}
          <div>
            <h3 className="font-grotesque font-bold text-[18px] text-[#222325]">
              {currentPkg.title}
            </h3>
            <div className="font-grotesque font-bold text-[28px] sm:text-[32px] text-[#222325] mt-1">
              GH₵{currentPkg.price}
            </div>
            <p className="text-[13px] leading-[19px] text-[#62646A] mt-2">
              {currentPkg.description}
            </p>
          </div>

          {/* This includes bullet list */}
          <div className="pt-2 border-t border-[#F3F4F6]">
            <h4 className="font-semibold text-[13px] text-[#222325] mb-2">
              This includes:
            </h4>
            <ul className="space-y-1.5 text-[13px] text-[#404145]">
              {currentPkg.inclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#008744] font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form Fields matching 5.png */}
          <div className="flex flex-col gap-3.5 pt-2 border-t border-[#F3F4F6]">
            {/* Property Size */}
            <div>
              <label className="block text-[12px] font-semibold text-[#62646A] mb-1">
                Property size
              </label>
              <div className="relative">
                <select
                  value={propertySize}
                  onChange={(e) => setPropertySize(e.target.value)}
                  className="w-full h-[40px] pl-3 pr-8 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] bg-white appearance-none focus:outline-none focus:border-[#222325] cursor-pointer"
                >
                  <option value="">Select property size</option>
                  <option value="1 Bedroom / Studio">1 Bedroom / Studio</option>
                  <option value="2 Bedrooms">2 Bedrooms</option>
                  <option value="3 Bedrooms">3 Bedrooms</option>
                  <option value="4+ Bedrooms">4+ Bedrooms</option>
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
              className="w-full py-2.5 rounded-[8px] border border-[#222325] hover:bg-[#F7F7F7] font-semibold text-[14px] text-[#222325] transition-colors cursor-pointer"
            >
              Contact provider
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
      <ServiceReviews />
    </div>
  );
}
