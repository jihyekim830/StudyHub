import { EXAM_QUESTION_TYPE_LABEL_MAP } from "@/constants";
import { cn } from "@/lib";
import type { Question } from "@/types";
import { EXAM_QUESTION_CONTENT_MAP } from "@/components/question/exam-question-content-map";

interface ExamQuestionProps {
  question: Question;
  value: string | string[] | null;
  onChange: (
    questionId: number,
    submittedAnswer: string | string[] | null
  ) => void;
}

const BADGE_BASE =
  "flex h-6 items-center rounded-xs bg-neutral-200 text-neutral-700";

function ExamQuestion({ question, value, onChange }: ExamQuestionProps) {
  const ContentComponent = EXAM_QUESTION_CONTENT_MAP[question.type];

  return (
    <li>
      <div className="flex items-start gap-4">
        <div className="flex max-w-4/5 gap-3 text-xl font-bold">
          <span>{question.number}.</span>
          <span className="tracking-tighter break-keep">
            {question.question}
          </span>
        </div>
        <div className="mt-0.5 flex gap-2 text-xs font-semibold">
          <div className={cn("px-2", BADGE_BASE)}>{question.point}점</div>
          <div className={cn("px-2.5", BADGE_BASE)}>
            {EXAM_QUESTION_TYPE_LABEL_MAP[question.type]}
          </div>
        </div>
      </div>
      <div className="pt-5 pl-7">
        <ContentComponent
          question={question}
          value={value}
          onChange={onChange}
        />
      </div>
    </li>
  );
}

export default ExamQuestion;
