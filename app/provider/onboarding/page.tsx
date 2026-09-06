import * as React from "react";
import type { Metadata } from "next";
import { OnboardingProfileView } from "@/components/provider/onboarding-profile-view";

export const metadata: Metadata = {
  title: "Review Your Profile | Fix it Ghana",
  description: "Add missing details to complete your service provider profile on Fix it.",
};

export default function ProviderOnboardingPage() {
  return <OnboardingProfileView />;
}
