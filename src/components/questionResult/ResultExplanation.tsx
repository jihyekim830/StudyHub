import { cn } from "@/lib";
import { CircleIcon, XIcon } from "lucide-react";

interface ResultExplanationProps {
  isCorrect: boolean;
  explanation: string;
}

function ResultExplanation({ isCorrect, explanation }: ResultExplanationProps) {
  return (
    <div
      className={cn(
        "mt-5 flex items-center justify-start gap-3 rounded-sm px-4 py-5.5",
        {
          "bg-green-100": isCorrect,
          "bg-red-100": !isCorrect,
        }
      )}
    >
      {isCorrect ? (
        <CircleIcon
          className="mx-0.5 size-5 shrink-0 text-green-500"
          aria-label="정답"
        />
      ) : (
        <XIcon className="size-6.5 shrink-0 text-red-600" aria-label="오답" />
      )}
      <span className="break-keep whitespace-pre-line">{explanation}</span>
    </div>
  );
}

export default ResultExplanation;
