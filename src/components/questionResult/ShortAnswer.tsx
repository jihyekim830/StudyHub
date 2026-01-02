import { cn } from "@/lib";
import type { QuestionResult } from "@/types";
import ResultExplanation from "@/components/questionResult/ResultExplanation";
import { EXAM_QUESTION_SHORT_ANSWER_STYLE_MAP } from "@/constants";

interface ShortAnswerProps {
  question: QuestionResult;
}

function ShortAnswer({ question }: ShortAnswerProps) {
  return (
    <div>
      <input
        type="text"
        value={question.submittedAnswer[0] ?? ""}
        placeholder="정답을 입력해 주세요."
        className={cn(
          EXAM_QUESTION_SHORT_ANSWER_STYLE_MAP.base,
          EXAM_QUESTION_SHORT_ANSWER_STYLE_MAP.focus,
          EXAM_QUESTION_SHORT_ANSWER_STYLE_MAP.placeholder,
          {
            "text-green-500": question.isCorrect,
            "text-red-600 placeholder:text-red-600": !question.isCorrect,
          }
        )}
        disabled
      />
      {question.explanation && (
        <ResultExplanation
          isCorrect={question.isCorrect}
          explanation={question.explanation}
        />
      )}
    </div>
  );
}

export default ShortAnswer;
