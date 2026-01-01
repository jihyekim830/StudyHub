import { EXAM_QUESTION_SHORT_ANSWER_STYLE_MAP } from "@/constants";
import { cn } from "@/lib";
import type { Question } from "@/types";
import { memo } from "react";

interface ShortAnswerProps {
  question: Question;
  value: string | string[] | null;
  onChange: (
    questionId: number,
    submittedAnswer: string | string[] | null
  ) => void;
}

const ShortAnswer = memo(function ShortAnswer({
  question,
  value,
  onChange,
}: ShortAnswerProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange(question.questionId, event.target.value);

  return (
    <input
      type="text"
      value={value ?? ""}
      onChange={handleInputChange}
      placeholder="정답을 입력해 주세요."
      className={cn(
        EXAM_QUESTION_SHORT_ANSWER_STYLE_MAP.base,
        EXAM_QUESTION_SHORT_ANSWER_STYLE_MAP.focus,
        EXAM_QUESTION_SHORT_ANSWER_STYLE_MAP.placeholder
      )}
    />
  );
});

export default ShortAnswer;
