import { getExamQuestionList } from "@/api/exams";
import { EXAM_QUESTION_TYPE_DTO_TO_MODEL_MAP } from "@/constants";
import type { Question, QuestionDto } from "@/types";
import type {
  ExamQuestionListResponse,
  ExamQuestionListResponseDto,
} from "@/types/api-response-type/exam-response-types";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

type ExamQuestionListQueryOptions = Omit<
  UseQueryOptions<
    ExamQuestionListResponseDto,
    AxiosError,
    ExamQuestionListResponse
  >,
  | "queryKey"
  | "queryFn"
  | "staleTime"
  | "gcTime"
  | "refetchOnWindowFocus"
  | "refetchOnReconnect"
  | "refetchOnMount"
  | "select"
>;

const MINUTE = 1000 * 60;

function useExamQuestionList(
  deploymentId: number,
  examDuration: number,
  options?: ExamQuestionListQueryOptions
) {
  return useQuery({
    queryKey: ["exams", deploymentId, "questions"] as const,
    queryFn: () => getExamQuestionList(deploymentId),
    staleTime: Infinity,
    gcTime: examDuration * MINUTE + 5 * MINUTE,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    select: convertExamQuestionList,
    ...options,
  });
}

export default useExamQuestionList;

const convertExamQuestionList = (
  data: ExamQuestionListResponseDto
): ExamQuestionListResponse => ({
  examId: data.exam_id,
  examName: data.exam_name,
  durationTime: data.duration_time,
  elapsedTime: data.elapsed_time,
  cheatingCount: data.cheating_count,
  questions: data.questions.map(convertExamQuestion),
});

const convertExamQuestion = (question: QuestionDto): Question => ({
  questionId: question.question_id,
  number: question.number,
  type: EXAM_QUESTION_TYPE_DTO_TO_MODEL_MAP[question.type],
  question: question.question,
  point: question.point,
  prompt: question.prompt,
  blankCount: question.blank_count,
  options: question.options,
  answerInput: question.answer_input,
});
