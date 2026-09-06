"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  PlayCircle,
  MessageSquare,
  Star,
  X,
  ArrowRight,
} from "lucide-react";

export interface CustomerBooking {
  id: string;
  providerName: string;
  providerInitial: string;
  serviceTitle: string;
  serviceSlug: string;
  packageName: string;
  scope: string;
  price: number;
  scheduledTime: string;
  address: string;
  status: "requested" | "confirmed" | "in_progress" | "completed" | "cancelled";
  paymentStatus: "paid" | "pending" | "unpaid";
  hasReviewed?: boolean;
  userRating?: number;
  userReviewText?: string;
}

const INITIAL_CUSTOMER_BOOKINGS: CustomerBooking[] = [
  {
    id: "BK-98124",
    providerName: "Akosua CleanCo",
    providerInitial: "A",
    serviceTitle: "Professional House Cleaning",
    serviceSlug: "standard-home-cleaning",
    packageName: "Single Session: 2-3 Bedroom House",
    scope: "Routine scheduled maintenance cleaning of 2 bedrooms, 2 bathrooms, kitchen, and living room.",
    price: 360,
    scheduledTime: "2026-09-14T09:30:00Z",
    address: "House 14, Jungle Avenue, East Legon, Accra",
    status: "requested",
    paymentStatus: "unpaid",
  },
  {
    id: "BK-44821",
    providerName: "Kwame Mensah",
    providerInitial: "K",
    serviceTitle: "Residential Plumbing & Pipe Repairs",
    serviceSlug: "residential-plumbing-repairs",
    packageName: "Standard Multi-Point Repair & Drain Clearing",
    scope: "Repairing 2 leaking washbasin traps, re-seating kitchen faucet, and mechanical drain snaking.",
    price: 350,
    scheduledTime: "2026-09-10T10:00:00Z",
    address: "Apartment 4B, Ringway Estates, Osu, Accra",
    status: "confirmed",
    paymentStatus: "paid",
  },
  {
    id: "BK-77192",
    providerName: "Kofi Boateng",
    providerInitial: "K",
    serviceTitle: "Electrical Wiring & Breaker Panel Repair",
    serviceSlug: "electrical-repairs-wiring",
    packageName: "Multi-Room Circuit Testing & Panel Rebalancing",
    scope: "Diagnosing tripping MCB breaker, phase load re-balancing on 3-phase board, and surge protection check.",
    price: 380,
    scheduledTime: "2026-09-06T09:30:00Z",
    address: "Plot 8, Block B, Ahodwo Residential Area, Kumasi",
    status: "in_progress",
    paymentStatus: "paid",
  },
  {
    id: "BK-33910",
    providerName: "Akosua CleanCo",
    providerInitial: "A",
    serviceTitle: "Intensive Deep Home Cleaning",
    serviceSlug: "deep-home-cleaning",
    packageName: "3-4 Bedroom Family Residence Deep Clean",
    scope: "Intensive floor scrubbing, tile limescale descaling, kitchen oven grease removal, and window wash.",
    price: 750,
    scheduledTime: "2026-09-02T08:00:00Z",
    address: "House 14, Jungle Avenue, East Legon, Accra",
    status: "completed",
    paymentStatus: "paid",
    hasReviewed: true,
    userRating: 5,
    userReviewText: "Superb attention to detail! Akosua and her team arrived right on time and left our home spotless.",
  },
  {
    id: "BK-11029",
    providerName: "SwiftHaul Ghana",
    providerInitial: "S",
    serviceTitle: "Apartment Relocation & Moving Services",
    serviceSlug: "moving-relocation-services",
    packageName: "Studio / 1-Bedroom Apartment Relocation",
    scope: "Moving personal furniture and appliances from Osu to Tema Community 6.",
    price: 500,
    scheduledTime: "2026-08-28T14:00:00Z",
    address: "Apartment 4B, Ringway Estates, Osu, Accra",
    status: "cancelled",
    paymentStatus: "unpaid",
  },
];

export function BookingsView() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();

  const [bookings, setBookings] = React.useState<CustomerBooking[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("fixit_customer_bookings");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_CUSTOMER_BOOKINGS;
  });

  const [filter, setFilter] = React.useState<string>("all");
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // Review modal state
  const [activeReviewBooking, setActiveReviewBooking] = React.useState<CustomerBooking | null>(null);
  const [rating, setRating] = React.useState(5);
  const [reviewText, setReviewText] = React.useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const saveBookings = (updated: CustomerBooking[]) => {
    setBookings(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("fixit_customer_bookings", JSON.stringify(updated));
    }
  };

  const handleCancelBooking = (id: string) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status: "cancelled" as const } : b));
    saveBookings(updated);
    showToast(`Booking #${id} has been cancelled.`);
  };

  const handleOpenReview = (booking: CustomerBooking) => {
    setActiveReviewBooking(booking);
    setRating(5);
    setReviewText("");
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReviewBooking || !reviewText.trim()) return;

    const updated = bookings.map((b) =>
      b.id === activeReviewBooking.id
        ? {
            ...b,
            hasReviewed: true,
            userRating: rating,
            userReviewText: reviewText.trim(),
          }
        : b
    );
    saveBookings(updated);
    setActiveReviewBooking(null);
    showToast(`Thank you! Your verified review for ${activeReviewBooking.providerName} has been submitted.`);
  };

  const filteredBookings = bookings.filter((b) => {
    if (filter === "all") return true;
    return b.status === filter;
  });

  const getStatusBadge = (status: CustomerBooking["status"]) => {
    switch (status) {
      case "requested":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] text-[12px] font-semibold">
            <Clock className="w-3.5 h-3.5" /> Awaiting Provider Confirmation
          </span>
        );
      case "confirmed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#DBEAFE] text-[#1E40AF] text-[12px] font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed & Scheduled
          </span>
        );
      case "in_progress":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EDE9FE] text-[#5B21B6] text-[12px] font-semibold">
            <PlayCircle className="w-3.5 h-3.5" /> Service In Progress
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E8F8F0] text-[#008744] text-[12px] font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FEE2E2] text-[#991B1B] text-[12px] font-semibold">
            <XCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
    }
  };

  if (isLoaded && !isSignedIn) {
    return (
      <div className="bg-white rounded-[16px] border border-[#DADBDD] p-8 sm:p-12 text-center max-w-[560px] mx-auto shadow-xs my-8">
        <div className="w-16 h-16 rounded-full bg-[#EBF7EE] text-[#008744] flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 stroke-[2]" />
        </div>
        <h2 className="text-[22px] font-bold text-[#222325] mb-2">
          Sign in to view your bookings
        </h2>
        <p className="text-[14px] text-[#62646A] leading-relaxed mb-6">
          Access your scheduled appointments, track live job status with service providers, and manage your orders.
        </p>
        <div className="flex items-center justify-center gap-3">
          <SignInButton mode="modal">
            <button
              type="button"
              className="px-6 py-2.5 bg-[#222325] hover:bg-black text-white font-semibold text-[14px] rounded-[8px] transition-colors cursor-pointer"
            >
              Sign in
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button
              type="button"
              className="px-6 py-2.5 bg-[#008744] hover:bg-[#007038] text-white font-semibold text-[14px] rounded-[8px] transition-colors cursor-pointer"
            >
              Join Fix it
            </button>
          </SignUpButton>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#18181B] text-white text-[13px] font-medium px-4 py-3 rounded-[10px] shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-[#008744]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-grotesque font-bold text-[28px] sm:text-[32px] tracking-tight text-[#222325]">
            My Bookings & Orders
          </h1>
          <p className="text-[14px] text-[#62646A] mt-1">
            Track your service requests, scheduled appointments in Ghana, and leave verified reviews.
          </p>
        </div>

        <Link
          href="/search"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-[#18181B] hover:bg-[#27272A] text-white text-[13px] font-semibold transition-colors shadow-xs self-start sm:self-auto"
        >
          <span>Find Services</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E5E7EB] pb-3 text-[14px]">
        {[
          { id: "all", label: "All Bookings", count: bookings.length },
          {
            id: "requested",
            label: "Requested",
            count: bookings.filter((b) => b.status === "requested").length,
          },
          {
            id: "confirmed",
            label: "Confirmed",
            count: bookings.filter((b) => b.status === "confirmed").length,
          },
          {
            id: "in_progress",
            label: "In Progress",
            count: bookings.filter((b) => b.status === "in_progress").length,
          },
          {
            id: "completed",
            label: "Completed",
            count: bookings.filter((b) => b.status === "completed").length,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-[8px] font-medium transition-all cursor-pointer flex items-center gap-2 ${
              filter === tab.id
                ? "bg-[#18181B] text-white font-semibold shadow-xs"
                : "text-[#62646A] hover:text-[#222325] hover:bg-[#F3F4F6]"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                filter === tab.id ? "bg-white text-[#18181B] font-bold" : "bg-[#E5E7EB] text-[#71717A]"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-[20px] border border-[#E5E7EB] p-12 text-center shadow-xs flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-[#F3F4F6] text-[#74767E] flex items-center justify-center mb-3">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="font-grotesque font-bold text-[18px] text-[#222325]">
            No bookings found
          </h3>
          <p className="text-[13px] text-[#62646A] mt-1 max-w-sm">
            You don&apos;t have any service bookings under this filter.
          </p>
          <Link
            href="/search"
            className="mt-4 px-5 py-2.5 rounded-[10px] bg-[#18181B] text-white text-[13px] font-semibold hover:bg-black transition-colors"
          >
            Browse Popular Services in Ghana
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {filteredBookings.map((b) => {
            const formattedDate = new Date(b.scheduledTime).toLocaleDateString("en-GB", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={b.id}
                className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 shadow-xs flex flex-col gap-4 hover:border-[#DADBDD] transition-all"
              >
                {/* Header: Service + Provider + Badge + Price */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F3F4F6]">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#18181B] text-white font-bold text-[16px] flex items-center justify-center shrink-0">
                      {b.providerInitial}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/services/${b.serviceSlug}`}
                          className="font-grotesque font-bold text-[17px] text-[#222325] hover:text-[#008744] transition-colors"
                        >
                          {b.serviceTitle}
                        </Link>
                        <span className="text-[12px] font-mono text-[#74767E] bg-[#F4F4F5] px-2 py-0.5 rounded-[4px]">
                          #{b.id}
                        </span>
                      </div>
                      <p className="text-[13px] text-[#74767E] mt-0.5">
                        Provider: <span className="font-semibold text-[#222325]">{b.providerName}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1.5 self-start sm:self-auto">
                    {getStatusBadge(b.status)}
                    <span className="font-grotesque font-bold text-[20px] text-[#222325]">
                      GHS {b.price}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]">
                  <div className="space-y-1">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#74767E]">
                      Package & Scope
                    </span>
                    <p className="font-semibold text-[#222325]">{b.packageName}</p>
                    <p className="text-[12px] text-[#62646A] italic leading-relaxed">
                      &quot;{b.scope}&quot;
                    </p>
                  </div>

                  <div className="space-y-2 bg-[#FAFAFA] p-4 rounded-[12px] border border-[#F3F4F6]">
                    <div className="flex items-center gap-2 text-[#404145]">
                      <Calendar className="w-4 h-4 text-[#74767E] shrink-0" />
                      <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-start gap-2 text-[#404145]">
                      <MapPin className="w-4 h-4 text-[#74767E] shrink-0 mt-0.5" />
                      <span className="leading-snug">{b.address}</span>
                    </div>
                  </div>
                </div>

                {/* User Review Display if already reviewed */}
                {b.hasReviewed && (
                  <div className="p-3.5 rounded-[10px] bg-[#F9FAFB] border border-[#E5E7EB] flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: b.userRating || 5 }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#FFBE5B] text-[#FFBE5B]" />
                      ))}
                      <span className="text-[12px] font-semibold text-[#222325] ml-1.5">
                        Your Verified Review
                      </span>
                    </div>
                    <p className="text-[12px] text-[#62646A] italic">
                      &quot;{b.userReviewText}&quot;
                    </p>
                  </div>
                )}

                {/* Footer Actions */}
                <div className="pt-3 border-t border-[#F3F4F6] flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[12px] text-[#74767E]">
                    Payment Status:{" "}
                    <span className="font-semibold text-[#008744]">
                      {b.paymentStatus.toUpperCase()} (Fixed Escrow)
                    </span>
                  </span>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => router.push(`/messages?service=${encodeURIComponent(b.serviceTitle)}&provider=${encodeURIComponent(b.providerName)}`)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[8px] border border-[#DADBDD] text-[13px] font-semibold text-[#222325] hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#74767E]" />
                      <span>Message Provider</span>
                    </button>

                    {b.status === "completed" && !b.hasReviewed && (
                      <button
                        type="button"
                        onClick={() => handleOpenReview(b)}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-[8px] bg-[#008744] hover:bg-[#007038] text-white text-[13px] font-semibold transition-colors cursor-pointer shadow-xs"
                      >
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>Leave a Review</span>
                      </button>
                    )}

                    {b.status === "requested" && (
                      <button
                        type="button"
                        onClick={() => handleCancelBooking(b.id)}
                        className="px-3.5 py-1.5 rounded-[8px] border border-[#FCA5A5] text-[#991B1B] hover:bg-[#FEE2E2] text-[13px] font-semibold transition-colors cursor-pointer"
                      >
                        Cancel Request
                      </button>
                    )}

                    {b.status === "completed" && (
                      <Link
                        href={`/services/${b.serviceSlug}`}
                        className="px-3.5 py-1.5 rounded-[8px] bg-[#18181B] hover:bg-black text-white text-[13px] font-semibold transition-colors shadow-xs"
                      >
                        Book Again
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Review Modal */}
      {activeReviewBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-[20px] shadow-2xl border border-[#E5E7EB] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#F3F4F6]">
              <div>
                <h3 className="font-grotesque font-bold text-[18px] text-[#222325]">
                  Review {activeReviewBooking.providerName}
                </h3>
                <p className="text-[12px] text-[#74767E]">
                  {activeReviewBooking.serviceTitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveReviewBooking(null)}
                className="p-1.5 rounded-full hover:bg-[#F3F4F6] text-[#74767E] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="p-6 space-y-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#222325] mb-1.5">
                  Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= rating
                            ? "fill-[#FFBE5B] text-[#FFBE5B]"
                            : "text-[#D4D4D8]"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-[14px] font-bold text-[#222325] ml-2">
                    {rating} of 5 stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#222325] mb-1.5">
                  Your Review & Experience *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details about the quality of work, punctuality, communication, and overall experience..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-[10px] border border-[#DADBDD] text-[14px] text-[#222325] focus:outline-hidden focus:border-[#222325]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F3F4F6]">
                <button
                  type="button"
                  onClick={() => setActiveReviewBooking(null)}
                  className="px-4 py-2 text-[14px] font-medium text-[#74767E] hover:text-[#222325] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-[10px] bg-[#008744] hover:bg-[#007038] text-white text-[14px] font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  Submit Verified Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
