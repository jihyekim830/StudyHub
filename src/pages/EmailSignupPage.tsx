import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeaderLogo } from "@/assets/images/logo-images";
import { Button, Input, Password } from "@/components/common";
import { NicknameField } from "@/components";
import { SignupSchema, type SignupSchemaType } from "@/schemas/authSchemas";
import { cn } from "@/lib";
import EmailVerification from "@/components/auth/EmailVerification";
import SMSVerification from "@/components/auth/SMSVerification";
import { useState } from "react";
import { useSignup } from "@/hooks/useSignup";
import type { SignupRequest } from "@/types/api-request-type/auth-request-type";

export default function EmailSignupPage() {
  const [isNicknameVerified, setIsNicknameVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSmsVerified, setIsSmsVerified] = useState(false);
  const { mutate: signup, isPending } = useSignup();

  const methods = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
    mode: "onChange",
    defaultValues: {
      gender: "M",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = methods;

  const values = watch();
  const isSubmitDisabled =
    !isValid || !isNicknameVerified || !isEmailVerified || !isSmsVerified;

  const onSubmit = (data: SignupSchemaType) => {
    const formattedBirthday = data.birthday.replace(
      /(\d{4})(\d{2})(\d{2})/,
      "$1-$2-$3"
    );

    const signupData: SignupRequest = {
      password: data.password,
      nickname: data.nickname,
      name: data.name,
      birthday: formattedBirthday,
      gender: data.gender,
      email_token: data.emailToken,
      sms_token: data.smsToken,
    };

    console.log("서버로 전송할 최종 데이터:", signupData);

    signup(signupData);
  };

  return (
    <FormProvider {...methods}>
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center px-4 py-12">
        <div className="mb-10 text-center">
          <p className="text-lg font-bold text-gray-600">
            마법같이 빠르게 성장시켜줄
          </p>
          <img
            src={HeaderLogo}
            alt="오즈코딩스쿨"
            className="mx-auto my-2 h-6"
          />
        </div>

        <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-base font-bold text-gray-700">회원가입</h1>
          <section>
            <label className="mb-1 block text-sm">
              이름<span className="text-red-500">*</span>
            </label>
            <Input
              {...register("name")}
              errorMessage={errors.name?.message}
              placeholder="이름을 입력해주세요"
            />
          </section>

          <NicknameField onVerifyStatusChange={setIsNicknameVerified} />

          <section>
            <label className="mt-8 mb-1 block text-sm">
              생년월일<span className="text-red-500">*</span>
            </label>
            <Input
              {...register("birthday")}
              errorMessage={errors.birthday?.message}
              maxLength={8}
              placeholder="8자리 숫자로 입력해주세요 (ex. 20001110)"
            />
          </section>

          <section>
            <label className="mt-8 mb-1 block text-sm">
              성별<span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "h-10 w-18 rounded-4xl p-0 transition-colors",
                  values.gender !== "M" &&
                    "border-neutral-400 bg-neutral-200 text-neutral-700"
                )}
                onClick={() => setValue("gender", "M")}
              >
                남
              </Button>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "ml-2 h-10 w-18 rounded-4xl p-0 transition-colors",
                  values.gender !== "F" &&
                    "border-neutral-400 bg-neutral-200 text-neutral-700"
                )}
                onClick={() => setValue("gender", "F")}
              >
                여
              </Button>
            </div>
          </section>

          <EmailVerification onVerify={setIsEmailVerified} />

          <SMSVerification onVerify={setIsSmsVerified} />

          <section>
            <div className="flex flex-col gap-2">
              <label className="block text-sm">
                비밀번호<span className="text-red-500">*</span>
                <span className="ml-2 text-xs font-bold text-violet-600">
                  8~15자의 영문 대소문자, 숫자, 특수문자 포함
                </span>
              </label>
              <Password
                {...register("password")}
                errorMessage={errors.password?.message}
                placeholder="비밀번호를 입력해주세요"
              />
              <Password
                {...register("passwordConfirm")}
                errorMessage={errors.passwordConfirm?.message}
                placeholder="비밀번호를 다시 입력해주세요"
              />
            </div>
          </section>

          <Button
            type="submit"
            className="mt-2 w-full"
            disabled={isSubmitDisabled || isPending}
          >
            {isPending ? "가입 중..." : "가입하기"}
          </Button>
        </form>
      </div>
    </FormProvider>
  );
}
