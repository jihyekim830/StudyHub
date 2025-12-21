import type { ReactNode } from "react";
import { cn } from "@/lib";

interface BaseSocialButtonProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: string;
  className?: string;
}

export default function BaseSocialButton({
  children,
  onClick,
  icon,
  className,
}: BaseSocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-md py-3 text-sm font-medium transition-colors",
        className
      )}
    >
      {icon && <img src={icon} alt="social logo" className="h-4 w-4" />}
      {children}
    </button>
  );
}
