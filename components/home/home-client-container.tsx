"use client";

import * as React from "react";
import { useUser } from "@clerk/nextjs";
import { PersonalizedHomepage } from "@/components/welcome/personalized-homepage";
import { PublicHeader } from "@/components/navigation/public-header";
import { Hero } from "@/components/home/hero";
import { CategoryStrip } from "@/components/home/category-strip";
import { PopularServices } from "@/components/home/popular-services";
import { ValueProps } from "@/components/home/value-props";
import { ProBanner } from "@/components/home/pro-banner";
import { BigProjectBanner } from "@/components/home/big-project-banner";
import { VideoSection } from "@/components/home/video-section";
import { GuidesSection } from "@/components/home/guides-section";
import { CtaBanner } from "@/components/home/cta-banner";
import { Footer } from "@/components/navigation/footer";

interface HomeClientContainerProps {
  initialIsSignedIn: boolean;
  initialUserName?: string;
  isWelcomePreview?: boolean;
  isPublicPreview?: boolean;
}

export function HomeClientContainer({
  initialIsSignedIn,
  initialUserName,
  isWelcomePreview,
  isPublicPreview,
}: HomeClientContainerProps) {
  const { isLoaded, isSignedIn, user } = useUser();

  // If public preview explicitly requested via URL (?preview=public)
  if (isPublicPreview) {
    return <PublicHomepageContent />;
  }

  // If previewing welcome page via ?preview=welcome or ?modal=true
  if (isWelcomePreview) {
    return (
      <PersonalizedHomepage
        initialUserName={user?.firstName || user?.username || initialUserName}
      />
    );
  }

  // Check authentication state:
  // If client Clerk SDK is loaded, use its live state; otherwise fall back to server initial state
  const authenticated = isLoaded ? isSignedIn : initialIsSignedIn;

  if (authenticated) {
    return (
      <PersonalizedHomepage
        initialUserName={user?.firstName || user?.username || initialUserName}
      />
    );
  }

  return <PublicHomepageContent />;
}

export function PublicHomepageContent() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#404145] font-satoshi selection:bg-[#F3FDF9] selection:text-[#003912]">
      {/* Top Navigation */}
      <PublicHeader />

      {/* Main Public Homepage Flow (matching 1.png) */}
      <main className="flex-1 flex flex-col">
        <Hero />
        <CategoryStrip />
        <PopularServices />
        <ValueProps />
        <ProBanner />
        <BigProjectBanner />
        <VideoSection />
        <GuidesSection />
        <CtaBanner />
      </main>

      {/* Multi-Column Footer */}
      <Footer />
    </div>
  );
}
