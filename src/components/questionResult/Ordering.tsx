import type { QuestionResult } from "@/types";
import ResultExplanation from "@/components/questionResult/ResultExplanation";
import { EXAM_QUESTION_LABEL_START_CHAR_CODE } from "@/constants";
import { useMemo } from "react";
import { cn } from "@/lib";

interface OrderingProps {
  question: QuestionResult;
}

function Ordering({ question }: OrderingProps) {
  const correctAnswers = Array.isArray(question.correctAnswer)
    ? question.correctAnswer
    : [];

  const optionToLetterMap = useMemo(
    () =>
      new Map(
        question.options?.map((option, index) => [
          option,
          String.fromCharCode(EXAM_QUESTION_LABEL_START_CHAR_CODE + index),
        ])
      ),
    [question.options]
  );

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="flex w-3/5 flex-col gap-5 rounded-sm bg-neutral-100 px-4 py-5">
          {question.options.map((option, index) => (
            <div
              key={`${question.questionId}-ordering-option-${index}`}
              className="flex items-center gap-2"
            >
              <div className="bg-primary-100 text-primary-600 flex size-8 items-center justify-center rounded-sm text-lg font-medium">
                {String.fromCharCode(
                  EXAM_QUESTION_LABEL_START_CHAR_CODE + index
                )}
              </div>
              <span>{option}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2.5">
          {correctAnswers.map((correctAnswer, index) => (
            <input
              key={`${question.questionId}-ordering-answer-${index}`}
              className={cn(
                "size-15.5 rounded-sm bg-neutral-200 p-6 text-center text-xl font-bold",
                "focus:outline-none",
                {
                  "text-green-500":
                    question.submittedAnswer?.[index] === correctAnswer,
                  "text-red-600":
                    question.submittedAnswer?.[index] !== correctAnswer,
                }
              )}
              value={optionToLetterMap.get(
                question.submittedAnswer?.[index] ?? ""
              )}
              disabled
            />
          ))}
        </div>
        {!question.isCorrect && (
          <span className="ml-1 block break-keep whitespace-pre-line text-red-600">
            * {correctAnswers.join(" - ")}
          </span>
        )}
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

export default Ordering;
