import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Input, Button } from "@/components/common";
import { useNicknameCheck } from "@/hooks/api";

interface NicknameFieldProps {
  onVerifyStatusChange: (status: boolean) => void;
}

export default function NicknameField({
  onVerifyStatusChange,
}: NicknameFieldProps) {
  const {
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const nicknameValue = watch("nickname");

  const [isVerified, setIsVerified] = useState(false);
  const { mutate: checkNickname, isPending } = useNicknameCheck();

  const getInputVariant = () => {
    if (errors.nickname) return "danger";
    if (isVerified) return "success";
    return "default";
  };

  useEffect(() => {
    setIsVerified(false);
    onVerifyStatusChange(false);
    if (nicknameValue) clearErrors("nickname");
  }, [nicknameValue, clearErrors, onVerifyStatusChange]);

  const handleCheck = () => {
    if (!nicknameValue || errors.nickname) return;

    checkNickname(nicknameValue, {
      onSuccess: (data) => {
        if (data.available) {
          setIsVerified(true);
          onVerifyStatusChange(true);
          clearErrors("nickname");
        }
      },
      onError: (error) => {
        const serverMessage =
          error.response?.data?.error_detail ||
          "중복 확인 중 오류가 발생했습니다.";
        setError("nickname", { type: "manual", message: serverMessage });
        setIsVerified(false);
        onVerifyStatusChange(false);
      },
    });
  };

  return (
    <section>
      <label className="mt-8 mb-1 block text-sm">
        닉네임<span className="text-red-500">*</span>
      </label>
      <div className="flex items-start gap-2">
        <Input
          className="flex-1"
          {...register("nickname")}
          variant={getInputVariant()}
          errorMessage={errors.nickname?.message as string}
          placeholder="닉네임을 입력해주세요"
        />
        <Button
          type="button"
          variant="outline"
          className="h-12 w-28 p-0"
          disabled={
            !nicknameValue || !!errors.nickname || isPending || isVerified
          }
          onClick={handleCheck}
        >
          {isPending ? "확인 중..." : isVerified ? "사용가능" : "중복확인"}
        </Button>
      </div>
    </section>
  );
}
