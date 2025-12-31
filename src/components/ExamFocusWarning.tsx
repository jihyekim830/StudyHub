import { EXAM_LAYOUT_BASE } from "@/constants";
import { cn } from "@/lib";
import { CircleAlertIcon, XIcon } from "lucide-react";

interface ExamFocusWarningProps {
  onClose: () => void;
}

function ExamFocusWarning({ onClose }: ExamFocusWarningProps) {
  return (
    <div className={cn(EXAM_LAYOUT_BASE, "mb-15")}>
      <div className="bg-primary-100 flex h-26 items-start gap-3 rounded-lg px-6 py-5">
        <CircleAlertIcon
          fill="#fb2c36"
          stroke="#ede9fe"
          className="mt-2 size-7.5"
        />
        <div className="flex grow flex-col gap-1.5 self-center">
          <span className="text-lg font-semibold">시험에만 집중해 주세요</span>
          <span>
            탭이나 창을 이동하면 부정행위로 처리돼 시험이 중단될 수 있어요.
            안정적인 환경에서 시험을 이어가 주세요.
          </span>
        </div>
        <button
          type="button"
          aria-label="경고 닫기"
          onClick={onClose}
          className="mt-2"
        >
          <XIcon className="size-6" />
        </button>
      </div>
    </div>
  );
}

export default ExamFocusWarning;
