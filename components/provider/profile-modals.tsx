"use client";

import * as React from "react";
import { X, Briefcase, GraduationCap, Award } from "lucide-react";

// 1. Work Experience Modal
export interface WorkExperienceItem {
  id: string;
  title: string;
  company: string;
  years: string;
  description?: string;
}

export function WorkExperienceModal({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: WorkExperienceItem) => void;
}) {
  const [title, setTitle] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [years, setYears] = React.useState("");
  const [description, setDescription] = React.useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !company.trim()) return;
    onSave({
      id: Date.now().toString(),
      title: title.trim(),
      company: company.trim(),
      years: years.trim() || "1-2 years",
      description: description.trim(),
    });
    setTitle("");
    setCompany("");
    setYears("");
    setDescription("");
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[500px] bg-white rounded-[20px] shadow-2xl p-6 sm:p-8 text-[#222325] animate-in zoom-in-95 duration-200"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-[#74767E] hover:text-[#222325] hover:bg-[#F7F7F7] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-[#E8F8F0] text-[#008744] flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-grotesque font-bold text-[20px] text-[#222325]">
              Add Work Experience
            </h3>
            <p className="text-[13px] text-[#62646A]">
              Help customers understand your hands-on background.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-[13px] font-semibold text-[#222325] mb-1">
              Role or Job Title <span className="text-[#E11D48]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Lead Residential Cleaner, Maintenance Tech"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-[40px] px-3 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] focus:outline-none focus:border-[#222325]"
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#222325] mb-1">
              Company or Client Type <span className="text-[#E11D48]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Self-employed, CleanCorp Ghana, Facility Management"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full h-[40px] px-3 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] focus:outline-none focus:border-[#222325]"
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#222325] mb-1">
              Duration / Years
            </label>
            <input
              type="text"
              placeholder="e.g. 2021 - Present (3 years)"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full h-[40px] px-3 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] focus:outline-none focus:border-[#222325]"
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#222325] mb-1">
              Short Description (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Key responsibilities, types of properties handled, equipment used..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] focus:outline-none focus:border-[#222325]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-[8px] border border-[#DADBDD] text-[13px] font-medium text-[#404145] hover:bg-[#F7F7F7] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#222325] hover:bg-black text-white font-semibold text-[13px] rounded-[8px] transition-colors cursor-pointer"
            >
              Add Experience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 2. Education Modal
export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  year?: string;
}

export function EducationModal({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: EducationItem) => void;
}) {
  const [degree, setDegree] = React.useState("");
  const [institution, setInstitution] = React.useState("");
  const [year, setYear] = React.useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!degree.trim() || !institution.trim()) return;
    onSave({
      id: Date.now().toString(),
      degree: degree.trim(),
      institution: institution.trim(),
      year: year.trim() || "Completed",
    });
    setDegree("");
    setInstitution("");
    setYear("");
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[480px] bg-white rounded-[20px] shadow-2xl p-6 sm:p-8 text-[#222325] animate-in zoom-in-95 duration-200"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-[#74767E] hover:text-[#222325] hover:bg-[#F7F7F7] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-[#E8F8F0] text-[#008744] flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-grotesque font-bold text-[20px] text-[#222325]">
              Add Education
            </h3>
            <p className="text-[13px] text-[#62646A]">
              Add vocational training, diplomas, or degrees.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-[13px] font-semibold text-[#222325] mb-1">
              Certificate / Degree / Field of Study <span className="text-[#E11D48]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Technical Certificate in Facility Hygiene"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="w-full h-[40px] px-3 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] focus:outline-none focus:border-[#222325]"
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#222325] mb-1">
              Institution / School <span className="text-[#E11D48]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Accra Technical Training Centre (ATTC)"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="w-full h-[40px] px-3 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] focus:outline-none focus:border-[#222325]"
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#222325] mb-1">
              Year of Completion
            </label>
            <input
              type="text"
              placeholder="e.g. 2022"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full h-[40px] px-3 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] focus:outline-none focus:border-[#222325]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-[8px] border border-[#DADBDD] text-[13px] font-medium text-[#404145] hover:bg-[#F7F7F7] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#222325] hover:bg-black text-white font-semibold text-[13px] rounded-[8px] transition-colors cursor-pointer"
            >
              Add Education
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 3. Certification Modal
export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  year?: string;
}

export function CertificationModal({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: CertificationItem) => void;
}) {
  const [name, setName] = React.useState("");
  const [issuer, setIssuer] = React.useState("");
  const [year, setYear] = React.useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !issuer.trim()) return;
    onSave({
      id: Date.now().toString(),
      name: name.trim(),
      issuer: issuer.trim(),
      year: year.trim() || "Active",
    });
    setName("");
    setIssuer("");
    setYear("");
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[480px] bg-white rounded-[20px] shadow-2xl p-6 sm:p-8 text-[#222325] animate-in zoom-in-95 duration-200"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-[#74767E] hover:text-[#222325] hover:bg-[#F7F7F7] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-[#E8F8F0] text-[#008744] flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-grotesque font-bold text-[20px] text-[#222325]">
              Add Certification
            </h3>
            <p className="text-[13px] text-[#62646A]">
              Add professional safety, trade, or hygiene licenses.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-[13px] font-semibold text-[#222325] mb-1">
              Certification Name <span className="text-[#E11D48]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Certified Professional Cleaner (CPC), OSHA Safety"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-[40px] px-3 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] focus:outline-none focus:border-[#222325]"
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#222325] mb-1">
              Issuing Organization <span className="text-[#E11D48]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ghana Environmental Protection Agency (EPA)"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              className="w-full h-[40px] px-3 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] focus:outline-none focus:border-[#222325]"
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#222325] mb-1">
              Issue Year / License Status
            </label>
            <input
              type="text"
              placeholder="e.g. 2023 (Valid through 2026)"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full h-[40px] px-3 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] focus:outline-none focus:border-[#222325]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-[8px] border border-[#DADBDD] text-[13px] font-medium text-[#404145] hover:bg-[#F7F7F7] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#222325] hover:bg-black text-white font-semibold text-[13px] rounded-[8px] transition-colors cursor-pointer"
            >
              Add Certification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 4. Edit Basic Info Modal
export function EditBasicInfoModal({
  isOpen,
  onClose,
  initialName,
  initialHeadline,
  initialLanguages,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialName: string;
  initialHeadline: string;
  initialLanguages: string[];
  onSave: (data: { displayName: string; headline: string; languages: string[]; trade: string }) => void;
}) {
  if (!isOpen) return null;

  return (
    <EditBasicInfoForm
      onClose={onClose}
      initialName={initialName}
      initialHeadline={initialHeadline}
      initialLanguages={initialLanguages}
      onSave={onSave}
    />
  );
}

const TRADE_CATEGORIES = [
  "Plumbing",
  "House Cleaning",
  "Electrical Repairs",
  "Painting",
  "Moving Services",
  "Furniture Assembly",
  "Gardening & Lawn Care",
  "Home Repairs",
];

function EditBasicInfoForm({
  onClose,
  initialName,
  initialHeadline,
  initialLanguages,
  onSave,
}: {
  onClose: () => void;
  initialName: string;
  initialHeadline: string;
  initialLanguages: string[];
  onSave: (data: { displayName: string; headline: string; languages: string[]; trade: string }) => void;
}) {
  const [displayName, setDisplayName] = React.useState(initialName);
  const [trade, setTrade] = React.useState(() => {
    const lower = (initialHeadline || "").toLowerCase();
    if (lower.includes("plumb")) return "Plumbing";
    if (lower.includes("electr")) return "Electrical Repairs";
    if (lower.includes("paint")) return "Painting";
    if (lower.includes("mov")) return "Moving Services";
    if (lower.includes("furn") || lower.includes("carpent") || lower.includes("assembl")) return "Furniture Assembly";
    if (lower.includes("garden") || lower.includes("lawn")) return "Gardening & Lawn Care";
    if (lower.includes("repair") || lower.includes("handyman")) return "Home Repairs";
    if (lower.includes("clean")) return "House Cleaning";
    return "Plumbing";
  });
  const [headline, setHeadline] = React.useState(initialHeadline);
  const [langInput, setLangInput] = React.useState(initialLanguages.join(", "));

  const handleTradeSelect = (selected: string) => {
    setTrade(selected);
    setHeadline(selected);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const langs = langInput
      .split(",")
      .map((l) => l.trim())
      .filter(Boolean);
    onSave({
      displayName: displayName.trim() || "Add display name",
      headline: headline.trim() || trade,
      languages: langs.length > 0 ? langs : ["English", "Twi"],
      trade,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[480px] bg-white rounded-[20px] shadow-2xl p-6 sm:p-8 text-[#222325] animate-in zoom-in-95 duration-200"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-[#74767E] hover:text-[#222325] hover:bg-[#F7F7F7] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-grotesque font-bold text-[20px] text-[#222325] mb-1">
          Edit Profile Information
        </h3>
        <p className="text-[13px] text-[#62646A] mb-5">
          Update how your name, primary trade, and professional title appear to customers.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-[13px] font-semibold text-[#222325] mb-1">
              Display Name
            </label>
            <input
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full h-[40px] px-3 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] focus:outline-none focus:border-[#222325]"
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#222325] mb-1">
              Primary Trade / Service Category *
            </label>
            <select
              value={trade}
              onChange={(e) => handleTradeSelect(e.target.value)}
              className="w-full h-[40px] px-3 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] bg-white focus:outline-none focus:border-[#222325]"
            >
              {TRADE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-[#74767E] mt-1">
              Changing your trade automatically aligns your onboarding skills and descriptions.
            </p>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#222325] mb-1">
              Professional Headline / Trade Title
            </label>
            <input
              type="text"
              required
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. Plumbing, Master Electrician, Deep Cleaning Pro"
              className="w-full h-[40px] px-3 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] focus:outline-none focus:border-[#222325]"
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#222325] mb-1">
              Languages (comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. English, Twi, Ga, Ewe"
              value={langInput}
              onChange={(e) => setLangInput(e.target.value)}
              className="w-full h-[40px] px-3 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] focus:outline-none focus:border-[#222325]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-[8px] border border-[#DADBDD] text-[13px] font-medium text-[#404145] hover:bg-[#F7F7F7] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#222325] hover:bg-black text-white font-semibold text-[13px] rounded-[8px] transition-colors cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
