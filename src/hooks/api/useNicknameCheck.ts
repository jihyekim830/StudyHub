import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { checkNickname } from "@/api/auth";
import { AxiosError } from "axios";

type NicknameCheckOptions = Omit<
  UseMutationOptions<
    { detail: string },
    AxiosError<{ error_detail: string }>,
    string
  >,
  "mutationFn"
>;

export const useNicknameCheck = (options?: NicknameCheckOptions) => {
  return useMutation({
    mutationFn: (nickname: string) => checkNickname(nickname),
    ...options,
  });
};
