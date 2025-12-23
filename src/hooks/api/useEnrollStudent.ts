import { API_PATHS, MSW_BASE_URL } from "@/constants";
import { api } from "@/lib";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

type EnrollStudentMutationOptions = Omit<
  UseMutationOptions<unknown, AxiosError, { cohortId: number }>,
  "mutateFn"
>;

export default function useEnrollStudent(
  options?: EnrollStudentMutationOptions
) {
  return useMutation({
    mutationFn: async ({ cohortId }) => {
      await api.post(`${MSW_BASE_URL}${API_PATHS.accounts.enrollStudent}`, {
        cohort_id: cohortId,
      });
    },
    ...options,
  });
}
