import { API_PATHS } from "@/constants";
import { API_BASE_URL } from "@/constants/api-paths";
import { api } from "@/lib";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type {
  EmailVerifyServerResponse,
  EmailVerifyResponse,
  SignupErrorResponse,
} from "@/types/api-response-type/auth-response-type";

type VerifyEmailMutationOptions = Omit<
  UseMutationOptions<
    EmailVerifyResponse,
    AxiosError<SignupErrorResponse>,
    { email: string; code: string }
  >,
  "mutateFn"
>;

export default function useVerifyEmail(options?: VerifyEmailMutationOptions) {
  return useMutation({
    mutationFn: async ({ email, code }) => {
      const response = await api.post<EmailVerifyServerResponse>(
        `${API_BASE_URL}${API_PATHS.accounts.verification.verfiyEmail}`,
        {
          email,
          email_code: code,
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
