import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Search } from "lucide-react";
import { PublicHeader } from "@/components/navigation/public-header";
import { CategoryNav } from "@/components/navigation/category-nav";
import { Footer } from "@/components/navigation/footer";

export const metadata: Metadata = {
  title: "Chat with Providers on WhatsApp | Fix it Ghana",
  description: "Connect directly with verified local service providers in Ghana on WhatsApp.",
};

export default function MessagesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F8]">
      <PublicHeader />
      <CategoryNav />

      <main className="flex-1 max-w-[800px] w-full mx-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col items-center text-center">
        {/* WhatsApp Highlight Card */}
        <div className="w-full bg-white rounded-[24px] border border-[#E5E7EB] p-8 sm:p-12 shadow-sm flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center mb-5">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8" aria-hidden="true">
              <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.275-.1-.475-.15-.675.15-.2.301-.776.978-.951 1.179-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.799-1.5-1.786-1.676-2.087-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.101-.2.05-.376-.025-.527-.075-.15-.676-1.63-1.026-2.233-.251-.602-.501-.52-.676-.52-.175 0-.376-.025-.577-.025-.2 0-.526.075-.801.376-.275.301-1.052 1.028-1.052 2.508 0 1.48 1.077 2.91 1.228 3.11.15.2 2.118 3.234 5.132 4.536.717.31 1.277.495 1.714.634.72.229 1.375.197 1.894.121.577-.087 1.78-.727 2.03-1.43.25-.702.25-1.304.175-1.43-.075-.125-.275-.2-.576-.35z" />
              <path d="M12.004 0C5.384 0 0 5.385 0 12.006c0 2.115.552 4.179 1.602 6.001L.06 24l6.168-1.618c1.758.96 3.743 1.465 5.776 1.465 6.618 0 12.002-5.385 12.002-12.006S18.622 0 12.004 0zm0 21.968c-1.803 0-3.57-.486-5.11-1.405l-.367-.218-3.799.996 1.014-3.702-.239-.38A9.927 9.927 0 012.04 12.006c0-5.494 4.47-9.965 9.964-9.965 5.495 0 9.966 4.471 9.966 9.965 0 5.495-4.471 9.962-9.966 9.962z" />
            </svg>
          </div>

          <h1 className="font-grotesque font-bold text-[24px] sm:text-[30px] text-[#222325]">
            Chat Directly on WhatsApp
          </h1>

          <p className="text-[14px] sm:text-[15px] text-[#62646A] mt-3 max-w-[540px] leading-relaxed">
            Fix it Ghana connects customers and service providers directly via WhatsApp. 
            Enjoy instant responses, live location sharing, voice notes, and job coordination directly on your phone.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-[500px]">
            <Link
              href="/bookings"
              className="px-5 py-3 rounded-[10px] bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-[14px] transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <Calendar className="w-4 h-4" />
              <span>Go to My Bookings</span>
            </Link>

            <Link
              href="/search"
              className="px-5 py-3 rounded-[10px] bg-[#18181B] hover:bg-black text-white font-semibold text-[14px] transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <Search className="w-4 h-4" />
              <span>Explore Services</span>
            </Link>
          </div>

          <div className="mt-10 pt-6 border-t border-[#F3F4F6] w-full flex items-center justify-center gap-2 text-[12px] text-[#74767E]">
            <span>Need marketplace assistance?</span>
            <a
              href="https://wa.me/233244123456?text=Hello%20Fix%20it%20Ghana%2C%20I%20need%20support%20with%20my%20service"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#008744] font-semibold hover:underline inline-flex items-center gap-1"
            >
              Chat with Fix it Concierge <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
