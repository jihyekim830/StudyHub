import { EXAM_QUESTION_RADIO_STYLE_MAP } from "@/constants";
import { cn } from "@/lib";
import type { Question } from "@/types";
import { memo } from "react";

interface SingleChoiceProps {
  question: Question;
  value: string | string[] | null;
  onChange: (
    questionId: number,
    submittedAnswer: string | string[] | null
  ) => void;
}

const SingleChoice = memo(function SingleChoice({
  question,
  value,
  onChange,
}: SingleChoiceProps) {
  return (
    <div className="flex flex-col gap-3">
      {question.options?.map((option) => (
        <label
          key={`${question.questionId}-${option}`}
          className="flex items-center gap-3"
        >
          <input
            type="radio"
            name={`${question.questionId}-${question.number}`}
            className={cn(
              EXAM_QUESTION_RADIO_STYLE_MAP.base,
              EXAM_QUESTION_RADIO_STYLE_MAP.checked,
              EXAM_QUESTION_RADIO_STYLE_MAP.focus
            )}
            checked={option === value}
            onChange={() => onChange(question.questionId, option)}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
});

export default SingleChoice;
