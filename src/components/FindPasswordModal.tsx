import { useState, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FindPasswordSchema,
  type FindPasswordType,
} from "@/schemas/authSchemas";
import { Button, Password } from "@/components/common";
import { EmailVerification } from "@/components/auth";
import { useFindPassword } from "@/hooks/api/verification/useFindPassword";
import { Check, FindPasswordIcon } from "@/assets/icons/interface-icons";

interface FindPasswordModalProps {
  onClose: () => void;
}

export default function FindPasswordModal({ onClose }: FindPasswordModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [emailToken, setEmailToken] = useState("");
  const [serverError, setServerError] = useState("");

  const methods = useForm<FindPasswordType>({
    resolver: zodResolver(FindPasswordSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleEmailVerify = useCallback((status: boolean, token?: string) => {
    setIsEmailVerified(status);
    if (token) {
      setEmailToken(token);
    }
  }, []);

  const { mutate: resetPassword, isPending } = useFindPassword({
    onSuccess: () => {
      setServerError("");
      setStep(3);
    },
    onError: (error) => {
      setServerError(
        error.response?.data?.error_detail || "비밀번호 재설정에 실패했습니다."
      );
    },
  });

  const onValidSubmit = (data: FindPasswordType) => {
    if (!emailToken) return;

    resetPassword({
      emailToken: emailToken,
      newPassword: data.password,
    });
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col">
        {step === 1 && (
          <>
            <div className="mb-6 flex flex-col items-center gap-3">
              <img src={FindPasswordIcon} alt="user icon" />
              <h2 className="text-xl font-semibold">비밀번호 찾기</h2>
              <p className="text-sm text-gray-600">
                이메일로 비밀번호 재설정 링크를 보내드려요.
              </p>
            </div>
            <EmailVerification onVerify={handleEmailVerify} purpose="find" />
            <Button
              onClick={() => setStep(2)}
              disabled={!isEmailVerified || !emailToken}
              className="mt-8 w-full disabled:bg-gray-300"
            >
              비밀번호 찾기
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="mb-6 flex flex-col items-center gap-3">
              <img src={FindPasswordIcon} alt="user icon" />
              <h2 className="text-xl font-semibold">비밀번호 재설정</h2>
              <p className="text-sm">신규 비밀번호를 입력해주세요.</p>
              {serverError && (
                <p className="text-sm text-red-500">{serverError}</p>
              )}
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <label className="block text-sm">
                새 비밀번호<span className="text-red-500">*</span>
                <span className="ml-2 text-xs font-bold text-violet-600">
                  8~15자의 영문 대소문자, 숫자, 특수문자 포함
                </span>
              </label>
              <Password
                placeholder="비밀번호를 입력해주세요"
                {...register("password")}
                errorMessage={errors.password?.message}
              />
              <Password
                placeholder="비밀번호를 다시 입력해주세요"
                {...register("passwordConfirm")}
                errorMessage={errors.passwordConfirm?.message}
              />
              <Button
                onClick={handleSubmit(onValidSubmit)}
                disabled={isPending}
                className="mt-8 w-full"
              >
                {isPending ? "변경 중..." : "비밀번호 변경 완료"}
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="mb-6 flex flex-col items-center gap-3">
              <img src={FindPasswordIcon} alt="user icon" />
              <h2 className="text-xl font-semibold">비밀번호 재설정</h2>
              <p className="text-sm">신규 비밀번호를 입력해주세요.</p>
            </div>
            <img src={Check} alt="체크아이콘" />
            <h2 className="text-xl font-semibold">비밀번호 변경 완료!</h2>
            <p className="text-sm text-gray-600">
              잠시 후 로그인 페이지로 이동합니다.
            </p>
            <Button onClick={onClose} className="mt-16 w-full">
              확인
            </Button>
          </div>
        )}
      </div>
    </FormProvider>
  );
}
