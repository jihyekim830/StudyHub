import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { findUserPassword } from "@/api/auth";
import type { AxiosError } from "axios";

interface FindPasswordRequest {
  emailToken: string;
  newPassword: string;
}

interface FindPasswordResponse {
  detail: string;
}

interface FindPasswordError {
  error_detail?: string;
}

type UseFindPasswordOptions = Omit<
  UseMutationOptions<
    FindPasswordResponse,
    AxiosError<FindPasswordError>,
    FindPasswordRequest
  >,
  "mutationFn"
>;

export const useFindPassword = (options?: UseFindPasswordOptions) => {
  return useMutation({
    mutationFn: findUserPassword,
    ...options,
  });
};
