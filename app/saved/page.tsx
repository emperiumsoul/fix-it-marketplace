import * as React from "react";
import type { Metadata } from "next";
import { PublicHeader } from "@/components/navigation/public-header";
import { CategoryNav } from "@/components/navigation/category-nav";
import { Footer } from "@/components/navigation/footer";
import { SavedView } from "@/components/saved/saved-view";

export const metadata: Metadata = {
  title: "Saved Services | Fix it Ghana",
  description: "View and manage your favorited home service providers across Accra, Kumasi, and Ghana.",
};

export default function SavedPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F7]">
      <PublicHeader />
      <CategoryNav />
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <SavedView />
      </main>
      <Footer />
    </div>
  );
}
