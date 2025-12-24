import { cn, inputContainerVariants } from "@/lib";
import type { InputHTMLAttributes, ChangeEvent } from "react";
import { useState } from "react";
import { type VariantProps } from "class-variance-authority";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface PasswordInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputContainerVariants> {
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  inputClassName?: string;
  ref?: React.Ref<HTMLInputElement>;
}

const PasswordInput = ({
  className,
  inputClassName,
  variant,
  helperText,
  errorMessage,
  successMessage,
  ref,
  onChange,
  ...props
}: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.length > 0);
    if (onChange) onChange(e);
  };

  const currentVariant = errorMessage
    ? "danger"
    : successMessage
      ? "success"
      : "default";

  return (
    <div className={cn("flex flex-col", className)}>
      <div className={cn(inputContainerVariants({ variant: currentVariant }))}>
        <input
          ref={ref}
          type={isVisible ? "text" : "password"}
          className={cn(
            "w-full border-none bg-transparent px-4 py-3 text-sm outline-none placeholder:text-neutral-400 disabled:cursor-not-allowed",
            inputClassName
          )}
          onChange={handleInputChange}
          {...props}
        />

        {hasValue && (
          <button
            type="button"
            onClick={toggleVisibility}
            className="pr-3 text-neutral-400 hover:text-neutral-600 focus:outline-none"
          >
            {isVisible ? (
              <EyeIcon className="h-5 w-5" />
            ) : (
              <EyeOffIcon className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {errorMessage && (
        <p className="text-danger mt-1 text-xs font-medium">*{errorMessage}</p>
      )}
      {!errorMessage && successMessage && (
        <p className="text-success mt-1 text-xs font-medium">
          *{successMessage}
        </p>
      )}
      {!errorMessage && !successMessage && helperText && (
        <p className="mt-1 text-xs font-medium text-neutral-400">
          *{helperText}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;
