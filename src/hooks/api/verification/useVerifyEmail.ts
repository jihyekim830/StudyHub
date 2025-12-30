import { API_PATHS, MSW_BASE_URL } from "@/constants";
import { api } from "@/lib";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type {
  EmailVerifyServerResponse,
  EmailVerifyResponse,
} from "@/types/api-response-type/auth-response-type";

type VerifyEmailMutationOptions = Omit<
  UseMutationOptions<
    EmailVerifyResponse,
    AxiosError,
    { email: string; code: string }
  >,
  "mutateFn"
>;

export default function useVerifyEmail(options?: VerifyEmailMutationOptions) {
  return useMutation({
    mutationFn: async ({ email, code }) => {
      const response = await api.post<EmailVerifyServerResponse>(
        `${MSW_BASE_URL}${API_PATHS.accounts.verification.verfiyEmail}`,
        {
          email,
          code,
        }
      );
      return {
        detail: response.data.detail,
        emailToken: response.data.email_token,
      };
    },
    ...options,
  });
}
