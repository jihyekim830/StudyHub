import { EXAM_QUESTION_RADIO_STYLE_MAP } from "@/constants/exam-constants";
import { cn } from "@/lib";
import type { QuestionResult } from "@/types";
import ResultExplanation from "@/components/questionResult/ResultExplanation";

interface SingleChoiceProps {
  question: QuestionResult;
}

function SingleChoice({ question }: SingleChoiceProps) {
  return (
    <div>
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
              checked={option === question.submittedAnswer}
              disabled
            />
            <span
              className={cn({
                "text-green-500": option === question.correctAnswer,
                "text-red-600":
                  option === question.submittedAnswer &&
                  option !== question.correctAnswer,
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

export default SingleChoice;
