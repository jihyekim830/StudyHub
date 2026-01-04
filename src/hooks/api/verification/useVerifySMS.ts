import { API_PATHS } from "@/constants";
import { API_BASE_URL } from "@/constants/api-paths";
import { api } from "@/lib";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type {
  SMSVerifyServerResponse,
  SMSVerifyResponse,
  SignupErrorResponse,
} from "@/types/api-response-type/auth-response-type";

type VerifySMSMutationOptions = Omit<
  UseMutationOptions<
    SMSVerifyResponse,
    AxiosError<SignupErrorResponse>,
    { phoneNumber: string; code: string }
  >,
  "mutateFn"
>;

export default function useVerifySMS(options?: VerifySMSMutationOptions) {
  return useMutation({
    mutationFn: async ({ phoneNumber, code }) => {
      const response = await api.post<SMSVerifyServerResponse>(
        `${API_BASE_URL}${API_PATHS.accounts.verification.verfiySMS}`,
        {
          phone_number: phoneNumber,
          sms_code: code,
        }
      );
      return {
        detail: response.data.detail,
        smsToken: response.data.sms_token,
      };
    },
    ...options,
  });
}
