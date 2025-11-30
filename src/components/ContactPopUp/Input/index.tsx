import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, label, labelClassName, onFocus, onBlur, ...props },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const internalRef = React.useRef<HTMLInputElement>(null);
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;

    const hasValue = inputRef.current?.value?.trim() !== "";
    const isActive = isFocused || hasValue;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <div className="w-full relative">
        {label && (
          <motion.h1
            animate={{
              transform: isActive ? "translateY(-30px)" : "translateY(4px)",
              fontSize: isActive ? "120%" : "170%",
            }}
            className={cn(
              "absolute text-[3vh] text-left text-black pointer-events-none",
              labelClassName
            )}
          >
            {label}
          </motion.h1>
        )}
        <input
          type={type}
          className={cn(
            "h-[5.5vh] text-[2.5vh] bg-transparent outline-none border-opacity-30 border-b-[1px] border-separate focus:border-opacity-100 duration-200 border-black w-full",
            className
          )}
          ref={inputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
