import * as React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { SignedIn, SignedOut } from "@clerk/nextjs";
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

  const isPreview =
    sp.preview === "welcome" ||
    sp.preview === "signed-in" ||
    sp.modal === "true";

  if (isPreview) {
    return <PersonalizedHomepage initialUserName="Kingsley" />;
  }

  return (
    <>
      <SignedIn>
        <PersonalizedHomepage
          initialUserName={user?.firstName || user?.username || undefined}
        />
      </SignedIn>
      <SignedOut>
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
      </SignedOut>
    </>
  );
}
