import BaseSocialButton from "@/components/auth/BaseSocialButton";
import { kakao } from "@/assets/icons/login-icons";
import { cn } from "@/lib";

interface KakaoLoginButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function KakaoLoginButton({
  className,
  children,
}: KakaoLoginButtonProps) {
  const handleLogin = () => {
    console.log("카카오 로그인 시도");
  };

  return (
    <BaseSocialButton
      onClick={handleLogin}
      icon={kakao}
      className={cn("bg-yellow-300 text-black hover:bg-yellow-200", className)}
    >
      {children || "카카오 로그인"}
    </BaseSocialButton>
  );
}
