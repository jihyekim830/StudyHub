import { useState, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FindEmailSchema,
  type FindEmailSchemaType,
} from "@/schemas/authSchemas";
import { Input, Button } from "@/components/common";
import { SMSVerification } from "@/components/auth";
import { useFindEmail } from "@/hooks/api/verification/useFindEmail";
import { FindEmailUserIcon } from "@/assets/icons/interface-icons";

interface FindEmailModalProps {
  onClose: () => void;
}

export default function FindEmailModal({ onClose }: FindEmailModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSMSVerified, setIsSMSVerified] = useState(false);
  const [foundEmail, setFoundEmail] = useState("");
  const [serverError, setServerError] = useState("");

  const methods = useForm<FindEmailSchemaType>({
    resolver: zodResolver(FindEmailSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      phone1: "",
      phone2: "",
      phone3: "",
      smscode: "",
      smsToken: "",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const watchedName = watch("name");

  const handleSMSVerify = useCallback((status: boolean) => {
    setIsSMSVerified(status);
  }, []);

  const { mutate: findEmail, isPending } = useFindEmail({
    onSuccess: (data) => {
      setServerError("");
      setFoundEmail(data.maskedEmail);
      setStep(3);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.error_detail ||
        "입력하신 회원정보와 일치하는 정보를 찾을 수 없습니다.";
      setServerError(errorMessage);
    },
  });

  const onValidSubmit = (data: FindEmailSchemaType) => {
    if (!isSMSVerified || !data.smsToken) {
      setServerError("");
      return;
    }

    findEmail({
      name: data.name.trim(),
      smsToken: data.smsToken as string,
    });
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col">
        {step < 3 && (
          <>
            <div className="mb-6 flex flex-col items-center gap-3">
              <img src={FindEmailUserIcon} alt="user icon" />
              <h2 className="text-xl font-semibold">아이디 찾기</h2>
              {serverError && (
                <p className="mt-1 text-center text-base font-medium text-red-500">
                  {serverError}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  이름<span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="이름을 입력해주세요"
                  {...register("name")}
                  errorMessage={errors.name?.message}
                  readOnly={isSMSVerified}
                />
              </div>

              <SMSVerification onVerify={handleSMSVerify} purpose="find" />

              <Button
                type="button"
                onClick={handleSubmit(onValidSubmit)}
                disabled={!watchedName.trim() || !isSMSVerified || isPending}
                className="mt-2 w-full"
              >
                {isPending ? "찾는 중..." : "아이디 찾기"}
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="mb-6 flex flex-col items-center gap-3">
              <img
                src={FindEmailUserIcon}
                alt="user icon"
                className="h-6 w-6"
              />
              <h2 className="text-xl font-semibold">아이디 찾기</h2>
              <p className="text-center text-sm text-gray-600">
                입력하신 정보와 일치하는 아이디입니다.
              </p>
            </div>

            <div className="mb-6 rounded-lg bg-gray-100 p-4 text-center">
              <p className="text-lg font-semibold text-gray-900">
                {foundEmail}
              </p>
            </div>

            <div className="flex h-12 items-center gap-2">
              <Button variant="outline" onClick={onClose} className="flex-1">
                로그인
              </Button>
              <Button onClick={onClose} className="flex-1">
                비밀번호 찾기
              </Button>
            </div>
          </>
        )}
      </div>
    </FormProvider>
  );
}
