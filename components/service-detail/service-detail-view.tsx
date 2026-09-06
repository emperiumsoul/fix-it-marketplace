"use client";

import * as React from "react";
import Link from "next/link";
import { Star, MapPin, Home } from "lucide-react";
import { ServiceGallery } from "./service-gallery";
import { ServiceAbout } from "./service-about";
import { ServiceProviderCard } from "./service-provider-card";
import { ServiceRecentProjects } from "./service-recent-projects";
import { ServicePackageComparison, PackageType } from "./service-package-comparison";
import { ServiceBookingSidebar } from "./service-booking-sidebar";
import { ServiceRecommendations } from "./service-recommendations";
import { ServiceFAQs } from "./service-faqs";
import { ServiceRelatedTags } from "./service-related-tags";
import { HelpOptions } from "@/components/category/help-options";
import { ServiceBookingModal } from "./service-booking-modal";
import { ServiceContactModal } from "./service-contact-modal";

export interface ServiceDetailViewProps {
  initialTitle?: string;
  initialCategory?: string;
  initialProvider?: string;
  initialPrice?: number;
  initialLocation?: string;
}

export function ServiceDetailView({
  initialTitle = "I will clean your home and living spaces",
  initialCategory = "Cleaning",
  initialProvider = "Neat Home",
  initialLocation = "Accra",
}: ServiceDetailViewProps) {
  const [selectedPackage, setSelectedPackage] = React.useState<PackageType>("regular");
  const [isBookingModalOpen, setIsBookingModalOpen] = React.useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);
  const [bookingFormData, setBookingFormData] = React.useState({
    propertySize: "",
    selectedDate: "",
    selectedTime: "",
  });

  const handleRequestBooking = (data: {
    propertySize: string;
    selectedDate: string;
    selectedTime: string;
  }) => {
    setBookingFormData(data);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Breadcrumb matching 5.png */}
      <nav className="flex items-center gap-2 text-[13px] text-[#74767E] mb-4">
        <Link href="/" className="hover:text-[#222325] transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/categories/house-cleaning" className="hover:text-[#222325] transition-colors">
          {initialCategory}
        </Link>
        <span>/</span>
        <span className="text-[#222325] font-medium">House Cleaning</span>
      </nav>

      {/* Main Service Title */}
      <div className="mb-4">
        <h1 className="font-grotesque font-bold text-[28px] sm:text-[34px] lg:text-[38px] leading-tight text-[#222325]">
          {initialTitle}
        </h1>

        {/* Provider Subtitle Row matching 5.png */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 text-[13px] sm:text-[14px]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#008744] flex items-center justify-center text-white shrink-0">
              <Home className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-[#222325]">{initialProvider}</span>
          </div>

          <div className="flex items-center gap-1 text-[#62646A]">
            <MapPin className="w-3.5 h-3.5 text-[#74767E]" />
            <span>{initialLocation}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#222325]">
            <Star className="w-3.5 h-3.5 fill-[#EAB308] text-[#EAB308]" />
            <span className="font-bold">4.9</span>
            <span className="text-[#74767E]">(24 reviews)</span>
          </div>

          <span className="text-[#DADBDD] hidden sm:inline">·</span>

          <span className="text-[12px] text-[#74767E]">
            Service preview · Illustrative details
          </span>
        </div>
      </div>

      {/* 2-Column Main Layout matching 5.png */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mt-6">
        {/* Left Column (~67% desktop) */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          {/* Gallery Carousel & Highlights */}
          <ServiceGallery />

          {/* About this service & Customer spotlight */}
          <ServiceAbout location={initialLocation} />

          {/* Meet Neat Home Provider Card */}
          <ServiceProviderCard
            onContact={() => setIsContactModalOpen(true)}
            location={initialLocation}
          />

          {/* Recent cleaning projects portfolio */}
          <ServiceRecentProjects />

          {/* Compare packages table */}
          <ServicePackageComparison
            selectedPackage={selectedPackage}
            onSelectPackage={setSelectedPackage}
          />

          {/* Recommendations, More cleaning services, People also viewed */}
          <ServiceRecommendations />

          {/* FAQs Accordion */}
          <ServiceFAQs />

          {/* Related Tags */}
          <ServiceRelatedTags />
        </div>

        {/* Right Column (~33% desktop) */}
        <div className="lg:col-span-4">
          <ServiceBookingSidebar
            selectedPackage={selectedPackage}
            onSelectPackage={setSelectedPackage}
            onRequestBooking={handleRequestBooking}
            onContactProvider={() => setIsContactModalOpen(true)}
          />
        </div>
      </div>

      {/* Need more help? matching bottom of 5.png */}
      <div className="mt-16 pt-8 border-t border-[#E5E7EB]">
        <HelpOptions categoryTitle="cleaning" categorySlug="house-cleaning" />
      </div>

      {/* Modals */}
      <ServiceBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedPackage={selectedPackage}
        propertySize={bookingFormData.propertySize}
        selectedDate={bookingFormData.selectedDate}
        selectedTime={bookingFormData.selectedTime}
        providerName={initialProvider}
        location={initialLocation}
      />

      <ServiceContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        providerName={initialProvider}
        serviceTitle={initialTitle}
      />
    </div>
  );
}
