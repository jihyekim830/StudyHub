import { API_PATHS, MSW_BASE_URL } from "@/constants";
import useToast from "@/hooks/useToast";
import { api } from "@/lib";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";

type ChangePasswordOptions = Omit<
  UseMutationOptions<
    unknown,
    AxiosError,
    { oldPassword: string; newPassword: string }
  >,
  "mutationFn" | "onSuccess" | "onError"
>;

export default function useChangePassword(options?: ChangePasswordOptions) {
  const { triggerToast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ newPassword, oldPassword }) => {
      await api.post(`${MSW_BASE_URL}${API_PATHS.accounts.changePassword}`, {
        old_password: oldPassword,
        new_password: newPassword,
      });
    },
    onSuccess: () => {
      triggerToast({
        variant: "small",
        status: "success",
        text: "비밀번호 변경에 성공했습니다.",
      });
      navigate("/my-page/profile");
    },
    onError: (error) => {
      if (error.status === 400) {
        triggerToast({
          variant: "small",
          status: "danger",
          text: "올바르지 않은 제출 형식입니다.",
        });
      } else if (error.status === 401) {
        triggerToast({
          variant: "small",
          status: "danger",
          text: "기존 비밀번호가 올바르지 않습니다.",
        });
      } else if (error.status === 500) {
        triggerToast({
          variant: "small",
          status: "danger",
          text: "서버 에러가 발생했습니다. 잠시후 다시 시도해주세요.",
        });
      } else {
        triggerToast({
          variant: "small",
          status: "danger",
          text: "알 수 없는 에러가 발생했습니다. 잠시후 다시 시도해주세요.",
        });
      }
    },
    ...options,
  });
}
