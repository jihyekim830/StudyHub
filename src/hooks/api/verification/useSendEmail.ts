import { API_PATHS } from "@/constants";
import { API_BASE_URL } from "@/constants/api-paths";
import { api } from "@/lib";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { SignupErrorResponse } from "@/types/api-response-type/auth-response-type";

export interface SendEmailRequest {
  email: string;
  purpose?: "signup" | "find" | "restore";
}

type SendEmailMutationOptons = Omit<
  UseMutationOptions<
    unknown,
    AxiosError<SignupErrorResponse>,
    SendEmailRequest
  >,
  "mutateFn"
>;

export default function useSendEmail(options?: SendEmailMutationOptons) {
  return useMutation<
    unknown,
    AxiosError<SignupErrorResponse>,
    SendEmailRequest
  >({
    mutationFn: async ({ email, purpose = "restore" }) => {
      await api.post(
        `${API_BASE_URL}${API_PATHS.accounts.verification.sendEmail}`,
        {
          email,
          purpose,
        }
      );
    },
    ...options,
  });
}
