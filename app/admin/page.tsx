"use client";

import * as React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  Clock,
  AlertCircle,
  Users,
  Briefcase,
  Search,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { PublicHeader } from "@/components/navigation/public-header";
import { Footer } from "@/components/navigation/footer";

interface ProviderItem {
  _id: string;
  displayName: string;
  slug?: string;
  clerkUserId: string;
  headline?: string;
  photoUrl?: string;
  expertise?: string[];
  serviceAreas?: string[];
  verificationStatus?: "unverified" | "pending" | "verified";
  verified?: boolean;
  onboardingStatus?: string;
  rating?: number;
  completedJobsCount?: number;
  servicesCount: number;
  _createdAt: string;
}

interface ServiceItem {
  _id: string;
  title: string;
  slug?: string;
  startingPrice: number;
  currency?: string;
  status: "draft" | "published";
  serviceAreas?: string[];
  categoryTitle?: string;
  providerName?: string;
  providerVerified?: boolean;
  _createdAt: string;
}

export default function AdminDashboardPage() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const userIsAdminRole = user?.publicMetadata?.role === "admin";
  const [isAdminFromApi, setIsAdminFromApi] = React.useState<boolean | null>(null);

  const [activeTab, setActiveTab] = React.useState<"providers" | "services">("providers");
  const [providers, setProviders] = React.useState<ProviderItem[]>([]);
  const [services, setServices] = React.useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [actionLoadingId, setActionLoadingId] = React.useState<string | null>(null);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  React.useEffect(() => {
    if (!isUserLoaded || !user) return;
    let isCancelled = false;
    fetch("/api/admin/check")
      .then((res) => res.json())
      .then((data) => {
        if (!isCancelled) setIsAdminFromApi(Boolean(data?.isAdmin));
      })
      .catch(() => {
        if (!isCancelled) setIsAdminFromApi(false);
      });
    return () => {
      isCancelled = true;
    };
  }, [user, isUserLoaded]);

  const isAdmin: boolean | null = !isUserLoaded
    ? null
    : !user
    ? false
    : isAdminFromApi !== null
    ? isAdminFromApi
    : Boolean(userIsAdminRole);

  const fetchData = React.useCallback(() => {
    if (isAdmin !== true) return;
    setIsLoading(true);
    Promise.all([
      fetch("/api/admin/providers").then((r) => r.json()),
      fetch("/api/admin/services").then((r) => r.json()),
    ])
      .then(([pData, sData]) => {
        if (pData?.success) setProviders(pData.providers || []);
        if (sData?.success) setServices(sData.services || []);
      })
      .catch((err) => {
        console.error("Failed to load admin data:", err);
        showToast("Error fetching admin data");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isAdmin]);

  React.useEffect(() => {
    if (isAdmin !== true) return;
    let isCancelled = false;
    Promise.all([
      fetch("/api/admin/providers").then((r) => r.json()),
      fetch("/api/admin/services").then((r) => r.json()),
    ])
      .then(([pData, sData]) => {
        if (isCancelled) return;
        if (pData?.success) setProviders(pData.providers || []);
        if (sData?.success) setServices(sData.services || []);
      })
      .catch((err) => {
        console.error("Failed to load admin data:", err);
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });
    return () => {
      isCancelled = true;
    };
  }, [isAdmin]);

  const handleUpdateProviderStatus = async (
    providerId: string,
    newStatus: "unverified" | "pending" | "verified"
  ) => {
    setActionLoadingId(providerId);
    try {
      const res = await fetch("/api/admin/providers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ providerId, verificationStatus: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "Failed to update status");
        return;
      }

      setProviders((prev) =>
        prev.map((p) =>
          p._id === providerId
            ? { ...p, verificationStatus: newStatus, verified: newStatus === "verified" }
            : p
        )
      );

      showToast(
        `Provider status updated to ${newStatus === "verified" ? "Verified" : newStatus}!`
      );
    } catch (err) {
      console.error(err);
      showToast("Network error updating provider");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleToggleServiceStatus = async (
    serviceId: string,
    currentStatus: "draft" | "published"
  ) => {
    const nextStatus = currentStatus === "published" ? "draft" : "published";
    setActionLoadingId(serviceId);
    try {
      const res = await fetch("/api/admin/services", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId, status: nextStatus }),
      });

      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "Failed to update service");
        return;
      }

      setServices((prev) =>
        prev.map((s) => (s._id === serviceId ? { ...s, status: nextStatus } : s))
      );

      showToast(`Service set to ${nextStatus}!`);
    } catch (err) {
      console.error(err);
      showToast("Network error updating service");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Metrics
  const totalProviders = providers.length;
  const verifiedCount = providers.filter(
    (p) => p.verificationStatus === "verified" || p.verified
  ).length;
  const pendingCount = providers.filter((p) => p.verificationStatus === "pending").length;
  const totalServicesCount = services.length;
  const publishedServicesCount = services.filter((s) => s.status === "published").length;

  // Filtered Providers
  const filteredProviders = providers.filter((p) => {
    const matchesSearch =
      p.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.clerkUserId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.expertise && p.expertise.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase())));

    if (!matchesSearch) return false;

    if (statusFilter === "verified") return p.verificationStatus === "verified" || p.verified;
    if (statusFilter === "pending") return p.verificationStatus === "pending";
    if (statusFilter === "unverified")
      return !p.verified && p.verificationStatus !== "verified" && p.verificationStatus !== "pending";

    return true;
  });

  // Filtered Services
  const filteredServices = services.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.categoryTitle && s.categoryTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.providerName && s.providerName.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (statusFilter === "published") return s.status === "published";
    if (statusFilter === "draft") return s.status === "draft";
    return true;
  });

  if (!isUserLoaded || isAdmin === null) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F7F7F8] font-sans">
        <PublicHeader />
        <main className="flex-1 flex flex-col items-center justify-center p-12 text-[#74767E] gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#18181B]" />
          <span className="text-[14px]">Verifying administrator credentials...</span>
        </main>
        <Footer />
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F7F7F8] font-sans">
        <PublicHeader />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto my-16">
          <div className="w-14 h-14 rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center mb-4">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h1 className="font-grotesque font-bold text-[24px] text-[#222325]">
            Access Restricted
          </h1>
          <p className="text-[14px] text-[#62646A] mt-2 leading-relaxed">
            The Fix it administration panel is strictly reserved for verified marketplace administrators. Your account does not have administrator privileges.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="px-5 py-2.5 rounded-[10px] bg-[#18181B] hover:bg-[#27272A] text-white text-[14px] font-semibold transition-colors cursor-pointer shadow-xs"
            >
              Return to Marketplace
            </Link>
            <Link
              href="/provider/dashboard"
              className="px-4 py-2.5 rounded-[10px] bg-white border border-[#DADBDD] hover:border-[#18181B] text-[#222325] text-[14px] font-semibold transition-colors cursor-pointer"
            >
              Provider Dashboard
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F8] font-sans">
      <PublicHeader />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#18181B] text-white text-[13px] font-medium px-4 py-3 rounded-[10px] shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-[#008744]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[13px] text-[#74767E] mb-1">
              <Link href="/" className="hover:text-[#222325] flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Marketplace
              </Link>
              <span>/</span>
              <span className="text-[#222325] font-medium">Administration</span>
            </div>
            <h1 className="font-grotesque font-bold text-[26px] sm:text-[32px] text-[#222325]">
              Fix it Ghana — Admin Operations
            </h1>
            <p className="text-[14px] text-[#62646A] mt-1">
              Review and verify Ghanaian service provider credentials, manage services, and monitor operations.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <Link
              href="/provider/dashboard"
              className="px-3.5 py-2 rounded-[8px] bg-white border border-[#DADBDD] hover:border-[#008744] hover:text-[#008744] text-[13px] font-semibold text-[#222325] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Briefcase className="w-3.5 h-3.5 text-[#008744]" />
              Provider Dashboard
            </Link>
            <button
              type="button"
              onClick={fetchData}
              disabled={isLoading}
              className="px-3.5 py-2 rounded-[8px] bg-white border border-[#DADBDD] hover:border-[#18181B] text-[13px] font-semibold text-[#222325] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <a
              href="http://localhost:3333"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-[8px] bg-[#18181B] hover:bg-[#27272A] text-white text-[13px] font-semibold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Sanity Studio
            </a>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-[14px] bg-white border border-[#E5E7EB] shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-[#74767E]">Total Providers</span>
              <div className="w-8 h-8 rounded-[8px] bg-[#F3F4F6] text-[#222325] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <h3 className="font-grotesque font-bold text-[24px] text-[#222325] mt-2">
              {totalProviders}
            </h3>
            <p className="text-[12px] text-[#74767E] mt-0.5">Registered on platform</p>
          </div>

          <div className="p-5 rounded-[14px] bg-white border border-[#E5E7EB] shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-[#008744]">Verified Providers</span>
              <div className="w-8 h-8 rounded-[8px] bg-[#E8F8F0] text-[#008744] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <h3 className="font-grotesque font-bold text-[24px] text-[#008744] mt-2">
              {verifiedCount}
            </h3>
            <p className="text-[12px] text-[#74767E] mt-0.5">Approved with Ghana Card</p>
          </div>

          <div className="p-5 rounded-[14px] bg-white border border-[#E5E7EB] shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-[#D97706]">Pending Review</span>
              <div className="w-8 h-8 rounded-[8px] bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <h3 className="font-grotesque font-bold text-[24px] text-[#D97706] mt-2">
              {pendingCount}
            </h3>
            <p className="text-[12px] text-[#74767E] mt-0.5">Awaiting verification action</p>
          </div>

          <div className="p-5 rounded-[14px] bg-white border border-[#E5E7EB] shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-[#222325]">Live Services</span>
              <div className="w-8 h-8 rounded-[8px] bg-[#F3F4F6] text-[#222325] flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <h3 className="font-grotesque font-bold text-[24px] text-[#222325] mt-2">
              {publishedServicesCount} <span className="text-[14px] text-[#74767E] font-normal">/ {totalServicesCount}</span>
            </h3>
            <p className="text-[12px] text-[#74767E] mt-0.5">Published across categories</p>
          </div>
        </div>

        {/* Tab Switcher & Filters */}
        <div className="bg-white rounded-[16px] border border-[#E5E7EB] shadow-xs overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-[#E5E7EB] flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Tabs */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("providers");
                  setStatusFilter("all");
                }}
                className={`px-4 py-2 rounded-[8px] text-[14px] font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === "providers"
                    ? "bg-[#18181B] text-white shadow-xs"
                    : "text-[#62646A] hover:text-[#222325] hover:bg-[#F3F4F6]"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Providers ({totalProviders})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("services");
                  setStatusFilter("all");
                }}
                className={`px-4 py-2 rounded-[8px] text-[14px] font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === "services"
                    ? "bg-[#18181B] text-white shadow-xs"
                    : "text-[#62646A] hover:text-[#222325] hover:bg-[#F3F4F6]"
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Services ({totalServicesCount})</span>
              </button>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#74767E]" />
                <input
                  type="text"
                  placeholder={
                    activeTab === "providers"
                      ? "Search name, ID or trade..."
                      : "Search title, category or provider..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3.5 py-1.5 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] focus:outline-hidden focus:border-[#222325] w-full sm:w-64"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] focus:outline-hidden focus:border-[#222325] bg-white cursor-pointer"
              >
                <option value="all">All Statuses</option>
                {activeTab === "providers" ? (
                  <>
                    <option value="verified">Verified Only</option>
                    <option value="pending">Pending Review</option>
                    <option value="unverified">Unverified Only</option>
                  </>
                ) : (
                  <>
                    <option value="published">Published Only</option>
                    <option value="draft">Drafts Only</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Tab 1: Providers Table */}
          {activeTab === "providers" && (
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="p-12 text-center text-[#74767E] flex flex-col items-center justify-center gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-[#18181B]" />
                  <span className="text-[13px]">Loading provider records...</span>
                </div>
              ) : filteredProviders.length === 0 ? (
                <div className="p-12 text-center text-[#74767E]">
                  <p className="text-[14px]">No providers match your filter criteria.</p>
                </div>
              ) : (
                <table className="w-full text-left text-[13px]">
                  <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#74767E] font-semibold text-[12px] uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-6">Provider</th>
                      <th className="py-3.5 px-6">Trade / Expertise</th>
                      <th className="py-3.5 px-6">Location</th>
                      <th className="py-3.5 px-6">Services</th>
                      <th className="py-3.5 px-6">Verification Status</th>
                      <th className="py-3.5 px-6 text-right">Moderation Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {filteredProviders.map((provider) => {
                      const isVerified =
                        provider.verificationStatus === "verified" || provider.verified;
                      const isPending = provider.verificationStatus === "pending";
                      const isActionLoading = actionLoadingId === provider._id;

                      return (
                        <tr key={provider._id} className="hover:bg-[#FAFAFA] transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              {provider.photoUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={provider.photoUrl}
                                  alt={provider.displayName}
                                  className="w-9 h-9 rounded-full object-cover border border-[#E5E7EB]"
                                />
                              ) : (
                                <div className="w-9 h-9 rounded-full bg-[#18181B] text-white flex items-center justify-center font-bold text-[13px]">
                                  {provider.displayName.charAt(0)}
                                </div>
                              )}
                              <div>
                                <div className="font-semibold text-[#222325] flex items-center gap-1.5">
                                  <span>{provider.displayName}</span>
                                  {isVerified && (
                                    <ShieldCheck className="w-3.5 h-3.5 text-[#008744]" />
                                  )}
                                </div>
                                <div className="text-[11px] text-[#74767E] font-mono">
                                  ID: {provider.clerkUserId.slice(0, 14)}...
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-6">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {provider.expertise && provider.expertise.length > 0 ? (
                                provider.expertise.slice(0, 3).map((exp) => (
                                  <span
                                    key={exp}
                                    className="px-2 py-0.5 rounded-full bg-[#F3F4F6] text-[#4B5563] text-[11px]"
                                  >
                                    {exp}
                                  </span>
                                ))
                              ) : (
                                <span className="text-[#74767E] text-[12px]">None specified</span>
                              )}
                            </div>
                          </td>

                          <td className="py-4 px-6 text-[#62646A]">
                            {provider.serviceAreas?.[0] || "Accra"}
                          </td>

                          <td className="py-4 px-6 font-semibold text-[#222325]">
                            {provider.servicesCount}
                          </td>

                          <td className="py-4 px-6">
                            {isVerified ? (
                              <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#008744] bg-[#E8F8F0] px-2.5 py-1 rounded-full">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                              </span>
                            ) : isPending ? (
                              <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#92400E] bg-[#FEF3C7] px-2.5 py-1 rounded-full">
                                <Clock className="w-3.5 h-3.5" /> Pending Review
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[#74767E] bg-[#F3F4F6] px-2.5 py-1 rounded-full">
                                <AlertCircle className="w-3.5 h-3.5" /> Unverified
                              </span>
                            )}
                          </td>

                          <td className="py-4 px-6 text-right">
                            <div className="inline-flex items-center gap-2">
                              {isActionLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin text-[#74767E]" />
                              ) : (
                                <>
                                  {!isVerified ? (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleUpdateProviderStatus(provider._id, "verified")
                                      }
                                      className="px-3 py-1 rounded-[6px] bg-[#008744] hover:bg-[#007038] text-white text-[12px] font-semibold transition-colors cursor-pointer shadow-2xs"
                                    >
                                      Verify Provider
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleUpdateProviderStatus(provider._id, "unverified")
                                      }
                                      className="px-3 py-1 rounded-[6px] bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#DC2626] text-[12px] font-semibold transition-colors cursor-pointer"
                                    >
                                      Revoke Badge
                                    </button>
                                  )}

                                  {!isPending && !isVerified && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleUpdateProviderStatus(provider._id, "pending")
                                      }
                                      className="px-2.5 py-1 rounded-[6px] bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#92400E] text-[12px] font-medium transition-colors cursor-pointer"
                                    >
                                      Mark In Review
                                    </button>
                                  )}
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Tab 2: Services Table */}
          {activeTab === "services" && (
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="p-12 text-center text-[#74767E] flex flex-col items-center justify-center gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-[#18181B]" />
                  <span className="text-[13px]">Loading service listings...</span>
                </div>
              ) : filteredServices.length === 0 ? (
                <div className="p-12 text-center text-[#74767E]">
                  <p className="text-[14px]">No services match your filter criteria.</p>
                </div>
              ) : (
                <table className="w-full text-left text-[13px]">
                  <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#74767E] font-semibold text-[12px] uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-6">Service Title</th>
                      <th className="py-3.5 px-6">Category</th>
                      <th className="py-3.5 px-6">Provider</th>
                      <th className="py-3.5 px-6">Starting Price</th>
                      <th className="py-3.5 px-6">Status</th>
                      <th className="py-3.5 px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {filteredServices.map((service) => {
                      const isPublished = service.status === "published";
                      const isActionLoading = actionLoadingId === service._id;

                      return (
                        <tr key={service._id} className="hover:bg-[#FAFAFA] transition-colors">
                          <td className="py-4 px-6 font-semibold text-[#222325]">
                            {service.slug ? (
                              <Link
                                href={`/services/${service.slug}`}
                                target="_blank"
                                className="hover:text-[#008744] flex items-center gap-1.5"
                              >
                                <span>{service.title}</span>
                                <ExternalLink className="w-3 h-3 text-[#74767E]" />
                              </Link>
                            ) : (
                              service.title
                            )}
                          </td>

                          <td className="py-4 px-6">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#F3F4F6] text-[#4B5563] text-[12px] font-medium">
                              {service.categoryTitle || "General"}
                            </span>
                          </td>

                          <td className="py-4 px-6">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[#222325] font-medium">
                                {service.providerName || "Independent"}
                              </span>
                              {service.providerVerified && (
                                <ShieldCheck className="w-3.5 h-3.5 text-[#008744]" />
                              )}
                            </div>
                          </td>

                          <td className="py-4 px-6 font-semibold text-[#222325]">
                            {service.currency === "GHS" ? "GH₵" : service.currency || "GH₵"}{" "}
                            {service.startingPrice}
                          </td>

                          <td className="py-4 px-6">
                            {isPublished ? (
                              <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#008744] bg-[#E8F8F0] px-2.5 py-1 rounded-full">
                                <Sparkles className="w-3.5 h-3.5" /> Published
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[#74767E] bg-[#F3F4F6] px-2.5 py-1 rounded-full">
                                Draft
                              </span>
                            )}
                          </td>

                          <td className="py-4 px-6 text-right">
                            {isActionLoading ? (
                              <Loader2 className="w-4 h-4 animate-spin text-[#74767E] inline-block" />
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  handleToggleServiceStatus(service._id, service.status)
                                }
                                className={`px-3 py-1 rounded-[6px] text-[12px] font-semibold transition-colors cursor-pointer ${
                                  isPublished
                                    ? "bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#DC2626]"
                                    : "bg-[#008744] hover:bg-[#007038] text-white shadow-2xs"
                                }`}
                              >
                                {isPublished ? "Unpublish" : "Publish"}
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
