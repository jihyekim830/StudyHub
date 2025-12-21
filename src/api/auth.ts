import { api } from "@/lib";
import { API_PATHS, MSW_BASE_URL } from "@/constants";
import type { LoginRequest } from "@/types/api-request-type/auth-request-type";

export const loginUser = async (userData: LoginRequest) => {
  const { data } = await api.post(
    `${MSW_BASE_URL}${API_PATHS.accounts.login}`,
    userData
  );
  return data;
};
