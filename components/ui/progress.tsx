import * as React from "react";
import { Clock, CheckCircle2 } from "lucide-react";

export interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  className?: string;
}

export function ProgressBar({
  current,
  total,
  label = "Profile completion",
  className = "",
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.round((current / total) * 100));

  return (
    <div className={`w-full flex flex-col gap-2 ${className}`.trim()}>
      <div className="flex items-center justify-between text-[14px] leading-[20px]">
        <span className="font-medium text-[#222325]">
          {label} · {current}/{total}
        </span>
        <span className="font-semibold text-[#222325]">{percentage}%</span>
      </div>
      <div className="w-full h-2.5 bg-[#E5E7EB] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#003912] transition-all duration-300 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export type BookingStatusType = "requested" | "confirmed" | "completed";

export interface BookingStatusPillProps {
  status: BookingStatusType;
  className?: string;
}

export function BookingStatusPill({
  status,
  className = "",
}: BookingStatusPillProps) {
  const config = {
    requested: {
      label: "Requested",
      icon: <Clock className="w-3.5 h-3.5 text-[#92400E]" />,
      styles: "bg-[#FEF3C7] text-[#92400E]",
    },
    confirmed: {
      label: "Confirmed",
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#166334]" />,
      styles: "bg-[#EBF7EE] text-[#166334]",
    },
    completed: {
      label: "Completed",
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#404145]" />,
      styles: "bg-[#F3F4F6] text-[#404145]",
    },
  };

  const item = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] leading-[16px] font-medium ${item.styles} ${className}`.trim()}
    >
      {item.icon}
      {item.label}
    </span>
  );
}
