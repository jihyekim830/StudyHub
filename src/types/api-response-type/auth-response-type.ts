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

export interface ErrorResponse {
  message: string;
}

export interface ExpiredAccountErrorResponse {
  error_detail: {
    detail: string;
    expire_at: string;
  };
}
