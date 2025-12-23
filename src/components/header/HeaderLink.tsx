import type { ReactNode } from "react";
import { Link } from "react-router";

interface HeaderLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

export const HeaderLink = ({ to, children }: HeaderLinkProps) => (
  <Link
    to={to}
    className="font-medium text-gray-700 transition-colors hover:text-violet-600"
  >
    {children}
  </Link>
);
