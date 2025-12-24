import { Button, Input } from "@/components/common";
import { Modal, ModalContent } from "@/components/common/modal";
import { useToast } from "@/hooks";
import { useSendEmail, useVerifyEmail } from "@/hooks/api";
import type { ModalContextType } from "@/types";
import { RotateCwIcon } from "lucide-react";
import { useState } from "react";

const emailRegex = new RegExp(
  "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"
);

interface AccountRestoreFormModalProps {
  externalModalControl: ModalContextType;
  setStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
}

export default function AccountRestoreFormModal({
  externalModalControl,
  setStep,
}: AccountRestoreFormModalProps) {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isEmail, setIsEmail] = useState(false);

  const { triggerToast } = useToast();

  const { mutate: sendEmail } = useSendEmail({
    onSuccess: () => {
      setIsEmailSent(true);
      triggerToast({
        variant: "small",
        status: "success",
        text: "전송 완료! 이메일을 확인해주세요.",
      });
    },
    onError: () => {
      triggerToast({
        variant: "small",
        status: "danger",
        text: "이메일 전송에 실패했습니다. 잠시후 다시 시도해주세요.",
      });
    },
  });

  const { mutate: verifyEmail } = useVerifyEmail({
    onSuccess: () => {
      setIsVerified(true);
      triggerToast({
        variant: "small",
        status: "success",
        text: "이메일 인증 완료! 확인 버튼을 클릭해주세요.",
      });
    },
    onError: (error) => {
      if (error.status === 403) {
        triggerToast({
          variant: "small",
          status: "danger",
          text: "올바르지 않은 인증코드입니다.",
        });
      } else {
        triggerToast({
          variant: "small",
          status: "danger",
          text: "이메일 인증에 실패했습니다. 잠시후 다시 시도해주세요.",
        });
      }
    },
  });

  const handleEmailButtonClick = () => {
    sendEmail({ email });
  };

  const handleVerifyButtonClick = () => {
    verifyEmail({ email, code: verificationCode });
  };

  return (
    <Modal externalModalControl={externalModalControl}>
      <ModalContent className="flex w-full max-w-md flex-col gap-8">
        <div className="flex flex-col items-center gap-4">
          <RotateCwIcon className="bg-primary-300 text-primary-500 size-10 rounded-full p-2" />
          <span className="text-xl font-semibold">계정 다시 사용하기</span>
          <span className="text-neutral-400">
            입력하신 이메일로 인증번호를 보내드릴게요.
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span>
            이메일<span className="text-danger">*</span>
          </span>

          <div className="flex items-center justify-center gap-2">
            <Input
              placeholder="가입한 이메일을 입력해주세요."
              className="flex-1"
              inputClassName="h-12"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsEmail(emailRegex.test(email));
              }}
              disabled={isEmailSent}
            />
            <Button
              className="flex h-12 items-center justify-center"
              disabled={!isEmail || isEmailSent}
              onClick={handleEmailButtonClick}
            >
              인증코드전송
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Input
              placeholder="인증번호를 입력해주세요."
              className="flex-1"
              inputClassName="h-12"
              value={verificationCode}
              onChange={(e) => {
                setVerificationCode(e.target.value);
              }}
            />
            <Button
              className="flex h-12 items-center justify-center"
              disabled={!isEmailSent || !verificationCode}
              onClick={handleVerifyButtonClick}
            >
              인증코드확인
            </Button>
          </div>
        </div>

        <Button
          onClick={() => {
            setStep(3);
          }}
          disabled={!isVerified}
        >
          확인
        </Button>
      </ModalContent>
    </Modal>
  );
}
