import { Button } from "@/components/common";
import { Modal, ModalContent } from "@/components/common/modal";
import type { ModalContextType } from "@/types";
import { MehIcon } from "lucide-react";

interface AccountRestoreAlertModalProps {
  externalModalControl: ModalContextType;
  setStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
  expiredAt: Date;
}

export default function AccountRestoreAlertModal({
  externalModalControl,
  setStep,
}: AccountRestoreAlertModalProps) {
  return (
    <Modal externalModalControl={externalModalControl}>
      <ModalContent className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-4">
          <MehIcon className="bg-primary-300 text-primary-500 size-10 rounded-full p-2" />
          <span className="text-xl font-semibold">
            해당 계정은 탈퇴된 상태에요.
          </span>
          <div className="flex flex-col items-center text-neutral-400">
            <span>
              계정을 다시 사용하려면 아래 버튼을 눌러 복구를 진행해주세요.
            </span>
          </div>
        </div>
        <Button
          onClick={() => {
            setStep(2);
          }}
          className="w-full"
        >
          계정 다시 사용하기
        </Button>
      </ModalContent>
    </Modal>
  );
}
