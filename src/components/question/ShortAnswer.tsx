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
        "h-12 w-3/5 rounded-sm bg-neutral-200 px-4",
        "focus:outline-none",
        "placeholder:text-neutral-400"
      )}
    />
  );
});

export default ShortAnswer;
