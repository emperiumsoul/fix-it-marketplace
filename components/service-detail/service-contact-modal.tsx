"use client";

import * as React from "react";
import { X, ExternalLink } from "lucide-react";

export interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerName?: string;
  serviceTitle?: string;
  providerPhone?: string;
}

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.275-.1-.475-.15-.675.15-.2.301-.776.978-.951 1.179-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.799-1.5-1.786-1.676-2.087-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.101-.2.05-.376-.025-.527-.075-.15-.676-1.63-1.026-2.233-.251-.602-.501-.52-.676-.52-.175 0-.376-.025-.577-.025-.2 0-.526.075-.801.376-.275.301-1.052 1.028-1.052 2.508 0 1.48 1.077 2.91 1.228 3.11.15.2 2.118 3.234 5.132 4.536.717.31 1.277.495 1.714.634.72.229 1.375.197 1.894.121.577-.087 1.78-.727 2.03-1.43.25-.702.25-1.304.175-1.43-.075-.125-.275-.2-.576-.35z" />
      <path d="M12.004 0C5.384 0 0 5.385 0 12.006c0 2.115.552 4.179 1.602 6.001L.06 24l6.168-1.618c1.758.96 3.743 1.465 5.776 1.465 6.618 0 12.002-5.385 12.002-12.006S18.622 0 12.004 0zm0 21.968c-1.803 0-3.57-.486-5.11-1.405l-.367-.218-3.799.996 1.014-3.702-.239-.38A9.927 9.927 0 012.04 12.006c0-5.494 4.47-9.965 9.964-9.965 5.495 0 9.966 4.471 9.966 9.965 0 5.495-4.471 9.962-9.966 9.962z" />
    </svg>
  );
}

export function ServiceContactModal({
  isOpen,
  onClose,
  providerName = "Local Professional",
  serviceTitle = "Home Service",
  providerPhone,
}: ContactModalProps) {
  const [message, setMessage] = React.useState(
    `Hello ${providerName}, I found your service "${serviceTitle}" on Fix it Ghana and would like to inquire about your availability.`
  );

  React.useEffect(() => {
    setMessage(
      `Hello ${providerName}, I found your service "${serviceTitle}" on Fix it Ghana and would like to inquire about your availability.`
    );
  }, [providerName, serviceTitle]);

  if (!isOpen) return null;

  // Format Ghana phone number for wa.me
  const formatWhatsAppNumber = (phone?: string): string => {
    if (!phone) return "233244123456"; // Default Ghana business contact
    let clean = phone.replace(/[^\d+]/g, "");
    if (clean.startsWith("+")) clean = clean.slice(1);
    if (clean.startsWith("0")) clean = `233${clean.slice(1)}`;
    if (!clean.startsWith("233") && clean.length <= 10) clean = `233${clean}`;
    return clean || "233244123456";
  };

  const targetNumber = formatWhatsAppNumber(providerPhone);

  const handleOpenWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedText = encodeURIComponent(message.trim());
    const url = `https://wa.me/${targetNumber}?text=${encodedText}`;
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
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

        <form onSubmit={handleOpenWhatsApp} className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0">
              <WhatsAppIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-grotesque font-bold text-[20px] text-[#222325]">
                Chat on WhatsApp
              </h3>
              <p className="text-[13px] text-[#62646A]">
                Direct line with <span className="font-semibold text-[#222325]">{providerName}</span>
              </p>
            </div>
          </div>

          <div className="p-3 rounded-[10px] bg-[#F7F7F8] border border-[#E5E7EB] text-[12px] text-[#62646A]">
            You will be redirected directly to WhatsApp to speak in real-time with the service provider.
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#222325] mb-1.5">
              Opening Message
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message for WhatsApp..."
              className="w-full p-3 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#25D366] transition-colors"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] font-semibold text-[#62646A] hover:text-[#222325] rounded-[8px] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-[14px] rounded-[8px] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Continue on WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
