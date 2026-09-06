"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { X, Check, FileText, ArrowRight } from "lucide-react";

export interface ProjectBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  "Plumbing & Pipe Repairs",
  "House & Office Cleaning",
  "Electrical Repairs & Wiring",
  "Painting & Wall Decorating",
  "Moving & Relocation",
  "Furniture Assembly",
  "Gardening & Landscaping",
  "Appliance & General Home Repairs",
];

export function ProjectBriefModal({ isOpen, onClose }: ProjectBriefModalProps) {
  const router = useRouter();
  const [category, setCategory] = React.useState(CATEGORIES[0]);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState("Accra");
  const [budget, setBudget] = React.useState("350");
  const [timeline, setTimeline] = React.useState("Within 48 hours");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [createdJobId, setCreatedJobId] = React.useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const jobId = `JB-${Math.floor(10000 + Math.random() * 90000)}`;
    setCreatedJobId(jobId);

    if (typeof window !== "undefined") {
      try {
        // Save to customer bookings list as a requested job
        const storedCustomerBookings = localStorage.getItem("fixit_customer_bookings");
        let customerList = storedCustomerBookings ? JSON.parse(storedCustomerBookings) : [];
        if (!Array.isArray(customerList)) customerList = [];

        const newBrief = {
          id: jobId,
          providerName: "Fix it Matching Network",
          providerInitial: "F",
          serviceTitle: title || category,
          serviceSlug: category.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          packageName: `Custom Project Brief: ${timeline}`,
          scope: description || `Client requested quote for ${category} in ${location}.`,
          price: parseInt(budget, 10) || 350,
          scheduledTime: timeline,
          address: `${location}, Ghana`,
          status: "requested" as const,
          paymentStatus: "unpaid" as const,
        };

        customerList = [newBrief, ...customerList];
        localStorage.setItem("fixit_customer_bookings", JSON.stringify(customerList));

        // Save to notifications
        const storedNotifs = localStorage.getItem("fixit_notifications");
        let notifs = storedNotifs ? JSON.parse(storedNotifs) : [];
        if (!Array.isArray(notifs)) notifs = [];
        notifs.unshift({
          id: `notif-${Date.now()}`,
          title: "Project Brief Published",
          description: `Your brief #${jobId} for "${title || category}" was distributed to verified providers in ${location}.`,
          timestamp: "Just now",
          read: false,
          type: "system",
          link: "/bookings",
        });
        localStorage.setItem("fixit_notifications", JSON.stringify(notifs));
      } catch (err) {
        console.error("Failed to save project brief", err);
      }
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleTrackJob = () => {
    onClose();
    router.push("/bookings");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[560px] bg-white rounded-[20px] shadow-2xl p-6 sm:p-8 text-[#222325] animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-[#74767E] hover:text-[#222325] hover:bg-[#F7F7F7] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-[#E8F8F0] text-[#008744] flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="font-grotesque font-bold text-[22px] text-[#222325]">
              Project Brief Published!
            </h3>
            <p className="text-[14px] text-[#62646A] mt-2 max-w-md mx-auto">
              Your brief <span className="font-semibold text-[#008744]">#{createdJobId}</span> has been dispatched to top-rated verified service providers in <span className="font-semibold text-[#222325]">{location}</span>.
            </p>

            <div className="mt-6 p-4 rounded-[12px] bg-[#F9FAFB] border border-[#E5E7EB] text-left text-[13px] space-y-2">
              <div className="flex justify-between">
                <span className="text-[#74767E]">Category:</span>
                <span className="font-semibold text-[#222325]">{category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#74767E]">Target Budget:</span>
                <span className="font-bold text-[#008744]">GH₵{budget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#74767E]">Timeline:</span>
                <span className="font-semibold text-[#222325]">{timeline}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#74767E]">Location:</span>
                <span className="font-semibold text-[#222325]">{location}, Ghana</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleTrackJob}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#008744] hover:bg-[#007038] text-white font-semibold text-[14px] rounded-[8px] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                Track in My Bookings <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#F7F7F7] hover:bg-[#E5E7EB] text-[#222325] font-semibold text-[14px] rounded-[8px] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-8 h-8 rounded-[8px] bg-[#E8F8F0] text-[#008744] flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-grotesque font-bold text-[20px] text-[#222325]">
                  Post a Project Brief
                </h3>
                <p className="text-[12px] text-[#74767E]">
                  Describe your job and receive custom proposals from verified local pros.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#222325] mb-1">
                Service Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] focus:outline-none focus:border-[#222325]"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#222325] mb-1">
                Project Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Repair 2 bathroom washbasins and clear kitchen drainage"
                className="w-full px-3 py-2 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#222325]"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#222325] mb-1">
                Job Details & Scope
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Include specific dimensions, materials required, and issues you are experiencing..."
                className="w-full px-3 py-2 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#222325]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[12px] font-semibold text-[#222325] mb-1">
                  Location in Ghana
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Accra, East Legon"
                  className="w-full px-3 py-2 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] focus:outline-none focus:border-[#222325]"
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#222325] mb-1">
                  Budget (GH₵)
                </label>
                <input
                  type="number"
                  required
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="350"
                  className="w-full px-3 py-2 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] focus:outline-none focus:border-[#222325]"
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#222325] mb-1">
                  Timing
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full px-3 py-2 rounded-[8px] border border-[#DADBDD] text-[13px] text-[#222325] focus:outline-none focus:border-[#222325]"
                >
                  <option value="Urgent (Today)">Urgent (Today)</option>
                  <option value="Within 48 hours">Within 48 hours</option>
                  <option value="This weekend">This weekend</option>
                  <option value="Flexible schedule">Flexible schedule</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#E5E7EB] mt-1">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-[13px] font-semibold text-[#62646A] hover:text-[#222325] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#008744] hover:bg-[#007038] text-white font-semibold text-[13px] rounded-[8px] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                {isSubmitting ? "Submitting..." : "Submit Project Brief"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
