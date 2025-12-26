import type { ModalContextType } from "@/types";
import { Button } from "@/components/common";
import { Modal, ModalClose, ModalContent } from "@/components/common/modal";
import { EXAM_CHEATING_MODAL_CONTENT_MAP } from "@/constants";
import { cn } from "@/lib";

interface ExamCheatingModalProps {
  modalControl: ModalContextType;
  cheatingCount: number;
  isForcedSubmitted: boolean;
}

function ExamCheatingModal({
  modalControl,
  cheatingCount,
  isForcedSubmitted,
}: ExamCheatingModalProps) {
  const content = EXAM_CHEATING_MODAL_CONTENT_MAP[cheatingCount];

  return (
    <Modal externalModalControl={modalControl}>
      <ModalContent className="w-99 p-6.5">
        <div className="mt-2.5 mb-5 flex flex-col items-center">
          <img
            src={content?.icon}
            alt="부정행위 감지 안내 아이콘"
            className="w-18"
          />
          <div className="my-2 text-lg font-semibold">
            <span>
              부정행위
              <strong
                className={cn("font-bold tracking-tighter text-yellow-500", {
                  "text-danger": isForcedSubmitted,
                })}
              >
                {` ${cheatingCount}회 `}
              </strong>
              감지
            </span>
          </div>
          <span className="text-center text-sm tracking-tighter break-keep whitespace-pre-line">
            {content?.description}
          </span>
        </div>
        <ModalClose>
          <Button className="w-full py-2.5">
            {isForcedSubmitted ? "시험종료" : "확인"}
          </Button>
        </ModalClose>
      </ModalContent>
    </Modal>
  );
}

export default ExamCheatingModal;
