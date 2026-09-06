"use client";

import * as React from "react";
import { useUser } from "@clerk/nextjs";
import { DashboardHeader } from "@/components/provider/dashboard-header";
import { DashboardProfileBanner } from "@/components/provider/dashboard-profile-banner";
import { ProfileStrengthCard } from "@/components/provider/profile-strength-card";
import { VisibilityStepsCard } from "@/components/provider/visibility-steps-card";
import {
  SafetyGuideModal,
  PortfolioModal,
  CreateServiceModal,
} from "@/components/provider/dashboard-modals";
import { Footer } from "@/components/navigation/footer";

export default function ProviderDashboardPage() {
  const { user } = useUser();

  // Modals state
  const [isGuideModalOpen, setIsGuideModalOpen] = React.useState(false);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = React.useState(false);
  const [isCreateServiceModalOpen, setIsCreateServiceModalOpen] = React.useState(false);

  // Completion states
  const [guideCompleted, setGuideCompleted] = React.useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("fixit_provider_guide_completed") === "true";
    }
    return false;
  });
  const [serviceCompleted, setServiceCompleted] = React.useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("fixit_provider_service_completed") === "true";
    }
    return false;
  });
  const [hasPortfolio, setHasPortfolio] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // Sync with user metadata if loaded later
  React.useEffect(() => {
    if (user?.unsafeMetadata?.safetyGuideCompleted && !guideCompleted) {
      setTimeout(() => setGuideCompleted(true), 0);
    }
    if (user?.unsafeMetadata?.serviceCreated && !serviceCompleted) {
      setTimeout(() => setServiceCompleted(true), 0);
    }
  }, [user?.unsafeMetadata?.safetyGuideCompleted, user?.unsafeMetadata?.serviceCreated, guideCompleted, serviceCompleted]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCompleteGuide = async () => {
    setGuideCompleted(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("fixit_provider_guide_completed", "true");
    }
    if (user) {
      try {
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            safetyGuideCompleted: true,
          },
        });
      } catch (e) {
        console.error("Failed to update user metadata", e);
      }
    }
    showToast("Trust & Safety guide marked as completed!");
  };

  const handleSavePortfolio = async (item: {
    title: string;
    category: string;
    description: string;
    imageUrl: string;
  }) => {
    setHasPortfolio(true);
    showToast(`Portfolio item "${item.title}" added successfully!`);
  };

  const handleSaveService = async (service: {
    title: string;
    category: string;
    price: number;
    description: string;
    area: string;
  }) => {
    setServiceCompleted(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("fixit_provider_service_completed", "true");
    }
    if (user) {
      try {
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            serviceCreated: true,
            primaryService: service.title,
            startingPriceGhs: service.price,
          },
        });
      } catch (e) {
        console.error("Failed to update user metadata", e);
      }
    }
    showToast(`Service "${service.title}" created successfully!`);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F8] flex flex-col font-sans">
      {/* Top Navbar matching 7.png */}
      <DashboardHeader />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1080px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        {/* Toast notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#18181B] text-white text-[13px] font-medium px-4 py-3 rounded-[10px] shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
            <span className="w-2 h-2 rounded-full bg-[#008744]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Profile Banner matching 7.png */}
        <DashboardProfileBanner />

        {/* Profile Strength Card matching 7.png */}
        <ProfileStrengthCard
          onAddPortfolio={() => setIsPortfolioModalOpen(true)}
          hasPortfolio={hasPortfolio}
        />

        {/* Steps to get visible matching 7.png */}
        <VisibilityStepsCard
          onReadGuide={() => setIsGuideModalOpen(true)}
          onCreateService={() => setIsCreateServiceModalOpen(true)}
          guideCompleted={guideCompleted}
          serviceCompleted={serviceCompleted}
        />
      </main>

      {/* Modals */}
      <SafetyGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        onComplete={handleCompleteGuide}
      />

      <PortfolioModal
        isOpen={isPortfolioModalOpen}
        onClose={() => setIsPortfolioModalOpen(false)}
        onSave={handleSavePortfolio}
      />

      <CreateServiceModal
        isOpen={isCreateServiceModalOpen}
        onClose={() => setIsCreateServiceModalOpen(false)}
        onSave={handleSaveService}
      />

      {/* Marketplace Global Footer */}
      <Footer />
    </div>
  );
}
