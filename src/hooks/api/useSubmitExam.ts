import { submitExam } from "@/api/exams";
import type { ExamSubmitRequest } from "@/types/api-request-type/exam-request-types";
import type {
  ExamSubmitResponse,
  ExamSubmitResponseDto,
} from "@/types/api-response-type/exam-response-types";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

type SubmitExamOptions = Omit<
  UseMutationOptions<ExamSubmitResponse, AxiosError, ExamSubmitRequest>,
  "mutationFn"
>;

function useSubmitExam(options?: SubmitExamOptions) {
  return useMutation({
    mutationFn: async ({ started_at, cheating_count, answers }) => {
      const data = await submitExam({ started_at, cheating_count, answers });
      return convertSubmitExamResponse(data);
    },
    ...options,
  });
}

export default useSubmitExam;

const convertSubmitExamResponse = (
  data: ExamSubmitResponseDto
): ExamSubmitResponse => ({
  submissionId: data.submission_id,
  score: data.score,
  correctAnswerCount: data.correct_answer_count,
  redirectUrl: data.redirect_url,
});
