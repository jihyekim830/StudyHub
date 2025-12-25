import { cn } from "@/lib";
import type { Question } from "@/types";
import { memo, useEffect, useMemo, useState } from "react";

interface OrderingProps {
  question: Question;
  value: string | string[] | null;
  onChange: (
    questionId: number,
    submittedAnswer: string | string[] | null
  ) => void;
}

const OPTION_LABEL_START_CODE = 65;

const Ordering = memo(function Ordering({
  question,
  value: _value,
  onChange,
}: OrderingProps) {
  const [inputValues, setInputValues] = useState<string[]>([]);

  const letterToOptionMap = useMemo(
    () =>
      new Map(
        question.options?.map((option, index) => [
          String.fromCharCode(OPTION_LABEL_START_CODE + index),
          option,
        ])
      ),
    [question.options]
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const nextInputValues = [...inputValues];

    nextInputValues[index] = event.target.value;
    setInputValues(nextInputValues);

    const submittedAnswer = nextInputValues.map(
      (inputValue) => letterToOptionMap.get(inputValue.toUpperCase()) ?? ""
    );

    onChange(question.question_id, submittedAnswer);
  };

  useEffect(() => {
    const initialState = Array.isArray(question.answer_input)
      ? question.answer_input
      : Array.from({ length: question.options?.length ?? 0 }, () => "");

    setInputValues(initialState);
  }, [question.answer_input, question.options?.length]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex w-3/5 flex-col gap-5 rounded-sm bg-neutral-100 px-4 py-5">
        {question.options?.map((option, index) => (
          <div
            key={`${question.question_id}-ordering-option-${index}`}
            className="flex items-center gap-2"
          >
            <div className="bg-primary-100 text-primary-600 flex size-8 items-center justify-center rounded-sm text-lg font-medium">
              {String.fromCharCode(OPTION_LABEL_START_CODE + index)}
            </div>
            <span>{option}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2.5">
        {inputValues.map((inputValue, index) => (
          <input
            key={`${question.question_id}-ordering-answer-${index}`}
            className={cn(
              "size-15.5 rounded-sm bg-neutral-200 p-6 text-center text-xl font-bold",
              "focus:outline-none"
            )}
            value={inputValue}
            onChange={(event) => handleInputChange(event, index)}
          />
        ))}
      </div>
    </div>
  );
});

export default Ordering;
