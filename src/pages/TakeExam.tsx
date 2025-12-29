import {
  CheatingCountIcons,
  ExamCheatingModal,
  ExamFocusWarning,
  ExamQuestion,
} from "@/components";
import { Button, LoadingUi } from "@/components/common";
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
import { ArrowLeftIcon } from "lucide-react";
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

  const { startedAt, remainingMs, hasTimedOut } = useExamTimer(durationTime);
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
    deploymentId
  );

  const handleExamSubmit = () => {
    if (!hasUnansweredQuestions) {
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
    <div>
      <header className="flex h-32 items-center border-b border-b-neutral-400 bg-neutral-100">
        <div className="mx-auto flex max-w-7xl grow items-center px-5">
          <div className="flex grow items-start gap-3">
            <ArrowLeftIcon className="mt-1 size-6" />
            <div className="flex flex-col gap-1">
              <span className="text-xl font-semibold">{examDto?.examName}</span>
              <span className="text-neutral-700">
                집중해서 천천히, 끝까지 응시해 주세요. 응원할게요💪
              </span>
            </div>
          </div>
          <div className={cn(EXAM_INFO_BADGE_BASE, "text-primary-700 mr-5.5")}>
            {formatRemainingTime(remainingMs)} 뒤에 끝나요
          </div>
          <div className={cn(EXAM_INFO_BADGE_BASE, "gap-3.5")}>
            <span>부정행위</span>
            <CheatingCountIcons cheatingCount={cheatingCount} />
          </div>
        </div>
      </header>
      {isPopUpOpen && (
        <ExamFocusWarning onClose={() => setIsPopUpOpen(false)} />
      )}
      <ul className="mx-auto mt-8 flex max-w-7xl flex-col gap-10">
        {examDto?.questions?.map((question) => (
          <ExamQuestion
            key={question.questionId}
            question={question}
            value={answers[question.questionId]?.submittedAnswer}
            onChange={handleAnswerChange}
          />
        ))}
      </ul>
      <ExamCheatingModal
        modalControl={modalControl}
        cheatingCount={cheatingCount}
        isForcedSubmitted={isForcedSubmitted}
      />
      <div className="flex pt-58.5 pb-24.5">
        <Button
          className="mx-auto h-16 w-31 p-0 text-lg"
          onClick={handleExamSubmit}
          disabled={isPending}
        >
          제출하기
        </Button>
      </div>
    </div>
  );
}

export default TakeExam;

const formatRemainingTime = (timeMs: number) => {
  const timeSeconds = Math.floor(timeMs / 1000);
  const minutes = Math.floor(timeSeconds / 60);
  const seconds = Math.floor(timeSeconds % 60);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};
