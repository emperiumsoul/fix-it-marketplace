"use client";

import * as React from "react";
import { Briefcase, ChevronDown } from "lucide-react";

export interface ProfileStrengthCardProps {
  onAddPortfolio?: () => void;
  hasPortfolio?: boolean;
}

export function ProfileStrengthCard({ onAddPortfolio, hasPortfolio = false }: ProfileStrengthCardProps) {
  const [showAllItems, setShowAllItems] = React.useState(false);

  const checklistItems = [
    { title: "Add professional bio", done: true },
    { title: "Set primary trade & skills", done: true },
    { title: "Set work location & areas", done: true },
    { title: "Specify spoken languages", done: true },
    { title: "Add profile picture", done: true },
    { title: "Add work experience", done: true },
    { title: "Set weekly availability", done: true },
    { title: "Add portfolio items", done: hasPortfolio },
    { title: "Add certifications / licenses", done: false },
    { title: "Verify identity documents", done: false },
    { title: "Publish first service", done: false },
    { title: "Set payout mobile money account", done: false },
  ];

  const score = hasPortfolio ? 8 : 7;

  return (
    <div className="w-full bg-white rounded-[16px] border border-[#E5E7EB] p-6 shadow-xs flex flex-col gap-4">
      {/* Title & 7 / 12 Counter matching 7.png */}
      <div className="flex items-center justify-between">
        <h3 className="font-grotesque font-bold text-[20px] text-[#222325]">
          Profile Strength
        </h3>
        <span className="font-grotesque font-bold text-[20px] text-[#222325]">
          {score} <span className="font-normal text-[#74767E] text-[16px]">/ 12</span>
        </span>
      </div>

      <p className="text-[13px] sm:text-[14px] text-[#62646A] -mt-2">
        Complete your profile so customers can learn about your skills and services.
      </p>

      {/* Progress Bar */}
      <div className="w-full h-2.5 bg-[#E5E7EB] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#18181B] rounded-full transition-all duration-500"
          style={{ width: `${(score / 12) * 100}%` }}
        />
      </div>

      {/* Action Item Box: Showcase your work matching 7.png */}
      <div className="p-4 sm:p-5 rounded-[12px] border border-[#E5E7EB] bg-[#FAFAFA] flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-[10px] bg-white border border-[#E5E7EB] text-[#222325] flex items-center justify-center shrink-0 shadow-xs">
            <Briefcase className="w-5 h-5 stroke-[1.75]" />
          </div>
          <div>
            <h4 className="font-grotesque font-bold text-[15px] text-[#222325]">
              Showcase your work
            </h4>
            <p className="text-[13px] text-[#62646A] mt-0.5">
              Add photos of completed jobs so customers can see what you offer.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onAddPortfolio}
          className="self-start sm:self-auto px-4 py-2 rounded-[8px] border border-[#DADBDD] bg-white hover:bg-[#F9FAFB] hover:border-[#222325] text-[13px] font-semibold text-[#222325] transition-colors shadow-xs cursor-pointer shrink-0"
        >
          Add portfolio
        </button>
      </div>

      {/* Show all (5) Toggle */}
      <div>
        <button
          type="button"
          onClick={() => setShowAllItems(!showAllItems)}
          className="text-[13px] font-semibold text-[#222325] hover:text-[#008744] transition-colors cursor-pointer flex items-center gap-1"
        >
          <span>{showAllItems ? "Hide remaining items" : "Show all (5)"}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showAllItems ? "rotate-180" : ""}`} />
        </button>

        {showAllItems && (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-[#F3F4F6] text-[13px]">
            {checklistItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[#404145]">
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    item.done ? "bg-[#E8F8F0] text-[#008744]" : "border border-[#D4D4D8] text-transparent"
                  }`}
                >
                  ✓
                </span>
                <span className={item.done ? "line-through text-[#74767E]" : "font-medium"}>
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
