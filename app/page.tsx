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

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#404145] font-satoshi selection:bg-[#F3FDF9] selection:text-[#003912]">
      {/* Top Navigation */}
      <PublicHeader />

      {/* Main Homepage Flow */}
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
