import { api } from "@/lib";
import { API_PATHS, MSW_BASE_URL } from "@/constants";
import type { LoginRequest } from "@/types/api-request-type/auth-request-type";
import type {
  LoginResponse,
  UserInfoResponse,
} from "@/types/api-response-type/auth-response-type";
import type { SignupRequest } from "@/types/api-request-type/auth-request-type";
import type { SignupResponse } from "@/types/api-response-type/auth-response-type";

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post(
    `${MSW_BASE_URL}${API_PATHS.accounts.login}`,
    data
  );
  return response.data;
};

export const getUserMe = async (): Promise<UserInfoResponse> => {
  const response = await api.get(`${MSW_BASE_URL}${API_PATHS.accounts.me}`);
  return response.data;
};

export const checkNickname = async (nickname: string) => {
  const response = await api.get(
    `${MSW_BASE_URL}${API_PATHS.accounts.checkNickname}`,
    {
      params: { nickname },
    }
  );
  return response.data;
};

export const signupUser = async (
  data: SignupRequest
): Promise<SignupResponse> => {
  const response = await api.post(
    `${MSW_BASE_URL}${API_PATHS.accounts.signup}`,
    data
  );
  return response.data;
};
