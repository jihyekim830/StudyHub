import { cva } from "class-variance-authority";

export const inputContainerVariants = cva(
  "flex items-center w-full rounded-md border bg-white transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-neutral-300 focus-within:border-primary-500",
        danger: "border-danger focus-within:border-danger",
        success: "border-success focus-within:border-success",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
