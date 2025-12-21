import { Link } from "react-router";
import HeaderLogo from "@/assets/images/logo-images/header-logo.png";
import { KakaoLoginButton, NaverLoginButton } from "@/components/auth";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
          <img src={HeaderLogo} alt="OZ Coding School" />
        </Link>
        <p className="text-mx mt-6 text-center text-gray-600">
          현재 회원이신가요?
          <Link
            to="/login"
            className="ml-3 font-medium text-purple-700 hover:text-purple-600"
          >
            로그인하기
          </Link>
        </p>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="px-4 py-8 sm:px-4">
          <div className="mb-4 flex flex-col gap-3">
            <KakaoLoginButton>카카오로 3초만에 가입하기</KakaoLoginButton>
            <NaverLoginButton>네이버로 가입하기</NaverLoginButton>
            <div className="flex flex-col items-center">
              <Link
                to="/email-signup"
                className="mt-2 text-neutral-600 underline underline-offset-2"
              >
                일반회원 가입
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
