"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  Package,
  Wallet,
  LayoutDashboard,
  ArrowRight,
  TrendingUp,
  Clock,
} from "lucide-react";
import { DashboardHeader } from "@/components/provider/dashboard-header";
import { DashboardProfileBanner } from "@/components/provider/dashboard-profile-banner";
import { ProfileStrengthCard } from "@/components/provider/profile-strength-card";
import { VisibilityStepsCard } from "@/components/provider/visibility-steps-card";
import { OrdersListView } from "@/components/provider/orders-list-view";
import { EarningsView } from "@/components/provider/earnings-view";
import {
  SafetyGuideModal,
  PortfolioModal,
  CreateServiceModal,
} from "@/components/provider/dashboard-modals";
import { Footer } from "@/components/navigation/footer";

function DashboardInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUser();

  const activeTab = (searchParams?.get("tab") as "overview" | "orders" | "earnings") || "overview";
  const statusParam = searchParams?.get("status") || "all";

  const handleTabChange = (tab: "overview" | "orders" | "earnings") => {
    router.push(`/provider/dashboard?tab=${tab}`);
  };

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
  }, [
    user?.unsafeMetadata?.safetyGuideCompleted,
    user?.unsafeMetadata?.serviceCreated,
    guideCompleted,
    serviceCompleted,
  ]);

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
      {/* Top Navbar matching 7.png with tab control */}
      <DashboardHeader activeTab={activeTab} onSelectTab={handleTabChange} />

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

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-2 border-b border-[#E5E7EB] pb-2">
          <button
            type="button"
            onClick={() => handleTabChange("overview")}
            className={`px-4 py-2 rounded-[8px] text-[14px] font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "overview"
                ? "bg-[#18181B] text-white shadow-xs"
                : "text-[#62646A] hover:text-[#222325] hover:bg-[#E5E7EB]/50"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("orders")}
            className={`px-4 py-2 rounded-[8px] text-[14px] font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "orders"
                ? "bg-[#18181B] text-white shadow-xs"
                : "text-[#62646A] hover:text-[#222325] hover:bg-[#E5E7EB]/50"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders Received</span>
            <span
              className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                activeTab === "orders"
                  ? "bg-white text-[#18181B] font-bold"
                  : "bg-[#E5E7EB] text-[#404145]"
              }`}
            >
              5
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("earnings")}
            className={`px-4 py-2 rounded-[8px] text-[14px] font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "earnings"
                ? "bg-[#18181B] text-white shadow-xs"
                : "text-[#62646A] hover:text-[#222325] hover:bg-[#E5E7EB]/50"
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>Earnings & Payouts</span>
            <span
              className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                activeTab === "earnings"
                  ? "bg-[#008744] text-white font-bold"
                  : "bg-[#E8F8F0] text-[#008744]"
              }`}
            >
              GHS 882
            </span>
          </button>
        </div>

        {/* Tab 1: Overview matching 7.png */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-6">
            {/* Quick Orders & Earnings Summary Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => handleTabChange("orders")}
                className="p-4 sm:p-5 rounded-[14px] bg-white border border-[#E5E7EB] hover:border-[#18181B] hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-[10px] bg-[#FEF3C7] text-[#92400E] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-grotesque font-bold text-[15px] text-[#222325]">
                      5 Customer Orders
                    </h4>
                    <p className="text-[12px] text-[#74767E]">
                      1 new request awaiting your confirmation
                    </p>
                  </div>
                </div>
                <span className="text-[13px] font-semibold text-[#222325] flex items-center gap-1">
                  View <ArrowRight className="w-4 h-4" />
                </span>
              </div>

              <div
                onClick={() => handleTabChange("earnings")}
                className="p-4 sm:p-5 rounded-[14px] bg-white border border-[#E5E7EB] hover:border-[#18181B] hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-[10px] bg-[#E8F8F0] text-[#008744] flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-grotesque font-bold text-[15px] text-[#222325]">
                      GHS 882.00 Available
                    </h4>
                    <p className="text-[12px] text-[#74767E]">
                      Cleared and ready for MoMo payout
                    </p>
                  </div>
                </div>
                <span className="text-[13px] font-semibold text-[#008744] flex items-center gap-1">
                  Check <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>

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
          </div>
        )}

        {/* Tab 2: Orders Received */}
        {activeTab === "orders" && (
          <OrdersListView
            initialStatusFilter={statusParam}
            onStatusChangeToast={showToast}
          />
        )}

        {/* Tab 3: Earnings & Payouts */}
        {activeTab === "earnings" && (
          <EarningsView onWithdrawToast={showToast} />
        )}
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

export default function ProviderDashboardPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#F7F7F8] flex items-center justify-center text-[#74767E]">
          Loading dashboard...
        </div>
      }
    >
      <DashboardInner />
    </React.Suspense>
  );
}
