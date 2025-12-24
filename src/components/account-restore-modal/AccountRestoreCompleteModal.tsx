import { Modal, ModalContent } from "@/components/common/modal";
import type { ModalContextType } from "@/types";
import { CheckIcon } from "lucide-react";

interface AccountRestoreCompleteModalProps {
  externalModalControl: ModalContextType;
}

export default function AccountRestoreCompleteModal({
  externalModalControl,
}: AccountRestoreCompleteModalProps) {
  return (
    <Modal externalModalControl={externalModalControl}>
      <ModalContent
        hasCloseIcon={false}
        className="flex flex-col items-center gap-4"
      >
        <CheckIcon className="bg-success size-8 rounded-full p-1 text-white" />
        <span className="text-xl font-bold">계정 복구 완료!</span>
        <span className="text-neutral-600">지금 바로 로그인 해보세요.</span>
      </ModalContent>
    </Modal>
  );
}
