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
        {question.options.map((option, index) => (
          <label
            key={`${question.id}-option-${index}`}
            className="flex items-center gap-3"
          >
            <input
              type="radio"
              name={`${question.id}-radio`}
              className={cn(
                EXAM_QUESTION_RADIO_STYLE_MAP.base,
                EXAM_QUESTION_RADIO_STYLE_MAP.checked,
                EXAM_QUESTION_RADIO_STYLE_MAP.focus
              )}
              checked={option === question.submittedAnswer[0]}
              disabled
            />
            <span
              className={cn({
                "text-green-500": option === question.answer[0],
                "text-red-600":
                  option === question.submittedAnswer[0] &&
                  option !== question.answer[0],
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
