import { cn, inputContainerVariants } from "@/lib";
import { type InputHTMLAttributes } from "react";
import { type VariantProps } from "class-variance-authority";
import { CheckIcon } from "lucide-react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputContainerVariants> {
  errorMessage?: string;
  inputClassName?: string;
  ref?: React.Ref<HTMLInputElement>;
}

const Input = ({
  className,
  inputClassName,
  variant,
  errorMessage,
  ref,
  ...props
}: InputProps) => {
  const currentVariant = errorMessage ? "danger" : variant;

  return (
    <div className={cn("flex flex-col", className)}>
      <div
        className={cn(
          inputContainerVariants({ variant: currentVariant }),
          props.disabled && "cursor-not-allowed bg-neutral-100 text-neutral-400"
        )}
      >
        <input
          ref={ref}
          className={cn(
            "w-full border-none bg-transparent px-4 py-3 text-sm outline-none placeholder:text-neutral-400 disabled:cursor-not-allowed",
            currentVariant === "danger" && inputClassName
          )}
          {...props}
        />

        {currentVariant === "success" && (
          <span className="text-success pointer-events-none flex items-center justify-center pr-3">
            <CheckIcon size={20} strokeWidth={3} />
          </span>
        )}
      </div>

      {errorMessage && (
        <p className="text-danger mt-1 text-xs font-medium">*{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
