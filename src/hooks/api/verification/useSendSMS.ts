import { API_PATHS } from "@/constants";
import { API_BASE_URL } from "@/constants/api-paths";
import { api } from "@/lib";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { SignupErrorResponse } from "@/types/api-response-type/auth-response-type";

export interface SendSMSMRequest {
  phoneNumber: string;
  purpose?: "signup" | "find" | "restore";
}

type SendSMSMutationOptons = Omit<
  UseMutationOptions<unknown, AxiosError<SignupErrorResponse>, SendSMSMRequest>,
  "mutateFn"
>;

export default function useSendSMS(options?: SendSMSMutationOptons) {
  return useMutation<unknown, AxiosError<SignupErrorResponse>, SendSMSMRequest>(
    {
      mutationFn: async ({ phoneNumber, purpose = "find" }) => {
        await api.post(
          `${API_BASE_URL}${API_PATHS.accounts.verification.sendSMS}`,
          {
            phone_number: phoneNumber,
            purpose,
          }
        );
      },
      ...options,
    }
  );
}
