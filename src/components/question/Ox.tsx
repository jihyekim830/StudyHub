import { EXAM_QUESTION_OX_OPTIONS } from "@/constants";
import { cn } from "@/lib";
import type { Question } from "@/types";
import { CheckIcon, CircleIcon, XIcon } from "lucide-react";
import { memo } from "react";

interface OxProps {
  question: Question;
  value: string | string[] | null;
  onChange: (
    questionId: number,
    submittedAnswer: string | string[] | null
  ) => void;
}

const ICON_BASE = "size-5 text-neutral-400";

const ICON_STROKE = 3;

const Ox = memo(function Ox({ question, value, onChange }: OxProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {EXAM_QUESTION_OX_OPTIONS.map((option) => (
        <button
          key={`${question.questionId}-ox-${option.value}`}
          className={cn(
            "flex h-12 w-4/12 items-center gap-2 rounded-sm bg-neutral-200 px-4",
            "focus:outline-none",
            { "bg-primary-100": option.value === value }
          )}
          onClick={() => onChange(question.questionId, option.value)}
        >
          {option.value === "O" ? (
            <CircleIcon
              className={cn(ICON_BASE, {
                "text-green-500": option.value === value,
              })}
              strokeWidth={ICON_STROKE}
            />
          ) : (
            <XIcon
              className={cn(ICON_BASE, {
                "text-red-600": option.value === value,
              })}
              strokeWidth={ICON_STROKE}
            />
          )}
          <span className="grow text-start">{option.label}</span>
          <CheckIcon
            className={cn(ICON_BASE, {
              "text-primary-600": option.value === value,
            })}
            strokeWidth={ICON_STROKE}
          />
        </button>
      ))}
    </div>
  );
});

export default Ox;
