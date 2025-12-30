import { http, HttpResponse, type PathParams } from "msw";
import {
  mockLoginResponse,
  mockUserInfoResponse,
} from "@/mocks/data/auth-data";
import { API_PATHS, MSW_BASE_URL } from "@/constants";
import type { LoginRequest } from "@/types/api-request-type/auth-request-type";
import type {
  LoginResponse,
  ErrorResponse,
  ExpiredAccountErrorResponse,
} from "@/types/api-response-type/auth-response-type";

const checkNicknameHandler = http.get(
  `${MSW_BASE_URL}${API_PATHS.accounts.checkNickname}`,
  ({ request }) => {
    const url = new URL(request.url);
    const nickname = url.searchParams.get("nickname");

    if (nickname === "test") {
      return HttpResponse.json(
        { available: false, error_detail: "중복된 닉네임이 존재합니다." },
        { status: 409 }
      );
    }

    return HttpResponse.json(
      { available: true, detail: "사용가능한 닉네임 입니다." },
      { status: 200 }
    );
  }
);

const meHandler = http.get(`${MSW_BASE_URL}${API_PATHS.accounts.me}`, () => {
  return HttpResponse.json(mockUserInfoResponse, { status: 200 });
});

const signupHandler = http.post(
  `${MSW_BASE_URL}${API_PATHS.accounts.signup}`,
  async () => {
    return HttpResponse.json(
      { detail: "회원가입이 완료되었습니다." },
      { status: 201 }
    );
  }
);

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

const changePasswordHandler = http.post(
  `${MSW_BASE_URL}${API_PATHS.accounts.changePassword}`,
  async ({ request }) => {
    const body = (await request.clone().json()) as {
      old_password: string;
      new_password: string;
    };

    const { old_password, new_password } = body;

    if (!(old_password && new_password)) {
      return HttpResponse.json({}, { status: 400 });
    }

    return HttpResponse.json({}, { status: 200 });
  }
);

export const authHandlers = [
  loginHandler,
  meHandler,
  checkNicknameHandler,
  signupHandler,
  changePasswordHandler,
];
