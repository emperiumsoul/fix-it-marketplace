import * as React from "react";
import {
  Droplet,
  Sparkles,
  Star,
  ShieldCheck,
  Clock,
  MinusCircle,
} from "lucide-react";

export type BadgeVariant =
  | "plumbing"
  | "cleaning"
  | "new-provider"
  | "identity-verified"
  | "pending"
  | "unavailable"
  | "default";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  icon?: React.ReactNode;
}

export function Badge({
  variant = "default",
  icon,
  children,
  className = "",
  ...props
}: BadgeProps) {
  const getDefaultIcon = () => {
    if (icon) return icon;
    switch (variant) {
      case "plumbing":
        return <Droplet className="w-3.5 h-3.5 text-[#0284C7]" />;
      case "cleaning":
        return <Sparkles className="w-3.5 h-3.5 text-[#003912]" />;
      case "new-provider":
        return <Star className="w-3.5 h-3.5 fill-[#62646A] text-[#62646A]" />;
      case "identity-verified":
        return <ShieldCheck className="w-3.5 h-3.5 text-[#166334]" />;
      case "pending":
        return <Clock className="w-3.5 h-3.5 text-[#92400E]" />;
      case "unavailable":
        return <MinusCircle className="w-3.5 h-3.5 text-[#74767E]" />;
      default:
        return null;
    }
  };

  const variantStyles: Record<BadgeVariant, string> = {
    plumbing: "bg-[#E0F2FE] text-[#0369A1]",
    cleaning: "bg-[#F3FDF9] text-[#003912]",
    "new-provider": "bg-[#F3F4F6] text-[#404145]",
    "identity-verified": "bg-[#EBF7EE] text-[#166334]",
    pending: "bg-[#FEF3C7] text-[#92400E]",
    unavailable: "bg-[#F3F4F6] text-[#74767E]",
    default: "bg-[#F7F7F7] text-[#404145] border border-[#DADBDD]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] text-[12px] leading-[16px] font-medium select-none ${variantStyles[variant]} ${className}`.trim()}
      {...props}
    >
      {getDefaultIcon()}
      {children}
    </span>
  );
}
