import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeaderLogo } from "@/assets/images/logo-images";
import { Button, Input, Password } from "@/components/common";
import { SignupSchema, type SignupSchemaType } from "@/schemas/authSchemas";
import { cn } from "@/lib";
import EmailVerification from "@/components/auth/EmailVerification";
import SMSVerification from "@/components/auth/SMSVerification";

export default function EmailSignupPage() {
  const methods = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
    mode: "onChange",
    defaultValues: {
      gender: "M",
      phone1: "",
      phone2: "",
      phone3: "",
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

  const onSubmit = (data: SignupSchemaType) => {
    {
      /* 회원가입 로직 구현 */
    }
    console.log("회원가입 데이터 제출:", data);
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

          {/* Todo: 닉네임 유효성 검사 추가 예정 & 컴포넌트 분리를 통해 마이페이지에서도 사용가능하게 수정 */}
          <section>
            <label className="mt-8 mb-1 block text-sm">
              닉네임<span className="text-red-500">*</span>
            </label>
            <div className="flex items-start gap-2">
              <Input
                className="flex-1"
                {...register("nickname")}
                errorMessage={errors.nickname?.message}
                placeholder="닉네임을 입력해주세요"
              />
              <Button
                type="button"
                variant="outline"
                className="h-12 w-28 p-0"
                disabled={!values.nickname}
              >
                중복확인
              </Button>
            </div>
          </section>

          <section>
            <label className="mt-8 mb-1 block text-sm">
              생년월일<span className="text-red-500">*</span>
            </label>
            <Input
              {...register("birthday")}
              errorMessage={errors.birthday?.message}
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

          {/* Todo: useSendEmail, useVerifyEmail을 통해 인증 기능 추가 & 인증 완료시 toast 출력 */}
          <EmailVerification />

          {/* Todo: useSendPhone, useVerifyPhone 파일 추가 예정 & 인증 완료시 toast 출력 */}
          <SMSVerification />
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

          <Button type="submit" className="mt-2 w-full" disabled={!isValid}>
            가입하기
          </Button>
        </form>
      </div>
    </FormProvider>
  );
}
