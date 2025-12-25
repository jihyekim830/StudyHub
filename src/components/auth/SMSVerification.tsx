import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input, Button } from "@/components/common";
import type { SMSVerificationSchemaType } from "@/schemas/authSchemas";
import { useSendSMS, useVerifySMS } from "@/hooks/api";
import { useToast } from "@/hooks";

export default function SMSVerification() {
  const { register, watch, setFocus } =
    useFormContext<SMSVerificationSchemaType>();

  const [isSMSSent, setIsSMSSent] = useState(false);

  const { triggerToast } = useToast();

  const phoneValues = watch(["phone1", "phone2", "phone3"]);
  const verificationCode = watch("smscode");
  const fullPhoneNumber = phoneValues.join("");

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
      triggerToast({
        text: "인증번호가 전송되었습니다.",
        status: "success",
        variant: "small",
      });
    },
    onError: () => {
      triggerToast({
        text: "인증번호 전송에 실패했습니다. 다시 시도해주세요.",
        status: "danger",
        variant: "small",
      });
    },
  });

  const { mutate: verifySMS, isPending: isVerifying } = useVerifySMS({
    onSuccess: () => {
      triggerToast({
        text: "인증번호 확인이 완료되었습니다.",
        status: "success",
        variant: "small",
      });
    },
    onError: () => {
      triggerToast({
        text: "인증번호가 일치하지 않습니다.",
        status: "danger",
        variant: "small",
      });
    },
  });

  const handleSendCode = () => {
    if (fullPhoneNumber.length >= 10) {
      sendSMS({ phoneNumber: fullPhoneNumber });
    }
  };

  const handleVerifyCode = () => {
    if (verificationCode.length === 6) {
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
        />
        <span>-</span>
        <Input className="flex-1" maxLength={4} {...register("phone3")} />

        <Button
          type="button"
          variant="outline"
          className="h-12 w-28 p-0"
          disabled={phoneValues.some((v) => !v) || isSending}
          onClick={handleSendCode}
        >
          {isSending ? "전송 중..." : "인증번호전송"}
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Input
          className="flex-1"
          placeholder="인증번호 6자리를 입력해주세요"
          maxLength={6}
          {...register("smscode")}
        />
        <Button
          type="button"
          variant="outline"
          className="h-12 w-28 p-0"
          disabled={!isSMSSent || verificationCode.length !== 6 || isVerifying}
          onClick={handleVerifyCode}
        >
          {isVerifying ? "확인 중..." : "인증번호확인"}
        </Button>
      </div>
    </section>
  );
}
