"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Home, Wrench, Zap, Paintbrush, Truck, Leaf, Hammer } from "lucide-react";
import { ServiceDetailData } from "./types";
import { ServiceGallery } from "./service-gallery";
import { ServiceAbout } from "./service-about";
import { ServiceProviderCard } from "./service-provider-card";
import { ServiceRecentProjects } from "./service-recent-projects";
import { ServicePackageComparison } from "./service-package-comparison";
import { ServiceBookingSidebar } from "./service-booking-sidebar";
import { ServiceRecommendations } from "./service-recommendations";
import { ServiceFAQs } from "./service-faqs";
import { ServiceRelatedTags } from "./service-related-tags";
import { HelpOptions } from "@/components/category/help-options";
import { ServiceBookingModal } from "./service-booking-modal";
import { ServiceContactModal } from "./service-contact-modal";
import { getCategoryPreset } from "./category-presets";

export interface ServiceDetailViewProps {
  data: ServiceDetailData;
}

export function ServiceDetailView({ data }: ServiceDetailViewProps) {
  const [selectedPackageIndex, setSelectedPackageIndex] = React.useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = React.useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);
  const [bookingFormData, setBookingFormData] = React.useState({
    propertySize: "",
    selectedDate: "",
    selectedTime: "",
  });

  const preset = getCategoryPreset(data.categorySlug || data.categoryTitle);
  const location = data.serviceAreas?.[0] || "Accra";

  // Clean title: remove any leading bracket tags like [Sample Demo] for presentation
  const cleanTitle = data.title.replace(/^\[.*?\]\s*/, "");
  const cleanProvider = data.provider?.displayName?.replace(/^\[.*?\]\s*/, "") || "Local Professional";

  const activePackage = data.packages?.[selectedPackageIndex] || data.packages?.[0] || {
    name: "Standard Service",
    price: data.startingPrice || 150,
  };

  const handleRequestBooking = (formData: {
    propertySize: string;
    selectedDate: string;
    selectedTime: string;
  }) => {
    setBookingFormData(formData);
    setIsBookingModalOpen(true);
  };

  const renderTradeIcon = () => {
    if (preset.icon === "wrench") return <Wrench className="w-3.5 h-3.5" />;
    if (preset.icon === "zap") return <Zap className="w-3.5 h-3.5" />;
    if (preset.icon === "paintbrush") return <Paintbrush className="w-3.5 h-3.5" />;
    if (preset.icon === "truck") return <Truck className="w-3.5 h-3.5" />;
    if (preset.icon === "leaf") return <Leaf className="w-3.5 h-3.5" />;
    if (preset.icon === "hammer") return <Hammer className="w-3.5 h-3.5" />;
    return <Home className="w-3.5 h-3.5" />;
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Breadcrumb matching 5.png */}
      <nav className="flex items-center gap-2 text-[13px] text-[#74767E] mb-4 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-[#222325] transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/categories/${data.categorySlug || "cleaning"}`}
          className="hover:text-[#222325] transition-colors"
        >
          {data.categoryTitle}
        </Link>
        <span>/</span>
        <span className="text-[#222325] font-medium line-clamp-1">{cleanTitle}</span>
      </nav>

      {/* Main Service Title */}
      <div className="mb-4">
        <h1 className="font-grotesque font-bold text-[28px] sm:text-[34px] lg:text-[38px] leading-tight text-[#222325]">
          {cleanTitle}
        </h1>

        {/* Provider Subtitle Row matching 5.png */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 text-[13px] sm:text-[14px]">
          <div className="flex items-center gap-2">
            {data.provider?.photoUrl ? (
              <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-[#DADBDD]">
                <Image
                  src={data.provider.photoUrl}
                  alt={cleanProvider}
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-7 h-7 rounded-full bg-[#008744] flex items-center justify-center text-white shrink-0">
                {renderTradeIcon()}
              </div>
            )}
            <span className="font-semibold text-[#222325]">{cleanProvider}</span>
          </div>

          <div className="flex items-center gap-1 text-[#62646A]">
            <MapPin className="w-3.5 h-3.5 text-[#74767E]" />
            <span>{location}</span>
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
          <ServiceGallery
            images={data.galleryImages}
            categoryTitle={data.categoryTitle}
            categorySlug={data.categorySlug}
          />

          {/* About this service & Customer spotlight */}
          <ServiceAbout
            categoryTitle={data.categoryTitle}
            categorySlug={data.categorySlug}
            location={location}
            descriptionText={data.descriptionText || data.summary}
            includedTasks={data.includedTasks}
          />

          {/* Provider Card */}
          <ServiceProviderCard
            provider={data.provider}
            categoryTitle={data.categoryTitle}
            categorySlug={data.categorySlug}
            location={location}
            onContact={() => setIsContactModalOpen(true)}
          />

          {/* Recent projects portfolio */}
          <ServiceRecentProjects
            projects={data.recentProjects}
            categoryTitle={data.categoryTitle}
            categorySlug={data.categorySlug}
          />

          {/* Compare packages table */}
          <ServicePackageComparison
            packages={data.packages}
            selectedPackageIndex={selectedPackageIndex}
            onSelectPackageIndex={setSelectedPackageIndex}
            currency={data.currency}
          />

          {/* Recommendations, More services, People also viewed */}
          <ServiceRecommendations
            relatedServices={data.relatedServices}
            categoryTitle={data.categoryTitle}
          />

          {/* FAQs Accordion */}
          <ServiceFAQs
            faqs={data.faqs}
            categoryTitle={data.categoryTitle}
          />

          {/* Related Tags */}
          <ServiceRelatedTags
            categoryTitle={data.categoryTitle}
            categorySlug={data.categorySlug}
          />
        </div>

        {/* Right Column (~33% desktop) */}
        <div className="lg:col-span-4">
          <ServiceBookingSidebar
            packages={data.packages}
            selectedPackageIndex={selectedPackageIndex}
            onSelectPackageIndex={setSelectedPackageIndex}
            currency={data.currency}
            categoryTitle={data.categoryTitle}
            categorySlug={data.categorySlug}
            location={location}
            onRequestBooking={handleRequestBooking}
            onContactProvider={() => setIsContactModalOpen(true)}
          />
        </div>
      </div>

      {/* Need more help? matching bottom of 5.png */}
      <div className="mt-16 pt-8 border-t border-[#E5E7EB]">
        <HelpOptions
          categoryTitle={data.categoryTitle}
          categorySlug={data.categorySlug}
        />
      </div>

      {/* Modals */}
      <ServiceBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        serviceId={data.id}
        serviceSlug={data.slug}
        serviceTitle={cleanTitle}
        providerId={data.provider?.id}
        providerClerkUserId={data.provider?.clerkUserId}
        packageName={activePackage.name}
        packagePrice={activePackage.price}
        currency={data.currency}
        propertySize={bookingFormData.propertySize}
        selectedDate={bookingFormData.selectedDate}
        selectedTime={bookingFormData.selectedTime}
        providerName={cleanProvider}
        location={location}
      />

      <ServiceContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        providerName={cleanProvider}
        serviceTitle={cleanTitle}
      />
    </div>
  );
}
