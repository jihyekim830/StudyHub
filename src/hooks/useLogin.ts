import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { loginUser, getUserMe } from "@/api/auth";
import { transformUserInfo } from "@/lib";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import type { LoginRequest } from "@/types/api-request-type/auth-request-type";
import type {
  LoginResponse,
  ErrorResponse,
  ExpiredAccountErrorResponse,
} from "@/types/api-response-type/auth-response-type";

type LoginMutationOptions = UseMutationOptions<
  LoginResponse,
  AxiosError<ErrorResponse | ExpiredAccountErrorResponse>,
  LoginRequest
>;

export const useLoginMutation = (options?: LoginMutationOptions) => {
  const navigate = useNavigate();
  const { setAccessToken, setUserInfo } = useAuthStore();

  return useMutation({
    mutationFn: loginUser,
    ...options,
    onSuccess: async (data, variables, context) => {
      const { access_token: accessToken } = data;
      console.log("로그인 성공!", data);

      setAccessToken(accessToken);

      const MAX_RETRIES = 3;

      for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
          const rawUserInfo = await getUserMe();

          const cleanuserInfo = transformUserInfo(rawUserInfo);
          setUserInfo(cleanuserInfo);

          console.log(
            `유저 정보 저장 완료 (시도: ${attempt}회):`,
            cleanuserInfo
          );
          navigate("/");
          break;
        } catch (error) {
          console.error(`${attempt}회차 불러오기 실패:`, error);

          if (attempt >= MAX_RETRIES) {
            console.error("최대 재시도 횟수 초과");
            navigate("/");
          } else {
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        }
      }

      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};
