import { API_PATHS, MSW_BASE_URL } from "@/constants";
import { http, HttpResponse, type PathParams } from "msw";
import {
  cheatingState,
  examList,
  examSubmission,
  reactQuestionList,
  reactQuestionResultList,
} from "@/mocks/data/exam-data";
import type {
  ExamCheatingResponseDto,
  ExamListResponseDto,
  ExamResultResponseDto,
  ExamStatusResponseDto,
  ExamSubmitResponseDto,
} from "@/types/api-response-type/exam-response-types";
import type {
  ExamCheatingRequest,
  ExamSubmitRequest,
} from "@/types/api-request-type/exam-request-types";
import type { AnswerDto, QuestionTypeDto } from "@/types";

const PAGE_SIZE = 5;
const LAST_PAGE = 10;
const getExamListResponse = (page: number): ExamListResponseDto => {
  const results = Array.from({ length: PAGE_SIZE }, (_, index) => {
    const exam = examList[index % examList.length];
    const id = page === 1 ? index : index + PAGE_SIZE * page;

    return {
      ...exam,
      id,
    };
  });

  return {
    page,
    size: PAGE_SIZE,
    count: results.length,
    previous: page === 1 ? false : true,
    next: page < LAST_PAGE,
    results,
  };
};

const getExamList = http.get(
  `${MSW_BASE_URL}${API_PATHS.exams.deployments.base}`,
  ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page"));

    return HttpResponse.json(getExamListResponse(page));

    // 에러 테스트 코드
    // return HttpResponse.json(
    //   { error_detail: "자격 인증 데이터가 제공되지 않았습니다." },
    //   { status: 401 }
    // );
  }
);

const checkExamCode = http.post(
  `${MSW_BASE_URL}${API_PATHS.exams.deployments.base}/:deploymentId/check-code`,
  async ({ request }) => {
    const { code } = (await request.json()) as { code: string };

    if (code === "111111") return HttpResponse.json(null, { status: 204 });
    return HttpResponse.json(
      { error_detail: "응시 코드가 일치하지 않습니다." },
      { status: 400 }
    );
  }
);

const getExamQuestionList = http.get(
  `${MSW_BASE_URL}${API_PATHS.exams.deployments.base}/:deploymentId`,
  ({ params }) => {
    const { deploymentId } = params;

    if (typeof deploymentId === "string")
      return HttpResponse.json({
        exam_id: Number(deploymentId),
        exam_name: "React 쪽지시험",
        duration_time: 60,
        elapsed_time: 0,
        cheating_count: 0,
        questions: reactQuestionList,
      });
    return HttpResponse.json(
      { error_detail: "해당 시험 정보를 찾을 수 없습니다." },
      { status: 404 }
    );
  }
);

const reportExamCheating = http.post(
  `${MSW_BASE_URL}${API_PATHS.exams.deployments.base}/:deploymentId/cheating`,
  async ({ request }) => {
    const { event } = (await request.json()) as ExamCheatingRequest;

    if (event !== "focus_out")
      return HttpResponse.json(
        { error_detail: "유효하지 않은 시험 응시 세션입니다." },
        { status: 400 }
      );

    cheatingState.cheating_count++;
    if (cheatingState.cheating_count > 2)
      cheatingState.is_forced_submitted = true;

    return HttpResponse.json<ExamCheatingResponseDto>(cheatingState);
  }
);

const checkExamStatus = http.get(
  `${MSW_BASE_URL}${API_PATHS.exams.deployments.base}/:deploymentId/status`,
  () => {
    return HttpResponse.json<ExamStatusResponseDto>({
      exam_status: "activated",
      force_submit: false,
    });

    // deactivated 테스트 코드
    // return HttpResponse.json<ExamStatusResponse>({
    //   exam_status: "deactivated",
    //   force_submit: true,
    // });
  }
);

const isCorrectAnswer = (
  type: QuestionTypeDto,
  answer: string[],
  submittedAnswer: string[]
): boolean => {
  switch (type) {
    case "single_choice":
    case "short_answer":
    case "ox":
      return submittedAnswer[0] === answer[0];

    case "multiple_choice":
      return (
        submittedAnswer.length === answer.length &&
        submittedAnswer.every((item) => answer.includes(item))
      );

    case "fill_blank":
    case "ordering":
      return submittedAnswer.every((item, index) => item === answer[index]);

    default:
      return false;
  }
};

const getSubmittedAnswer = (
  submittedAnswer: unknown,
  defaultValue: string[]
) => {
  if (typeof submittedAnswer === "string") return [submittedAnswer];
  if (Array.isArray(submittedAnswer) && typeof submittedAnswer[0] === "string")
    return submittedAnswer as string[];
  return defaultValue;
};

const gradeExam = (answers: AnswerDto[]) => {
  answers.forEach((answer) => {
    const questionResult = reactQuestionResultList.find(
      (item) => item.id === answer.question_id
    );

    if (!questionResult) return;

    const submittedAnswer = getSubmittedAnswer(
      answer.submitted_answer,
      questionResult.submitted_answer
    );

    questionResult.submitted_answer = submittedAnswer;
    questionResult.is_correct = isCorrectAnswer(
      answer.type,
      questionResult.answer,
      submittedAnswer
    );
  });
};

const accumulateScore = (
  score: number,
  { point, is_correct }: { point: number; is_correct: boolean }
) => {
  if (is_correct) return score + point;
  return score;
};

const accumulateCorrectCount = (
  count: number,
  { is_correct }: { is_correct: boolean }
) => {
  if (is_correct) return count + 1;
  return count;
};

const getElapsedTime = (startedAt: string, submittedAt: string) => {
  const difference =
    new Date(submittedAt).getTime() - new Date(startedAt).getTime();

  const minutes = String(Math.floor(difference / 6000)).padStart(2, "0");
  const seconds = String(Math.floor((difference % 6000) / 1000)).padStart(
    2,
    "0"
  );

  return `00:${minutes}:${seconds}`;
};

const submitExam = http.post<PathParams, ExamSubmitRequest>(
  `${MSW_BASE_URL}${API_PATHS.exams.submissions.base}`,
  async ({ request }) => {
    const { started_at, answers } = await request.clone().json();
    gradeExam(answers);

    const submittedAt = new Date().toISOString();
    examSubmission.submitted_at = submittedAt;
    examSubmission.started_at = started_at;
    examSubmission.elapsed_time = getElapsedTime(started_at, submittedAt);
    examSubmission.score = reactQuestionResultList.reduce(accumulateScore, 0);

    const correctAnswerCount = reactQuestionResultList.reduce(
      accumulateCorrectCount,
      0
    );
    examSubmission.correct_answer_count = correctAnswerCount;

    return HttpResponse.json<ExamSubmitResponseDto>({
      submission_id: 1,
      score: examSubmission.score,
      correct_answer_count: correctAnswerCount,
      redirect_url: "/exam/result/1",
    });

    // 에러 테스트 코드
    // return HttpResponse.json(
    //   { error_detail: "자격 인증 데이터가 제공되지 않았습니다." },
    //   { status: 401 }
    // );
    // return HttpResponse.json(null, { status: 500 });
  }
);

const getExamResult = http.get(
  `${MSW_BASE_URL}${API_PATHS.exams.submissions.base}/:submissionId`,
  async ({ params }) => {
    const { submissionId } = params;
    if (submissionId === "1") {
      return HttpResponse.json<ExamResultResponseDto>({
        id: 1,
        submitter_id: 1,
        deployment_id: 4,
        exam: {
          id: 1,
          title: "React 쪽지시험",
          thumbnail_img_url: "https://cdn.exam/logo.png",
        },
        questions: reactQuestionResultList,
        cheating_count: cheatingState.cheating_count,
        total_score: examSubmission.score,
        correct_answer_count: examSubmission.correct_answer_count,
        elapsed_time: examSubmission.elapsed_time,
        started_at: examSubmission.started_at,
        submitted_at: examSubmission.submitted_at,
      });
    }
    return HttpResponse.json(
      { error_detail: "유효하지 않은 시험 응시 세션입니다." },
      { status: 400 }
    );
  }
);

export const examHandlers = [
  getExamList,
  checkExamCode,
  getExamQuestionList,
  reportExamCheating,
  checkExamStatus,
  submitExam,
  getExamResult,
];
