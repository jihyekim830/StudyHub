import { submitExam } from "@/api/exams";
import type { ExamSubmitRequest } from "@/types/api-request-type/exam-request-types";
import type { ExamSubmitResponse } from "@/types/api-response-type/exam-response-types";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

type SubmitExamOptions = Omit<
  UseMutationOptions<ExamSubmitResponse, AxiosError, ExamSubmitRequest>,
  "mutationFn"
>;

function useSubmitExam(options?: SubmitExamOptions) {
  return useMutation({
    mutationFn: submitExam,
    ...options,
  });
}

export default useSubmitExam;
