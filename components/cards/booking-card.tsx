"use client";

import * as React from "react";
import { Calendar, Clock } from "lucide-react";
import { Button } from "../ui/button";

export interface BookingCardProps {
  startingPrice?: number;
  currency?: string;
  packages?: { id: string; name: string; price: number }[];
  onRequestBooking?: (details: {
    packageId: string;
    date: string;
    time: string;
  }) => void;
  className?: string;
}

export function BookingCard({
  startingPrice = 150,
  currency = "GH₵",
  packages = [
    { id: "regular", name: "Regular", price: 150 },
    { id: "deep", name: "Deep", price: 280 },
  ],
  onRequestBooking,
  className = "",
}: BookingCardProps) {
  const [selectedPkg, setSelectedPkg] = React.useState(packages[0]?.id || "regular");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");

  const currentPackage = packages.find((p) => p.id === selectedPkg) || packages[0];
  const displayPrice = currentPackage ? currentPackage.price : startingPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRequestBooking?.({
      packageId: selectedPkg,
      date,
      time,
    });
  };

  return (
    <div
      className={`flex flex-col bg-white border border-[#DADBDD] rounded-[12px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] gap-4 w-full ${className}`.trim()}
    >
      {/* Package Tabs */}
      <div className="flex bg-[#F3F4F6] p-1 rounded-[8px] gap-1">
        {packages.map((pkg) => {
          const isActive = selectedPkg === pkg.id;
          return (
            <button
              key={pkg.id}
              type="button"
              onClick={() => setSelectedPkg(pkg.id)}
              className={`flex-1 py-1.5 text-[14px] leading-[20px] font-medium rounded-[6px] transition-all ${
                isActive
                  ? "bg-[#003912] text-white shadow-xs"
                  : "text-[#62646A] hover:text-[#222325]"
              }`}
            >
              {pkg.name}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Date Input */}
        <div className="relative flex items-center">
          <Calendar className="absolute left-3.5 w-4 h-4 text-[#74767E] pointer-events-none" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full h-[44px] rounded-[8px] border border-[#DADBDD] bg-white pl-10 pr-3 text-[14px] text-[#222325] focus:outline-none focus:border-[#003912] focus:ring-1 focus:ring-[#003912]"
            placeholder="Choose date"
          />
        </div>

        {/* Time Input */}
        <div className="relative flex items-center">
          <Clock className="absolute left-3.5 w-4 h-4 text-[#74767E] pointer-events-none" />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full h-[44px] rounded-[8px] border border-[#DADBDD] bg-white pl-10 pr-3 text-[14px] text-[#222325] focus:outline-none focus:border-[#003912] focus:ring-1 focus:ring-[#003912]"
            placeholder="Select time"
          />
        </div>

        {/* Action Button */}
        <Button type="submit" variant="primary" fullWidth className="mt-1">
          Request booking
        </Button>
      </form>

      {/* Price footer */}
      <div className="flex items-baseline justify-between pt-3 border-t border-[#F3F4F6] text-[14px]">
        <span className="text-[#62646A]">Total estimated</span>
        <span className="text-[16px] font-bold text-[#222325]">
          From {currency}
          {displayPrice}
        </span>
      </div>
    </div>
  );
}
