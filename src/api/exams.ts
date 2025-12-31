import { API_PATHS, MSW_BASE_URL } from "@/constants";
import { api } from "@/lib";
import type { ExamSubmitRequest } from "@/types/api-request-type/exam-request-types";
import type {
  ExamCheatingResponseDto,
  ExamListResponseDto,
  ExamQuestionListResponseDto,
  ExamResultResponseDto,
  ExamStatusResponseDto,
  ExamSubmitResponseDto,
} from "@/types/api-response-type/exam-response-types";

export const checkExamCode = (
  deploymentId: number,
  code: string
): Promise<void> =>
  api.post(
    `${MSW_BASE_URL}${API_PATHS.exams.deployments.checkCode(deploymentId)}`,
    { code }
  );

export const getExamList = async (
  page: number = 1
): Promise<ExamListResponseDto> => {
  const response = await api.get(
    `${MSW_BASE_URL}${API_PATHS.exams.deployments.list(page)}`
  );

  return response.data;
};

export const getExamQuestionList = async (
  deploymentId: number
): Promise<ExamQuestionListResponseDto> => {
  const response = await api.get(
    `${MSW_BASE_URL}${API_PATHS.exams.deployments.questionList(deploymentId)}`
  );

  return response.data;
};

export const reportExamCheating = async (
  deploymentId: number,
  event: string
): Promise<ExamCheatingResponseDto> => {
  const response = await api.post(
    `${MSW_BASE_URL}${API_PATHS.exams.deployments.cheating(deploymentId)}`,
    { event }
  );

  return response.data;
};

export const checkExamStatus = async (
  deploymentId: number
): Promise<ExamStatusResponseDto> => {
  const response = await api.get(
    `${MSW_BASE_URL}${API_PATHS.exams.deployments.status(deploymentId)}`
  );

  return response.data;
};

export const submitExam = async ({
  started_at,
  cheating_count,
  answers,
}: ExamSubmitRequest): Promise<ExamSubmitResponseDto> => {
  const response = await api.post(
    `${MSW_BASE_URL}${API_PATHS.exams.submissions.base}`,
    { started_at, cheating_count, answers }
  );

  return response.data;
};

export const getExamResult = async (
  submissionId: number
): Promise<ExamResultResponseDto> => {
  const response = await api.get(
    `${MSW_BASE_URL}${API_PATHS.exams.submissions.result(submissionId)}`
  );

  return response.data;
};
