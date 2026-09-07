"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

import { getCategoryPreset } from "./category-data-presets";

export interface CategoryFAQsProps {
  categoryTitle?: string;
  categorySlug?: string;
  faqs?: FAQItem[];
}



export function CategoryFAQs({
  categoryTitle = "Cleaning",
  categorySlug = "cleaning",
  faqs,
}: CategoryFAQsProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const preset = React.useMemo(
    () => getCategoryPreset(categorySlug || categoryTitle),
    [categorySlug, categoryTitle]
  );
  const displayFaqs = faqs && faqs.length > 0 ? faqs : preset.faqs;

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
