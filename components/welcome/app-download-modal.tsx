"use client";

import * as React from "react";
import { X, Smartphone, Check, Send, QrCode, ShieldCheck, Star } from "lucide-react";

export interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AppDownloadModal({ isOpen, onClose }: AppDownloadModalProps) {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [channel, setChannel] = React.useState<"sms" | "whatsapp">("whatsapp");
  const [isSent, setIsSent] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);

  if (!isOpen) return null;

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;
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

        {/* Modal Content */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-[14px] bg-[#E8F8F0] text-[#008744] flex items-center justify-center mx-auto mb-3">
            <Smartphone className="w-6 h-6 stroke-[2]" />
          </div>

          <h3 className="font-grotesque font-bold text-[22px] text-[#222325]">
            Get the Fix it Ghana App
          </h3>
          <p className="text-[13px] text-[#62646A] mt-1 max-w-sm mx-auto">
            Book trusted plumbers, cleaners, and electricians across Accra & Kumasi with instant job notifications.
          </p>

          {/* QR Code and App features */}
          <div className="my-5 p-4 bg-[#F9FAFB] rounded-[14px] border border-[#E5E7EB] flex items-center justify-center gap-6">
            <div className="w-28 h-28 bg-white p-2 rounded-[10px] border border-[#DADBDD] shadow-xs flex flex-col items-center justify-center">
              <QrCode className="w-20 h-20 text-[#222325]" />
              <span className="text-[9px] font-bold text-[#74767E] mt-1 uppercase">Scan to install</span>
            </div>

            <div className="text-left text-[12px] space-y-2 text-[#404145]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#008744] shrink-0" />
                <span>Verified technician IDs</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#EAB308] shrink-0" />
                <span>Real-time GPS status tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#1A73E8] shrink-0" />
                <span>MTN & Telecel MoMo support</span>
              </div>
            </div>
          </div>

          {/* SMS / WhatsApp Sender */}
          {isSent ? (
            <div className="bg-[#E8F8F0] border border-[#BBF7D0] rounded-[10px] p-3 text-center animate-in fade-in duration-150">
              <div className="flex items-center justify-center gap-1.5 text-[#008744] font-semibold text-[13px]">
                <Check className="w-4 h-4" /> Download link dispatched!
              </div>
              <p className="text-[12px] text-[#166534] mt-0.5">
                We sent the app link to +233 {phoneNumber} via {channel.toUpperCase()}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSendLink} className="space-y-3 text-left">
              <div className="flex items-center justify-between">
                <label className="text-[12px] font-semibold text-[#222325]">
                  Send download link to phone:
                </label>
                <div className="flex items-center gap-2 text-[12px]">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="channel"
                      checked={channel === "whatsapp"}
                      onChange={() => setChannel("whatsapp")}
                      className="accent-[#008744]"
                    />
                    <span>WhatsApp</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="channel"
                      checked={channel === "sms"}
                      onChange={() => setChannel("sms")}
                      className="accent-[#008744]"
                    />
                    <span>SMS</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex items-center px-3 bg-[#F7F7F7] border border-[#DADBDD] rounded-[8px] text-[13px] font-medium text-[#222325]">
                  +233
                </div>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="24 123 4567"
                  className="flex-1 px-3 py-2 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#222325]"
                />
                <button
                  type="submit"
                  disabled={isSending || !phoneNumber.trim()}
                  className="px-4 py-2 bg-[#008744] hover:bg-[#007038] disabled:bg-[#DADBDD] text-white font-semibold text-[13px] rounded-[8px] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </div>
            </form>
          )}

          {/* App store buttons */}
          <div className="mt-5 pt-4 border-t border-[#E5E7EB] flex items-center justify-center gap-4 text-[12px] font-semibold text-[#62646A]">
            <span className="px-3 py-1.5 rounded-[6px] bg-[#F7F7F7] border border-[#DADBDD]">
              iOS App Store
            </span>
            <span className="px-3 py-1.5 rounded-[6px] bg-[#F7F7F7] border border-[#DADBDD]">
              Google Play Store
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
