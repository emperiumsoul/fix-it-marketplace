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
  VerifyIdentityModal,
  ServiceAreasHoursModal,
  PublishServiceModal,
} from "@/components/provider/dashboard-modals";
import { Footer } from "@/components/navigation/footer";

interface DashboardData {
  profile?: {
    _id?: string;
    displayName?: string;
    headline?: string;
    photoUrl?: string;
    expertise?: string[];
    languages?: string[];
    serviceAreas?: string[];
    availability?: string;
  } | null;
  services?: Array<{
    _id: string;
    title: string;
    slug: string;
    startingPrice: number;
    currency?: string;
    status?: string;
    serviceAreas?: string[];
    categoryTitle?: string;
  }>;
  bookings?: Array<{
    _id: string;
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
    serviceTitle?: string;
    agreedPackageName?: string;
    agreedScope?: string;
    agreedPrice?: number;
    scheduledTime?: string;
    serviceAddress?: string;
    jobStatus?: "requested" | "confirmed" | "in_progress" | "completed" | "cancelled";
    paymentStatus?: "paid" | "pending" | "unpaid";
  }>;
  metrics?: {
    ordersCount: number;
    newRequestsCount: number;
    availableBalance: number;
    pendingEscrow: number;
    lifetimeEarned: number;
    hasService: boolean;
    isIdentityVerified?: boolean;
    verificationStatus?: string;
    isAreasHoursSet?: boolean;
    isPublished?: boolean;
    profileStrength: number;
  };
}

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
  const [isVerifyModalOpen, setIsVerifyModalOpen] = React.useState(false);
  const [isAreasHoursModalOpen, setIsAreasHoursModalOpen] = React.useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = React.useState(false);

  // Dynamic Dashboard Data State
  const [data, setData] = React.useState<DashboardData | null>(null);

  // Completion states
  const [guideCompleted, setGuideCompleted] = React.useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("fixit_provider_guide_completed") === "true";
    }
    return false;
  });
  const [serviceCompleted, setServiceCompleted] = React.useState(false);
  const [hasPortfolio, setHasPortfolio] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const fetchDashboardData = React.useCallback(() => {
    fetch("/api/provider/dashboard-data")
      .then((res) => res.json())
      .then((resData) => {
        if (resData?.success) {
          setData(resData);
          if (resData.metrics?.hasService) {
            setServiceCompleted(true);
          }
        }
      })
      .catch((err) => console.warn("Failed to load dashboard data:", err));
  }, []);

  React.useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Sync with user metadata if loaded later
  React.useEffect(() => {
    if (user?.unsafeMetadata?.safetyGuideCompleted && !guideCompleted) {
      setTimeout(() => setGuideCompleted(true), 0);
    }
  }, [user?.unsafeMetadata?.safetyGuideCompleted, guideCompleted]);

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
    categorySlug?: string;
    price: number;
    description: string;
    area: string;
  }) => {
    try {
      const res = await fetch("/api/provider/service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: service.title,
          categoryName: service.category,
          categorySlug: service.categorySlug,
          startingPrice: service.price,
          description: service.description,
          serviceArea: service.area,
        }),
      });

      const resJson = await res.json();
      if (!res.ok) {
        showToast(resJson.error || "Failed to publish service");
        return;
      }

      setServiceCompleted(true);
      fetchDashboardData();
      showToast(`Service "${service.title}" published successfully!`);
    } catch (e) {
      console.error("Failed to publish service", e);
      showToast("Error creating service");
    }
  };

  // Derived real metrics
  const ordersCount = data?.metrics?.ordersCount ?? 0;
  const newRequestsCount = data?.metrics?.newRequestsCount ?? 0;
  const availableBalance = data?.metrics?.availableBalance ?? 0;
  const pendingEscrow = data?.metrics?.pendingEscrow ?? 0;
  const lifetimeEarned = data?.metrics?.lifetimeEarned ?? 0;
  const profileStrength = data?.metrics?.profileStrength ?? (serviceCompleted ? 8 : 4);

  const bookingsList = data?.bookings || [];
  const formattedOrders = bookingsList.map((b) => ({
    id: b._id,
    customerName: b.customerName || "Customer",
    customerPhone: b.customerPhone || "Private",
    serviceTitle: b.serviceTitle || "Service",
    packageName: b.agreedPackageName || "Standard Package",
    scope: b.agreedScope || "Standard service scope",
    price: b.agreedPrice || 0,
    scheduledTime: b.scheduledTime || new Date().toISOString(),
    address: b.serviceAddress || "Accra, Ghana",
    status: b.jobStatus || "requested",
    paymentStatus: b.paymentStatus || "unpaid",
  }));

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
        <DashboardProfileBanner profile={data?.profile} />

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
              {ordersCount}
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
              GHS {availableBalance.toFixed(0)}
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
                      {ordersCount} Customer Orders
                    </h4>
                    <p className="text-[12px] text-[#74767E]">
                      {newRequestsCount > 0
                        ? `${newRequestsCount} new request awaiting confirmation`
                        : ordersCount > 0
                        ? "All booking requests up to date"
                        : "No orders awaiting confirmation"}
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
                      GHS {availableBalance.toFixed(2)} Available
                    </h4>
                    <p className="text-[12px] text-[#74767E]">
                      {availableBalance > 0
                        ? "Cleared and ready for MoMo payout"
                        : "Complete service jobs to earn"}
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
              score={profileStrength}
            />

            {/* Steps to get visible matching 7.png */}
            <VisibilityStepsCard
              onReadGuide={() => setIsGuideModalOpen(true)}
              onCreateService={() => setIsCreateServiceModalOpen(true)}
              onVerifyIdentity={() => setIsVerifyModalOpen(true)}
              onSetAreasAndHours={() => setIsAreasHoursModalOpen(true)}
              onPublish={() => setIsPublishModalOpen(true)}
              guideCompleted={guideCompleted}
              serviceCompleted={serviceCompleted || Boolean(data?.metrics?.hasService)}
              identityVerified={Boolean(data?.metrics?.isIdentityVerified)}
              identityStatus={data?.metrics?.verificationStatus || "unverified"}
              areasHoursCompleted={Boolean(data?.metrics?.isAreasHoursSet)}
              isPublished={Boolean(data?.metrics?.isPublished)}
            />
          </div>
        )}

        {/* Tab 2: Orders Received */}
        {activeTab === "orders" && (
          <OrdersListView
            orders={formattedOrders}
            initialStatusFilter={statusParam}
            onStatusChangeToast={showToast}
          />
        )}

        {/* Tab 3: Earnings & Payouts */}
        {activeTab === "earnings" && (
          <EarningsView
            availableBalance={availableBalance}
            pendingEscrow={pendingEscrow}
            lifetimeEarned={lifetimeEarned}
            onWithdrawToast={showToast}
          />
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

      <VerifyIdentityModal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
        onSuccess={() => {
          fetchDashboardData();
          showToast("Ghana Card identity verification approved!");
        }}
        currentStatus={data?.metrics?.verificationStatus}
      />

      <ServiceAreasHoursModal
        isOpen={isAreasHoursModalOpen}
        onClose={() => setIsAreasHoursModalOpen(false)}
        onSuccess={() => {
          fetchDashboardData();
          showToast("Service areas and working hours saved!");
        }}
        initialAreas={data?.profile?.serviceAreas || []}
        initialHours={data?.profile?.availability || "Mon - Sat: 8:00 AM - 6:00 PM"}
      />

      <PublishServiceModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onSuccess={() => {
          fetchDashboardData();
          showToast("🎉 Your service is now live across Ghana!");
        }}
        hasService={Boolean(data?.metrics?.hasService || serviceCompleted)}
        isIdentityVerified={Boolean(data?.metrics?.isIdentityVerified)}
        isAreasHoursSet={Boolean(data?.metrics?.isAreasHoursSet)}
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
