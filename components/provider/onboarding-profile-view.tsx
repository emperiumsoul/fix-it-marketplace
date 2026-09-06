"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  Camera,
  Edit2,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react";
import {
  WorkExperienceModal,
  WorkExperienceItem,
  EducationModal,
  EducationItem,
  CertificationModal,
  CertificationItem,
  EditBasicInfoModal,
} from "./profile-modals";

export function OnboardingProfileView() {
  const router = useRouter();
  const { user } = useUser();

  // Profile fields initialized with sensible defaults matching 6.png
  const [displayName, setDisplayName] = React.useState("Kingsley");
  const username = user?.username || (user?.firstName ? user.firstName.toLowerCase() : "ksoul1");
  const [headline, setHeadline] = React.useState("Home Cleaning Specialist");
  const [languages, setLanguages] = React.useState<string[]>(["English", "Twi"]);
  const locationName = "Ghana";

  // Skill experience levels
  const [skillLevels, setSkillLevels] = React.useState<Record<string, string>>({
    "House cleaning": "Intermediate",
    "Deep cleaning": "Set experience level",
    "Move-out cleaning": "Set experience level",
  });

  // Optional lists
  const [workExperiences, setWorkExperiences] = React.useState<WorkExperienceItem[]>([]);
  const [educations, setEducations] = React.useState<EducationItem[]>([]);
  const [certifications, setCertifications] = React.useState<CertificationItem[]>([]);

  // Modals state
  const [isEditBasicOpen, setIsEditBasicOpen] = React.useState(false);
  const [isWorkExpOpen, setIsWorkExpOpen] = React.useState(false);
  const [isEducationOpen, setIsEducationOpen] = React.useState(false);
  const [isCertificationOpen, setIsCertificationOpen] = React.useState(false);

  const [isSaving, setIsSaving] = React.useState(false);

  // Sync user first/last name if loaded
  React.useEffect(() => {
    if (user?.fullName) {
      setTimeout(() => setDisplayName(user.fullName!), 0);
    } else if (user?.firstName) {
      setTimeout(() => setDisplayName(user.firstName!), 0);
    }
  }, [user?.fullName, user?.firstName]);

  const handleSaveAndContinue = async () => {
    setIsSaving(true);
    try {
      if (user) {
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            role: "provider",
            onboardingStatus: "completed",
            providerProfile: {
              displayName,
              headline,
              languages,
              location: locationName,
              skillLevels,
              workExperiences,
              educations,
              certifications,
            },
          },
        });
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("fixit_role", "provider");
        localStorage.setItem(
          "fixit_provider_profile",
          JSON.stringify({
            displayName,
            headline,
            languages,
            location: locationName,
            skillLevels,
            workExperiences,
            educations,
            certifications,
          })
        );
      }

      router.push("/provider/dashboard");
    } catch (err) {
      console.error("Failed to update profile:", err);
      router.push("/provider/dashboard");
    } finally {
      setIsSaving(false);
    }
  };

  const cycleLevel = (skillName: string) => {
    const levels = ["Set experience level", "Beginner", "Intermediate", "Expert"];
    const current = skillLevels[skillName] || "Set experience level";
    const nextIdx = (levels.indexOf(current) + 1) % levels.length;
    setSkillLevels((prev) => ({
      ...prev,
      [skillName]: levels[nextIdx],
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] text-[#404145] font-satoshi selection:bg-[#F3FDF9] selection:text-[#003912]">
      {/* Top minimal header matching 6.png */}
      <header className="w-full bg-white border-b border-[#E5E7EB] h-[64px] flex items-center justify-between px-6 sm:px-10">
        <Link href="/" className="flex items-center gap-0.5">
          <span className="font-grotesque font-bold text-[24px] tracking-tight text-[#222325]">
            Fix it
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#008744] inline-block mb-1.5 ml-0.5" />
        </Link>

        <Link
          href="/"
          className="text-[14px] font-medium text-[#74767E] hover:text-[#222325] transition-colors"
        >
          Exit
        </Link>
      </header>

      {/* Main container */}
      <main className="flex-1 max-w-[840px] w-full mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Title and Subtitle matching 6.png */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="font-grotesque font-bold text-[30px] sm:text-[36px] text-[#222325] leading-tight">
            Review your new profile
          </h1>
          <p className="text-[14px] sm:text-[15px] text-[#62646A] mt-2">
            Add missing details to complete your profile. You can update it at any time.
          </p>
        </div>

        {/* Profile Card Container matching 6.png */}
        <div className="bg-white rounded-[20px] border border-[#E5E7EB] shadow-xs p-6 sm:p-10 flex flex-col gap-8">
          {/* Header Profile Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            {/* Avatar with Camera icon */}
            <div className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-full bg-[#D4D4D8] flex items-center justify-center shrink-0">
              <div className="w-12 h-12 rounded-full bg-[#A1A1AA] flex items-center justify-center text-white text-[24px] font-bold">
                {displayName.charAt(0).toUpperCase()}
              </div>

              <button
                type="button"
                onClick={() => alert("Photo upload: please select an image for your profile photo.")}
                aria-label="Upload profile photo"
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white border border-[#DADBDD] text-[#62646A] hover:text-[#222325] flex items-center justify-center shadow-xs transition-colors cursor-pointer"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Info Details */}
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditBasicOpen(true)}
                  className="font-grotesque font-bold text-[20px] sm:text-[22px] text-[#222325] hover:text-[#008744] flex items-center gap-2 cursor-pointer transition-colors text-left"
                >
                  <span>{displayName}</span>
                  <Edit2 className="w-4 h-4 text-[#74767E]" />
                </button>
                <span className="text-[14px] text-[#74767E]">
                  @{username}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsEditBasicOpen(true)}
                className="text-[14px] sm:text-[15px] text-[#404145] hover:text-[#008744] flex items-center gap-1.5 cursor-pointer text-left transition-colors"
              >
                <span>{headline}</span>
                <Edit2 className="w-3.5 h-3.5 text-[#74767E]" />
              </button>

              <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#62646A] pt-1">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#74767E]" />
                  <span>{locationName}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditBasicOpen(true)}
                  className="flex items-center gap-1 text-[#62646A] hover:text-[#222325] cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#74767E]" />
                  <span>{languages.join(", ")}</span>
                  <Edit2 className="w-3 h-3 text-[#74767E]" />
                </button>
              </div>
            </div>
          </div>

          {/* About Section Card matching 6.png */}
          <div className="rounded-[16px] border border-[#E5E7EB] p-6 bg-white flex flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-grotesque font-bold text-[18px] text-[#222325]">
                  About
                </h2>
                <p className="text-[13px] text-[#62646A] mt-0.5">
                  Share your cleaning experience, the services you offer, and the areas you cover.
                </p>
              </div>

              {/* Document with avatar illustration matching 6.png */}
              <div className="relative w-14 h-14 rounded-[12px] bg-[#F4F4F5] border border-[#E4E4E7] flex flex-col justify-center p-2 shadow-xs shrink-0">
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-4 h-4 rounded-full bg-[#008744] flex items-center justify-center text-white text-[8px] font-bold">
                    ✓
                  </div>
                  <div className="h-1 w-6 bg-[#D4D4D8] rounded-full" />
                </div>
                <div className="h-1 w-9 bg-[#E4E4E7] rounded-full mb-1" />
                <div className="h-1 w-7 bg-[#E4E4E7] rounded-full" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-[6px] bg-white border border-[#D4D4D8] flex items-center justify-center shadow-xs">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#10B981]" />
                </div>
              </div>
            </div>

            {/* 3 Skill Cards matching 6.png */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {["House cleaning", "Deep cleaning", "Move-out cleaning"].map((skill) => (
                <div
                  key={skill}
                  className="p-3.5 rounded-[12px] border border-[#E5E7EB] bg-white hover:border-[#DADBDD] transition-colors flex flex-col justify-between min-h-[84px]"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-semibold text-[14px] text-[#222325]">
                      {skill}
                    </span>
                    <button
                      type="button"
                      onClick={() => cycleLevel(skill)}
                      aria-label="Toggle options"
                      className="text-[#74767E] hover:text-[#222325] p-0.5 cursor-pointer"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => cycleLevel(skill)}
                    className="text-left text-[12px] text-[#74767E] hover:text-[#008744] font-medium transition-colors cursor-pointer mt-2"
                  >
                    {skillLevels[skill] || "Set experience level"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Work experience (Optional) matching 6.png */}
          <div className="rounded-[16px] border border-[#E5E7EB] p-6 bg-white flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-grotesque font-bold text-[18px] text-[#222325]">
                  Work experience <span className="font-normal text-[#74767E] text-[15px]">(Optional)</span>
                </h2>
                <p className="text-[13px] text-[#62646A] mt-0.5">
                  Add your previous cleaning work to help customers understand your experience.
                </p>
              </div>

              {/* Checklist illustration matching 6.png */}
              <div className="relative w-14 h-14 rounded-[12px] bg-[#F4F4F5] border border-[#E4E4E7] flex flex-col justify-center p-2.5 shadow-xs shrink-0">
                <div className="flex items-center gap-1 mb-1.5">
                  <div className="w-2.5 h-2.5 rounded-[2px] bg-[#A3E635]" />
                  <div className="h-1 w-6 bg-[#D4D4D8] rounded-full" />
                </div>
                <div className="flex items-center gap-1 mb-1.5">
                  <div className="w-2.5 h-2.5 rounded-[2px] bg-[#D4D4D8]" />
                  <div className="h-1 w-5 bg-[#D4D4D8] rounded-full" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-[2px] bg-[#D4D4D8]" />
                  <div className="h-1 w-6 bg-[#D4D4D8] rounded-full" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-[6px] bg-white border border-[#D4D4D8] flex items-center justify-center shadow-xs text-[#008744]">
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>
            </div>

            {/* Added list */}
            {workExperiences.length > 0 && (
              <div className="divide-y divide-[#F3F4F6] border-y border-[#F3F4F6] my-2">
                {workExperiences.map((item) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[14px] text-[#222325]">{item.title}</div>
                      <div className="text-[12px] text-[#74767E]">{item.company} · {item.years}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setWorkExperiences((prev) => prev.filter((w) => w.id !== item.id))}
                      className="text-[#9CA3AF] hover:text-[#E11D48] p-1 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div>
              <button
                type="button"
                onClick={() => setIsWorkExpOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#DADBDD] hover:border-[#222325] text-[13px] font-semibold text-[#222325] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add work experience</span>
              </button>
            </div>
          </div>

          {/* Bottom 2 Cards: Education & Certifications matching 6.png */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Education */}
            <div className="rounded-[16px] border border-[#E5E7EB] p-6 bg-white flex flex-col justify-between gap-4">
              <div>
                <h2 className="font-grotesque font-bold text-[17px] text-[#222325]">
                  Education <span className="font-normal text-[#74767E] text-[14px]">(Optional)</span>
                </h2>
                <p className="text-[13px] text-[#62646A] mt-1 leading-snug">
                  Add any education or training relevant to your work.
                </p>

                {educations.length > 0 && (
                  <div className="mt-3 divide-y divide-[#F3F4F6]">
                    {educations.map((item) => (
                      <div key={item.id} className="py-2 flex items-center justify-between text-[13px]">
                        <div>
                          <div className="font-semibold text-[#222325]">{item.degree}</div>
                          <div className="text-[11px] text-[#74767E]">{item.institution} ({item.year})</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEducations((prev) => prev.filter((e) => e.id !== item.id))}
                          className="text-[#9CA3AF] hover:text-[#E11D48] p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setIsEducationOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#DADBDD] hover:border-[#222325] text-[13px] font-semibold text-[#222325] transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add education</span>
                </button>
              </div>
            </div>

            {/* Certifications */}
            <div className="rounded-[16px] border border-[#E5E7EB] p-6 bg-white flex flex-col justify-between gap-4">
              <div>
                <h2 className="font-grotesque font-bold text-[17px] text-[#222325]">
                  Certifications <span className="font-normal text-[#74767E] text-[14px]">(Optional)</span>
                </h2>
                <p className="text-[13px] text-[#62646A] mt-1 leading-snug">
                  Add any cleaning, hygiene, or safety certifications you hold.
                </p>

                {certifications.length > 0 && (
                  <div className="mt-3 divide-y divide-[#F3F4F6]">
                    {certifications.map((item) => (
                      <div key={item.id} className="py-2 flex items-center justify-between text-[13px]">
                        <div>
                          <div className="font-semibold text-[#222325]">{item.name}</div>
                          <div className="text-[11px] text-[#74767E]">{item.issuer} ({item.year})</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setCertifications((prev) => prev.filter((c) => c.id !== item.id))}
                          className="text-[#9CA3AF] hover:text-[#E11D48] p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setIsCertificationOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#DADBDD] hover:border-[#222325] text-[13px] font-semibold text-[#222325] transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add certifications</span>
                </button>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex justify-end pt-4 border-t border-[#E5E7EB]">
            <button
              type="button"
              onClick={handleSaveAndContinue}
              disabled={isSaving}
              className="w-full sm:w-auto px-8 py-3 bg-[#222325] hover:bg-black disabled:opacity-50 text-white font-semibold text-[14px] rounded-[8px] transition-colors shadow-sm cursor-pointer"
            >
              {isSaving ? "Saving..." : "Save & Continue to Dashboard"}
            </button>
          </div>
        </div>
      </main>

      {/* Modals */}
      <EditBasicInfoModal
        isOpen={isEditBasicOpen}
        onClose={() => setIsEditBasicOpen(false)}
        initialName={displayName}
        initialHeadline={headline}
        initialLanguages={languages}
        onSave={(data) => {
          setDisplayName(data.displayName);
          setHeadline(data.headline);
          setLanguages(data.languages);
        }}
      />

      <WorkExperienceModal
        isOpen={isWorkExpOpen}
        onClose={() => setIsWorkExpOpen(false)}
        onSave={(item) => setWorkExperiences((prev) => [...prev, item])}
      />

      <EducationModal
        isOpen={isEducationOpen}
        onClose={() => setIsEducationOpen(false)}
        onSave={(item) => setEducations((prev) => [...prev, item])}
      />

      <CertificationModal
        isOpen={isCertificationOpen}
        onClose={() => setIsCertificationOpen(false)}
        onSave={(item) => setCertifications((prev) => [...prev, item])}
      />
    </div>
  );
}
