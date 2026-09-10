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

// Centralized Trade Configuration for all Fix it marketplace categories
export interface TradeConfig {
  id: string;
  label: string;
  noun: string;
  defaultHeadline: string;
  skills: string[];
  aboutDesc: string;
  workExpDesc: string;
  certDesc: string;
}

export const TRADE_CATALOG: Record<string, TradeConfig> = {
  plumbing: {
    id: "plumbing",
    label: "Plumbing",
    noun: "plumbing",
    defaultHeadline: "Plumbing",
    skills: [
      "Pipe installation & repair",
      "Drain clearing & unblocking",
      "Bathroom fixture fitting",
    ],
    aboutDesc:
      "Share your plumbing experience, the services you offer, and the areas you cover.",
    workExpDesc:
      "Add your previous plumbing work to help customers understand your experience.",
    certDesc:
      "Add any plumbing, safety, or technical certifications you hold.",
  },
  cleaning: {
    id: "cleaning",
    label: "House Cleaning",
    noun: "cleaning",
    defaultHeadline: "Home Cleaning Specialist",
    skills: ["House cleaning", "Deep cleaning", "Move-out cleaning"],
    aboutDesc:
      "Share your cleaning experience, the services you offer, and the areas you cover.",
    workExpDesc:
      "Add your previous cleaning work to help customers understand your experience.",
    certDesc:
      "Add any cleaning, hygiene, or safety certifications you hold.",
  },
  electrical: {
    id: "electrical",
    label: "Electrical Repairs",
    noun: "electrical",
    defaultHeadline: "Electrical Repairs",
    skills: [
      "Wiring & socket installation",
      "Circuit breaker & panel repair",
      "Lighting & appliance fitting",
    ],
    aboutDesc:
      "Share your electrical experience, the services you offer, and the areas you cover.",
    workExpDesc:
      "Add your previous electrical work to help customers understand your experience.",
    certDesc:
      "Add any electrical, energy commission, or safety certifications you hold.",
  },
  painting: {
    id: "painting",
    label: "Painting",
    noun: "painting",
    defaultHeadline: "Painting",
    skills: [
      "Interior wall painting",
      "Exterior painting & waterproofing",
      "Surface prep & crack filling",
    ],
    aboutDesc:
      "Share your painting experience, the services you offer, and the areas you cover.",
    workExpDesc:
      "Add your previous painting work to help customers understand your experience.",
    certDesc:
      "Add any painting, safety, or coating certifications you hold.",
  },
  moving: {
    id: "moving",
    label: "Moving Services",
    noun: "moving",
    defaultHeadline: "Moving Services",
    skills: [
      "Furniture packing & wrapping",
      "Loading & transport logistics",
      "Appliance handling & removal",
    ],
    aboutDesc:
      "Share your moving and relocation experience, the services you offer, and the areas you cover.",
    workExpDesc:
      "Add your previous moving and logistics work to help customers understand your experience.",
    certDesc:
      "Add any driving, cargo handling, or safety certifications you hold.",
  },
  furniture: {
    id: "furniture",
    label: "Furniture Assembly",
    noun: "furniture assembly",
    defaultHeadline: "Furniture Assembly",
    skills: [
      "Flat-pack furniture assembly",
      "Bed & wardrobe installation",
      "Custom shelf mounting & woodwork",
    ],
    aboutDesc:
      "Share your assembly and carpentry experience, the services you offer, and the areas you cover.",
    workExpDesc:
      "Add your previous assembly and woodwork experience to help customers.",
    certDesc:
      "Add any carpentry, joinery, or safety certifications you hold.",
  },
  gardening: {
    id: "gardening",
    label: "Gardening & Lawn Care",
    noun: "gardening",
    defaultHeadline: "Gardening & Lawn Care",
    skills: [
      "Lawn mowing & edge trimming",
      "Hedge pruning & flowerbed care",
      "Compound weed clearing & debris hauling",
    ],
    aboutDesc:
      "Share your gardening experience, the services you offer, and the areas you cover.",
    workExpDesc:
      "Add your previous landscaping and grounds maintenance work.",
    certDesc:
      "Add any horticulture, chemical safety, or equipment certifications you hold.",
  },
  repairs: {
    id: "repairs",
    label: "Home Repairs",
    noun: "home repair",
    defaultHeadline: "Home Repairs",
    skills: [
      "Door lock & hinge repair",
      "Wall patching & masonry fixes",
      "General fixtures & appliance mounting",
    ],
    aboutDesc:
      "Share your home repair experience, the services you offer, and the areas you cover.",
    workExpDesc:
      "Add your previous handyman and maintenance work to help customers.",
    certDesc:
      "Add any technical or safety certifications you hold.",
  },
};

export function detectTradeConfig(input: string): TradeConfig {
  const lower = (input || "").toLowerCase().trim();
  if (lower.includes("plumb")) return TRADE_CATALOG.plumbing;
  if (lower.includes("electr")) return TRADE_CATALOG.electrical;
  if (lower.includes("paint")) return TRADE_CATALOG.painting;
  if (lower.includes("mov")) return TRADE_CATALOG.moving;
  if (
    lower.includes("furn") ||
    lower.includes("carpent") ||
    lower.includes("assembl")
  )
    return TRADE_CATALOG.furniture;
  if (lower.includes("garden") || lower.includes("lawn"))
    return TRADE_CATALOG.gardening;
  if (lower.includes("repair") || lower.includes("handyman"))
    return TRADE_CATALOG.repairs;
  if (lower.includes("clean")) return TRADE_CATALOG.cleaning;

  // Fallback for custom trades
  const title = input.trim() || "Plumbing";
  return {
    id: "custom",
    label: title,
    noun: title.toLowerCase(),
    defaultHeadline: title,
    skills: [
      `${title} Installation & Setup`,
      `${title} Repairs & Troubleshooting`,
      `${title} Maintenance & Inspection`,
    ],
    aboutDesc: `Share your ${title.toLowerCase()} experience, the services you offer, and the areas you cover.`,
    workExpDesc: `Add your previous ${title.toLowerCase()} work to help customers understand your experience.`,
    certDesc: `Add any ${title.toLowerCase()}, technical, or safety certifications you hold.`,
  };
}

export function OnboardingProfileView() {
  const router = useRouter();
  const { user } = useUser();

  // Photo upload state
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [photoUrl, setPhotoUrl] = React.useState<string>("");
  const [photoAssetId, setPhotoAssetId] = React.useState<string>("");
  const [isUploadingPhoto, setIsUploadingPhoto] = React.useState<boolean>(false);

  // Initialize display name from user or empty
  const [displayName, setDisplayName] = React.useState<string>(() => {
    return user?.fullName || user?.firstName || "";
  });
  const username =
    user?.username || (user?.firstName ? user.firstName.toLowerCase() : "provider");

  // Headline defaults to empty until selected by provider
  const [headline, setHeadline] = React.useState<string>("");
  const [languages, setLanguages] = React.useState<string[]>([
    "English",
    "Twi",
  ]);
  const [phone, setPhone] = React.useState<string>("");
  const locationName = "Ghana";

  // Dynamic active trade config derived from headline
  const activeTrade = React.useMemo(
    () => detectTradeConfig(headline || "Home Repairs"),
    [headline]
  );

  // Skill experience levels mapped dynamically per active trade
  const [skillLevels, setSkillLevels] = React.useState<
    Record<string, string>
  >({});

  // Optional lists
  const [workExperiences, setWorkExperiences] = React.useState<
    WorkExperienceItem[]
  >([]);
  const [educations, setEducations] = React.useState<EducationItem[]>([]);
  const [certifications, setCertifications] = React.useState<
    CertificationItem[]
  >([]);

  // Modals state
  const [isEditBasicOpen, setIsEditBasicOpen] = React.useState(false);
  const [isWorkExpOpen, setIsWorkExpOpen] = React.useState(false);
  const [isEducationOpen, setIsEducationOpen] = React.useState(false);
  const [isCertificationOpen, setIsCertificationOpen] = React.useState(false);

  const [isSaving, setIsSaving] = React.useState(false);

  // Fetch real profile from Sanity on mount
  React.useEffect(() => {
    let isMounted = true;
    fetch("/api/provider/profile")
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted || !data?.profile) return;
        const p = data.profile;
        if (p.displayName) setDisplayName(p.displayName);
        if (p.headline) setHeadline(p.headline);
        if (p.phone) setPhone(p.phone);
        if (p.languages && p.languages.length > 0) setLanguages(p.languages);
        if (p.photoUrl) setPhotoUrl(p.photoUrl);
        if (p.expertise && Array.isArray(p.expertise)) {
          const map: Record<string, string> = {};
          p.expertise.forEach((s: string) => {
            map[s] = "Expert";
          });
          setSkillLevels(map);
        }
        if (Array.isArray(p.workExperience)) {
          setWorkExperiences(
            p.workExperience.map((w: { _key?: string; role?: string; company?: string; startDate?: string; description?: string }) => ({
              id: w._key || String(Math.random()),
              title: w.role || "",
              company: w.company || "",
              years: w.startDate || "",
              description: w.description || "",
            }))
          );
        }
        if (Array.isArray(p.education)) {
          setEducations(
            p.education.map((e: { _key?: string; degreeOrCertificate?: string; institution?: string; year?: string }) => ({
              id: e._key || String(Math.random()),
              degree: e.degreeOrCertificate || "",
              school: e.institution || "",
              year: e.year || "",
            }))
          );
        }
        if (Array.isArray(p.certifications)) {
          setCertifications(
            p.certifications.map((c: { _key?: string; title?: string; issuingOrganization?: string; issueDate?: string }) => ({
              id: c._key || String(Math.random()),
              name: c.title || "",
              issuer: c.issuingOrganization || "",
              year: c.issueDate || "",
            }))
          );
        }
      })
      .catch((err) => console.warn("Could not fetch Sanity profile:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload/image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.assetId) {
        setPhotoAssetId(data.assetId);
        setPhotoUrl(data.url);
      } else {
        alert(data.error || "Failed to upload image");
      }
    } catch (err) {
      console.error("Photo upload error:", err);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleSaveBasicInfo = (data: {
    displayName: string;
    headline: string;
    languages: string[];
    trade: string;
    phone?: string;
  }) => {
    const newHeadline = data.headline.trim() || data.trade;
    setDisplayName(data.displayName);
    setHeadline(newHeadline);
    setLanguages(data.languages);
    if (data.phone !== undefined) setPhone(data.phone);

    // Update skills to match the new trade
    const newConfig = detectTradeConfig(newHeadline);
    setSkillLevels((prev) => {
      const next: Record<string, string> = {};
      newConfig.skills.forEach((s) => {
        next[s] = prev[s] || "Beginner";
      });
      return next;
    });
  };

  const handleSaveAndContinue = async () => {
    if (!displayName.trim()) {
      alert("Please provide your Display Name.");
      setIsEditBasicOpen(true);
      return;
    }
    if (!headline.trim()) {
      alert("Please select your primary trade service.");
      setIsEditBasicOpen(true);
      return;
    }

    setIsSaving(true);
    try {
      const profileData = {
        displayName: displayName.trim(),
        headline: headline.trim(),
        phone: phone.trim() || undefined,
        primaryService: activeTrade.label,
        tradeCategory: activeTrade.id,
        languages,
        location: locationName,
        skillLevels,
        workExperiences,
        educations,
        certifications,
        photoAssetId: photoAssetId || undefined,
      };

      // 1. Sync directly to Sanity Studio via Server API Route
      try {
        const res = await fetch("/api/provider/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profileData),
        });
        if (!res.ok) {
          const errText = await res.text();
          console.error("Failed to sync provider profile to Sanity:", errText);
        }
      } catch (sanityErr) {
        console.error("Error calling /api/provider/profile:", sanityErr);
      }

      // 2. Update Clerk unsafeMetadata for client session state
      if (user) {
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            role: "provider",
            onboardingStatus: "completed",
            primaryService: activeTrade.label,
            providerProfile: {
              ...profileData,
              photoUrl: photoUrl || undefined,
            },
          },
        });
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("fixit_role", "provider");
        localStorage.setItem(
          "fixit_provider_profile",
          JSON.stringify({
            ...profileData,
            photoUrl: photoUrl || undefined,
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
    const levels = ["Beginner", "Intermediate", "Expert"];
    const current = skillLevels[skillName] || "Beginner";
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

      {/* Main Review Profile Card matching 6.png */}
      <main className="flex-1 max-w-[820px] w-full mx-auto px-4 sm:px-6 py-10 flex flex-col gap-8">
        {/* Page Title & Subtitle */}
        <div className="text-center">
          <h1 className="font-grotesque font-bold text-[32px] sm:text-[36px] tracking-tight text-[#222325]">
            Review your new profile
          </h1>
          <p className="text-[14px] text-[#62646A] mt-1.5">
            Add missing details to complete your profile. You can update it at any time.
          </p>
        </div>

        {/* Profile Card Container */}
        <div className="bg-white rounded-[24px] border border-[#E5E7EB] p-6 sm:p-10 shadow-xs flex flex-col gap-8">
          {/* Header row: Avatar + Name + Headline + Meta */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-[#F3F4F6]">
            {/* Avatar with Camera Overlay */}
            <div className="relative shrink-0">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={handlePhotoChange}
              />
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-[#D4D4D8] text-[#52525B] flex items-center justify-center font-bold text-[28px] overflow-hidden border-2 border-white shadow-xs">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={displayName || "Provider"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{displayName ? displayName.charAt(0).toUpperCase() : "P"}</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingPhoto}
                aria-label="Upload photo"
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white border border-[#E5E7EB] shadow-xs flex items-center justify-center text-[#404145] hover:bg-[#F3F4F6] cursor-pointer transition-colors"
              >
                {isUploadingPhoto ? (
                  <span className="w-3.5 h-3.5 border-2 border-[#008744] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Camera className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Profile Identifiers matching 6.png */}
            <div className="flex flex-col gap-1 w-full">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditBasicOpen(true)}
                  className="font-grotesque font-bold text-[20px] sm:text-[22px] text-[#222325] hover:text-[#008744] flex items-center gap-2 cursor-pointer transition-colors text-left"
                >
                  <span>{displayName || <span className="text-[#9CA3AF] italic">Enter your name</span>}</span>
                  <Edit2 className="w-4 h-4 text-[#74767E]" />
                </button>
                <span className="text-[14px] text-[#74767E]">
                  @{username}
                </span>
              </div>

              {/* Headline / Trade with Edit Icon */}
              <button
                type="button"
                onClick={() => setIsEditBasicOpen(true)}
                className="text-[14px] sm:text-[15px] text-[#404145] hover:text-[#008744] flex items-center gap-1.5 cursor-pointer text-left transition-colors font-medium"
              >
                <span>{headline || <span className="text-[#008744] font-semibold underline">+ Select your primary service & trade</span>}</span>
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

          {/* About Section Card matching 6.png - DYNAMIC BY TRADE */}
          <div className="rounded-[16px] border border-[#E5E7EB] p-6 bg-white flex flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-grotesque font-bold text-[18px] text-[#222325]">
                  About
                </h2>
                <p className="text-[13px] text-[#62646A] mt-0.5">
                  {activeTrade.aboutDesc}
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

            {/* 3 Skill Cards matching 6.png - DYNAMIC TRADE SKILLS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {activeTrade.skills.map((skill) => (
                <div
                  key={skill}
                  className="p-3.5 rounded-[12px] border border-[#E5E7EB] bg-white hover:border-[#222325] transition-colors flex flex-col justify-between min-h-[84px] group"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-semibold text-[14px] text-[#222325] leading-snug">
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
                    className="text-left text-[12px] text-[#74767E] group-hover:text-[#008744] font-medium transition-colors cursor-pointer mt-2"
                  >
                    {skillLevels[skill] || "Beginner"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience Section matching 6.png - DYNAMIC BY TRADE */}
          <div className="rounded-[16px] border border-[#E5E7EB] p-6 bg-white flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-grotesque font-bold text-[17px] text-[#222325]">
                  Work experience <span className="font-normal text-[#74767E] text-[14px]">(Optional)</span>
                </h2>
                <p className="text-[13px] text-[#62646A] mt-1 leading-snug">
                  {activeTrade.workExpDesc}
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

            {/* Certifications - DYNAMIC BY TRADE */}
            <div className="rounded-[16px] border border-[#E5E7EB] p-6 bg-white flex flex-col justify-between gap-4">
              <div>
                <h2 className="font-grotesque font-bold text-[17px] text-[#222325]">
                  Certifications <span className="font-normal text-[#74767E] text-[14px]">(Optional)</span>
                </h2>
                <p className="text-[13px] text-[#62646A] mt-1 leading-snug">
                  {activeTrade.certDesc}
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

          {/* Action Button: Save & Continue to Dashboard matching 6.png */}
          <div className="flex justify-end pt-4 border-t border-[#F3F4F6]">
            <button
              type="button"
              onClick={handleSaveAndContinue}
              disabled={isSaving}
              className="px-6 py-3 rounded-[10px] bg-[#222325] hover:bg-black text-white font-semibold text-[14px] transition-all duration-150 shadow-sm cursor-pointer disabled:opacity-50"
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
        initialPhone={phone}
        onSave={handleSaveBasicInfo}
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
