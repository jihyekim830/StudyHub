import { checkExamStatus } from "@/api/exams";
import type {
  ExamStatusResponse,
  ExamStatusResponseDto,
} from "@/types/api-response-type/exam-response-types";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

type ExamStatusPollingQueryOptions = Omit<
  UseQueryOptions<ExamStatusResponseDto, AxiosError, ExamStatusResponse>,
  | "queryKey"
  | "queryFn"
  | "staleTime"
  | "refetchInterval"
  | "refetchIntervalInBackground"
  | "select"
>;

const POLLING_INTERVAL_MS = 1000 * 5;

function useExamStatusPolling(
  deploymentId: number,
  options?: ExamStatusPollingQueryOptions
) {
  return useQuery({
    queryKey: ["exams", deploymentId, "status"],
    queryFn: () => checkExamStatus(deploymentId),
    staleTime: POLLING_INTERVAL_MS,
    refetchInterval: (query) => {
      const status = query.state.data?.exam_status;

      if (!status) return POLLING_INTERVAL_MS;
      return status === "activated" ? POLLING_INTERVAL_MS : false;
    },
    refetchIntervalInBackground: true,
    select: convertExamStatus,
    ...options,
  });
}

export default useExamStatusPolling;

const convertExamStatus = (
  data: ExamStatusResponseDto
): ExamStatusResponse => ({
  examStatus: data.exam_status,
  forceSubmit: data.force_submit,
});
