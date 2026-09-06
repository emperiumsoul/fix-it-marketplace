"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { ServiceFAQData } from "./types";

export interface ServiceFAQsProps {
  faqs?: ServiceFAQData[];
  categoryTitle?: string;
}

export function ServiceFAQs({
  faqs = [],
  categoryTitle = "Cleaning",
}: ServiceFAQsProps) {
  const [openIndices, setOpenIndices] = React.useState<number[]>([0]);

  const defaultCategoryFAQs: ServiceFAQData[] = [
    {
      question: `What does standard ${categoryTitle.toLowerCase()} include?`,
      answer: `Our standard ${categoryTitle.toLowerCase()} package covers complete on-site diagnostic survey, standard labor, required consumables, and post-service testing to ensure high quality results.`,
    },
    {
      question: "Do I need to provide materials or tools?",
      answer:
        "No. Our verified professionals arrive fully equipped with professional-grade tools, safety gear, and standard materials. If specialized parts or fixtures are needed, they are agreed transparently in advance.",
    },
    {
      question: "How do I choose a date and time?",
      answer:
        "You can select your preferred date and time slot using the booking sidebar on this page. The provider will promptly review and confirm the schedule.",
    },
    {
      question: "Can I book recurring service?",
      answer:
        "Yes! Recurring maintenance plans (weekly, bi-weekly, or monthly) can be arranged directly with your provider after the initial booking.",
    },
    {
      question: "Do I need to be present during the work?",
      answer:
        "It is recommended to be present at the start of the service to grant access and walk through your priorities. You can either stay on-site or return for the final inspection.",
    },
    {
      question: "How is the final price calculated?",
      answer:
        "The starting price covers standard properties for the selected package. Final quotes may adjust slightly based on compound size, specific fixtures, or optional add-ons.",
    },
  ];

  const displayFaqs =
    faqs && faqs.length > 0 ? faqs : defaultCategoryFAQs;

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
        {displayFaqs.map((faq, idx) => {
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
