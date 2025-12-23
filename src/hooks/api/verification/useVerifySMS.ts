import { API_PATHS, MSW_BASE_URL } from "@/constants";
import { api } from "@/lib";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

type VerifySMSMutationOptons = Omit<
  UseMutationOptions<
    unknown,
    AxiosError,
    { phoneNumber: string; code: string }
  >,
  "mutateFn"
>;

export default function useVerifySMS(options?: VerifySMSMutationOptons) {
  return useMutation({
    mutationFn: async ({ phoneNumber, code }) => {
      await api.post(
        `${MSW_BASE_URL}${API_PATHS.accounts.verification.verfiySMS}`,
        {
          phone_number: phoneNumber,
          code,
        }
      );
    },
    ...options,
  });
}
