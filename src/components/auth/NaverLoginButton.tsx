import BaseSocialButton from "@/components/auth/BaseSocialButton";
import { naver } from "@/assets/icons/login-icons";
import { cn } from "@/lib";

interface NaverLoginButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function NaverLoginButton({
  className,
  children,
}: NaverLoginButtonProps) {
  const handleLogin = () => {
    console.log("네이버 로그인 시도");
  };

  return (
    <BaseSocialButton
      onClick={handleLogin}
      icon={naver}
      className={cn(`bg-green-500 text-white hover:bg-green-400`, className)}
    >
      {children || "네이버 로그인"}
    </BaseSocialButton>
  );
}
