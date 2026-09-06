import * as React from "react";
import { Info } from "lucide-react";

export interface CalloutProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function Callout({
  children,
  icon = <Info className="w-5 h-5 text-[#1D4EDB] shrink-0" />,
  className = "",
}: CalloutProps) {
  return (
    <div
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-[8px] bg-[#EFF6FF] border border-[#BFDBFE] text-[14px] leading-[20px] text-[#1E40AF] ${className}`.trim()}
    >
      {icon}
      <div className="flex-1">{children}</div>
    </div>
  );
}
