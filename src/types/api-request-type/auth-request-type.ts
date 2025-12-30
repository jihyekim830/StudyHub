export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  password: string;
  nickname: string;
  name: string;
  birthday: string;
  gender: "M" | "F";
  email_token: string;
  sms_token: string;
}
