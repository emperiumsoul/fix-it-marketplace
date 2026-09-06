"use client";

import * as React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  PlayCircle,
  Filter,
  User,
  Phone,
} from "lucide-react";

export interface OrderItem {
  id: string;
  customerName: string;
  customerPhone: string;
  serviceTitle: string;
  packageName: string;
  scope: string;
  price: number;
  scheduledTime: string;
  address: string;
  status: "requested" | "confirmed" | "in_progress" | "completed" | "cancelled";
  paymentStatus: "paid" | "pending" | "unpaid";
}

const INITIAL_ORDERS: OrderItem[] = [
  {
    id: "BK-98124",
    customerName: "Abena Osei",
    customerPhone: "+233 24 551 8920",
    serviceTitle: "Residential House Cleaning",
    packageName: "Single Session: 2-3 Bedroom House",
    scope: "Routine scheduled maintenance cleaning of 2 bedrooms, 2 bathrooms, kitchen, and living room.",
    price: 360,
    scheduledTime: "2026-09-14T09:30:00Z",
    address: "House 14, Jungle Avenue, East Legon, Accra",
    status: "requested",
    paymentStatus: "unpaid",
  },
  {
    id: "BK-44821",
    customerName: "Naa Ayeley",
    customerPhone: "+233 20 882 1045",
    serviceTitle: "Deep Home Cleaning & Degreasing",
    packageName: "Standard Multi-Room Clean & Sanitize",
    scope: "Deep scrubbing of kitchen surfaces, tile descaling in 2 washrooms, and vacuuming.",
    price: 450,
    scheduledTime: "2026-09-10T10:00:00Z",
    address: "Apartment 4B, Ringway Estates, Osu, Accra",
    status: "confirmed",
    paymentStatus: "paid",
  },
  {
    id: "BK-77192",
    customerName: "Kwabena Owusu",
    customerPhone: "+233 27 340 9912",
    serviceTitle: "Move-Out Turnkey Sanitize",
    packageName: "Turnkey Relocation Sanitization",
    scope: "Complete empty apartment deep scrub, window wipe down, and cupboard disinfection before tenant handover.",
    price: 680,
    scheduledTime: "2026-09-06T08:30:00Z",
    address: "Plot 12, Block C, Airport Residential, Accra",
    status: "in_progress",
    paymentStatus: "paid",
  },
  {
    id: "BK-33910",
    customerName: "Kofi Mensah",
    customerPhone: "+233 55 120 4481",
    serviceTitle: "Post-Event Cleaning Service",
    packageName: "Commercial Compound Sweep & Waste Bagging",
    scope: "Compound sweeping, sorting of plastic & paper waste, floor mop after 80-guest family party.",
    price: 520,
    scheduledTime: "2026-09-02T13:00:00Z",
    address: "5th Circular Road, Cantonments, Accra",
    status: "completed",
    paymentStatus: "paid",
  },
  {
    id: "BK-11029",
    customerName: "Esi Badu",
    customerPhone: "+233 24 990 3114",
    serviceTitle: "Quick Routine Touch-Up",
    packageName: "1 Bedroom Studio Refresh",
    scope: "Dusting and quick mop of studio apartment.",
    price: 180,
    scheduledTime: "2026-08-28T14:00:00Z",
    address: "Lakeside Estate, Ashaley Botwe, Accra",
    status: "cancelled",
    paymentStatus: "unpaid",
  },
];

export interface OrdersListViewProps {
  initialStatusFilter?: string;
  onStatusChangeToast?: (msg: string) => void;
}

export function OrdersListView({
  initialStatusFilter = "all",
  onStatusChangeToast,
}: OrdersListViewProps) {
  const [orders, setOrders] = React.useState<OrderItem[]>(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("fixit_provider_orders");
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_ORDERS;
  });

  const [selectedFilter, setSelectedFilter] = React.useState<string | null>(null);
  const filter = selectedFilter ?? initialStatusFilter;
  const setFilter = (f: string) => setSelectedFilter(f);

  const saveOrders = (updated: OrderItem[]) => {
    setOrders(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("fixit_provider_orders", JSON.stringify(updated));
    }
  };

  const handleUpdateStatus = (id: string, newStatus: OrderItem["status"]) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o));
    saveOrders(updated);
    const order = orders.find((o) => o.id === id);
    const statusLabels: Record<OrderItem["status"], string> = {
      requested: "Requested",
      confirmed: "Confirmed",
      in_progress: "In Progress",
      completed: "Completed",
      cancelled: "Cancelled",
    };
    onStatusChangeToast?.(
      `Order #${id} for ${order?.customerName || "customer"} updated to ${statusLabels[newStatus]}!`
    );
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  const getStatusBadge = (status: OrderItem["status"]) => {
    switch (status) {
      case "requested":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] text-[12px] font-semibold">
            <Clock className="w-3.5 h-3.5" /> Requested
          </span>
        );
      case "confirmed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#DBEAFE] text-[#1E40AF] text-[12px] font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
          </span>
        );
      case "in_progress":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EDE9FE] text-[#5B21B6] text-[12px] font-semibold">
            <PlayCircle className="w-3.5 h-3.5" /> In Progress
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E8F8F0] text-[#008744] text-[12px] font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FEE2E2] text-[#991B1B] text-[12px] font-semibold">
            <XCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Header & Filter Pills */}
      <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-grotesque font-bold text-[20px] text-[#222325]">
            Orders & Bookings Received
          </h2>
          <p className="text-[13px] text-[#62646A] mt-0.5">
            Manage incoming service requests, scheduled appointments, and job statuses.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F4F4F5] rounded-[10px] self-start sm:self-auto text-[13px] font-medium">
          {[
            { id: "all", label: "All", count: orders.length },
            {
              id: "requested",
              label: "Requested",
              count: orders.filter((o) => o.status === "requested").length,
            },
            {
              id: "confirmed",
              label: "Confirmed",
              count: orders.filter((o) => o.status === "confirmed").length,
            },
            {
              id: "in_progress",
              label: "In Progress",
              count: orders.filter((o) => o.status === "in_progress").length,
            },
            {
              id: "completed",
              label: "Completed",
              count: orders.filter((o) => o.status === "completed").length,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-[8px] transition-colors cursor-pointer flex items-center gap-1.5 ${
                filter === tab.id
                  ? "bg-white text-[#222325] font-semibold shadow-xs"
                  : "text-[#74767E] hover:text-[#222325]"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                  filter === tab.id ? "bg-[#18181B] text-white" : "bg-[#E4E4E7] text-[#71717A]"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-12 text-center shadow-xs flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-[#F3F4F6] text-[#74767E] flex items-center justify-center mb-3">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="font-grotesque font-bold text-[18px] text-[#222325]">
            No orders found
          </h3>
          <p className="text-[13px] text-[#62646A] mt-1 max-w-sm">
            There are currently no bookings under the &quot;{filter}&quot; filter.
          </p>
          <button
            type="button"
            onClick={() => setFilter("all")}
            className="mt-4 px-4 py-2 rounded-[8px] border border-[#DADBDD] text-[13px] font-semibold text-[#222325] hover:bg-[#F9FAFB] cursor-pointer"
          >
            Show All Orders
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredOrders.map((order) => {
            const formattedDate = new Date(order.scheduledTime).toLocaleDateString("en-GB", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={order.id}
                className="bg-white rounded-[16px] border border-[#E5E7EB] p-5 sm:p-6 shadow-xs flex flex-col gap-4 hover:border-[#DADBDD] transition-colors"
              >
                {/* Top Row: Customer & Order ID + Status Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F3F4F6]">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F3F4F6] text-[#222325] font-bold text-[14px] flex items-center justify-center shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-grotesque font-bold text-[16px] text-[#222325]">
                          {order.customerName}
                        </h4>
                        <span className="text-[12px] font-mono text-[#74767E] bg-[#F4F4F5] px-2 py-0.5 rounded-[4px]">
                          #{order.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[12px] text-[#74767E] mt-0.5">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5" /> {order.customerPhone}
                        </span>
                        <span>•</span>
                        <span className="text-[#008744] font-medium">
                          Payment: {order.paymentStatus.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-start sm:self-auto">
                    {getStatusBadge(order.status)}
                    <div className="text-right">
                      <span className="font-grotesque font-bold text-[18px] text-[#222325]">
                        GHS {order.price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Middle Row: Service, Scope, Address & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[13px]">
                  <div className="space-y-1">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#74767E]">
                      Service & Agreed Package
                    </span>
                    <p className="font-semibold text-[#222325]">{order.serviceTitle}</p>
                    <p className="text-[#62646A]">{order.packageName}</p>
                    <p className="text-[12px] text-[#74767E] italic mt-1 leading-relaxed">
                      &quot;{order.scope}&quot;
                    </p>
                  </div>

                  <div className="space-y-2 bg-[#FAFAFA] p-3.5 rounded-[10px] border border-[#F3F4F6]">
                    <div className="flex items-center gap-2 text-[#404145]">
                      <Calendar className="w-4 h-4 text-[#74767E] shrink-0" />
                      <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-start gap-2 text-[#404145]">
                      <MapPin className="w-4 h-4 text-[#74767E] shrink-0 mt-0.5" />
                      <span className="leading-snug">{order.address}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Status Transition Actions */}
                <div className="pt-3 border-t border-[#F3F4F6] flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[12px] text-[#74767E]">
                    Change booking status:
                  </span>

                  <div className="flex flex-wrap items-center gap-2">
                    {order.status === "requested" && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(order.id, "cancelled")}
                          className="px-3 py-1.5 rounded-[8px] border border-[#DADBDD] text-[#991B1B] hover:bg-[#FEE2E2] text-[13px] font-semibold transition-colors cursor-pointer"
                        >
                          Decline
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(order.id, "confirmed")}
                          className="px-4 py-1.5 rounded-[8px] bg-[#18181B] hover:bg-[#27272A] text-white text-[13px] font-semibold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#008744]" />
                          Accept & Confirm Order
                        </button>
                      </>
                    )}

                    {order.status === "confirmed" && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(order.id, "in_progress")}
                        className="px-4 py-1.5 rounded-[8px] bg-[#18181B] hover:bg-[#27272A] text-white text-[13px] font-semibold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                      >
                        <PlayCircle className="w-4 h-4 text-[#FFBE5B]" />
                        Start Work On-Site
                      </button>
                    )}

                    {order.status === "in_progress" && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(order.id, "completed")}
                        className="px-4 py-1.5 rounded-[8px] bg-[#008744] hover:bg-[#007038] text-white text-[13px] font-semibold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Mark as Completed
                      </button>
                    )}

                    {order.status === "completed" && (
                      <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#008744] bg-[#E8F8F0] px-3 py-1 rounded-[6px]">
                        <CheckCircle2 className="w-4 h-4" /> Completed & Ready for Payout
                      </span>
                    )}

                    {order.status === "cancelled" && (
                      <span className="text-[12px] font-semibold text-[#991B1B] bg-[#FEE2E2] px-3 py-1 rounded-[6px]">
                        Order Cancelled
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
