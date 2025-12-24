import { http, HttpResponse, type PathParams } from "msw";
import { mockLoginResponse } from "@/mocks/data/auth-data";
import { API_PATHS, MSW_BASE_URL } from "@/constants";
import type { LoginRequest } from "@/types/api-request-type/auth-request-type";
import type {
  LoginResponse,
  ErrorResponse,
  ExpiredAccountErrorResponse,
} from "@/types/api-response-type/auth-response-type";

const loginHandler = http.post<
  PathParams,
  LoginRequest,
  LoginResponse | ErrorResponse | ExpiredAccountErrorResponse
>(`${MSW_BASE_URL}${API_PATHS.accounts.login}`, async ({ request }) => {
  const requestBody = await request.json();
  const { email, password } = requestBody;

  if (email === "expired@gmail.com") {
    const response: ExpiredAccountErrorResponse = {
      error_detail: {
        detail: "탈퇴 신청한 계정입니다.",
        expire_at: "2025-11-11",
      },
    };

    return HttpResponse.json(response, { status: 403 });
  }

  if (email === "test@gmail.com" && password === "1234") {
    return HttpResponse.json(mockLoginResponse, { status: 200 });
  }

  return HttpResponse.json(
    { message: "아이디 또는 비밀번호가 일치하지 않습니다." },
    { status: 401 }
  );
});

export const authHandlers = [loginHandler];
