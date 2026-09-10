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

export interface OrdersListViewProps {
  initialStatusFilter?: string;
  onStatusChangeToast?: (msg: string) => void;
  orders?: OrderItem[];
}

export function OrdersListView({
  initialStatusFilter = "all",
  onStatusChangeToast,
  orders: externalOrders,
}: OrdersListViewProps) {
  const [statusOverrides, setStatusOverrides] = React.useState<Record<string, OrderItem["status"]>>({});

  const orders = React.useMemo(() => {
    const base = externalOrders ?? [];
    return base.map((o) => {
      if (statusOverrides[o.id]) {
        return { ...o, status: statusOverrides[o.id] };
      }
      return o;
    });
  }, [externalOrders, statusOverrides]);

  const [selectedFilter, setSelectedFilter] = React.useState<string | null>(null);
  const filter = selectedFilter ?? initialStatusFilter;
  const setFilter = (f: string) => setSelectedFilter(f);

  const handleUpdateStatus = (id: string, newStatus: OrderItem["status"]) => {
    setStatusOverrides((prev) => ({ ...prev, [id]: newStatus }));
    const order = orders.find((o) => o.id === id);
    const statusLabels: Record<OrderItem["status"], string> = {
      requested: "Requested",
      confirmed: "Confirmed",
      in_progress: "In Progress",
      completed: "Completed",
      cancelled: "Cancelled",
    };
    onStatusChangeToast?.(
      `Order #${id.slice(0, 8)} for ${order?.customerName || "customer"} updated to ${statusLabels[newStatus]}`
    );

    try {
      fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: id, jobStatus: newStatus }),
      }).catch((err) => console.warn("Failed to patch booking status on server:", err));
    } catch {
      // ignore
    }
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

                {/* Bottom Row: Status Transition Actions & WhatsApp */}
                <div className="pt-3 border-t border-[#F3F4F6] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const phone = order.customerPhone ? order.customerPhone.replace(/[^\d+]/g, "") : "233244123456";
                        let target = phone.startsWith("+") ? phone.slice(1) : phone.startsWith("0") ? `233${phone.slice(1)}` : phone;
                        if (!target.startsWith("233") && target.length <= 10) target = `233${target}`;
                        const msg = encodeURIComponent(`Hello ${order.customerName}, I am contacting you from Fix it regarding your order #${order.id.slice(0, 8)} for "${order.serviceTitle}".`);
                        window.open(`https://wa.me/${target || "233244123456"}?text=${msg}`, "_blank", "noopener,noreferrer");
                      }}
                      className="px-3 py-1.5 rounded-[8px] border border-[#25D366] bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#15803D] text-[13px] font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#25D366]" aria-hidden="true">
                        <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.275-.1-.475-.15-.675.15-.2.301-.776.978-.951 1.179-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.799-1.5-1.786-1.676-2.087-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.101-.2.05-.376-.025-.527-.075-.15-.676-1.63-1.026-2.233-.251-.602-.501-.52-.676-.52-.175 0-.376-.025-.577-.025-.2 0-.526.075-.801.376-.275.301-1.052 1.028-1.052 2.508 0 1.48 1.077 2.91 1.228 3.11.15.2 2.118 3.234 5.132 4.536.717.31 1.277.495 1.714.634.72.229 1.375.197 1.894.121.577-.087 1.78-.727 2.03-1.43.25-.702.25-1.304.175-1.43-.075-.125-.275-.2-.576-.35z" />
                        <path d="M12.004 0C5.384 0 0 5.385 0 12.006c0 2.115.552 4.179 1.602 6.001L.06 24l6.168-1.618c1.758.96 3.743 1.465 5.776 1.465 6.618 0 12.002-5.385 12.002-12.006S18.622 0 12.004 0zm0 21.968c-1.803 0-3.57-.486-5.11-1.405l-.367-.218-3.799.996 1.014-3.702-.239-.38A9.927 9.927 0 012.04 12.006c0-5.494 4.47-9.965 9.964-9.965 5.495 0 9.966 4.471 9.966 9.965 0 5.495-4.471 9.962-9.966 9.962z" />
                      </svg>
                      <span>WhatsApp Customer</span>
                    </button>
                  </div>

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
