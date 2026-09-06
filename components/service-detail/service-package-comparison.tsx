"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { ServicePackageData } from "./types";

export interface ServicePackageComparisonProps {
  packages?: ServicePackageData[];
  selectedPackageIndex: number;
  onSelectPackageIndex: (index: number) => void;
  currency?: string;
}

export function ServicePackageComparison({
  packages = [],
  selectedPackageIndex,
  onSelectPackageIndex,
  currency = "GH₵",
}: ServicePackageComparisonProps) {
  // If packages not provided or empty, provide standard 3-tier fallback
  const displayPackages =
    packages && packages.length > 0
      ? packages
      : [
          {
            name: "Regular Clean",
            price: 150,
            includedTasks: [
              "Surface cleaning",
              "Vacuuming and mopping",
              "Kitchen and bathroom cleaning",
            ],
          },
          {
            name: "Deep Clean",
            price: 300,
            includedTasks: [
              "Surface cleaning",
              "Vacuuming and mopping",
              "Kitchen and bathroom cleaning",
              "Detailed cleaning",
            ],
          },
          {
            name: "Move-out Clean",
            price: 400,
            includedTasks: [
              "Surface cleaning",
              "Vacuuming and mopping",
              "Kitchen and bathroom cleaning",
              "Detailed cleaning",
              "Empty-property cleaning",
            ],
          },
        ];

  // Collect unique tasks across all packages to build comparison rows
  const allTasks: string[] = [];
  displayPackages.forEach((pkg) => {
    (pkg.includedTasks || []).forEach((t) => {
      if (!allTasks.includes(t)) {
        allTasks.push(t);
      }
    });
  });

  // Ensure at least 4 feature rows exist for visual balance
  const defaultRowNames = [
    "Initial diagnostic / survey",
    "Standard labor & installation",
    "Comprehensive system testing",
    "Extended warranty check",
  ];
  const featureRows = allTasks.length > 0 ? allTasks.slice(0, 6) : defaultRowNames;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-grotesque font-bold text-[20px] text-[#222325]">
        Compare packages
      </h3>

      <div className="overflow-x-auto rounded-[14px] border border-[#E5E7EB] bg-white">
        <table className="w-full text-left border-collapse min-w-[540px]">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
              <th className="py-4 px-4 sm:px-6 text-[13px] font-semibold text-[#62646A] w-2/5">
                Features
              </th>
              {displayPackages.map((pkg, idx) => (
                <th key={idx} className="py-4 px-3 sm:px-4 text-center">
                  <div className="text-[13px] font-medium text-[#404145] line-clamp-1">
                    {pkg.name}
                  </div>
                  <div className="font-grotesque font-bold text-[16px] sm:text-[18px] text-[#222325] mt-0.5">
                    {currency}{pkg.price}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F3F4F6] text-[13px] sm:text-[14px]">
            {featureRows.map((taskName, rIdx) => (
              <tr key={rIdx} className="hover:bg-[#F9FAFB]/50 transition-colors">
                <td className="py-3.5 px-4 sm:px-6 font-medium text-[#222325]">
                  {taskName}
                </td>
                {displayPackages.map((pkg, pIdx) => {
                  const isIncluded =
                    pkg.includedTasks && pkg.includedTasks.length > 0
                      ? pkg.includedTasks.includes(taskName)
                      : pIdx >= rIdx % displayPackages.length;

                  return (
                    <td key={pIdx} className="py-3.5 px-3 sm:px-4 text-center">
                      {isIncluded ? (
                        <Check className="w-4 h-4 text-[#008744] mx-auto stroke-[2.5]" />
                      ) : (
                        <span className="text-[#9CA3AF] font-bold">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
            {/* CTA row matching 5.png */}
            <tr className="bg-[#F9FAFB]/30">
              <td className="py-4 px-4 sm:px-6"></td>
              {displayPackages.map((_, pIdx) => (
                <td key={pIdx} className="py-4 px-3 sm:px-4 text-center">
                  <button
                    type="button"
                    onClick={() => onSelectPackageIndex(pIdx)}
                    className={`w-full max-w-[120px] py-2 rounded-[6px] font-semibold text-[13px] transition-all cursor-pointer ${
                      selectedPackageIndex === pIdx
                        ? "bg-[#0B3B24] text-white shadow-xs"
                        : "bg-[#222325] hover:bg-black text-white"
                    }`}
                  >
                    {selectedPackageIndex === pIdx ? "Selected" : "Select"}
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-[12px] text-[#74767E] italic">
        Sample starting prices. Final quote depends on property size and scope.
      </p>
    </div>
  );
}
