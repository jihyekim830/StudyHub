import { reportExamCheating } from "@/api/exams";
import type { ExamCheatingRequest } from "@/types/api-request-type/exam-request-types";
import type { ExamCheatingResponse } from "@/types/api-response-type/exam-response-types";
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
    mutationFn: ({ deploymentId, event }) =>
      reportExamCheating(deploymentId, event),
    ...options,
  });
}

export default useReportExamCheating;
