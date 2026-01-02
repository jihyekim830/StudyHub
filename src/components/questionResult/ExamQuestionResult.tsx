import { QuestionHeader } from "@/components";
import type { QuestionResult } from "@/types";
import { EXAM_QUESTION_RESULT_CONTENT_MAP } from "@/components/questionResult/exam-question-result-content-map";
import { EXAM_QUESTION_CONTENT_LAYOUT_BASE } from "@/constants";

interface ExamQuestionResultProps {
  question: QuestionResult;
}

function ExamQuestionResult({ question }: ExamQuestionResultProps) {
  const ContentComponent = EXAM_QUESTION_RESULT_CONTENT_MAP[question.type];

  return (
    <li>
      <QuestionHeader
        questionNumber={question.id}
        question={question.question}
        point={question.point}
        type={question.type}
      />
      <div className={EXAM_QUESTION_CONTENT_LAYOUT_BASE}>
        <ContentComponent question={question} />
      </div>
    </li>
  );
}

export default ExamQuestionResult;
