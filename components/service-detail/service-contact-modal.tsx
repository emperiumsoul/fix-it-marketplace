"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Check, X, Send, MessageSquare } from "lucide-react";

export interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerName?: string;
  serviceTitle?: string;
}

export function ServiceContactModal({
  isOpen,
  onClose,
  providerName = "Neat Home",
  serviceTitle = "I will clean your home and living spaces",
}: ContactModalProps) {
  const router = useRouter();
  const [message, setMessage] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);
  const [isSent, setIsSent] = React.useState(false);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setIsSending(true);

    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("fixit_messages");
        let threads = stored ? JSON.parse(stored) : [];
        if (!Array.isArray(threads)) threads = [];

        const targetThread = threads.find((t: { providerName?: string }) =>
          t.providerName?.toLowerCase().includes(providerName.toLowerCase())
        );

        const newMessage = {
          id: `msg-${Date.now()}`,
          sender: "customer",
          text: message.trim(),
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        if (targetThread) {
          targetThread.lastMessage = message.trim();
          targetThread.lastTimestamp = "Just now";
          targetThread.messages.push(newMessage);
        } else {
          threads.unshift({
            id: `conv-${Date.now()}`,
            providerName,
            providerInitial: providerName.charAt(0).toUpperCase(),
            providerRole: "Marketplace Service Provider",
            serviceTitle,
            serviceSlug: window.location.pathname.split("/")[2] || "service",
            bookingPrice: 200,
            lastMessage: message.trim(),
            lastTimestamp: "Just now",
            unreadCount: 0,
            isOnline: true,
            messages: [newMessage],
          });
        }

        localStorage.setItem("fixit_messages", JSON.stringify(threads));
      } catch (err) {
        console.error("Failed to persist message", err);
      }
    }

    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
    }, 600);
  };

  const handleGoToMessages = () => {
    onClose();
    router.push(`/messages?to=${encodeURIComponent(providerName)}&service=${encodeURIComponent(serviceTitle)}`);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[500px] bg-white rounded-[20px] shadow-2xl p-6 sm:p-8 text-[#222325] animate-in zoom-in-95 duration-200"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-[#74767E] hover:text-[#222325] hover:bg-[#F7F7F7] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSent ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-[#E8F8F0] text-[#008744] flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h3 className="font-grotesque font-bold text-[20px] text-[#222325]">
              Message Sent!
            </h3>
            <p className="text-[14px] text-[#62646A] mt-2">
              Your inquiry has been delivered to <span className="font-semibold text-[#222325]">{providerName}</span>.
              They typically respond within an hour.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleGoToMessages}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#008744] hover:bg-[#007038] text-white font-semibold text-[14px] rounded-[8px] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-4 h-4" /> Open Chat in Messages
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#F7F7F7] hover:bg-[#E5E7EB] text-[#222325] font-semibold text-[14px] rounded-[8px] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSend} className="flex flex-col gap-4">
            <div>
              <h3 className="font-grotesque font-bold text-[20px] text-[#222325]">
                Contact {providerName}
              </h3>
              <p className="text-[13px] text-[#62646A] mt-1 line-clamp-1">
                Inquiry regarding &ldquo;{serviceTitle}&rdquo;
              </p>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#222325] mb-1.5">
                Your Message
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about specific job requirements, timing flexibility, materials needed, or price estimates..."
                className="w-full p-3 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#222325]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-[13px] font-semibold text-[#62646A] hover:text-[#222325] rounded-[8px] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSending || !message.trim()}
                className="px-6 py-2 bg-[#222325] hover:bg-black disabled:bg-[#DADBDD] text-white font-semibold text-[13px] rounded-[8px] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
