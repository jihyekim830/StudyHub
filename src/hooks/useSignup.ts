import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { signupUser } from "@/api/auth";
import { useToast } from "@/hooks";
import type { AxiosError } from "axios";
import type { SignupRequest } from "@/types/api-request-type/auth-request-type";
import type {
  SignupResponse,
  SignupErrorResponse,
} from "@/types/api-response-type/auth-response-type";

type UseSignupOptions = Omit<
  UseMutationOptions<
    SignupResponse,
    AxiosError<SignupErrorResponse>,
    SignupRequest
  >,
  "mutationFn" | "onSuccess" | "onError"
>;

export const useSignup = (options?: UseSignupOptions) => {
  const { triggerToast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    ...options,
    mutationFn: signupUser,
    onSuccess: () => {
      triggerToast({
        text: "회원가입이 완료되었습니다! 로그인해주세요.",
        status: "success",
        variant: "small",
      });
      navigate("/login");
    },
    onError: (error) => {
      const errorDetail = error.response?.data.error_detail;

      const message =
        typeof errorDetail === "string"
          ? errorDetail
          : "입력 정보를 다시 확인해주세요.";
      triggerToast({ text: message, status: "danger", variant: "small" });
    },
  });
};
