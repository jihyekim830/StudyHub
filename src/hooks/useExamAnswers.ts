import type { Answer, Question } from "@/types";
import { useCallback, useEffect, useState } from "react";

type AnswerState = Record<number, Answer>;

function useExamAnswers(questions: Question[] | null) {
  const [answers, setAnswers] = useState<AnswerState>({});

  const hasUnansweredQuestions = Object.values(answers).some(
    (answer) => answer.submittedAnswer === null
  );

  const handleAnswerChange = useCallback(
    (questionId: number, submittedAnswer: Answer["submittedAnswer"]) =>
      setAnswers((prev) => ({
        ...prev,
        [questionId]: { ...prev[questionId], submittedAnswer },
      })),
    []
  );

  useEffect(() => {
    if (!questions) return;

    const initialState = Object.fromEntries(
      questions.map((question) => [
        question.question_id,
        { type: question.type, submittedAnswer: null },
      ])
    );

    setAnswers(initialState);
  }, [questions]);

  return { answers, hasUnansweredQuestions, handleAnswerChange };
}

export default useExamAnswers;
