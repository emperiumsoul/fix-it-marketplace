"use client";

import * as React from "react";
import { Check, X, Calendar, Clock, MapPin, AlertCircle } from "lucide-react";
import { PackageType } from "./service-package-comparison";

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: PackageType;
  propertySize: string;
  selectedDate: string;
  selectedTime: string;
  providerName?: string;
  location?: string;
}

export function ServiceBookingModal({
  isOpen,
  onClose,
  selectedPackage,
  propertySize,
  selectedDate,
  selectedTime,
  providerName = "Neat Home",
  location = "Accra",
}: BookingModalProps) {
  const [address, setAddress] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  if (!isOpen) return null;

  const packagePrices: Record<PackageType, number> = {
    regular: 150,
    deep: 300,
    moveout: 400,
  };

  const packageNames: Record<PackageType, string> = {
    regular: "Regular Home Cleaning",
    deep: "Deep Home Cleaning",
    moveout: "Move-out Home Cleaning",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[540px] bg-white rounded-[20px] shadow-2xl p-6 sm:p-8 text-[#222325] animate-in zoom-in-95 duration-200"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-[#74767E] hover:text-[#222325] hover:bg-[#F7F7F7] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-[#E8F8F0] text-[#008744] flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="font-grotesque font-bold text-[22px] text-[#222325]">
              Booking Request Sent!
            </h3>
            <p className="text-[14px] text-[#62646A] mt-2 max-w-md mx-auto">
              Your request has been forwarded to <span className="font-semibold text-[#222325]">{providerName}</span>.
              They will review the schedule and confirm via your Fix it messages.
            </p>
            <div className="mt-6 p-4 rounded-[12px] bg-[#F9FAFB] border border-[#E5E7EB] text-left text-[13px] space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#74767E]">Package:</span>
                <span className="font-semibold text-[#222325]">{packageNames[selectedPackage]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#74767E]">Scheduled Date:</span>
                <span className="font-semibold text-[#222325]">{selectedDate || "As arranged"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#74767E]">Time:</span>
                <span className="font-semibold text-[#222325]">{selectedTime || "Morning slot"}</span>
              </div>
              <div className="flex justify-between border-t border-[#E5E7EB] pt-1.5 mt-1.5">
                <span className="font-medium text-[#222325]">Agreed Price:</span>
                <span className="font-bold text-[#008744]">GH₵{packagePrices[selectedPackage]}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 px-8 py-2.5 bg-[#222325] hover:bg-black text-white font-semibold text-[14px] rounded-[8px] transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <h3 className="font-grotesque font-bold text-[22px] text-[#222325]">
                Request Service Booking
              </h3>
              <p className="text-[13px] text-[#62646A] mt-1">
                Booking with <span className="font-semibold text-[#222325]">{providerName}</span> ({location})
              </p>
            </div>

            {/* Summary Box */}
            <div className="p-4 rounded-[12px] bg-[#F9FAFB] border border-[#E5E7EB] flex flex-col gap-2 text-[13px]">
              <div className="flex justify-between items-center">
                <span className="font-medium text-[#222325]">{packageNames[selectedPackage]}</span>
                <span className="font-bold text-[15px] text-[#222325]">GH₵{packagePrices[selectedPackage]}</span>
              </div>
              <div className="flex items-center gap-4 text-[#74767E] text-[12px] pt-1 border-t border-[#E5E7EB]/60">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{selectedDate || "Date to be confirmed"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{selectedTime || "Time slot to be confirmed"}</span>
                </div>
              </div>
              {propertySize && (
                <div className="text-[12px] text-[#62646A]">
                  Property: <span className="font-medium text-[#222325]">{propertySize}</span>
                </div>
              )}
            </div>

            {/* Service Address Input */}
            <div>
              <label className="block text-[13px] font-semibold text-[#222325] mb-1.5">
                Service Address in Ghana <span className="text-[#E11D48]">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. 14 Boundary Road, East Legon, Accra"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full h-[42px] pl-9 pr-3 rounded-[8px] border border-[#DADBDD] text-[14px] text-[#222325] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#222325]"
                />
                <MapPin className="w-4 h-4 text-[#74767E] absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-[13px] font-semibold text-[#222325] mb-1.5">
                Special Instructions or Notes (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Any special focus areas, pet precautions, or gate access instructions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#222325]"
              />
            </div>

            <div className="flex items-start gap-2 text-[12px] text-[#74767E]">
              <AlertCircle className="w-4 h-4 text-[#008744] shrink-0 mt-0.5" />
              <span>
                Payment is only processed after service verification. No upfront charge on Fix it.
              </span>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-[8px] border border-[#DADBDD] text-[14px] font-medium text-[#404145] hover:bg-[#F7F7F7]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#0B3B24] hover:bg-[#072718] disabled:opacity-50 text-white font-semibold text-[14px] rounded-[8px] transition-colors shadow-sm cursor-pointer"
              >
                {isSubmitting ? "Submitting..." : "Confirm & Send Request"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
