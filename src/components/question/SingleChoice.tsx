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
            name={question.question}
            className={cn(
              "size-4 appearance-none rounded-full border-4 border-white bg-neutral-200 shadow-[0_0_0_1px] shadow-neutral-400",
              "checked:border-primary-700 checked:shadow-primary-700 checked:bg-white",
              "focus:outline-none"
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
