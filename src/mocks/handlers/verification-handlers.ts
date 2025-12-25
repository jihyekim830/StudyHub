import { API_PATHS, MSW_BASE_URL } from "@/constants";
import { http, HttpResponse } from "msw";

const postSendEmail = http.post(
  `${MSW_BASE_URL}${API_PATHS.accounts.verification.sendEmail}`,
  async ({ request }) => {
    const { email } = (await request.clone().json()) as { email: string };

    if (!email) {
      return HttpResponse.json(
        {
          error_detail: {
            email: ["이 필드는 필수 항목입니다."],
          },
        },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      { detail: "이메일 인증 코드가 전송되었습니다." },
      { status: 200 }
    );
  }
);

const postVerifyEmail = http.post(
  `${MSW_BASE_URL}${API_PATHS.accounts.verification.verfiyEmail}`,
  async ({ request }) => {
    const { email, code } = (await request.clone().json()) as {
      email: string;
      code: string;
    };

    if (!email || !code) {
      return HttpResponse.json(
        {
          error_detail: {
            email: email ? undefined : ["이 필드는 필수 항목입니다."],
            code: code ? undefined : ["이 필드는 필수 항목입니다."],
          },
        },
        { status: 400 }
      );
    }

    if (code !== "qwer12") {
      return HttpResponse.json(
        {
          error_detail: {
            message: "인증코드가 올바르지 않습니다.",
          },
        },
        { status: 403 }
      );
    }
    return HttpResponse.json(
      { detail: "이메일 인증에 성공했습니다." },
      { status: 200 }
    );
  }
);

const postSendSMS = http.post(
  `${MSW_BASE_URL}${API_PATHS.accounts.verification.sendSMS}`,
  async ({ request }) => {
    const { phone_number } = (await request.clone().json()) as {
      phone_number: string;
    };

    if (!phone_number) {
      return HttpResponse.json(
        {
          error_detail: {
            phone_number: ["이 필드는 필수 항목입니다."],
          },
        },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      { detail: "휴대폰 인증 코드가 전송되었습니다." },
      { status: 200 }
    );
  }
);

const postVerifySMS = http.post(
  `${MSW_BASE_URL}${API_PATHS.accounts.verification.verfiySMS}`,
  async ({ request }) => {
    const { phone_number, code } = (await request.clone().json()) as {
      phone_number: string;
      code: string;
    };

    if (!phone_number || !code) {
      return HttpResponse.json(
        {
          error_detail: {
            email: phone_number ? undefined : ["이 필드는 필수 항목입니다."],
            code: code ? undefined : ["이 필드는 필수 항목입니다."],
          },
        },
        { status: 400 }
      );
    }

    if (code !== "111111") {
      return HttpResponse.json(
        {
          error_detail: {
            message: "인증코드가 올바르지 않습니다.",
          },
        },
        { status: 403 }
      );
    }
    return HttpResponse.json(
      { detail: "휴대폰 인증에 성공했습니다." },
      { status: 200 }
    );
  }
);

export const verificationHandlers = [
  postSendEmail,
  postVerifyEmail,
  postSendSMS,
  postVerifySMS,
];
