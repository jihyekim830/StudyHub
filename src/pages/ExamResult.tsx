import {
  ExamBottomButton,
  ExamContentContainer,
  ExamHeaderContainer,
  ExamHeaderTitle,
} from "@/components";
import { EXAM_QUESTION_CONTENT_MAP } from "@/components/question/exam-question-content-map";
import { EXAM_LAYOUT_BASE, EXAM_QUESTION_TYPE_LABEL_MAP } from "@/constants";
import { cn } from "@/lib";
import { questionResultList } from "@/mocks/data/exam-data";

const BADGE_BASE =
  "flex h-6 items-center rounded-xs bg-neutral-200 text-neutral-700";

function ExamResult() {
  const ContentComponent = EXAM_QUESTION_CONTENT_MAP.singleChoice;

  return (
    <>
      <ExamHeaderContainer>
        <ExamHeaderTitle
          title="TypeScript 쪽지시험"
          subText="총 문항 수: 7ㆍ부정행위: 1회ㆍ응시시간: 30분ㆍ응시 결과 점수: 80점/100점"
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
        {/** TODO 실제 데이터로 교체, 결과 페이지용 컴포넌트로 교체 */}
        <ExamContentContainer>
          <li>
            <div className="flex items-start gap-4">
              <div className="flex max-w-4/5 gap-3 text-xl font-bold">
                <span>{questionResultList[0].number}.</span>
                <span className="tracking-tighter break-keep">
                  {questionResultList[0].question}
                </span>
              </div>
              <div className="mt-0.5 flex gap-2 text-xs font-semibold">
                <div className={cn("px-2", BADGE_BASE)}>
                  {questionResultList[0].point}점
                </div>
                <div className={cn("px-2.5", BADGE_BASE)}>
                  {EXAM_QUESTION_TYPE_LABEL_MAP.singleChoice}
                </div>
              </div>
            </div>
            <div className="pt-5 pl-7">
              <ContentComponent
                question={{
                  ...questionResultList[0],
                  blankCount: 0,
                  answerInput: null,
                  questionId: 1,
                  type: "singleChoice",
                }}
                value={"value"}
                onChange={() => {}}
              />
            </div>
          </li>
        </ExamContentContainer>
        {/**  TODO 마이페이지 레이아웃 추가되면 경로 수정하기*/}
        <ExamBottomButton type="link" label="완료" to="/exams" />
      </main>
    </>
  );
}

export default ExamResult;
