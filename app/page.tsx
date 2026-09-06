import * as React from "react";
import { currentUser } from "@clerk/nextjs/server";
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
import { PersonalizedHomepage } from "@/components/welcome/personalized-homepage";

interface HomePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const sp = await searchParams;
  let user = null;
  try {
    user = await currentUser();
  } catch (err) {
    console.error("Clerk currentUser error:", err);
  }

  const isWelcomePreview =
    sp.preview === "welcome" ||
    sp.preview === "signed-in" ||
    sp.modal === "true";

  const isPublicPreview = sp.preview === "public" || sp.public === "true";

  // If user explicitly asks for public preview, render public homepage (1.png)
  if (isPublicPreview) {
    return renderPublicHomepage();
  }

  // If user is authenticated via Clerk or requesting welcome preview, render (3.png + 2.png)
  if (user || isWelcomePreview) {
    return (
      <PersonalizedHomepage
        initialUserName={user?.firstName || user?.username || undefined}
      />
    );
  }

  // Default signed-out state: Public Homepage (matching 1.png)
  return renderPublicHomepage();
}

function renderPublicHomepage() {
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
