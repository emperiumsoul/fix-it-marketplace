"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Check, X, Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
  packagePrice: number;
  currency?: string;
  propertySize: string;
  selectedDate: string;
  selectedTime: string;
  providerName?: string;
  location?: string;
}

export function ServiceBookingModal({
  isOpen,
  onClose,
  packageName = "Standard Service",
  packagePrice = 150,
  currency = "GH₵",
  propertySize,
  selectedDate,
  selectedTime,
  providerName = "Local Pro",
  location = "Accra",
}: BookingModalProps) {
  const router = useRouter();
  const [address, setAddress] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [createdBookingId, setCreatedBookingId] = React.useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingId = `BK-${Math.floor(10000 + Math.random() * 90000)}`;
    setCreatedBookingId(bookingId);

    // Save to customer bookings
    if (typeof window !== "undefined") {
      try {
        const storedCustomerBookings = localStorage.getItem("fixit_customer_bookings");
        let customerList = storedCustomerBookings ? JSON.parse(storedCustomerBookings) : [];
        if (!Array.isArray(customerList)) customerList = [];

        const newCustomerBooking = {
          id: bookingId,
          providerName,
          providerInitial: providerName.charAt(0).toUpperCase(),
          serviceTitle: packageName,
          serviceSlug: window.location.pathname.split("/")[2] || "service",
          packageName,
          scope: notes ? `${propertySize ? propertySize + " · " : ""}${notes}` : `${propertySize || "Standard Service"} requested appointment`,
          price: packagePrice,
          scheduledTime: `${selectedDate || "Next Available"} · ${selectedTime || "09:00 AM"}`,
          address: address || `${location || "Accra"}, Ghana`,
          status: "requested" as const,
          paymentStatus: "unpaid" as const,
        };

        customerList = [newCustomerBooking, ...customerList];
        localStorage.setItem("fixit_customer_bookings", JSON.stringify(customerList));

        // Save to provider orders
        const storedProviderOrders = localStorage.getItem("fixit_provider_orders");
        let providerList = storedProviderOrders ? JSON.parse(storedProviderOrders) : [];
        if (!Array.isArray(providerList)) providerList = [];

        const newProviderOrder = {
          id: bookingId,
          customerName: "You (Customer)",
          customerEmail: "customer@fixit.gh",
          serviceTitle: packageName,
          serviceSlug: window.location.pathname.split("/")[2] || "service",
          package: packageName,
          scheduledDate: selectedDate || "Next Available",
          scheduledTime: selectedTime || "09:00 AM",
          address: address || `${location || "Accra"}, Ghana`,
          notes: notes || "Booking requested via service detail page",
          amount: packagePrice,
          status: "pending",
          date: new Date().toISOString().split("T")[0],
        };

        providerList = [newProviderOrder, ...providerList];
        localStorage.setItem("fixit_provider_orders", JSON.stringify(providerList));

        // Add to notifications
        const storedNotifs = localStorage.getItem("fixit_notifications");
        let notifs = storedNotifs ? JSON.parse(storedNotifs) : [];
        if (!Array.isArray(notifs)) notifs = [];
        notifs.unshift({
          id: `notif-${Date.now()}`,
          title: "Booking Request Submitted",
          description: `Your appointment request #${bookingId} with ${providerName} is awaiting provider confirmation.`,
          timestamp: "Just now",
          read: false,
          type: "booking",
          link: "/bookings",
        });
        localStorage.setItem("fixit_notifications", JSON.stringify(notifs));
      } catch (err) {
        console.error("Failed to persist booking", err);
      }
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleTrackBookings = () => {
    onClose();
    router.push("/bookings");
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
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-[#E8F8F0] text-[#008744] flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="font-grotesque font-bold text-[22px] text-[#222325]">
              Booking Request Submitted!
            </h3>
            <p className="text-[14px] text-[#62646A] mt-2 max-w-md mx-auto">
              Your request <span className="font-semibold text-[#008744]">#{createdBookingId}</span> has been sent to{" "}
              <span className="font-semibold text-[#222325]">{providerName}</span>.
              You can track status updates and message the provider directly.
            </p>

            <div className="mt-6 p-4 rounded-[12px] bg-[#F9FAFB] border border-[#E5E7EB] text-left text-[13px] space-y-2">
              <div className="flex justify-between">
                <span className="text-[#74767E]">Booking ID:</span>
                <span className="font-mono font-semibold text-[#222325]">{createdBookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#74767E]">Package:</span>
                <span className="font-semibold text-[#222325]">{packageName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#74767E]">Scheduled Date:</span>
                <span className="font-semibold text-[#222325]">{selectedDate || "Next Available"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#74767E]">Time:</span>
                <span className="font-semibold text-[#222325]">{selectedTime || "09:00 AM"}</span>
              </div>
              <div className="flex justify-between border-t border-[#E5E7EB] pt-2 mt-2">
                <span className="font-medium text-[#222325]">Agreed Price:</span>
                <span className="font-bold text-[#008744]">{currency}{packagePrice}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleTrackBookings}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#008744] hover:bg-[#007038] text-white font-semibold text-[14px] rounded-[8px] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                Track in My Bookings <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#F7F7F7] hover:bg-[#E5E7EB] text-[#222325] font-semibold text-[14px] rounded-[8px] transition-colors cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <span className="text-[12px] font-semibold text-[#008744] uppercase tracking-wider">
                Confirm Booking Request
              </span>
              <h3 className="font-grotesque font-bold text-[22px] text-[#222325] mt-0.5">
                {packageName}
              </h3>
              <p className="text-[13px] text-[#62646A] mt-1">
                with <span className="font-semibold text-[#222325]">{providerName}</span> in {location}
              </p>
            </div>

            {/* Schedule Summary Box */}
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] p-4 text-[13px] space-y-2">
              <div className="flex items-center gap-2 text-[#222325]">
                <Calendar className="w-4 h-4 text-[#008744]" />
                <span className="font-medium">Date:</span>
                <span className="ml-auto font-semibold">{selectedDate || "Next Available"}</span>
              </div>
              <div className="flex items-center gap-2 text-[#222325]">
                <Clock className="w-4 h-4 text-[#008744]" />
                <span className="font-medium">Time:</span>
                <span className="ml-auto font-semibold">{selectedTime || "Morning Slot"}</span>
              </div>
              {propertySize && (
                <div className="flex items-center gap-2 text-[#222325]">
                  <span className="font-medium text-[#74767E]">Property Size:</span>
                  <span className="ml-auto font-semibold">{propertySize}</span>
                </div>
              )}
            </div>

            {/* Location & Address Input */}
            <div>
              <label className="block text-[13px] font-semibold text-[#222325] mb-1.5">
                Service Address in Ghana <span className="text-[#B42318]">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#74767E] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. House 14, Jungle Ave, East Legon, Accra"
                  className="w-full pl-9 pr-3 py-2.5 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#222325]"
                />
              </div>
              <p className="text-[11px] text-[#74767E] mt-1">
                Your private address is only shared with the assigned provider upon confirmation.
              </p>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-[13px] font-semibold text-[#222325] mb-1.5">
                Special Instructions / Job Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Gate code, specific parking instructions, or focus areas..."
                className="w-full p-3 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#222325]"
              />
            </div>

            {/* Payment & Price Row */}
            <div className="border-t border-[#E5E7EB] pt-3 flex items-center justify-between">
              <div>
                <span className="text-[12px] text-[#74767E] block">Total to Pay on Service</span>
                <span className="font-bold text-[20px] text-[#008744]">
                  {currency}{packagePrice}
                </span>
              </div>
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-[13px] font-semibold text-[#62646A] hover:text-[#222325] rounded-[8px] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#008744] hover:bg-[#007038] disabled:bg-[#DADBDD] text-white font-semibold text-[14px] rounded-[8px] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  {isSubmitting ? "Submitting..." : "Send Request"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
