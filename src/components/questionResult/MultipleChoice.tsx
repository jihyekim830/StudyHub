import { EXAM_QUESTION_CHECKBOX_STYLE_MAP } from "@/constants";
import { cn } from "@/lib";
import type { QuestionResult } from "@/types";
import { CheckIcon } from "lucide-react";
import ResultExplanation from "@/components/questionResult/ResultExplanation";

interface MultipleChoiceProps {
  question: QuestionResult;
}

function MultipleChoice({ question }: MultipleChoiceProps) {
  return (
    <div>
      <div className="flex flex-col gap-3">
        {question.options?.map((option) => (
          <label
            key={`${question.questionId}-${option}`}
            className="relative flex items-center gap-3"
          >
            <input
              type="checkbox"
              checked={question.submittedAnswer?.includes(option)}
              className={cn(
                EXAM_QUESTION_CHECKBOX_STYLE_MAP.base,
                EXAM_QUESTION_CHECKBOX_STYLE_MAP.checked,
                EXAM_QUESTION_CHECKBOX_STYLE_MAP.focus
              )}
              disabled
            />
            <CheckIcon
              className={cn(
                "top-1 left-0.5 hidden text-white",
                "peer-checked:absolute peer-checked:block"
              )}
              size={16}
              strokeWidth={2.2}
            />
            <span
              className={cn({
                "text-green-500": question.correctAnswer.includes(option),
                "text-red-600":
                  question.submittedAnswer?.includes(option) &&
                  !question.correctAnswer.includes(option),
              })}
            >
              {option}
            </span>
          </label>
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

export default MultipleChoice;
