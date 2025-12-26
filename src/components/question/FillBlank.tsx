import { cn } from "@/lib";
import type { Question } from "@/types";
import { memo } from "react";

interface FillBlankProps {
  question: Question;
  value: string | string[] | null;
  onChange: (
    questionId: number,
    submittedAnswer: string | string[] | null
  ) => void;
}

const BLANK_TOKEN = "__";

const BLANK_LABEL_START_CODE = 65;

const FillBlank = memo(function FillBlank({
  question,
  value,
  onChange,
}: FillBlankProps) {
  const promptParts = question.prompt?.split(BLANK_TOKEN) ?? [];
  const answers = Array.isArray(value)
    ? value
    : Array.from({ length: question.blank_count ?? 0 }, () => "");

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const nextAnswers = [...answers];
    nextAnswers[index] = event.target.value;

    onChange(question.question_id, nextAnswers);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="w-3/5 rounded-sm bg-neutral-100 px-6.5 py-4 break-keep whitespace-pre-line">
        {promptParts.map((part, index) => (
          <span key={`${question.question_id}-prompt-${index}`}>
            {part}
            {index < promptParts.length - 1 && (
              <strong>{`(${String.fromCharCode(BLANK_LABEL_START_CODE + index)}) ________`}</strong>
            )}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-2.5">
        {answers.map((answer, index) => (
          <label
            key={`${question.question_id}-answer-${index}`}
            className="flex h-12 w-4/12 items-center gap-2 rounded-sm bg-neutral-200 px-4"
          >
            <span className="text-lg font-bold">
              {String.fromCharCode(BLANK_LABEL_START_CODE + index)}
            </span>
            <input
              type="text"
              className={cn(
                "grow",
                "placeholder:text-neutral-400",
                "focus:outline-none"
              )}
              placeholder="정답을 입력해 주세요."
              value={answer}
              onChange={(event) => handleAnswerChange(event, index)}
            />
          </label>
        ))}
      </div>
    </div>
  );
});

export default FillBlank;
