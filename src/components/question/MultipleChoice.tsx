import { cn } from "@/lib";
import type { Question } from "@/types";
import { CheckIcon } from "lucide-react";
import { memo } from "react";

interface MultipleChoiceProps {
  question: Question;
  value: string | string[] | null;
  onChange: (
    questionId: number,
    submittedAnswer: string | string[] | null
  ) => void;
}

const MultipleChoice = memo(function MultipleChoice({
  question,
  value,
  onChange,
}: MultipleChoiceProps) {
  const selectedOptions = Array.isArray(value) ? value : [];

  const handleOptionToggle = (option: string) => {
    const nextOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];

    onChange(question.questionId, nextOptions);
  };

  return (
    <div className="flex flex-col gap-3">
      {question.options?.map((option) => (
        <label
          key={`${question.questionId}-${option}`}
          className="relative flex items-center gap-3"
        >
          <input
            type="checkbox"
            checked={selectedOptions.includes(option)}
            onChange={() => handleOptionToggle(option)}
            className={cn(
              "peer size-5 appearance-none rounded-xs border border-neutral-400 bg-white",
              "checked:bg-primary-700 checked:border-primary-700",
              "focus:outline-none"
            )}
          />
          <CheckIcon
            className={cn(
              "top-1 left-0.5 hidden text-white",
              "peer-checked:absolute peer-checked:block"
            )}
            size={16}
            strokeWidth={2.2}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
});

export default MultipleChoice;
