import {
  ExamBottomButton,
  ExamContentContainer,
  ExamHeaderContainer,
  ExamHeaderTitle,
  ExamQuestionResult,
} from "@/components";
import { LoadingUi } from "@/components/common";
import { EXAM_LAYOUT_BASE } from "@/constants";
import { useExamResult } from "@/hooks/api";
import { cn } from "@/lib";
import { useParams } from "react-router";
import { NotFound } from "@/components/common/not-found";

function ExamResult() {
  const params = useParams();
  const submissionId = Number(params?.submissionId);
  const { data: exam, isLoading, isError, error } = useExamResult(submissionId);
  const maxScore = exam?.questions.reduce((sum, { point }) => sum + point, 0);
  const resultSummaryText = `총 문항 수: ${exam?.questions.length}ㆍ부정행위: ${exam?.cheatingCount}회ㆍ응시시간: ${exam?.elapsedTime.split(":")[1]}분ㆍ응시 결과 점수: ${exam?.totalScore}점/${maxScore}점`;

  if (isLoading)
    return <LoadingUi className="mx-auto mt-96 flex w-full justify-center" />;
  if (isError)
    return <NotFound statusCode={error.response?.status ?? error.message} />;
  return (
    <>
      <ExamHeaderContainer>
        <ExamHeaderTitle
          title={exam?.exam.title ?? "쪽지시험"}
          subText={resultSummaryText}
        />
      </ExamHeaderContainer>
      <main>
        <div className="bg-primary-100 mt-32 h-29.5 py-7">
          <div className={cn(EXAM_LAYOUT_BASE, "flex flex-col gap-1")}>
            <span className="text-3xl font-bold tracking-tight">
              쪽지시험 응시 결과
            </span>
            <span className="text-neutral-700">
              고생 많으셨어요😊 틀린 문제는 해설을 보며 꼭 복습해보세요.
              앞으로의 성장을 기대하겠습니다!
            </span>
          </div>
        </div>
        <ExamContentContainer>
          {exam?.questions.map((question) => (
            <ExamQuestionResult key={question.id} question={question} />
          ))}
        </ExamContentContainer>
        <ExamBottomButton type="link" label="완료" to="/my-page/exams" />
      </main>
    </>
  );
}

export default ExamResult;
