"use client";

import * as React from "react";
import { X, Shield, CheckCircle2 } from "lucide-react";

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
export interface CreateServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: {
    title: string;
    category: string;
    price: number;
    description: string;
    area: string;
  }) => void;
}

export function CreateServiceModal({ isOpen, onClose, onSave }: CreateServiceModalProps) {
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("House Cleaning");
  const [price, setPrice] = React.useState("150");
  const [area, setArea] = React.useState("Accra & Greater Accra");
  const [description, setDescription] = React.useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      title,
      category,
      price: Number(price) || 150,
      description,
      area,
    });
    setTitle("");
    setDescription("");
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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-[10px] border border-[#DADBDD] text-[14px] text-[#222325] focus:outline-hidden focus:border-[#222325] bg-white"
              >
                <option value="House Cleaning">House Cleaning</option>
                <option value="Plumbing">Plumbing</option>
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
