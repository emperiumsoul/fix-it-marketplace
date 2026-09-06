import * as React from "react";
import { Briefcase, User } from "lucide-react";
import { Button } from "../ui/button";

export interface ProviderTaskCardProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export function ProviderTaskCard({
  title = "Showcase your work",
  description = "Add photos of past jobs to attract more clients.",
  actionText = "Add portfolio",
  onAction,
  className = "",
}: ProviderTaskCardProps) {
  return (
    <div
      className={`flex flex-col items-center text-center p-6 bg-white border border-[#DADBDD] rounded-[12px] gap-3 ${className}`.trim()}
    >
      <div className="w-12 h-12 rounded-full bg-[#F7F7F7] flex items-center justify-center text-[#222325]">
        <Briefcase className="w-6 h-6 stroke-[1.5]" />
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="font-grotesque font-bold text-[16px] leading-[22px] text-[#222325]">
          {title}
        </h4>
        <p className="text-[14px] leading-[20px] text-[#62646A] max-w-[240px]">
          {description}
        </p>
      </div>
      <div className="mt-2 w-full">
        <Button variant="secondary" fullWidth onClick={onAction}>
          {actionText}
        </Button>
      </div>
    </div>
  );
}

export interface ProviderProfileCardProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export function ProviderProfileCard({
  title = "Add display name",
  description = "Tell customers about yourself and your services.",
  actionText = "Add your services",
  onAction,
  className = "",
}: ProviderProfileCardProps) {
  return (
    <div
      className={`flex flex-col items-center text-center p-6 bg-white border border-[#DADBDD] rounded-[12px] gap-3 ${className}`.trim()}
    >
      <div className="w-12 h-12 rounded-full bg-[#E5E7EB] flex items-center justify-center text-[#74767E]">
        <User className="w-6 h-6 stroke-[1.5]" />
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="font-grotesque font-bold text-[16px] leading-[22px] text-[#222325]">
          {title}
        </h4>
        <p className="text-[14px] leading-[20px] text-[#62646A] max-w-[240px]">
          {description}
        </p>
      </div>
      <div className="mt-2 w-full">
        <Button variant="secondary" fullWidth onClick={onAction}>
          {actionText}
        </Button>
      </div>
    </div>
  );
}
