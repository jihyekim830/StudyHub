import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { findUserEmail } from "@/api/auth";
import type { AxiosError } from "axios";

interface FindIdRequest {
  name: string;
  smsToken: string;
}

interface FindIdResponse {
  maskedEmail: string;
}

interface FindIdError {
  error_detail?: string;
}

type UseFindEmailOptions = Omit<
  UseMutationOptions<FindIdResponse, AxiosError<FindIdError>, FindIdRequest>,
  "mutationFn"
>;

export const useFindEmail = (options?: UseFindEmailOptions) => {
  return useMutation({
    mutationFn: findUserEmail,
    ...options,
  });
};
