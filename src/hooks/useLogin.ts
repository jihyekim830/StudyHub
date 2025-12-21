import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { loginUser } from "@/api/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import type { LoginRequest } from "@/types/api-request-type/auth-request-type";
import type {
  LoginResponse,
  ErrorResponse,
} from "@/types/api-response-type/auth-response-type";

type LoginMutationOptions = UseMutationOptions<
  LoginResponse,
  AxiosError<ErrorResponse>,
  LoginRequest
>;

export const useLoginMutation = (options?: LoginMutationOptions) => {
  const navigate = useNavigate();
  const { setAccessToken } = useAuthStore();

  return useMutation({
    mutationFn: loginUser,
    ...options,
    onSuccess: (data, variables, context) => {
      const { access_token: accessToken } = data;
      console.log("로그인 성공!", data);
      setAccessToken(accessToken);
      navigate("/");

      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      console.log("로그인 실패...", error);

      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
  });
};
