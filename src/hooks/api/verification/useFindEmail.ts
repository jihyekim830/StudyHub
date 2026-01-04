import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { findUserEmail } from "@/api/auth";
import type { AxiosError } from "axios";

interface FindEmailRequest {
  name: string;
  smsToken: string;
}

interface FindEmailResponse {
  maskedEmail: string;
}

interface FindEmailError {
  error_detail?: string;
}

type UseFindEmailOptions = Omit<
  UseMutationOptions<
    FindEmailResponse,
    AxiosError<FindEmailError>,
    FindEmailRequest
  >,
  "mutationFn"
>;

export const useFindEmail = (options?: UseFindEmailOptions) => {
  return useMutation({
    mutationFn: findUserEmail,
    ...options,
  });
};
