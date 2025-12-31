import { API_PATHS } from "@/constants";
import { API_BASE_URL } from "@/constants/api-paths";
import { api } from "@/lib";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { SignupErrorResponse } from "@/types/api-response-type/auth-response-type";

type SendEmailMutationOptons = Omit<
  UseMutationOptions<
    unknown,
    AxiosError<SignupErrorResponse>,
    { email: string }
  >,
  "mutateFn"
>;

export default function useSendEmail(options?: SendEmailMutationOptons) {
  return useMutation<
    unknown,
    AxiosError<SignupErrorResponse>,
    { email: string }
  >({
    mutationFn: async ({ email }) => {
      await api.post(
        `${API_BASE_URL}${API_PATHS.accounts.verification.sendEmail}`,
        {
          email,
        }
      );
    },
    ...options,
  });
}
