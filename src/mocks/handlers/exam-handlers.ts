import { API_PATHS, MSW_BASE_URL } from "@/constants";
import { http, HttpResponse } from "msw";
import {
  cheatingState,
  examList,
  questionList,
  questionResultList,
} from "@/mocks/data/exam-data";
import type {
  ExamCheatingResponseDto,
  ExamListResponseDto,
  ExamQuestionListResponseDto,
  ExamResultResponseDto,
  ExamStatusResponseDto,
  ExamSubmitResponseDto,
} from "@/types/api-response-type/exam-response-types";
import type { ExamCheatingRequest } from "@/types/api-request-type/exam-request-types";

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
    has_next: page < LAST_PAGE,
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
      { error_detail: "응시 코드가 일치하지 않습니다. " },
      { status: 400 }
    );
  }
);

const getExamQuestionList = http.get(
  `${MSW_BASE_URL}${API_PATHS.exams.deployments.base}/:deploymentId`,
  ({ params }) => {
    const { deploymentId } = params;

    if (deploymentId === "1")
      return HttpResponse.json<ExamQuestionListResponseDto>({
        exam_id: 1,
        exam_name: "TypeScript 기본 문법 테스트",
        duration_time: 30,
        elapsed_time: 0,
        cheating_count: 0,
        questions: questionList,
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

const submitExam = http.post(
  `${MSW_BASE_URL}${API_PATHS.exams.submissions.base}`,
  () => {
    return HttpResponse.json<ExamSubmitResponseDto>({
      submission_id: 350,
      score: 85,
      correct_answer_count: 17,
      redirect_url: "/exam/result/350",
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
  ({ params }) => {
    const { submissionId } = params;

    if (submissionId === "350") {
      return HttpResponse.json<ExamResultResponseDto>({
        id: 1,
        submitter_id: 1,
        deployment_id: 1,
        exam: {
          id: 1,
          title: "TypeScript 기본 문법 테스트",
          thumbnail_img_url: "https://cdn.exam/logo.png",
        },
        questions: questionResultList,
        cheating_count: 1,
        total_score: 40,
        correct_answer_count: 3,
        elapsed_time: "14:29:07.503Z",
        started_at: "2025-12-31T15:20:35.033Z",
        submitted_at: "2025-12-31T15:20:35.033Z",
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
