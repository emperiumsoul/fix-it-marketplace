"use client";

import * as React from "react";
import { Check } from "lucide-react";

export type PackageType = "regular" | "deep" | "moveout";

export interface ServicePackageComparisonProps {
  selectedPackage: PackageType;
  onSelectPackage: (pkg: PackageType) => void;
}

export function ServicePackageComparison({
  selectedPackage,
  onSelectPackage,
}: ServicePackageComparisonProps) {
  const rows = [
    {
      name: "Surface cleaning",
      regular: true,
      deep: true,
      moveout: true,
    },
    {
      name: "Vacuuming and mopping",
      regular: true,
      deep: true,
      moveout: true,
    },
    {
      name: "Kitchen and bathroom cleaning",
      regular: true,
      deep: true,
      moveout: true,
    },
    {
      name: "Detailed cleaning",
      regular: false,
      deep: true,
      moveout: true,
    },
    {
      name: "Empty-property cleaning",
      regular: false,
      deep: false,
      moveout: true,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-grotesque font-bold text-[20px] text-[#222325]">
        Compare packages
      </h3>

      <div className="overflow-x-auto rounded-[14px] border border-[#E5E7EB] bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
              <th className="py-4 px-4 sm:px-6 text-[13px] font-semibold text-[#62646A] w-2/5">
                Features
              </th>
              <th className="py-4 px-3 sm:px-4 text-center w-1/5">
                <div className="text-[13px] font-medium text-[#404145]">Regular Clean</div>
                <div className="font-grotesque font-bold text-[16px] sm:text-[18px] text-[#222325] mt-0.5">
                  GH₵150
                </div>
              </th>
              <th className="py-4 px-3 sm:px-4 text-center w-1/5">
                <div className="text-[13px] font-medium text-[#404145]">Deep Clean</div>
                <div className="font-grotesque font-bold text-[16px] sm:text-[18px] text-[#222325] mt-0.5">
                  GH₵300
                </div>
              </th>
              <th className="py-4 px-3 sm:px-4 text-center w-1/5">
                <div className="text-[13px] font-medium text-[#404145]">Move-out Clean</div>
                <div className="font-grotesque font-bold text-[16px] sm:text-[18px] text-[#222325] mt-0.5">
                  GH₵400
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F3F4F6] text-[13px] sm:text-[14px]">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#F9FAFB]/50 transition-colors">
                <td className="py-3.5 px-4 sm:px-6 font-medium text-[#222325]">
                  {row.name}
                </td>
                <td className="py-3.5 px-3 sm:px-4 text-center">
                  {row.regular ? (
                    <Check className="w-4 h-4 text-[#008744] mx-auto stroke-[2.5]" />
                  ) : (
                    <span className="text-[#9CA3AF] font-bold">—</span>
                  )}
                </td>
                <td className="py-3.5 px-3 sm:px-4 text-center">
                  {row.deep ? (
                    <Check className="w-4 h-4 text-[#008744] mx-auto stroke-[2.5]" />
                  ) : (
                    <span className="text-[#9CA3AF] font-bold">—</span>
                  )}
                </td>
                <td className="py-3.5 px-3 sm:px-4 text-center">
                  {row.moveout ? (
                    <Check className="w-4 h-4 text-[#008744] mx-auto stroke-[2.5]" />
                  ) : (
                    <span className="text-[#9CA3AF] font-bold">—</span>
                  )}
                </td>
              </tr>
            ))}
            {/* CTA row matching 5.png */}
            <tr className="bg-[#F9FAFB]/30">
              <td className="py-4 px-4 sm:px-6"></td>
              <td className="py-4 px-3 sm:px-4 text-center">
                <button
                  type="button"
                  onClick={() => onSelectPackage("regular")}
                  className={`w-full max-w-[120px] py-2 rounded-[6px] font-semibold text-[13px] transition-all cursor-pointer ${
                    selectedPackage === "regular"
                      ? "bg-[#0B3B24] text-white shadow-xs"
                      : "bg-[#222325] hover:bg-black text-white"
                  }`}
                >
                  {selectedPackage === "regular" ? "Selected" : "Select"}
                </button>
              </td>
              <td className="py-4 px-3 sm:px-4 text-center">
                <button
                  type="button"
                  onClick={() => onSelectPackage("deep")}
                  className={`w-full max-w-[120px] py-2 rounded-[6px] font-semibold text-[13px] transition-all cursor-pointer ${
                    selectedPackage === "deep"
                      ? "bg-[#0B3B24] text-white shadow-xs"
                      : "bg-[#222325] hover:bg-black text-white"
                  }`}
                >
                  {selectedPackage === "deep" ? "Selected" : "Select"}
                </button>
              </td>
              <td className="py-4 px-3 sm:px-4 text-center">
                <button
                  type="button"
                  onClick={() => onSelectPackage("moveout")}
                  className={`w-full max-w-[120px] py-2 rounded-[6px] font-semibold text-[13px] transition-all cursor-pointer ${
                    selectedPackage === "moveout"
                      ? "bg-[#0B3B24] text-white shadow-xs"
                      : "bg-[#222325] hover:bg-black text-white"
                  }`}
                >
                  {selectedPackage === "moveout" ? "Selected" : "Select"}
                </button>
              </td>
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
