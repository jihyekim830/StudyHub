import { api } from "@/lib";
import { API_PATHS, API_BASE_URL } from "@/constants/api-paths";
import type {
  LoginRequest,
  SignupRequest,
} from "@/types/api-request-type/auth-request-type";
import type {
  LoginResponse,
  UserInfoResponse,
  SignupResponse,
} from "@/types/api-response-type/auth-response-type";

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post(
    `${API_BASE_URL}${API_PATHS.accounts.login}`,
    data
  );
  return response.data;
};

export const getUserMe = async (): Promise<UserInfoResponse> => {
  const response = await api.get(`${API_BASE_URL}${API_PATHS.accounts.me}`);
  return response.data;
};

export const checkNickname = async (nickname: string) => {
  const response = await api.post(
    `${API_BASE_URL}${API_PATHS.accounts.checkNickname}`,
    { nickname }
  );
  return response.data;
};

export const signupUser = async (
  data: SignupRequest
): Promise<SignupResponse> => {
  const response = await api.post(
    `${API_BASE_URL}${API_PATHS.accounts.signup}`,
    data
  );
  return response.data;
};

export const findUserEmail = async (data: {
  name: string;
  smsToken: string;
}): Promise<{ maskedEmail: string }> => {
  const response = await api.post(
    `${API_BASE_URL}${API_PATHS.accounts.findEmail}`,
    {
      name: data.name,
      sms_token: data.smsToken,
    }
  );
  const { masked_email: maskedEmail } = response.data;

  return { maskedEmail };
};

export const changeProfileImage = async (image: File) => {
  const imageForm = new FormData();

  imageForm.append("image", image);

  api.patch(`${API_BASE_URL}${API_PATHS.accounts.profileImage}`, imageForm, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const findUserPassword = async (data: {
  emailToken: string;
  newPassword: string;
}): Promise<{ detail: string }> => {
  const response = await api.post(
    `${API_BASE_URL}${API_PATHS.accounts.findPassword}`,
    {
      email_token: data.emailToken,
      new_password: data.newPassword,
    }
  );

  return response.data;
};
