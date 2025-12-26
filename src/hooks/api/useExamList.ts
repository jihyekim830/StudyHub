import type { ExamListResponse } from "@/types/api-response-type/exam-response-types";
import {
  useInfiniteQuery,
  type InfiniteData,
  type UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { getExamList } from "@/api/exams";
import type { AxiosError } from "axios";

type ExamListQueryOptions = Omit<
  UseInfiniteQueryOptions<
    ExamListResponse,
    AxiosError,
    InfiniteData<ExamListResponse>
  >,
  "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
>;

function useExamList(options?: ExamListQueryOptions) {
  return useInfiniteQuery({
    queryKey: ["exams", "list"] as const,
    queryFn: ({ pageParam }) => getExamList(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.has_next ? lastPage.page + 1 : undefined,
    ...options,
  });
}

export default useExamList;
