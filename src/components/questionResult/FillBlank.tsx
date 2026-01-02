import type { QuestionResult } from "@/types";
import ResultExplanation from "@/components/questionResult/ResultExplanation";
import { cn } from "@/lib";
import {
  EXAM_QUESTION_LABEL_START_CHAR_CODE,
  EXAM_QUESTION_BLANK_TOKEN,
} from "@/constants";

interface FillBlankProps {
  question: QuestionResult;
}

function FillBlank({ question }: FillBlankProps) {
  const promptParts = question.prompt.split(EXAM_QUESTION_BLANK_TOKEN);

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="w-3/5 rounded-sm bg-neutral-100 px-6.5 py-4 break-keep whitespace-pre-line">
          {promptParts.map((part, index) => (
            <span key={`${question.id}-prompt-${index}`}>
              {part}
              {index < promptParts.length - 1 && (
                <strong>{`(${String.fromCharCode(EXAM_QUESTION_LABEL_START_CHAR_CODE + index)}) ________`}</strong>
              )}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-2.5">
          {question.answer.map((correctAnswer, index) => (
            <div key={`${question.id}-correctAnswer-${index}`}>
              <label className="flex h-12 w-4/12 items-center gap-2 rounded-sm bg-neutral-200 px-4">
                <span
                  className={cn("text-lg font-bold", {
                    "text-green-500":
                      question.submittedAnswer[index] === correctAnswer,
                    "text-red-600 placeholder:text-red-600":
                      question.submittedAnswer[index] !== correctAnswer,
                  })}
                >
                  {String.fromCharCode(
                    EXAM_QUESTION_LABEL_START_CHAR_CODE + index
                  )}
                </span>
                <input
                  type="text"
                  className={cn(
                    "grow",
                    "placeholder:text-neutral-400",
                    "focus:outline-none",
                    {
                      "text-green-500":
                        question.submittedAnswer[index] === correctAnswer,
                      "text-red-600 placeholder:text-red-600":
                        question.submittedAnswer[index] !== correctAnswer,
                    }
                  )}
                  placeholder="정답을 입력해 주세요."
                  value={question.submittedAnswer[index] ?? ""}
                  disabled
                />
              </label>
              {question.submittedAnswer[index] !== correctAnswer && (
                <span className="my-0.5 ml-1 block text-red-600">
                  * {correctAnswer}
                </span>
              )}
            </div>
          ))}
        </div>
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

export default FillBlank;
