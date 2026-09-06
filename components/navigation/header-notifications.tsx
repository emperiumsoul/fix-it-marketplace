"use client";

import * as React from "react";
import Link from "next/link";
import { Bell, CheckCheck, Calendar, MessageSquare, ShieldCheck } from "lucide-react";

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: "booking" | "message" | "system";
  link: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Appointment Confirmed",
    description: "Kwame Mensah confirmed your Residential Plumbing repair for Sep 10, 10:00 AM.",
    timestamp: "15m ago",
    read: false,
    type: "booking",
    link: "/bookings",
  },
  {
    id: "notif-2",
    title: "New Message from Akosua",
    description: "Akosua CleanCo sent a message regarding your East Legon cleaning appointment.",
    timestamp: "1h ago",
    read: false,
    type: "message",
    link: "/messages",
  },
  {
    id: "notif-3",
    title: "Service In Progress",
    description: "Kofi Boateng is currently working on your Electrical Panel rebalancing.",
    timestamp: "3h ago",
    read: true,
    type: "booking",
    link: "/bookings",
  },
];

export function HeaderNotifications() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState<NotificationItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("fixit_notifications");
        if (stored) return JSON.parse(stored);
      } catch {
        // ignore
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("fixit_notifications", JSON.stringify(updated));
    }
  };

  const handleNotificationClick = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    setNotifications(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("fixit_notifications", JSON.stringify(updated));
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="View notifications"
        className="relative hover:text-[#222325] transition-colors p-1 cursor-pointer flex items-center justify-center text-[#62646A]"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] bg-[#B42318] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[340px] sm:w-[380px] bg-white rounded-[12px] border border-[#DADBDD] shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header */}
          <div className="p-3.5 border-b border-[#DADBDD] flex items-center justify-between bg-[#FAFAFA]">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[14px] text-[#222325]">Notifications</span>
              {unreadCount > 0 && (
                <span className="text-[11px] font-semibold bg-[#EBF7EE] text-[#008744] px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-[12px] font-medium text-[#008744] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5" /> Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="divide-y divide-[#F0F0F0] max-h-[320px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-[13px] text-[#74767E]">
                No notifications right now.
              </div>
            ) : (
              notifications.map((item) => {
                return (
                  <Link
                    key={item.id}
                    href={item.link}
                    onClick={() => handleNotificationClick(item.id)}
                    className={`block p-3.5 transition-colors hover:bg-[#F9FAFB] ${
                      !item.read ? "bg-[#F4F9F5]" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 w-7 h-7 rounded-full bg-white border border-[#DADBDD] flex items-center justify-center shrink-0 text-[#222325]">
                        {item.type === "booking" ? (
                          <Calendar className="w-3.5 h-3.5 text-[#008744]" />
                        ) : item.type === "message" ? (
                          <MessageSquare className="w-3.5 h-3.5 text-[#1A73E8]" />
                        ) : (
                          <ShieldCheck className="w-3.5 h-3.5 text-[#EAB308]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <p className="text-[13px] font-semibold text-[#222325] truncate">
                            {item.title}
                          </p>
                          <span className="text-[10px] text-[#74767E] shrink-0">
                            {item.timestamp}
                          </span>
                        </div>
                        <p className="text-[12px] text-[#62646A] line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-2.5 bg-[#F9FAFB] border-t border-[#DADBDD] text-center">
            <Link
              href="/bookings"
              onClick={() => setIsOpen(false)}
              className="text-[12px] font-medium text-[#008744] hover:underline"
            >
              View all bookings and order updates
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
