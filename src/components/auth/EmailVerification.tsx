import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input, Button } from "@/components/common";
import type { EmailVerificationSchemaType } from "@/schemas/authSchemas";
import { useSendEmail, useVerifyEmail } from "@/hooks/api";
import { useToast } from "@/hooks";
import { extractErrorMessage } from "@/lib/authUtils";

interface EmailVerificationProps {
  onVerify: (status: boolean, token?: string) => void;
  purpose: "signup" | "find" | "restore";
}

export default function EmailVerification({
  onVerify,
  purpose,
}: EmailVerificationProps) {
  const {
    register,
    watch,
    setValue,
    setFocus,
    formState: { errors },
  } = useFormContext<EmailVerificationSchemaType>();

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { triggerToast } = useToast();

  const emailValue = watch("email");
  const verificationCode = watch("emailcode");

  useEffect(() => {
    setIsVerified(false);
    setIsEmailSent(false);
    onVerify(false);
  }, [emailValue, onVerify]);

  const { mutate: sendEmail, isPending: isSending } = useSendEmail({
    onSuccess: () => {
      setIsEmailSent(true);
      triggerToast({
        text: "인증코드가 전송되었습니다.",
        status: "success",
        variant: "small",
      });
    },
    onError: (error) => {
      const message = extractErrorMessage(error);
      triggerToast({
        text:
          message ||
          "인증코드 전송에 실패했습니다. 이메일을 다시 확인해주세요.",
        status: "danger",
        variant: "small",
      });
    },
  });

  const { mutate: verifyEmail, isPending: isVerifying } = useVerifyEmail({
    onSuccess: (data) => {
      setIsVerified(true);
      onVerify(true, data.emailToken);
      setValue("emailToken", data.emailToken, { shouldValidate: true });
      triggerToast({
        text: "이메일 인증이 완료되었습니다.",
        status: "success",
        variant: "small",
      });
    },
    onError: () => {
      triggerToast({
        text: "인증 코드가 일치하지 않습니다.",
        status: "danger",
        variant: "small",
      });
      setValue("emailcode", "");
      setIsVerified(false);
      onVerify(false);
    },
  });

  const handleSendCode = () => {
    if (emailValue && !errors.email) {
      sendEmail({
        email: emailValue,
        purpose: purpose,
      });
      setValue("emailcode", "");
      setFocus("emailcode");
    }
  };

  const handleVerifyCode = () => {
    if (verificationCode && verificationCode.length === 6) {
      verifyEmail({ email: emailValue, code: verificationCode });
    }
  };

  return (
    <section className="space-y-2">
      <div className="flex items-center">
        <label htmlFor="email" className="text-sm">
          이메일<span className="text-red-500">*</span>
        </label>
        <span className="ml-2 text-xs font-bold text-violet-600">
          {purpose === "signup" ? "로그인 시 아이디로 사용합니다." : ""}
        </span>
      </div>

      <div className="flex items-start gap-2">
        <Input
          id="email"
          className="flex-1"
          {...register("email")}
          errorMessage={errors.email?.message}
          placeholder="ozcoding@naver.com"
          readOnly={isVerified}
        />
        <Button
          type="button"
          variant="outline"
          className="h-12 w-28 p-0"
          disabled={!!errors.email || !emailValue || isSending || isVerified}
          onClick={handleSendCode}
        >
          {isSending
            ? "전송 중..."
            : isEmailSent
              ? "다시전송하기"
              : "인증코드전송"}
        </Button>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <Input
          className="flex-1"
          placeholder="인증코드 6자리를 입력해주세요"
          {...register("emailcode")}
          maxLength={6}
          variant={
            isVerified ? "success" : errors.emailcode ? "danger" : "default"
          }
          errorMessage={errors.emailcode?.message}
          disabled={!isEmailSent || isVerifying}
          readOnly={isVerified}
        />
        <Button
          type="button"
          variant="outline"
          className="h-12 w-28 p-0"
          disabled={
            !isEmailSent ||
            verificationCode?.length !== 6 ||
            isVerifying ||
            isVerified
          }
          onClick={handleVerifyCode}
        >
          {isVerifying
            ? "확인 중..."
            : isVerified
              ? "인증완료"
              : "인증코드확인"}
        </Button>
      </div>
    </section>
  );
}
