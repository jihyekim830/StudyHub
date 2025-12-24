import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { Input, Button, Password } from "@/components/common";
import { LoginSchema, type LoginSchemaType } from "@/schemas/authSchemas";
import HeaderLogo from "@/assets/images/logo-images/header-logo.svg";
import { KakaoLoginButton, NaverLoginButton } from "@/components/auth";
import { useLoginMutation } from "@/hooks/useLogin";
import { useExternalModalController } from "@/hooks";
import { AccountRestoreModal } from "@/components";
import { useState } from "react";

export default function LoginPage() {
  const accountRestoreModalControl = useExternalModalController();

  const [expiredDate, setExpiredDate] = useState<Date>();

  const {
    mutate: loginFn,
    isPending,
    isError,
  } = useLoginMutation({
    onError: (error) => {
      if (
        error.response &&
        error.response.status === 403 &&
        error.response.data &&
        "error_detail" in error.response.data &&
        "expire_at" in error.response.data.error_detail
      ) {
        setExpiredDate(new Date(error.response.data.error_detail.expire_at));
        accountRestoreModalControl.open();
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });

  const onSubmit = (data: LoginSchemaType) => {
    loginFn(data);
  };

  return (
    <div className="flex min-h-screen flex-col items-center py-12 sm:px-6 lg:px-8">
      <AccountRestoreModal
        externalModalControl={accountRestoreModalControl}
        expiredAt={expiredDate || new Date()}
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
          <img src={HeaderLogo} alt="OZ Coding School" />
        </Link>
        <p className="text-mx mt-6 text-center text-gray-600">
          아직 회원이 아니신가요?
          <Link
            to="/signup"
            className="ml-3 font-medium text-purple-700 hover:text-purple-600"
          >
            회원가입 하기
          </Link>
        </p>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="px-4 py-8 sm:px-4">
          <div className="mb-4 flex flex-col gap-3">
            <KakaoLoginButton>카카오 간편 로그인 / 가입</KakaoLoginButton>
            <NaverLoginButton>네이버 간편 로그인 / 가입</NaverLoginButton>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <div className="flex flex-col">
              <Input
                placeholder="아이디 (example@gmail.com)"
                type="email"
                {...register("email")}
                errorMessage={errors.email?.message}
              />
            </div>

            <div className="flex flex-col">
              <Password
                placeholder="비밀번호 (6~15자의 영문 대소문자, 숫자, 특수문자 포함)"
                {...register("password")}
                errorMessage={errors.password?.message}
              />
            </div>

            <div className="flex justify-start py-2 text-xs text-neutral-500">
              <button type="button" className="hover:text-neutral-800">
                아이디 찾기
              </button>
              <span className="px-2">|</span>
              <button type="button" className="hover:text-neutral-800">
                비밀번호 찾기
              </button>
            </div>

            {isError && (
              <div className="mb-2 text-center text-sm font-medium text-red-500">
                {"로그인에 실패했습니다."}
              </div>
            )}

            <Button
              type="submit"
              disabled={!isValid || isPending}
              className={
                !isValid || isPending ? "bg-gray-300 hover:bg-gray-300" : ""
              }
            >
              {isPending ? "로그인 중..." : "일반회원 로그인"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
