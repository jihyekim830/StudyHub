import { useCallback, useEffect, useRef } from "react";
import { useSubmitExam } from "@/hooks/api";
import type { Answer, QuestionType, QuestionTypeDto } from "@/types";
import type { ExamSubmitRequest } from "@/types/api-request-type/exam-request-types";
import { useNavigate } from "react-router";
import { useToast } from "@/hooks";
import type { AxiosResponse } from "axios";

const CHEATING_LIMIT = 3;

function useExamSubmitControl(
  startedAt: number,
  cheatingCount: number,
  answers: Record<number, Answer>,
  shouldForceSubmit: boolean,
  deploymentId: number
) {
  const navigate = useNavigate();
  const hasSubmittedRef = useRef(false);
  const { triggerToast } = useToast();
  const { mutate: submitExam, isPending } = useSubmitExam({
    onSuccess: (data) => {
      const redirectUrl = `/exam/${deploymentId}/result/${data.submissionId}`;

      if (cheatingCount >= CHEATING_LIMIT) {
        setTimeout(() => navigate(redirectUrl), 3000);
        return;
      }
      navigate(redirectUrl);
    },
    onError: (error) => {
      triggerToast({
        variant: "big",
        title: "답안 제출 실패",
        text: getToastErrorText(error.response?.data),
        status: "danger",
      });
      hasSubmittedRef.current = false;
    },
  });

  const submit = useCallback(
    () => submitExam(buildSubmitPayload(startedAt, cheatingCount, answers)),
    [startedAt, cheatingCount, answers, submitExam]
  );

  useEffect(() => {
    if (!shouldForceSubmit) return;
    if (hasSubmittedRef.current) return;

    hasSubmittedRef.current = true;
    submit();
  }, [shouldForceSubmit, submit]);

  return { submit, isPending };
}

export default useExamSubmitControl;

const buildSubmitPayload = (
  startedAt: number,
  cheatingCount: number,
  localAnswers: Record<number, Answer>
): ExamSubmitRequest => ({
  started_at: new Date(startedAt).toISOString(),
  cheating_count: cheatingCount,
  answers: Object.entries(localAnswers).map(([questionId, answer]) => ({
    question_id: Number(questionId),
    type: QUESTION_TYPE_MAP[answer.type],
    submitted_answer: answer.submittedAnswer,
  })),
});

const QUESTION_TYPE_MAP: Record<QuestionType, QuestionTypeDto> = {
  fillBlank: "fill_blank",
  multipleChoice: "multiple_choice",
  ordering: "ordering",
  ox: "ox",
  shortAnswer: "short_answer",
  singleChoice: "single_choice",
};

const getToastErrorText = (data: AxiosResponse["data"]) => {
  const fallback = "일시적인 오류로 답안 제출에 실패했습니다.";

  if (!data) return fallback;
  const { error_detail: errorDetail } = data;

  if (typeof errorDetail === "string") return errorDetail;
  return fallback;
};
