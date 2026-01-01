import { EXAM_QUESTION_TYPE_LABEL_MAP } from "@/constants";
import { cn } from "@/lib";
import type { QuestionType } from "@/types";

interface QuestionHeaderProps {
  questionNumber: number;
  question: string;
  point: number;
  type: QuestionType;
}

const BADGE_BASE =
  "flex h-6 items-center rounded-xs bg-neutral-200 text-neutral-700";

function QuestionHeader({
  questionNumber,
  question,
  point,
  type,
}: QuestionHeaderProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex max-w-4/5 gap-3 text-xl font-bold">
        <span>{questionNumber}.</span>
        <span className="tracking-tighter break-keep">{question}</span>
      </div>
      <div className="mt-0.5 flex gap-2 text-xs font-semibold">
        <div className={cn("px-2", BADGE_BASE)}>{point}점</div>
        <div className={cn("px-2.5", BADGE_BASE)}>
          {EXAM_QUESTION_TYPE_LABEL_MAP[type]}
        </div>
      </div>
    </div>
  );
}

export default QuestionHeader;
