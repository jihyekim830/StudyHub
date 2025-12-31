export interface BaseUserInfo {
  id: number;
  email: string;
  nickname: string;
  name: string;
  birthday: string;
  gender: "M" | "F";
}

export interface UserInfoResponse extends BaseUserInfo {
  phone_number: string;
  profile_img_url: string;
  created_at: string;
}

export interface UserInfo extends BaseUserInfo {
  phoneNumber: string;
  profileImgUrl: string;
  createdAt: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    email: string;
    name: string;
    nickname: string;
    profileImage: string;
    role: string;
  };
}

export interface SignupResponse {
  detail: string;
}

export interface SignupErrorResponse {
  error_detail?: string;
  errors?: Record<string, string[]>;
}

export interface EmailVerifyServerResponse {
  detail: string;
  email_token: string;
}

export interface SMSVerifyServerResponse {
  detail: string;
  sms_token: string;
}

export interface EmailVerifyResponse {
  detail: string;
  emailToken: string;
}

export interface SMSVerifyResponse {
  detail: string;
  smsToken: string;
}

export interface ErrorResponse {
  message: string;
}

export interface ExpiredAccountErrorResponse {
  error_detail: {
    detail: string;
    expire_at: string;
  };
}
