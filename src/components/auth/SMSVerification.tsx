import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input, Button } from "@/components/common";
import type { SMSVerificationSchemaType } from "@/schemas/authSchemas";
import { useSendSMS, useVerifySMS } from "@/hooks/api";
import { useToast } from "@/hooks";

interface SMSVerificationProps {
  onVerify: (status: boolean) => void;
  purpose: "signup" | "find" | "restore";
}

export default function SMSVerification({
  onVerify,
  purpose,
}: SMSVerificationProps) {
  const {
    register,
    watch,
    setFocus,
    setValue,
    formState: { errors },
  } = useFormContext<SMSVerificationSchemaType>();

  const [isSMSSent, setIsSMSSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const { triggerToast } = useToast();

  const phoneValues = watch(["phone1", "phone2", "phone3"]);
  const verificationCode = watch("smscode");
  const fullPhoneNumber = phoneValues.join("");

  useEffect(() => {
    setIsVerified(false);
    setIsSMSSent(false);
    onVerify(false);
    setValue("smscode", "");
  }, [fullPhoneNumber, onVerify, setValue]);

  const handlePhoneAutoAfter = (
    e: React.ChangeEvent<HTMLInputElement>,
    nextField: keyof SMSVerificationSchemaType,
    maxLength: number
  ) => {
    if (e.target.value.length >= maxLength) {
      setFocus(nextField);
    }
  };

  const { mutate: sendSMS, isPending: isSending } = useSendSMS({
    onSuccess: () => {
      setIsSMSSent(true);
      setValue("smscode", "");
      setFocus("smscode");
      triggerToast({
        text: "인증번호가 전송되었습니다.",
        status: "success",
        variant: "small",
      });
    },
    onError: (error) => {
      const errorData = error.response?.data;

      const fieldErrors = errorData?.errors
        ? Object.values(errorData.errors).flat()[0]
        : null;

      const serverMessage =
        fieldErrors ||
        errorData?.error_detail ||
        "인증번호 전송에 실패했습니다.";

      triggerToast({
        text: serverMessage,
        status: "danger",
        variant: "small",
      });
    },
  });

  const { mutate: verifySMS, isPending: isVerifying } = useVerifySMS({
    onSuccess: (data) => {
      setIsVerified(true);
      onVerify(true);
      setValue("smsToken", data.smsToken, { shouldValidate: true });
      triggerToast({
        text: "인증번호 확인이 완료되었습니다.",
        status: "success",
        variant: "small",
      });
    },
    onError: (error) => {
      setValue("smscode", "");
      setIsVerified(false);
      onVerify(false);

      const serverMessage =
        error.response?.data?.error_detail || "인증번호가 일치하지 않습니다.";
      triggerToast({
        text: serverMessage,
        status: "danger",
        variant: "small",
      });
    },
  });

  const handleSendCode = () => {
    if (fullPhoneNumber.length >= 10) {
      sendSMS({ phoneNumber: fullPhoneNumber, purpose: purpose });
    }
  };

  const handleVerifyCode = () => {
    if (verificationCode && verificationCode.length === 6) {
      verifySMS({ phoneNumber: fullPhoneNumber, code: verificationCode });
    }
  };

  return (
    <section className="space-y-2">
      <label className="text-sm font-semibold">
        휴대전화<span className="text-red-500">*</span>
      </label>

      <div className="flex items-center gap-2">
        <Input
          className="w-20"
          maxLength={3}
          {...register("phone1")}
          onChange={(e) => {
            register("phone1").onChange(e);
            handlePhoneAutoAfter(e, "phone2", 3);
          }}
          placeholder="010"
          readOnly={isVerified}
        />
        <span>-</span>
        <Input
          className="flex-1"
          maxLength={4}
          {...register("phone2")}
          onChange={(e) => {
            register("phone2").onChange(e);
            handlePhoneAutoAfter(e, "phone3", 4);
          }}
          readOnly={isVerified}
        />
        <span>-</span>
        <Input
          className="flex-1"
          maxLength={4}
          {...register("phone3")}
          readOnly={isVerified}
        />

        <Button
          type="button"
          variant="outline"
          className="h-12 w-28 p-0"
          disabled={
            phoneValues.some((value) => !value) || isSending || isVerified
          }
          onClick={handleSendCode}
        >
          {isSending
            ? "전송 중..."
            : isSMSSent
              ? "다시전송하기"
              : "인증번호전송"}
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Input
          className="flex-1"
          variant={
            isVerified ? "success" : errors.smscode ? "danger" : "default"
          }
          placeholder="인증번호 6자리를 입력해주세요"
          maxLength={6}
          {...register("smscode")}
          disabled={!isSMSSent || isVerifying}
          readOnly={isVerified}
        />
        <Button
          type="button"
          variant="outline"
          className="h-12 w-28 p-0"
          disabled={
            !isSMSSent ||
            (verificationCode?.length ?? 0) !== 6 ||
            isVerifying ||
            isVerified
          }
          onClick={handleVerifyCode}
        >
          {isVerifying
            ? "확인 중..."
            : isVerified
              ? "인증완료"
              : "인증번호확인"}
        </Button>
      </div>
    </section>
  );
}
