import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", icon, error, label, id, disabled, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[14px] leading-[20px] font-medium text-[#222325]"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {icon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[#74767E]">
              {icon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            className={`w-full h-[46px] rounded-[8px] border text-[14px] leading-[20px] text-[#222325] placeholder-[#74767E] transition-colors focus:outline-none ${
              icon ? "pl-11 pr-4" : "px-4"
            } ${
              disabled
                ? "bg-[#F7F7F7] border-[#DADBDD] text-[#74767E] cursor-not-allowed"
                : error
                ? "border-[#B42318] focus:border-[#B42318] focus:ring-1 focus:ring-[#B42318]"
                : "border-[#DADBDD] bg-white focus:border-[#003912] focus:ring-1 focus:ring-[#003912]"
            } ${className}`.trim()}
            {...props}
          />
        </div>
        {error && (
          <p className="text-[12px] leading-[16px] text-[#B42318] font-normal">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
