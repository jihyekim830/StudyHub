import { API_PATHS, MSW_BASE_URL } from "@/constants";
import { api } from "@/lib";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

type VerifyEmailMutationOptons = Omit<
  UseMutationOptions<unknown, AxiosError, { email: string; code: string }>,
  "mutateFn"
>;

export default function useVerifyEmail(options?: VerifyEmailMutationOptons) {
  return useMutation({
    mutationFn: async ({ email, code }) => {
      await api.post(
        `${MSW_BASE_URL}${API_PATHS.accounts.verification.verfiyEmail}`,
        {
          email,
          code,
        }
      );
    },
    ...options,
  });
}
