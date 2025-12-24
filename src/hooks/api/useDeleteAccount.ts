import { API_PATHS, MSW_BASE_URL } from "@/constants";
import { api } from "@/lib";
import type { AccountDeleteReason } from "@/types/api-request-type/account-request-types";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

type DeleteAccountOptions = Omit<
  UseMutationOptions<
    unknown,
    AxiosError,
    { deleteReason: AccountDeleteReason; detailReason: string }
  >,
  "mutateFn"
>;

export default function useDeleteAccount(options?: DeleteAccountOptions) {
  return useMutation({
    mutationFn: async ({ deleteReason, detailReason }) => {
      await api.delete(`${MSW_BASE_URL}${API_PATHS.accounts.me}`, {
        params: {
          reason: deleteReason,
          reason_detail: detailReason,
        },
      });
    },
    ...options,
  });
}
