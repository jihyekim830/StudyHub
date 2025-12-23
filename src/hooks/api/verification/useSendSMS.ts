import { API_PATHS, MSW_BASE_URL } from "@/constants";
import { api } from "@/lib";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

type SendSMSMutationOptons = Omit<
  UseMutationOptions<unknown, AxiosError, { phoneNumber: string }>,
  "mutateFn"
>;

export default function useSendSMS(options?: SendSMSMutationOptons) {
  return useMutation({
    mutationFn: async ({ phoneNumber }) => {
      await api.post(
        `${MSW_BASE_URL}${API_PATHS.accounts.verification.sendSMS}`,
        {
          phone_number: phoneNumber,
        }
      );
    },
    ...options,
  });
}
