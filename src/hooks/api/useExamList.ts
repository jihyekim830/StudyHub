import type {
  ExamListResponse,
  ExamListResponseDto,
} from "@/types/api-response-type/exam-response-types";
import {
  useInfiniteQuery,
  type InfiniteData,
  type UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { getExamList } from "@/api/exams";
import type { AxiosError } from "axios";
import type { Exam, ExamDto } from "@/types";

type ExamListQueryOptions = Omit<
  UseInfiniteQueryOptions<
    ExamListResponseDto,
    AxiosError,
    InfiniteData<ExamListResponse>
  >,
  "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam" | "select"
>;

function useExamList(options?: ExamListQueryOptions) {
  return useInfiniteQuery({
    queryKey: ["exams", "list"] as const,
    queryFn: ({ pageParam }) => getExamList(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.has_next ? lastPage.page + 1 : undefined,
    select: convertExamList,
    ...options,
  });
}

export default useExamList;

const convertExamList = (
  data: InfiniteData<ExamListResponseDto>
): InfiniteData<ExamListResponse> => ({
  pages: data.pages.map((item) => ({
    page: item.page,
    hasNext: item.has_next,
    results: item.results.map(convertExam),
  })),
  pageParams: data.pageParams,
});

const convertExam = (exam: ExamDto): Exam => ({
  id: exam.id,
  submissionId: exam.submission_id,
  exam: {
    id: exam.exam.id,
    title: exam.exam.title,
    thumbnailImgUrl: exam.exam.thumbnail_img_url,
    subject: {
      id: exam.exam.subject.id,
      title: exam.exam.subject.title,
      thumbnailImgUrl: exam.exam.subject.thumbnail_img_url,
    },
  },
  questionCount: exam.question_count,
  totalScore: exam.total_score,
  examInfo: {
    status: exam.exam_info.status,
    score: exam.exam_info.score,
    correctAnswerCount: exam.exam_info.correct_answer_count,
  },
  isDone: exam.is_done,
  durationTime: exam.duration_time,
});
