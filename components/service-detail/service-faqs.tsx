"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const DEFAULT_FAQS: FAQItem[] = [
  {
    question: "What does regular cleaning include?",
    answer:
      "Regular cleaning includes dusting surfaces, vacuuming and mopping floors, kitchen countertops, sink and exterior appliance wipe-down, bathroom toilet, basin, mirror, shower wipe, and general bedroom tidying and trash removal.",
  },
  {
    question: "Do I need to provide cleaning supplies?",
    answer:
      "No. Our service providers bring their own eco-friendly detergents, microfiber cloths, mops, buckets, and standard equipment. If you prefer specific specialized products used on delicate surfaces, feel free to make them available.",
  },
  {
    question: "How do I choose a date and time?",
    answer:
      "You can select your preferred appointment date and time slot using the booking panel on this page. The provider will promptly review and confirm the schedule.",
  },
  {
    question: "Can I book recurring cleaning?",
    answer:
      "Yes! You can arrange weekly, bi-weekly, or monthly cleaning sessions with your provider directly or through regular booking requests on Fix it.",
  },
  {
    question: "Do I need to be home?",
    answer:
      "It is recommended to be present at the start of the service to grant access and walk through your priorities. You can either stay on-site or return for final inspection.",
  },
  {
    question: "How is the final price calculated?",
    answer:
      "The starting price covers standard properties for the selected package. Final quotes may adjust slightly based on the number of bedrooms, bathrooms, square footage, or optional extra requests.",
  },
];

export function ServiceFAQs({ faqs = DEFAULT_FAQS }: { faqs?: FAQItem[] }) {
  const [openIndices, setOpenIndices] = React.useState<number[]>([]);

  const toggleIndex = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-grotesque font-bold text-[20px] text-[#222325]">
        FAQs
      </h3>

      <div className="divide-y divide-[#E5E7EB] rounded-[14px] border border-[#E5E7EB] bg-white overflow-hidden">
        {faqs.map((faq, idx) => {
          const isOpen = openIndices.includes(idx);
          return (
            <div key={idx} className="transition-colors">
              <button
                type="button"
                onClick={() => toggleIndex(idx)}
                className="w-full flex items-center justify-between py-4 px-5 text-left hover:bg-[#F9FAFB] transition-colors cursor-pointer"
              >
                <span className="font-medium text-[14px] sm:text-[15px] text-[#222325]">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#74767E] transition-transform duration-200 shrink-0 ml-2 ${
                    isOpen ? "rotate-180 text-[#222325]" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-4 pt-1 text-[13px] sm:text-[14px] leading-relaxed text-[#62646A] bg-[#FAFAFA]/60 animate-in fade-in duration-150">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
