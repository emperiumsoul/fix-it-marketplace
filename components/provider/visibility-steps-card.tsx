"use client";

import * as React from "react";
import {
  ShieldCheck,
  PlusCircle,
  Lock,
  CheckCircle2,
  Shield,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";

export interface VisibilityStepsCardProps {
  onReadGuide?: () => void;
  onCreateService?: () => void;
  onVerifyIdentity?: () => void;
  onSetAreasAndHours?: () => void;
  onPublish?: () => void;
  guideCompleted?: boolean;
  serviceCompleted?: boolean;
  identityVerified?: boolean;
  identityStatus?: string;
  areasHoursCompleted?: boolean;
  isPublished?: boolean;
}

export function VisibilityStepsCard({
  onReadGuide,
  onCreateService,
  onVerifyIdentity,
  onSetAreasAndHours,
  onPublish,
  guideCompleted = false,
  serviceCompleted = false,
  identityVerified = false,
  identityStatus = "unverified",
  areasHoursCompleted = false,
  isPublished = false,
}: VisibilityStepsCardProps) {
  const [skippedGuide, setSkippedGuide] = React.useState(false);

  const isGuideDone = guideCompleted || skippedGuide;
  const isIdentityDone = identityVerified || identityStatus === "verified";
  const isIdentityPending = identityStatus === "pending";

  return (
    <div className="w-full bg-white rounded-[16px] border border-[#E5E7EB] p-6 shadow-xs flex flex-col gap-6">
      <div>
        <h3 className="font-grotesque font-bold text-[20px] text-[#222325]">
          Steps to get visible
        </h3>
        <p className="text-[14px] text-[#62646A] mt-1">
          Complete these required steps to publish your services and start receiving job requests.
        </p>
      </div>

      <div className="space-y-4">
        {/* Step 1: Trust & Safety Guide */}
        <div
          className={`p-5 rounded-[12px] border transition-all ${
            isGuideDone
              ? "border-[#E5E7EB] bg-[#F9FAFB]"
              : "border-[#18181B] bg-white shadow-xs"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div
                className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 ${
                  isGuideDone
                    ? "bg-[#E8F8F0] text-[#008744]"
                    : "bg-[#18181B] text-white"
                }`}
              >
                {isGuideDone ? (
                  <CheckCircle2 className="w-5 h-5 stroke-[2]" />
                ) : (
                  <ShieldCheck className="w-5 h-5 stroke-[1.75]" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-bold uppercase tracking-wider text-[#74767E]">
                    Step 1
                  </span>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#F3F4F6] text-[#62646A]">
                    Optional
                  </span>
                </div>
                <h4 className="font-grotesque font-bold text-[16px] text-[#222325] mt-0.5">
                  Read the Trust & Safety guide
                </h4>
                <p className="text-[13px] text-[#62646A] mt-1 max-w-xl leading-relaxed">
                  Learn how to work securely with clients in Accra and across Ghana, handle deposits, maintain on-site etiquette, and protect your account.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
              {isGuideDone ? (
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#008744] bg-[#E8F8F0] px-3 py-1.5 rounded-[8px]">
                  <CheckCircle2 className="w-4 h-4" /> Completed
                </span>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setSkippedGuide(true)}
                    className="px-3.5 py-2 rounded-[8px] text-[13px] font-medium text-[#74767E] hover:text-[#222325] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
                  >
                    Skip
                  </button>
                  <button
                    type="button"
                    onClick={onReadGuide}
                    className="px-4 py-2 rounded-[8px] bg-[#18181B] hover:bg-[#27272A] text-white text-[13px] font-semibold transition-colors cursor-pointer shadow-xs"
                  >
                    Read guide
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Step 2: Create First Service */}
        <div
          className={`p-5 rounded-[12px] border transition-all ${
            serviceCompleted
              ? "border-[#E5E7EB] bg-[#F9FAFB]"
              : isGuideDone
              ? "border-[#18181B] bg-white shadow-xs"
              : "border-[#E5E7EB] bg-white"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div
                className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 ${
                  serviceCompleted
                    ? "bg-[#E8F8F0] text-[#008744]"
                    : "bg-[#18181B] text-white"
                }`}
              >
                {serviceCompleted ? (
                  <CheckCircle2 className="w-5 h-5 stroke-[2]" />
                ) : (
                  <PlusCircle className="w-5 h-5 stroke-[1.75]" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-bold uppercase tracking-wider text-[#74767E]">
                    Step 2
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#E8F8F0] text-[#008744]">
                    Recommended
                  </span>
                </div>
                <h4 className="font-grotesque font-bold text-[16px] text-[#222325] mt-0.5">
                  Create your first service
                </h4>
                <p className="text-[13px] text-[#62646A] mt-1 max-w-xl leading-relaxed">
                  List what you offer (e.g. plumbing repairs, residential deep cleaning, electrical wiring), outline your packages, and specify your pricing in GHS.
                </p>
              </div>
            </div>

            <div className="self-start sm:self-center shrink-0">
              {serviceCompleted ? (
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#008744] bg-[#E8F8F0] px-3 py-1.5 rounded-[8px]">
                  <CheckCircle2 className="w-4 h-4" /> Created
                </span>
              ) : (
                <button
                  type="button"
                  onClick={onCreateService}
                  className="px-4 py-2 rounded-[8px] bg-[#18181B] hover:bg-[#27272A] text-white text-[13px] font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  Create a service
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Step 3: Identity Verification (Ghana Card) */}
        {!serviceCompleted ? (
          <div className="p-5 rounded-[12px] border border-[#F3F4F6] bg-[#FAFAFA] opacity-75">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-[10px] bg-[#E5E7EB] text-[#74767E] flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <span className="text-[12px] font-bold uppercase tracking-wider text-[#A1A1AA]">
                    Step 3
                  </span>
                  <h4 className="font-grotesque font-bold text-[15px] text-[#71717A]">
                    Verify your identity (Ghana Card / ID)
                  </h4>
                  <p className="text-[13px] text-[#A1A1AA] mt-0.5 max-w-xl">
                    Submit official Ghanaian identification to get the trusted & verified provider badge. Unlocks after creating your first service.
                  </p>
                </div>
              </div>
              <span className="text-[12px] font-semibold text-[#A1A1AA] px-3 py-1 bg-[#F4F4F5] rounded-[6px] shrink-0">
                Locked
              </span>
            </div>
          </div>
        ) : (
          <div
            className={`p-5 rounded-[12px] border transition-all ${
              isIdentityDone
                ? "border-[#E5E7EB] bg-[#F9FAFB]"
                : "border-[#18181B] bg-white shadow-xs"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 ${
                    isIdentityDone
                      ? "bg-[#E8F8F0] text-[#008744]"
                      : isIdentityPending
                      ? "bg-[#FEF3C7] text-[#92400E]"
                      : "bg-[#18181B] text-white"
                  }`}
                >
                  {isIdentityDone ? (
                    <CheckCircle2 className="w-5 h-5 stroke-[2]" />
                  ) : isIdentityPending ? (
                    <Clock className="w-5 h-5 stroke-[1.75]" />
                  ) : (
                    <Shield className="w-5 h-5 stroke-[1.75]" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-bold uppercase tracking-wider text-[#74767E]">
                      Step 3
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#E8F8F0] text-[#008744]">
                      Trust & Safety
                    </span>
                  </div>
                  <h4 className="font-grotesque font-bold text-[16px] text-[#222325] mt-0.5">
                    Verify your identity (Ghana Card / ID)
                  </h4>
                  <p className="text-[13px] text-[#62646A] mt-1 max-w-xl leading-relaxed">
                    Submit official Ghanaian identification to get the verified provider badge and build trust with customers across Ghana.
                  </p>
                </div>
              </div>

              <div className="self-start sm:self-center shrink-0">
                {isIdentityDone ? (
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#008744] bg-[#E8F8F0] px-3 py-1.5 rounded-[8px]">
                    <CheckCircle2 className="w-4 h-4" /> Verified
                  </span>
                ) : isIdentityPending ? (
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#92400E] bg-[#FEF3C7] px-3 py-1.5 rounded-[8px]">
                    <Clock className="w-4 h-4" /> In Review
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={onVerifyIdentity}
                    className="px-4 py-2 rounded-[8px] bg-[#18181B] hover:bg-[#27272A] text-white text-[13px] font-semibold transition-colors cursor-pointer shadow-xs"
                  >
                    Verify identity
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Service Area & Working Hours */}
        {!serviceCompleted ? (
          <div className="p-5 rounded-[12px] border border-[#F3F4F6] bg-[#FAFAFA] opacity-75">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-[10px] bg-[#E5E7EB] text-[#74767E] flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <span className="text-[12px] font-bold uppercase tracking-wider text-[#A1A1AA]">
                    Step 4
                  </span>
                  <h4 className="font-grotesque font-bold text-[15px] text-[#71717A]">
                    Set service areas & working hours
                  </h4>
                  <p className="text-[13px] text-[#A1A1AA] mt-0.5 max-w-xl">
                    Choose specific neighborhoods in Greater Accra / Kumasi where you accept on-site jobs.
                  </p>
                </div>
              </div>
              <span className="text-[12px] font-semibold text-[#A1A1AA] px-3 py-1 bg-[#F4F4F5] rounded-[6px] shrink-0">
                Locked
              </span>
            </div>
          </div>
        ) : (
          <div
            className={`p-5 rounded-[12px] border transition-all ${
              areasHoursCompleted
                ? "border-[#E5E7EB] bg-[#F9FAFB]"
                : "border-[#18181B] bg-white shadow-xs"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 ${
                    areasHoursCompleted
                      ? "bg-[#E8F8F0] text-[#008744]"
                      : "bg-[#18181B] text-white"
                  }`}
                >
                  {areasHoursCompleted ? (
                    <CheckCircle2 className="w-5 h-5 stroke-[2]" />
                  ) : (
                    <MapPin className="w-5 h-5 stroke-[1.75]" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-bold uppercase tracking-wider text-[#74767E]">
                      Step 4
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#F3F4F6] text-[#4B5563]">
                      Location & Schedule
                    </span>
                  </div>
                  <h4 className="font-grotesque font-bold text-[16px] text-[#222325] mt-0.5">
                    Set service areas & working hours
                  </h4>
                  <p className="text-[13px] text-[#62646A] mt-1 max-w-xl leading-relaxed">
                    Choose specific neighborhoods in Greater Accra / Kumasi where you accept on-site jobs and state your working hours.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                {areasHoursCompleted ? (
                  <>
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#008744] bg-[#E8F8F0] px-3 py-1.5 rounded-[8px]">
                      <CheckCircle2 className="w-4 h-4" /> Configured
                    </span>
                    <button
                      type="button"
                      onClick={onSetAreasAndHours}
                      className="px-3 py-1.5 rounded-[8px] text-[12px] font-medium text-[#74767E] hover:text-[#222325] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={onSetAreasAndHours}
                    className="px-4 py-2 rounded-[8px] bg-[#18181B] hover:bg-[#27272A] text-white text-[13px] font-semibold transition-colors cursor-pointer shadow-xs"
                  >
                    Set areas & hours
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Publish Service & Go Live */}
        {!serviceCompleted ? (
          <div className="p-5 rounded-[12px] border border-[#F3F4F6] bg-[#FAFAFA] opacity-75">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-[10px] bg-[#E5E7EB] text-[#74767E] flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <span className="text-[12px] font-bold uppercase tracking-wider text-[#A1A1AA]">
                    Step 5
                  </span>
                  <h4 className="font-grotesque font-bold text-[15px] text-[#71717A]">
                    Publish service & go live
                  </h4>
                  <p className="text-[13px] text-[#A1A1AA] mt-0.5 max-w-xl">
                    Once your services and safety credentials are reviewed, your profile will be publicly searchable by customers.
                  </p>
                </div>
              </div>
              <span className="text-[12px] font-semibold text-[#A1A1AA] px-3 py-1 bg-[#F4F4F5] rounded-[6px] shrink-0">
                Locked
              </span>
            </div>
          </div>
        ) : (
          <div
            className={`p-5 rounded-[12px] border transition-all ${
              isPublished
                ? "border-[#E5E7EB] bg-[#F9FAFB]"
                : "border-[#008744] bg-white shadow-xs"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 ${
                    isPublished
                      ? "bg-[#E8F8F0] text-[#008744]"
                      : "bg-[#008744] text-white"
                  }`}
                >
                  {isPublished ? (
                    <CheckCircle2 className="w-5 h-5 stroke-[2]" />
                  ) : (
                    <Sparkles className="w-5 h-5 stroke-[1.75]" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-bold uppercase tracking-wider text-[#74767E]">
                      Step 5
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#E8F8F0] text-[#008744]">
                      Final Step
                    </span>
                  </div>
                  <h4 className="font-grotesque font-bold text-[16px] text-[#222325] mt-0.5">
                    Publish service & go live
                  </h4>
                  <p className="text-[13px] text-[#62646A] mt-1 max-w-xl leading-relaxed">
                    Make your services and safety credentials active so customers in Accra and across Ghana can find and hire you.
                  </p>
                </div>
              </div>

              <div className="self-start sm:self-center shrink-0">
                {isPublished ? (
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#008744] bg-[#E8F8F0] px-3 py-1.5 rounded-[8px]">
                    <CheckCircle2 className="w-4 h-4" /> Live & Published
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={onPublish}
                    className="px-4 py-2 rounded-[8px] bg-[#008744] hover:bg-[#007038] text-white text-[13px] font-semibold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    Publish & go live
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
