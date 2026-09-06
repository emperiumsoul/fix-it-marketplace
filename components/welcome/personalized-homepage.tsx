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

function getNameFromEmail(email?: string): string {
  if (!email) return "";
  const localPart = email.split("@")[0] || "";
  const cleaned = localPart
    .replace(/[0-9._-]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
  return cleaned || localPart;
}

export function PersonalizedHomepage({ initialUserName }: PersonalizedHomepageProps) {
  const { isLoaded, isSignedIn, user } = useUser();
  const searchParams = useSearchParams();

  // Role from Clerk user metadata
  const userRole = (user?.unsafeMetadata as { role?: "customer" | "provider" } | undefined)?.role;

  // Track explicit user actions: dismiss or force open
  const [userDismissed, setUserDismissed] = React.useState(false);
  const [userForcedOpen, setUserForcedOpen] = React.useState(false);

  const resetParam = searchParams?.get("reset") === "true";
  const forceModalParam = searchParams?.get("modal") === "true";

  // Clean local storage if reset is requested
  React.useEffect(() => {
    if (resetParam && typeof window !== "undefined") {
      localStorage.removeItem("fixit_role");
      localStorage.removeItem("fixit_role_modal_dismissed");
    }
  }, [resetParam]);

  // Determine if role is established
  const hasRole = Boolean(
    isSignedIn
      ? userRole
      : typeof window !== "undefined"
      ? localStorage.getItem("fixit_role")
      : null
  );

  // Determine modal open state
  const isModalOpen =
    userForcedOpen || forceModalParam || (!userDismissed && (!isLoaded || !hasRole));

  // Can dismiss only if the user already has a recognized role
  const canDismiss = hasRole || userForcedOpen;

  // Derive personalized display name from email or user profile
  const primaryEmail =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress;
  const emailDerivedName = getNameFromEmail(primaryEmail);

  const customMetadataName = (user?.unsafeMetadata as { customerName?: string } | undefined)?.customerName;

  const userName =
    emailDerivedName ||
    customMetadataName ||
    user?.firstName ||
    user?.username ||
    initialUserName ||
    "Friend";

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
          onOpenRoleModal={() => {
            setUserForcedOpen(true);
            setUserDismissed(false);
          }}
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
        canDismiss={canDismiss}
        onClose={() => {
          setUserDismissed(true);
          setUserForcedOpen(false);
        }}
        onSelectRole={() => {
          setUserDismissed(true);
          setUserForcedOpen(false);
        }}
      />
    </div>
  );
}
