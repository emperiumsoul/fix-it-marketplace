import * as React from "react";
import type { Metadata } from "next";
import { PublicHeader } from "@/components/navigation/public-header";
import { CategoryNav } from "@/components/navigation/category-nav";
import { Footer } from "@/components/navigation/footer";
import { MessagingView } from "@/components/messages/messaging-view";

export const metadata: Metadata = {
  title: "Messages | Fix it Ghana",
  description: "Direct customer and provider communication, appointment coordination, and job inquiries.",
};

export default function MessagesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F7]">
      <PublicHeader />
      <CategoryNav />
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <MessagingView />
      </main>
      <Footer />
    </div>
  );
}
