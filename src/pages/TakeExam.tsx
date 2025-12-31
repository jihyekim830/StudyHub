import {
  CheatingCountIcons,
  ExamBottomButton,
  ExamCheatingModal,
  ExamContentContainer,
  ExamFocusWarning,
  ExamHeaderContainer,
  ExamHeaderTitle,
  ExamQuestion,
} from "@/components";
import { LoadingUi } from "@/components/common";
import { NotFound } from "@/components/common/not-found";
import {
  useExamAnswers,
  useExamCheatingModal,
  useExamCheatingStatus,
  useExamStatusControl,
  useExamSubmitControl,
  useExamTimer,
  useToast,
} from "@/hooks";
import { useExamQuestionList } from "@/hooks/api";
import { cn } from "@/lib";
import { useState } from "react";
import { useLocation, useParams } from "react-router";

const EXAM_INFO_BADGE_BASE =
  "flex h-11 items-center justify-center rounded-full border border-neutral-200 bg-white px-4 text-lg font-semibold";

function TakeExam() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(true);
  const { triggerToast } = useToast();

  const params = useParams();
  const { state } = useLocation();
  const durationTime = Number(state?.durationTime);
  const deploymentId = Number(params?.deploymentId);

  const {
    data: examDto,
    isLoading,
    isError,
    error,
  } = useExamQuestionList(deploymentId, durationTime);
  const { answers, hasUnansweredQuestions, handleAnswerChange } =
    useExamAnswers(examDto?.questions ?? null);

  const { startedAt, remainingMs, hasTimedOut, stopTimer } =
    useExamTimer(durationTime);
  const { cheatingCount, isForcedSubmitted } =
    useExamCheatingStatus(deploymentId);
  const { modalControl } = useExamCheatingModal(cheatingCount);
  useExamStatusControl(deploymentId);

  const shouldForceSubmit = hasTimedOut || isForcedSubmitted;
  const { submit, isPending } = useExamSubmitControl(
    startedAt,
    cheatingCount,
    answers,
    shouldForceSubmit,
    deploymentId,
    modalControl.isOpen,
    stopTimer
  );

  const handleExamSubmit = () => {
    if (!hasUnansweredQuestions) {
      stopTimer();
      submit();
      return;
    }

    triggerToast({
      variant: "big",
      title: "답안 제출 실패",
      text: "모든 문항에 정답을 입력해 주세요.",
      status: "danger",
    });
  };

  if (isLoading)
    return <LoadingUi className="mx-auto mt-96 flex w-full justify-center" />;
  if (isError)
    return <NotFound statusCode={error.response?.status ?? error.message} />;
  if (!deploymentId || !durationTime) return <NotFound statusCode={404} />;
  return (
    <>
      <ExamHeaderContainer>
        <ExamHeaderTitle
          title={examDto?.examName ?? "쪽지시험"}
          subText="집중해서 천천히, 끝까지 응시해 주세요. 응원할게요💪"
        />
        <div className={cn(EXAM_INFO_BADGE_BASE, "text-primary-700 mr-5.5")}>
          {formatRemainingTime(remainingMs)} 뒤에 끝나요
        </div>
        <div className={cn(EXAM_INFO_BADGE_BASE, "gap-3.5")}>
          <span>부정행위</span>
          <CheatingCountIcons cheatingCount={cheatingCount} />
        </div>
      </ExamHeaderContainer>
      <main className="mt-40">
        {isPopUpOpen && (
          <ExamFocusWarning onClose={() => setIsPopUpOpen(false)} />
        )}
        <ExamContentContainer>
          {examDto?.questions?.map((question) => (
            <ExamQuestion
              key={question.questionId}
              question={question}
              value={answers[question.questionId]?.submittedAnswer}
              onChange={handleAnswerChange}
            />
          ))}
        </ExamContentContainer>
        <ExamCheatingModal
          modalControl={modalControl}
          cheatingCount={cheatingCount}
          isForcedSubmitted={isForcedSubmitted}
        />
        <ExamBottomButton
          type="button"
          label="제출하기"
          onClick={handleExamSubmit}
          disabled={isPending}
        />
      </main>
    </>
  );
}

export default TakeExam;

const formatRemainingTime = (timeMs: number) => {
  const timeSeconds = Math.floor(timeMs / 1000);
  const minutes = Math.floor(timeSeconds / 60);
  const seconds = Math.floor(timeSeconds % 60);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};
