import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "text-base rounded px-7 py-4 focus:outline-none transition-colors ease-in-out",
  {
    variants: {
      variant: {
        fill: cn(
          "text-white bg-primary-500",
          "hover:bg-primary-600",
          "active:bg-primary-700",
          "disabled:text-neutral-400 disabled:bg-neutral-200"
        ),
        outline: cn(
          "text-primary-700 bg-primary-200 border border-primary-500",
          "hover:bg-primary-300 hover:border-primary-600",
          "active:bg-primary-400 active:border-primary-700 active:text-primary-800",
          "disabled:text-neutral-700 disabled:bg-neutral-200 disabled:border-neutral-400"
        ),
        neutral: "text-neutral-700 bg-neutral-200 border border-neutral-400",
      },
    },
    defaultVariants: {
      variant: "fill",
    },
  }
);
