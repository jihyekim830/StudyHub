import { useCallback, useEffect, useRef } from "react";
import { useSubmitExam } from "@/hooks/api";
import type { Answer, QuestionType, QuestionTypeDto } from "@/types";
import type { ExamSubmitRequest } from "@/types/api-request-type/exam-request-types";
import { useNavigate } from "react-router";
import { useToast } from "@/hooks";
import type { AxiosResponse } from "axios";

function useExamSubmitControl(
  startedAt: number,
  cheatingCount: number,
  answers: Record<number, Answer>,
  shouldForceSubmit: boolean,
  deploymentId: number,
  isCheatingModalOpen: boolean,
  stopTimer: () => void
) {
  const navigate = useNavigate();
  const hasSubmittedRef = useRef(false);
  const hasNavigatedRef = useRef(false);
  const { triggerToast } = useToast();
  const {
    mutate: submitExam,
    isPending,
    isSuccess,
    data,
  } = useSubmitExam({
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
    stopTimer();
    submit();
  }, [shouldForceSubmit, submit, stopTimer]);

  useEffect(() => {
    if (!isSuccess || !data) return;
    if (hasNavigatedRef.current) return;

    const redirectUrl = `/exam/${deploymentId}/result/${data.submissionId}`;
    const handleNavigate = () => {
      hasNavigatedRef.current = true;
      navigate(redirectUrl, { replace: true });
    };

    if (!isCheatingModalOpen) {
      handleNavigate();
      return;
    }
    const timeoutId = setTimeout(handleNavigate, 3000);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, deploymentId, isCheatingModalOpen, isSuccess]);

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
