"use client";

import * as React from "react";
import { X, Shield, CheckCircle2, Upload, Clock, MapPin, CreditCard, AlertCircle, Loader2, Sparkles, Plus } from "lucide-react";

// ==========================================
// 1. Trust & Safety Guide Modal
// ==========================================
export interface SafetyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export function SafetyGuideModal({ isOpen, onClose, onComplete }: SafetyGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-[20px] shadow-2xl border border-[#E5E7EB] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#F3F4F6]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#E8F8F0] text-[#008744] flex items-center justify-center">
              <Shield className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h3 className="font-grotesque font-bold text-[18px] text-[#222325]">
                Fix it Ghana Trust & Safety Guide
              </h3>
              <p className="text-[12px] text-[#74767E]">
                Guidelines for trusted, secure service delivery
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F3F4F6] text-[#74767E] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-[14px] text-[#404145] leading-relaxed">
          <div className="p-4 rounded-[12px] bg-[#F9FAFB] border border-[#E5E7EB]">
            <h4 className="font-grotesque font-bold text-[15px] text-[#222325] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#18181B] text-white text-[11px] flex items-center justify-center">
                1
              </span>
              Identity & Transparent Credentials
            </h4>
            <p className="text-[13px] text-[#62646A] mt-1.5">
              Always maintain an authentic profile with your legal Ghanaian name and real portfolio photos. Misrepresenting qualifications or using other individuals&apos; identities violates Fix it marketplace standards.
            </p>
          </div>

          <div className="p-4 rounded-[12px] bg-[#F9FAFB] border border-[#E5E7EB]">
            <h4 className="font-grotesque font-bold text-[15px] text-[#222325] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#18181B] text-white text-[11px] flex items-center justify-center">
                2
              </span>
              On-Site Etiquette & Safety Protocols
            </h4>
            <p className="text-[13px] text-[#62646A] mt-1.5">
              Notify customers in advance if you are running late. Always carry necessary protective gear for plumbing, electrical, or construction tasks. Respect client property and privacy at all times.
            </p>
          </div>

          <div className="p-4 rounded-[12px] bg-[#F9FAFB] border border-[#E5E7EB]">
            <h4 className="font-grotesque font-bold text-[15px] text-[#222325] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#18181B] text-white text-[11px] flex items-center justify-center">
                3
              </span>
              Fair Pricing & Transparent Agreements
            </h4>
            <p className="text-[13px] text-[#62646A] mt-1.5">
              State scope and prices upfront in Ghana Cedis (GHS). If unforeseen repairs or replacement parts are needed on site, discuss and agree on additional material costs with the customer before purchasing.
            </p>
          </div>

          <div className="p-4 rounded-[12px] bg-[#F9FAFB] border border-[#E5E7EB]">
            <h4 className="font-grotesque font-bold text-[15px] text-[#222325] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#18181B] text-white text-[11px] flex items-center justify-center">
                4
              </span>
              Secure Payments & Communication
            </h4>
            <p className="text-[13px] text-[#62646A] mt-1.5">
              Keep job agreements, appointments, and scope recorded within Fix it messaging. Never solicit unauthorized upfront payments or ask customers to bypass verified marketplace processes.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#F3F4F6] bg-white">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-[14px] font-medium text-[#74767E] hover:text-[#222325] cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onComplete();
              onClose();
            }}
            className="px-5 py-2.5 rounded-[10px] bg-[#18181B] hover:bg-[#27272A] text-white text-[14px] font-semibold transition-colors cursor-pointer shadow-xs flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-[#008744]" />
            I understand and accept
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. Add Portfolio Modal
// ==========================================
export interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: { title: string; category: string; description: string; imageUrl: string }) => void;
}

export function PortfolioModal({ isOpen, onClose, onSave }: PortfolioModalProps) {
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("Plumbing");
  const [description, setDescription] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      title,
      category,
      description,
      imageUrl:
        imageUrl.trim() ||
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    });
    setTitle("");
    setDescription("");
    setImageUrl("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-[20px] shadow-2xl border border-[#E5E7EB] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#F3F4F6]">
          <h3 className="font-grotesque font-bold text-[18px] text-[#222325]">
            Add Portfolio Project
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F3F4F6] text-[#74767E] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[13px] font-semibold text-[#222325] mb-1.5">
              Project Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Complete bathroom pipe replacement in Cantonments"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-[10px] border border-[#DADBDD] text-[14px] text-[#222325] focus:outline-hidden focus:border-[#222325]"
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#222325] mb-1.5">
              Service Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-[10px] border border-[#DADBDD] text-[14px] text-[#222325] focus:outline-hidden focus:border-[#222325] bg-white"
            >
              <option value="Plumbing">Plumbing</option>
              <option value="House Cleaning">House Cleaning</option>
              <option value="Electrical Repairs">Electrical Repairs</option>
              <option value="Painting">Painting</option>
              <option value="Moving Services">Moving Services</option>
              <option value="Furniture Assembly">Furniture Assembly</option>
              <option value="Gardening & Lawn Care">Gardening & Lawn Care</option>
              <option value="Home Repairs">Home Repairs</option>
            </select>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#222325] mb-1.5">
              Photo URL (Optional)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-[10px] border border-[#DADBDD] text-[14px] text-[#222325] focus:outline-hidden focus:border-[#222325]"
              />
            </div>
            <p className="text-[12px] text-[#74767E] mt-1">
              Leave blank to use a default high-resolution demonstration photo.
            </p>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#222325] mb-1.5">
              Description of Work
            </label>
            <textarea
              rows={3}
              placeholder="Describe the problem, the tools and materials used, and the final result..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-[10px] border border-[#DADBDD] text-[14px] text-[#222325] focus:outline-hidden focus:border-[#222325]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F3F4F6]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[14px] font-medium text-[#74767E] hover:text-[#222325] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-[10px] bg-[#18181B] hover:bg-[#27272A] text-white text-[14px] font-semibold transition-colors cursor-pointer shadow-xs"
            >
              Save to Portfolio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 3. Create Service Modal
// ==========================================
export const GHANA_SERVICE_CATEGORIES = [
  { slug: "house-cleaning", title: "House Cleaning" },
  { slug: "plumbing", title: "Plumbing" },
  { slug: "electrical-repairs", title: "Electrical Repairs" },
  { slug: "painting-decorating", title: "Painting & Decorating" },
  { slug: "moving-relocation", title: "Moving & Relocation" },
  { slug: "furniture-assembly", title: "Furniture Assembly" },
  { slug: "gardening-landscaping", title: "Gardening & Landscaping" },
  { slug: "appliance-home-repairs", title: "Appliance & Home Repairs" },
];

export interface CreateServiceModalProps {
  isOpen: boolean;
  defaultCategorySlug?: string;
  onClose: () => void;
  onSave: (service: {
    title: string;
    category: string;
    categorySlug?: string;
    price: number;
    description: string;
    area: string;
  }) => void;
}

export function CreateServiceModal({
  isOpen,
  defaultCategorySlug = "house-cleaning",
  onClose,
  onSave,
}: CreateServiceModalProps) {
  const [title, setTitle] = React.useState("");
  const [selectedCategorySlug, setSelectedCategorySlug] = React.useState<string | null>(null);
  const [price, setPrice] = React.useState("150");
  const [area, setArea] = React.useState("Accra & Greater Accra");
  const [description, setDescription] = React.useState("");

  const activeCategorySlug = selectedCategorySlug ?? defaultCategorySlug;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const selectedCat =
      GHANA_SERVICE_CATEGORIES.find((c) => c.slug === activeCategorySlug) ||
      GHANA_SERVICE_CATEGORIES[0];
    onSave({
      title,
      category: selectedCat.title,
      categorySlug: selectedCat.slug,
      price: Number(price) || 150,
      description,
      area,
    });
    setTitle("");
    setDescription("");
    setSelectedCategorySlug(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-[20px] shadow-2xl border border-[#E5E7EB] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#F3F4F6]">
          <div>
            <h3 className="font-grotesque font-bold text-[18px] text-[#222325]">
              Create Your Service
            </h3>
            <p className="text-[12px] text-[#74767E]">
              Publish your trade to start receiving bookings across Ghana
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F3F4F6] text-[#74767E] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[13px] font-semibold text-[#222325] mb-1.5">
              Service Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Professional Residential Deep Cleaning"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-[10px] border border-[#DADBDD] text-[14px] text-[#222325] focus:outline-hidden focus:border-[#222325]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-semibold text-[#222325] mb-1.5">
                Category
              </label>
              <select
                value={activeCategorySlug}
                onChange={(e) => setSelectedCategorySlug(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-[10px] border border-[#DADBDD] text-[14px] text-[#222325] focus:outline-hidden focus:border-[#222325] bg-white cursor-pointer"
              >
                {GHANA_SERVICE_CATEGORIES.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#222325] mb-1.5">
                Starting Price (GHS) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] font-semibold text-[#74767E]">
                  GHS
                </span>
                <input
                  type="number"
                  required
                  min="20"
                  step="5"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full pl-13 pr-3.5 py-2.5 rounded-[10px] border border-[#DADBDD] text-[14px] text-[#222325] font-semibold focus:outline-hidden focus:border-[#222325]"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#222325] mb-1.5">
              Service Area in Ghana
            </label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="e.g., Accra, Osu, Cantonments, East Legon, Spintex"
              className="w-full px-3.5 py-2.5 rounded-[10px] border border-[#DADBDD] text-[14px] text-[#222325] focus:outline-hidden focus:border-[#222325]"
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#222325] mb-1.5">
              Service Summary & Included Tasks
            </label>
            <textarea
              rows={3}
              placeholder="List what tasks are included in this service and what tools/supplies you bring..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-[10px] border border-[#DADBDD] text-[14px] text-[#222325] focus:outline-hidden focus:border-[#222325]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F3F4F6]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[14px] font-medium text-[#74767E] hover:text-[#222325] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-[10px] bg-[#18181B] hover:bg-[#27272A] text-white text-[14px] font-semibold transition-colors cursor-pointer shadow-xs"
            >
              Create Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 4. Verify Identity Modal (Step 3)
// ==========================================
export interface VerifyIdentityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  currentStatus?: string;
}

export function VerifyIdentityModal({
  isOpen,
  onClose,
  onSuccess,
  currentStatus = 'unverified',
}: VerifyIdentityModalProps) {
  const [ghanaCardNumber, setGhanaCardNumber] = React.useState('');
  const [cardHolderName, setCardHolderName] = React.useState('');
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (PNG, JPG, WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to upload Ghana Card photo');
        setIsUploading(false);
        return;
      }

      setPreviewUrl(data.url);
    } catch (err) {
      console.error(err);
      setError('Error uploading image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ghanaCardNumber.trim()) {
      setError('Please enter your Ghana Card number');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/provider/verify-identity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ghanaCardNumber: ghanaCardNumber.trim(),
          cardHolderName: cardHolderName.trim(),
        }),
      });

      const resData = await res.json();
      if (!res.ok) {
        setError(resData.error || 'Verification submission failed');
        setIsSubmitting(false);
        return;
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setError('An error occurred submitting verification');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-[20px] shadow-2xl border border-[#E5E7EB] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#F3F4F6]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#E8F8F0] text-[#008744] flex items-center justify-center">
              <Shield className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-grotesque font-bold text-[18px] text-[#222325]">
                  Verify Your Identity
                </h3>
                {currentStatus === 'pending' && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E]">
                    In Review
                  </span>
                )}
              </div>
              <p className="text-[12px] text-[#74767E]">
                Ghana Card / National Identification Authority
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F3F4F6] text-[#74767E] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content & Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-[10px] bg-[#FEE2E2] border border-[#FCA5A5] text-[#991B1B] text-[13px] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="p-3.5 rounded-[10px] bg-[#F0FDF4] border border-[#BBF7D0] text-[13px] text-[#166534]">
            <p className="font-semibold flex items-center gap-1.5">
              <Shield className="w-4 h-4" /> Trusted Provider Badge
            </p>
            <p className="mt-1 text-[12px] text-[#15803D] leading-relaxed">
              Verifying your identity unlocks customer trust, boosts your ranking in marketplace search results, and enables fast payouts via Mobile Money.
            </p>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#222325] mb-1.5">
              Full Legal Name (as on Ghana Card) *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Kwame Mensah"
              value={cardHolderName}
              onChange={(e) => setCardHolderName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-[10px] border border-[#DADBDD] text-[14px] text-[#222325] focus:outline-hidden focus:border-[#222325]"
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#222325] mb-1.5">
              Ghana Card Pin Number (PIN) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#74767E]">
                <CreditCard className="w-4 h-4" />
              </span>
              <input
                type="text"
                required
                placeholder="GHA-712345678-9"
                value={ghanaCardNumber}
                onChange={(e) => setGhanaCardNumber(e.target.value.toUpperCase())}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-[10px] border border-[#DADBDD] text-[14px] text-[#222325] font-mono uppercase tracking-wider focus:outline-hidden focus:border-[#222325]"
              />
            </div>
            <p className="text-[11px] text-[#74767E] mt-1">
              Format: GHA-XXXXXXXXX-X issued by the National Identification Authority.
            </p>
          </div>

          {/* Photo of Ghana Card */}
          <div>
            <label className="block text-[13px] font-semibold text-[#222325] mb-1.5">
              Upload Front of Ghana Card (Optional)
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {previewUrl ? (
              <div className="relative w-full h-36 rounded-[12px] border border-[#E5E7EB] overflow-hidden bg-[#F9FAFB] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Ghana Card Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-2 right-2 px-3 py-1 rounded-[6px] bg-black/70 text-white text-[12px] font-semibold hover:bg-black transition-colors"
                >
                  Change Photo
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-6 rounded-[12px] border-2 border-dashed border-[#DADBDD] hover:border-[#18181B] bg-[#FAFAFA] flex flex-col items-center justify-center cursor-pointer transition-colors"
              >
                {isUploading ? (
                  <Loader2 className="w-6 h-6 text-[#74767E] animate-spin" />
                ) : (
                  <>
                    <Upload className="w-6 h-6 text-[#74767E] mb-1.5" />
                    <span className="text-[13px] font-medium text-[#222325]">
                      Click to upload Ghana Card photo
                    </span>
                    <span className="text-[11px] text-[#74767E] mt-0.5">
                      JPG, PNG or WebP up to 5MB
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F3F4F6]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[14px] font-medium text-[#74767E] hover:text-[#222325] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="px-5 py-2.5 rounded-[10px] bg-[#18181B] hover:bg-[#27272A] disabled:opacity-50 text-white text-[14px] font-semibold transition-colors cursor-pointer shadow-xs flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Submit for Verification'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 5. Service Areas & Hours Modal (Step 4)
// ==========================================
export interface ServiceAreasHoursModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialAreas?: string[];
  initialHours?: string;
}

const POPULAR_AREAS = [
  'Accra Central',
  'East Legon',
  'Cantonments',
  'Osu',
  'Airport Residential',
  'Spintex',
  'Tema',
  'Dzorwulu',
  'Labone',
  'Madina',
  'Kumasi Central',
  'Takoradi',
];

const PRESET_HOURS = [
  'Mon - Sat: 8:00 AM - 6:00 PM',
  'Mon - Fri: 8:00 AM - 5:00 PM',
  'Everyday: 7:00 AM - 8:00 PM',
  '24/7 Emergency & On-Demand Service',
];

export function ServiceAreasHoursModal({
  isOpen,
  onClose,
  onSuccess,
  initialAreas = ['Accra Central', 'East Legon'],
  initialHours = 'Mon - Sat: 8:00 AM - 6:00 PM',
}: ServiceAreasHoursModalProps) {
  const [selectedAreas, setSelectedAreas] = React.useState<string[]>(
    initialAreas.length > 0 ? initialAreas : ['Accra Central', 'East Legon']
  );
  const [customArea, setCustomArea] = React.useState('');
  const [availability, setAvailability] = React.useState(initialHours);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const toggleArea = (area: string) => {
    if (selectedAreas.includes(area)) {
      if (selectedAreas.length === 1) return; // keep at least one
      setSelectedAreas(selectedAreas.filter((a) => a !== area));
    } else {
      setSelectedAreas([...selectedAreas, area]);
    }
  };

  const handleAddCustomArea = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customArea.trim();
    if (trimmed && !selectedAreas.includes(trimmed)) {
      setSelectedAreas([...selectedAreas, trimmed]);
      setCustomArea('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAreas.length === 0) {
      setError('Please select at least one service location');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/provider/service-areas-hours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceAreas: selectedAreas,
          availability,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to update service areas');
        setIsSubmitting(false);
        return;
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setError('Error saving service areas');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-[20px] shadow-2xl border border-[#E5E7EB] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#F3F4F6]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#FEF3C7] text-[#92400E] flex items-center justify-center">
              <MapPin className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h3 className="font-grotesque font-bold text-[18px] text-[#222325]">
                Set Service Areas & Hours
              </h3>
              <p className="text-[12px] text-[#74767E]">
                Where and when you accept customer jobs in Ghana
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F3F4F6] text-[#74767E] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {error && (
            <div className="p-3 rounded-[10px] bg-[#FEE2E2] border border-[#FCA5A5] text-[#991B1B] text-[13px] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Area Selection */}
          <div>
            <label className="block text-[13px] font-semibold text-[#222325] mb-1.5">
              Service Neighborhoods & Cities ({selectedAreas.length} selected)
            </label>
            <p className="text-[12px] text-[#74767E] mb-2.5">
              Select neighborhoods in Greater Accra and Ghana where you can travel to client sites.
            </p>

            <div className="flex flex-wrap gap-2">
              {POPULAR_AREAS.map((area) => {
                const isSelected = selectedAreas.includes(area);
                return (
                  <button
                    key={area}
                    type="button"
                    onClick={() => toggleArea(area)}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#18181B] text-white shadow-xs'
                        : 'bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#008744]" />}
                    {area}
                  </button>
                );
              })}
            </div>

            {/* Add custom area */}
            <div className="flex gap-2 mt-3">
              <input
                type="text"
                placeholder="Add other neighborhood (e.g. Achimota, Dansoman)..."
                value={customArea}
                onChange={(e) => setCustomArea(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomArea(e);
                  }
                }}
                className="flex-1 px-3 py-2 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] focus:outline-hidden focus:border-[#222325]"
              />
              <button
                type="button"
                onClick={handleAddCustomArea}
                className="px-3.5 py-2 rounded-[8px] bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#222325] text-[13px] font-semibold transition-colors cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <label className="block text-[13px] font-semibold text-[#222325] mb-1.5">
              Working Hours / Availability
            </label>
            <div className="space-y-2 mb-3">
              {PRESET_HOURS.map((preset) => (
                <label
                  key={preset}
                  className={`flex items-center gap-2.5 p-3 rounded-[10px] border cursor-pointer transition-all ${
                    availability === preset
                      ? 'border-[#18181B] bg-[#F9FAFB]'
                      : 'border-[#E5E7EB] hover:bg-[#FAFAFA]'
                  }`}
                >
                  <input
                    type="radio"
                    name="availability"
                    checked={availability === preset}
                    onChange={() => setAvailability(preset)}
                    className="accent-[#18181B]"
                  />
                  <Clock className="w-4 h-4 text-[#74767E]" />
                  <span className="text-[13px] font-medium text-[#222325]">{preset}</span>
                </label>
              ))}
            </div>

            <input
              type="text"
              placeholder="Or enter custom schedule..."
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-[10px] border border-[#DADBDD] text-[13px] text-[#222325] focus:outline-hidden focus:border-[#222325]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F3F4F6]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[14px] font-medium text-[#74767E] hover:text-[#222325] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-[10px] bg-[#18181B] hover:bg-[#27272A] text-white text-[14px] font-semibold transition-colors cursor-pointer shadow-xs flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Areas & Hours'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 6. Publish Service Modal (Step 5)
// ==========================================
export interface PublishServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  hasService: boolean;
  isIdentityVerified: boolean;
  isAreasHoursSet: boolean;
}

export function PublishServiceModal({
  isOpen,
  onClose,
  onSuccess,
  hasService,
  isIdentityVerified,
  isAreasHoursSet,
}: PublishServiceModalProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handlePublish = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/provider/publish', {
        method: 'POST',
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to publish services');
        setIsSubmitting(false);
        return;
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setError('An error occurred during publishing');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-[20px] shadow-2xl border border-[#E5E7EB] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#F3F4F6]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#E8F8F0] text-[#008744] flex items-center justify-center">
              <Sparkles className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h3 className="font-grotesque font-bold text-[18px] text-[#222325]">
                Publish & Go Live
              </h3>
              <p className="text-[12px] text-[#74767E]">
                Make your service discoverable across Ghana
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F3F4F6] text-[#74767E] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-[10px] bg-[#FEE2E2] border border-[#FCA5A5] text-[#991B1B] text-[13px] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <p className="text-[14px] text-[#404145] leading-relaxed">
            You are about to launch your services live on Fix it Ghana. Customers in Accra and across the country will be able to discover your profile, compare packages, and request on-site bookings.
          </p>

          {/* Readiness Checklist */}
          <div className="p-4 rounded-[12px] bg-[#F9FAFB] border border-[#E5E7EB] space-y-2.5">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#74767E]">
              Profile Launch Checklist
            </h4>

            <div className="flex items-center justify-between text-[13px]">
              <span className="text-[#222325]">1. Service listing & packages</span>
              {hasService ? (
                <span className="inline-flex items-center gap-1 text-[#008744] font-semibold text-[12px]">
                  <CheckCircle2 className="w-4 h-4" /> Ready
                </span>
              ) : (
                <span className="text-[#DC2626] font-semibold text-[12px]">Required</span>
              )}
            </div>

            <div className="flex items-center justify-between text-[13px]">
              <span className="text-[#222325]">2. Service areas & working hours</span>
              {isAreasHoursSet ? (
                <span className="inline-flex items-center gap-1 text-[#008744] font-semibold text-[12px]">
                  <CheckCircle2 className="w-4 h-4" /> Configured
                </span>
              ) : (
                <span className="text-[#D97706] font-semibold text-[12px]">Recommended</span>
              )}
            </div>

            <div className="flex items-center justify-between text-[13px]">
              <span className="text-[#222325]">3. Ghana Card identity verification</span>
              {isIdentityVerified ? (
                <span className="inline-flex items-center gap-1 text-[#008744] font-semibold text-[12px]">
                  <CheckCircle2 className="w-4 h-4" /> Verified
                </span>
              ) : (
                <span className="text-[#74767E] text-[12px]">Optional (Badge pending)</span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F3F4F6]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[14px] font-medium text-[#74767E] hover:text-[#222325] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handlePublish}
              disabled={isSubmitting || !hasService}
              className="px-5 py-2.5 rounded-[10px] bg-[#008744] hover:bg-[#007038] disabled:opacity-50 text-white text-[14px] font-semibold transition-colors cursor-pointer shadow-xs flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Publish & Go Live
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

