"use client";

import * as React from "react";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { PublicHeader } from "@/components/navigation/public-header";
import { CategoryNav } from "@/components/navigation/category-nav";
import { WelcomeHero } from "@/components/welcome/welcome-hero";
import { WelcomeExplore } from "@/components/welcome/welcome-explore";
import { RoleModal } from "@/components/welcome/role-modal";
import { Footer } from "@/components/navigation/footer";

export interface PersonalizedHomepageProps {
  initialUserName?: string;
}

export function PersonalizedHomepage({ initialUserName }: PersonalizedHomepageProps) {
  const { user } = useUser();
  const searchParams = useSearchParams();

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Derive personalized display name
  const userName =
    user?.firstName ||
    user?.username ||
    initialUserName ||
    "Kingsley";

  React.useEffect(() => {
    // Check if modal should open automatically on first visit or query parameter
    if (typeof window !== "undefined") {
      const forceModal = searchParams?.get("modal") === "true";
      const dismissed = localStorage.getItem("fixit_role_modal_dismissed");
      if (forceModal || !dismissed) {
        const timer = setTimeout(() => setIsModalOpen(true), 0);
        return () => clearTimeout(timer);
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#404145] font-satoshi selection:bg-[#F3FDF9] selection:text-[#003912]">
      {/* Top Header */}
      <PublicHeader />

      {/* Category Nav Bar */}
      <CategoryNav />

      {/* Main Personalized Welcome Content matching 3.png */}
      <main className="flex-1 flex flex-col">
        {/* Welcome Greeting & 3 Recommended / Progress Cards */}
        <WelcomeHero
          userName={userName}
          onOpenRoleModal={() => setIsModalOpen(true)}
        />

        {/* Explore Popular Categories on Fix it: Left tabs + Right Cards */}
        <WelcomeExplore />
      </main>

      {/* Standard Footer */}
      <Footer />

      {/* Role Selection Modal matching 2.png */}
      <RoleModal
        userName={user?.username || user?.firstName || userName}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
