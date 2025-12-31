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
  examTitle: data.exam_title,
  thumbnailImgUrl: data.thumbnail_img_url,
  duration: data.duration,
  score: data.score,
  totalScore: data.total_score,
  cheatingCount: data.cheating_count,
  questions: convertQuestionList(data.questions),
});

const convertQuestionList = (
  questionList: QuestionResultDto[]
): QuestionResult[] =>
  questionList.map((question) => ({
    questionId: question.question_id,
    number: question.number,
    type: EXAM_QUESTION_TYPE_DTO_TO_MODEL_MAP[question.type],
    question: question.question,
    point: question.point,
    prompt: question.prompt,
    options: question.options,
    submittedAnswer: question.submitted_answer,
    correctAnswer: question.correct_answer,
    isCorrect: question.is_correct,
    explanation: question.explanation,
  }));
