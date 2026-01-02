import { getExamResult } from "@/api/exams";
import { EXAM_QUESTION_TYPE_DTO_TO_MODEL_MAP } from "@/constants";
import type { QuestionResult, QuestionResultDto } from "@/types";
import type {
  ExamResultResponse,
  ExamResultResponseDto,
} from "@/types/api-response-type/exam-response-types";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

type ExamResultQueryOptions = Omit<
  UseQueryOptions<ExamResultResponseDto, AxiosError, ExamResultResponse>,
  | "queryKey"
  | "queryFn"
  | "select"
  | "staleTime"
  | "gcTime"
  | "refetchOnMount"
  | "refetchOnReconnect"
  | "refetchOnWindowFocus"
>;

const HOUR = 1000 * 60 * 60;

function useExamResult(submissionId: number, options?: ExamResultQueryOptions) {
  return useQuery({
    queryKey: ["exams", "submissions", submissionId],
    queryFn: () => getExamResult(submissionId),
    select: convertExamResult,
    staleTime: 2 * HOUR,
    gcTime: 3 * HOUR,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    ...options,
  });
}

export default useExamResult;

const convertExamResult = (
  data: ExamResultResponseDto
): ExamResultResponse => ({
  id: data.id,
  submitterId: data.submitter_id,
  deploymentId: data.deployment_id,
  exam: {
    id: data.exam.id,
    title: data.exam.title,
    thumbnailImgUrl: data.exam.thumbnail_img_url,
  },
  questions: convertQuestionList(data.questions),
  cheatingCount: data.cheating_count,
  totalScore: data.total_score,
  correctAnswerCount: data.correct_answer_count,
  elapsedTime: data.elapsed_time,
  startedAt: data.started_at,
  submittedAt: data.submitted_at,
});

const convertQuestionList = (
  questionList: QuestionResultDto[]
): QuestionResult[] =>
  questionList.map((question) => ({
    id: question.id,
    question: question.question,
    prompt: question.prompt,
    blankCount: question.blank_count,
    options: question.options,
    type: EXAM_QUESTION_TYPE_DTO_TO_MODEL_MAP[question.type],
    answer: question.answer,
    point: question.point,
    explanation: question.explanation,
    isCorrect: question.is_correct,
    submittedAnswer: question.submitted_answer,
  }));
