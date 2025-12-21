import type { LoginResponse } from "@/types/api-response-type/auth-response-type";

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
