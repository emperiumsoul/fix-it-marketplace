"use client";

import * as React from "react";
import { Check, X, Send } from "lucide-react";

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
  const [message, setMessage] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);
  const [isSent, setIsSent] = React.useState(false);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
    }, 600);
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
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-[#E8F8F0] text-[#008744] flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h3 className="font-grotesque font-bold text-[20px] text-[#222325]">
              Message Sent!
            </h3>
            <p className="text-[14px] text-[#62646A] mt-2">
              <span className="font-semibold text-[#222325]">{providerName}</span> typically responds within an hour.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 px-7 py-2.5 bg-[#222325] hover:bg-black text-white font-semibold text-[14px] rounded-[8px] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSend} className="flex flex-col gap-4">
            <div>
              <h3 className="font-grotesque font-bold text-[20px] text-[#222325]">
                Contact {providerName}
              </h3>
              <p className="text-[13px] text-[#62646A] mt-1 line-clamp-1">
                Inquiry about &ldquo;{serviceTitle}&rdquo;
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
                placeholder="Ask about specific cleaning tasks, scheduling flexibility, or property size inquiries..."
                className="w-full p-3 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#222325]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-[8px] border border-[#DADBDD] text-[14px] font-medium text-[#404145] hover:bg-[#F7F7F7]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSending || !message.trim()}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#008744] hover:bg-[#007038] disabled:opacity-50 text-white font-semibold text-[14px] rounded-[8px] transition-colors shadow-sm cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSending ? "Sending..." : "Send Message"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
