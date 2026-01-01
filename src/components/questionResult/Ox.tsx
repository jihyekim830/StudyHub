import type { QuestionResult } from "@/types";
import ResultExplanation from "@/components/questionResult/ResultExplanation";
import { CheckIcon, CircleIcon, XIcon } from "lucide-react";
import { cn } from "@/lib";
import { EXAM_QUESTION_OX_OPTIONS } from "@/constants";

interface OxProps {
  question: QuestionResult;
}

const ICON_BASE = "size-5 text-neutral-400";

const ICON_STROKE = 3;

function Ox({ question }: OxProps) {
  return (
    <div>
      <div className="flex flex-col gap-2.5">
        {EXAM_QUESTION_OX_OPTIONS.map((option) => (
          <button
            key={`${question.questionId}-ox-${option.value}`}
            className={cn(
              "flex h-12 w-4/12 items-center gap-2 rounded-sm bg-neutral-200 px-4",
              "focus:outline-none",
              {
                "bg-green-100":
                  option.value === question.submittedAnswer &&
                  question.isCorrect,
                "bg-red-100":
                  option.value === question.submittedAnswer &&
                  !question.isCorrect,
              }
            )}
            disabled
          >
            {option.value === "O" ? (
              <CircleIcon
                className={cn(ICON_BASE, {
                  "text-green-500":
                    option.value === question.submittedAnswer &&
                    question.isCorrect,
                  "text-red-600":
                    option.value === question.submittedAnswer &&
                    !question.isCorrect,
                })}
                strokeWidth={ICON_STROKE}
              />
            ) : (
              <XIcon
                className={cn(ICON_BASE, {
                  "text-green-500":
                    option.value === question.submittedAnswer &&
                    question.isCorrect,
                  "text-red-600":
                    option.value === question.submittedAnswer &&
                    !question.isCorrect,
                })}
                strokeWidth={ICON_STROKE}
              />
            )}
            <span className="grow text-start">{option.label}</span>
            <CheckIcon
              className={cn(ICON_BASE, {
                "text-green-500":
                  option.value === question.submittedAnswer &&
                  question.isCorrect,
                "text-red-600":
                  option.value === question.submittedAnswer &&
                  !question.isCorrect,
              })}
              strokeWidth={ICON_STROKE}
            />
          </button>
        ))}
      </div>
      {question.explanation && (
        <ResultExplanation
          isCorrect={question.isCorrect}
          explanation={question.explanation}
        />
      )}
    </div>
  );
}

export default Ox;
