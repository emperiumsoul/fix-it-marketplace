"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CategoryFAQsProps {
  categoryTitle?: string;
  faqs?: FAQItem[];
}

const DEFAULT_CLEANING_FAQS: FAQItem[] = [
  {
    question: "What does a standard cleaning include?",
    answer:
      "A standard cleaning includes sweeping, vacuuming, and mopping all floors, wiping down surfaces, dusting furniture, cleaning mirrors, emptying waste bins, sanitizing toilets and sinks, and washing kitchen countertops.",
  },
  {
    question: "How do I choose a cleaning professional?",
    answer:
      "Browse verified provider profiles on Fix it. Check their client feedback, confirmed booking history, verified Ghanaian trade badges, and service areas to find the best match for your neighbourhood.",
  },
  {
    question: "How much does home cleaning cost?",
    answer:
      "Routine apartment maintenance cleaning typically starts around GHS 180 to GHS 350. Full residential deep cleaning ranges from GHS 450 to GHS 1,200 depending on home size, number of bathrooms, and specialized requests.",
  },
  {
    question: "Do I need to provide cleaning supplies?",
    answer:
      "Most Fix it cleaning professionals bring their own commercial HEPA vacuums, microfiber mops, scrubbing brushes, and eco-friendly detergents. You only need to ensure water and electrical supply access.",
  },
  {
    question: "Can I book a regular cleaning service?",
    answer:
      "Yes! Providers offer weekly, bi-weekly, or monthly recurring schedules. You can coordinate your preferred days and even request the same assigned cleaner for ongoing continuity.",
  },
  {
    question: "How do I prepare for my cleaning appointment?",
    answer:
      "We recommend putting away sensitive personal documents and valuables, securing household pets, and tidying loose clutter from the floors so the cleaners can focus on deep scrubbing and sanitization.",
  },
];

export function CategoryFAQs({
  categoryTitle = "Cleaning",
  faqs,
}: CategoryFAQsProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const displayFaqs = faqs && faqs.length > 0 ? faqs : DEFAULT_CLEANING_FAQS;

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="w-full max-w-[860px] mx-auto px-4 sm:px-6 my-16">
      <h2 className="font-grotesque font-bold text-[24px] sm:text-[28px] text-[#222325] text-center mb-8">
        {categoryTitle} FAQs
      </h2>

      <div className="divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
        {displayFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={faq.question} className="py-4">
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                className="w-full flex items-center justify-between gap-4 text-left font-medium text-[15px] sm:text-[16px] text-[#222325] hover:text-[#008744] transition-colors cursor-pointer py-1"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#74767E] shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-[#008744]" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="mt-2.5 pr-6 text-[14px] leading-[22px] text-[#62646A] animate-in fade-in duration-150">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
