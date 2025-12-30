import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/store/useAuthStore";
import { useToast } from "@/hooks";

type UseLogoutOptions = Omit<
  UseMutationOptions<void, Error, void>,
  "mutationFn" | "onSuccess"
>;

export const useLogout = (options?: UseLogoutOptions) => {
  const { deleteAccessToken } = useAuthStore();
  const { triggerToast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    ...options,
    mutationFn: async () => {
      deleteAccessToken();
    },
    onSuccess: () => {
      triggerToast({
        text: "로그아웃 되었습니다.",
        status: "success",
        variant: "small",
      });

      navigate("/login");
    },
  });
};
