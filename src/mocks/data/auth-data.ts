import type {
  LoginResponse,
  UserInfoResponse,
} from "@/types/api-response-type/auth-response-type";

export const mockLoginResponse: LoginResponse = {
  access_token: "mock-access-token-12345",
  refresh_token: "mock-refresh-token-67890",
  user: {
    id: 1,
    email: "test@gmail.com",
    name: "안순표",
    nickname: "nelfen",
    profileImage: "selife.png",
    role: "USER",
  },
};

export const mockUserInfoResponse: UserInfoResponse = {
  id: 1,
  email: "test@gmail.com",
  nickname: "nelfen",
  name: "안순표",
  phone_number: "010-1234-5678",
  birthday: "1995-01-01",
  gender: "M",
  created_at: "2025-12-26T00:00:00Z",
};
