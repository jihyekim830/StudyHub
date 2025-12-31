import type {
  UserInfoResponse,
  UserInfo,
} from "@/types/api-response-type/auth-response-type";
import type { AxiosError } from "axios";
import type { SignupErrorResponse } from "@/types/api-response-type/auth-response-type";

export const transformUserInfo = (raw: UserInfoResponse): UserInfo => {
  const { phone_number, profile_img_url, created_at, ...base } = raw;

  return {
    ...base,
    phoneNumber: phone_number,
    profileImgUrl: profile_img_url,
    createdAt: created_at,
  };
};

export const extractErrorMessage = (
  error: AxiosError<SignupErrorResponse>
): string | undefined => {
  const resData = error.response?.data;

  if (resData?.errors) {
    const errorEntries = Object.values(resData.errors);
    if (errorEntries.length > 0) {
      const firstError = errorEntries[0];
      if (Array.isArray(firstError) && firstError.length > 0) {
        return firstError[0];
      }
    }
  }

  return resData?.error_detail;
};

export const formatBirthday = (value: string) => {
  const digits = value.replace(/\D/g, "");

  if (digits.length <= 4) {
    return digits;
  }
  if (digits.length <= 6) {
    return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  }
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
};
