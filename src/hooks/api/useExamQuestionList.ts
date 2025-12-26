import { getExamQuestionList } from "@/api/exams";
import type { ExamQuestionListResponse } from "@/types/api-response-type/exam-response-types";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

type ExamQuestionListQueryOptions = Omit<
  UseQueryOptions<ExamQuestionListResponse, AxiosError>,
  | "queryKey"
  | "queryFn"
  | "staleTime"
  | "gcTime"
  | "refetchOnWindowFocus"
  | "refetchOnReconnect"
  | "refetchOnMount"
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
    ...options,
  });
}

export default useExamQuestionList;
