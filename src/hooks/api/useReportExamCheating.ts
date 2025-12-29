import { reportExamCheating } from "@/api/exams";
import type { ExamCheatingRequest } from "@/types/api-request-type/exam-request-types";
import type {
  ExamCheatingResponse,
  ExamCheatingResponseDto,
} from "@/types/api-response-type/exam-response-types";
import { useMutation, type MutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

type ReportExamCheatingOptions = Omit<
  MutationOptions<
    ExamCheatingResponse,
    AxiosError,
    ExamCheatingRequest & { deploymentId: number }
  >,
  "mutationFn"
>;

function useReportExamCheating(options?: ReportExamCheatingOptions) {
  return useMutation({
    mutationFn: async ({ deploymentId, event }) => {
      const data = await reportExamCheating(deploymentId, event);
      return convertExamCheatingResponse(data);
    },
    ...options,
  });
}

export default useReportExamCheating;

const convertExamCheatingResponse = (
  data: ExamCheatingResponseDto
): ExamCheatingResponse => ({
  cheatingCount: data.cheating_count,
  isForcedSubmitted: data.is_forced_submitted,
});
