"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  Package,
  Wallet,
  LayoutDashboard,
  ArrowRight,
  TrendingUp,
  Clock,
  Plus,
  ExternalLink,
  Sparkles,
  MapPin,
  CheckCircle2,
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

  const activeTab = (searchParams?.get("tab") as "overview" | "services" | "orders" | "earnings") || "overview";
  const statusParam = searchParams?.get("status") || "all";

  const handleTabChange = (tab: "overview" | "services" | "orders" | "earnings") => {
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

  // Auto-open create service modal if query param triggers it
  React.useEffect(() => {
    const action = searchParams?.get("action");
    const addParam = searchParams?.get("addService") || searchParams?.get("createService");
    if (action === "new-service" || action === "create-service" || addParam === "true") {
      setTimeout(() => setIsCreateServiceModalOpen(true), 0);
    }
  }, [searchParams]);

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
        const errMsg = resJson.error || "Failed to publish service";
        showToast(errMsg);
        throw new Error(errMsg);
      }

      setServiceCompleted(true);
      fetchDashboardData();
      showToast(`Service "${service.title}" published successfully!`);
      handleTabChange("services");
    } catch (e) {
      console.error("Failed to publish service", e);
      if (!(e instanceof Error)) {
        showToast("Error creating service");
      }
      throw e;
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

  const detectedCategorySlug = React.useMemo(() => {
    const text = `${data?.profile?.headline || ""} ${data?.profile?.expertise?.join(" ") || ""}`.toLowerCase();
    if (text.includes("clean")) return "house-cleaning";
    if (text.includes("plumb")) return "plumbing";
    if (text.includes("electr")) return "electrical-repairs";
    if (text.includes("paint")) return "painting-decorating";
    if (text.includes("mov")) return "moving-relocation";
    if (text.includes("assembl") || text.includes("furnitur")) return "furniture-assembly";
    if (text.includes("garden") || text.includes("lawn")) return "gardening-landscaping";
    if (text.includes("repair") || text.includes("appliance")) return "appliance-home-repairs";
    return "house-cleaning";
  }, [data?.profile?.headline, data?.profile?.expertise]);

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
            onClick={() => handleTabChange("services")}
            className={`px-4 py-2 rounded-[8px] text-[14px] font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "services"
                ? "bg-[#18181B] text-white shadow-xs"
                : "text-[#62646A] hover:text-[#222325] hover:bg-[#E5E7EB]/50"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>My Services</span>
            <span
              className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                activeTab === "services"
                  ? "bg-white text-[#18181B] font-bold"
                  : "bg-[#E5E7EB] text-[#404145]"
              }`}
            >
              {data?.services?.length || 0}
            </span>
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

            {/* My Services Summary Card */}
            <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 shadow-xs flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-grotesque font-bold text-[18px] text-[#222325]">
                      My Services ({data?.services?.length || 0})
                    </h3>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#E8F8F0] text-[#008744]">
                      Active Listings
                    </span>
                  </div>
                  <p className="text-[13px] text-[#74767E] mt-0.5">
                    Services and trades published to your public profile and customer search.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreateServiceModalOpen(true)}
                  className="px-3.5 py-2 rounded-[8px] bg-[#008744] hover:bg-[#007038] text-white text-[13px] font-semibold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Service</span>
                </button>
              </div>

              {data?.services && data.services.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {data.services.map((srv) => (
                    <div
                      key={srv._id}
                      className="p-4 rounded-[12px] border border-[#E5E7EB] bg-[#FAFAFA] hover:border-[#18181B] transition-all flex flex-col justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#008744] bg-[#E8F8F0] px-2 py-0.5 rounded-full">
                            {srv.categoryTitle || "Service"}
                          </span>
                          <span className="text-[13px] font-bold text-[#222325]">
                            GHS {srv.startingPrice}
                          </span>
                        </div>
                        <h4 className="font-grotesque font-bold text-[15px] text-[#222325] line-clamp-1">
                          {srv.title}
                        </h4>
                        <p className="text-[12px] text-[#74767E] mt-0.5">
                          {srv.serviceAreas?.[0] || "Accra & Greater Accra"}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#E5E7EB]/80 text-[12px]">
                        <span className="text-[#008744] font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Published
                        </span>
                        <Link
                          href={`/services/${srv.slug || srv._id}`}
                          target="_blank"
                          className="font-semibold text-[#222325] hover:text-[#008744] flex items-center gap-1 transition-colors"
                        >
                          View Listing <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center rounded-[12px] bg-[#FAFAFA] border border-dashed border-[#DADBDD]">
                  <p className="text-[13px] text-[#74767E]">
                    You haven&apos;t created any services yet. Click &quot;Add Service&quot; to publish your trade.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: My Services */}
        {activeTab === "services" && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-[16px] border border-[#E5E7EB] shadow-xs">
              <div>
                <h2 className="font-grotesque font-bold text-[22px] text-[#222325]">
                  My Services & Packages
                </h2>
                <p className="text-[14px] text-[#62646A] mt-1">
                  Manage the services, pricing, and scopes of work you offer across Ghana.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateServiceModalOpen(true)}
                className="px-5 py-2.5 rounded-[10px] bg-[#008744] hover:bg-[#007038] text-white text-[14px] font-semibold transition-colors cursor-pointer shadow-xs flex items-center gap-2 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Service</span>
              </button>
            </div>

            {data?.services && data.services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {data.services.map((srv) => (
                  <div
                    key={srv._id}
                    className="p-5 bg-white rounded-[14px] border border-[#E5E7EB] hover:shadow-md transition-all flex flex-col justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#008744] bg-[#E8F8F0] px-2.5 py-1 rounded-full">
                          {srv.categoryTitle || "Service"}
                        </span>
                        <span className="font-grotesque font-bold text-[18px] text-[#222325]">
                          GHS {srv.startingPrice}
                        </span>
                      </div>
                      <h3 className="font-grotesque font-bold text-[17px] text-[#222325]">
                        {srv.title}
                      </h3>
                      <p className="text-[13px] text-[#74767E] mt-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#74767E]" />
                        {srv.serviceAreas?.[0] || "Accra & Greater Accra"}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#008744]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Published
                      </span>
                      <Link
                        href={`/services/${srv.slug || srv._id}`}
                        target="_blank"
                        className="px-3 py-1.5 rounded-[8px] bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#222325] text-[12px] font-semibold transition-colors flex items-center gap-1"
                      >
                        View Live <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 text-center rounded-[16px] border border-[#E5E7EB] shadow-xs flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#E8F8F0] text-[#008744] flex items-center justify-center mb-3">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-grotesque font-bold text-[18px] text-[#222325] mb-1">
                  No services published yet
                </h3>
                <p className="text-[14px] text-[#62646A] max-w-md mb-6">
                  Add your trades, specialties, and package pricing to start appearing in marketplace search results across Ghana.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCreateServiceModalOpen(true)}
                  className="px-5 py-2.5 rounded-[10px] bg-[#008744] hover:bg-[#007038] text-white text-[14px] font-semibold transition-colors cursor-pointer shadow-xs flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Your First Service</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Orders Received */}
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
        defaultCategorySlug={detectedCategorySlug}
        onClose={() => setIsCreateServiceModalOpen(false)}
        onSave={handleSaveService}
      />

      <VerifyIdentityModal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
        onSuccess={() => {
          fetchDashboardData();
          showToast("Ghana Card identity submitted for admin review!");
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
