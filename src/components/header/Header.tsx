import type { ReactNode } from "react";
import { Link } from "react-router";
import UserMenu from "@/components/header/UserMenu";
import { HeaderLogo } from "@/assets/images/logo-images";
import { useAuthStore } from "@/store/useAuthStore";

interface HeaderLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

const HeaderLink = ({ to, children }: HeaderLinkProps) => (
  <Link
    to={to}
    className="font-medium text-gray-700 transition-colors hover:text-violet-600"
  >
    {children}
  </Link>
);

export default function Header() {
  const { isLoggedIn, deleteAccessToken } = useAuthStore();

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">
      <div className="flex h-8 items-center justify-center bg-black text-xs">
        <span className="text-white">
          🚨 선착순 모집! 국비지원 받고 4주 완성
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-4">
        <div className="flex h-12 items-center justify-between">
          <div className="flex space-x-8">
            <nav className="hidden items-center space-x-16 md:flex">
              <Link to="/" className="flex items-center space-x-2">
                <div className="text-2xl font-bold">
                  <img src={HeaderLogo} alt="헤더로고" />
                </div>
              </Link>

              <HeaderLink to="/community">커뮤니티</HeaderLink>
              <HeaderLink to="/qna">질의응답</HeaderLink>
            </nav>
          </div>

          <div className="hidden items-center space-x-4 md:flex">
            {isLoggedIn ? (
              <UserMenu onLogout={deleteAccessToken} />
            ) : (
              <div className="flex items-center">
                <HeaderLink to="/login">로그인</HeaderLink>
                <span className="px-4 text-gray-300">|</span>
                <HeaderLink to="/signup">회원가입</HeaderLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
