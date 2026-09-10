"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Check, X } from "lucide-react";

export interface RoleModalProps {
  userName?: string;
  isOpen: boolean;
  canDismiss?: boolean;
  onClose: () => void;
  onSelectRole?: (role: "customer" | "provider") => void;
}

export function RoleModal({
  userName = "there",
  isOpen,
  canDismiss = false,
  onClose,
  onSelectRole,
}: RoleModalProps) {
  const router = useRouter();
  const { user } = useUser();
  const [selectedRole, setSelectedRole] = React.useState<"customer" | "provider" | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  if (!isOpen) return null;

  const handleNext = async () => {
    if (!selectedRole || isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (user) {
        const primaryEmail =
          user.primaryEmailAddress?.emailAddress ||
          user.emailAddresses?.[0]?.emailAddress;
        let derivedName = "";
        if (primaryEmail) {
          const localPart = primaryEmail.split("@")[0] || "";
          derivedName = localPart
            .replace(/[0-9._-]+/g, " ")
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(" ");
        }

        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            role: selectedRole,
            hasCompletedRoleSelection: true,
            ...(selectedRole === "customer" && derivedName
              ? { customerName: derivedName }
              : {}),
          },
        });
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("fixit_role", selectedRole);
        localStorage.setItem("fixit_role_modal_dismissed", "true");
      }

      onSelectRole?.(selectedRole);

      if (selectedRole === "customer") {
        onClose();
      } else {
        onClose();
        router.push("/provider/onboarding");
      }
    } catch (err) {
      console.error("Failed to save role:", err);
      if (typeof window !== "undefined") {
        localStorage.setItem("fixit_role", selectedRole);
        localStorage.setItem("fixit_role_modal_dismissed", "true");
      }
      onSelectRole?.(selectedRole);
      if (selectedRole === "customer") {
        onClose();
      } else {
        onClose();
        router.push("/provider/onboarding");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDismiss = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("fixit_role_modal_dismissed", "true");
    }
    if (user && !user.unsafeMetadata?.hasCompletedRoleSelection) {
      user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          hasCompletedRoleSelection: true,
        },
      }).catch(() => {});
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={canDismiss ? handleDismiss : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[760px] bg-white rounded-[20px] shadow-2xl p-6 sm:p-10 text-[#222325] animate-in zoom-in-95 duration-200"
      >
        {/* Close icon only if modal can be dismissed */}
        {canDismiss && (
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Close modal"
            className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-[#74767E] hover:text-[#222325] hover:bg-[#F7F7F7] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Title & Subtitle matching 2.png */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <h2 className="font-grotesque font-bold text-[24px] sm:text-[30px] leading-tight text-[#222325]">
            {userName}, your account has been created! What brings you to Fix it?
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#62646A] mt-2">
            We&apos;ll tailor your experience to fit your needs.
          </p>
        </div>

        {/* Two Choice Cards matching 2.png */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8 sm:mb-10">
          {/* Card 1: Customer */}
          <div
            onClick={() => setSelectedRole("customer")}
            className={`relative flex flex-col justify-between p-6 rounded-[14px] border-2 transition-all cursor-pointer select-none min-h-[220px] ${
              selectedRole === "customer"
                ? "border-[#222325] bg-white shadow-sm"
                : "border-[#E5E7EB] hover:border-[#DADBDD] bg-white"
            }`}
          >
            {/* Top Right Checkbox */}
            <div className="flex justify-end">
              <div
                className={`w-5 h-5 rounded-[4px] flex items-center justify-center transition-colors ${
                  selectedRole === "customer"
                    ? "bg-[#222325] text-white"
                    : "border border-[#DADBDD]"
                }`}
              >
                {selectedRole === "customer" && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>

            {/* Middle Illustration (Document with magnifying glass) */}
            <div className="my-2">
              <div className="relative w-16 h-16 rounded-[12px] bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] border border-[#BBF7D0] flex items-center justify-center shadow-xs">
                {/* File sheet effect */}
                <div className="w-10 h-10 rounded-[8px] bg-[#008744] flex items-center justify-center text-white shadow-xs">
                  <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="7" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                {/* Small star badge */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white border border-[#DADBDD] flex items-center justify-center text-[#EAB308]">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom Titles */}
            <div>
              <h3 className="font-grotesque font-bold text-[17px] text-[#222325]">
                I am a customer
              </h3>
              <p className="text-[13px] leading-[18px] text-[#62646A] mt-1">
                I want to hire local professionals and request services.
              </p>
            </div>
          </div>

          {/* Card 2: Service Provider */}
          <div
            onClick={() => setSelectedRole("provider")}
            className={`relative flex flex-col justify-between p-6 rounded-[14px] border-2 transition-all cursor-pointer select-none min-h-[220px] ${
              selectedRole === "provider"
                ? "border-[#222325] bg-white shadow-sm"
                : "border-[#E5E7EB] hover:border-[#DADBDD] bg-white"
            }`}
          >
            {/* Top Right Checkbox */}
            <div className="flex justify-end">
              <div
                className={`w-5 h-5 rounded-[4px] flex items-center justify-center transition-colors ${
                  selectedRole === "provider"
                    ? "bg-[#222325] text-white"
                    : "border border-[#DADBDD]"
                }`}
              >
                {selectedRole === "provider" && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>

            {/* Middle Illustration (User avatar with star) */}
            <div className="my-2">
              <div className="relative w-16 h-16 rounded-full bg-[#E8F8F0] border-2 border-[#1DBF73]/40 flex items-center justify-center shadow-xs">
                <div className="w-9 h-9 rounded-full bg-[#008744] flex items-center justify-center text-white">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                {/* Small star badge */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white border border-[#DADBDD] flex items-center justify-center text-[#EAB308]">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom Titles */}
            <div>
              <h3 className="font-grotesque font-bold text-[17px] text-[#222325]">
                I&apos;m a service provider
              </h3>
              <p className="text-[13px] leading-[18px] text-[#62646A] mt-1">
                I&apos;m looking to offer my services.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Row matching 2.png */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={handleNext}
            disabled={!selectedRole || isSubmitting}
            className="px-8 py-2.5 bg-[#222325] hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-[14px] rounded-[8px] transition-colors shadow-sm cursor-pointer"
          >
            {isSubmitting ? "Saving..." : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
