import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "text";
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium text-[14px] leading-[20px] rounded-[8px] h-[44px] px-4 transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

    const variantStyles = {
      primary: disabled
        ? "bg-[#DADBDD] text-[#74767E] cursor-not-allowed"
        : "bg-[#003912] text-white hover:bg-[#00280D] active:bg-[#00280D] focus-visible:ring-[#003912]",
      secondary: disabled
        ? "bg-[#FFFFFF] border border-[#DADBDD] text-[#74767E] cursor-not-allowed"
        : "bg-[#FFFFFF] border border-[#DADBDD] text-[#222325] hover:bg-[#F7F7F7] active:bg-[#ECECED] focus-visible:ring-[#003912]",
      text: disabled
        ? "text-[#74767E] cursor-not-allowed"
        : "text-[#222325] hover:underline focus-visible:ring-[#003912] p-0 h-auto",
    };

    const widthStyles = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`.trim()}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
