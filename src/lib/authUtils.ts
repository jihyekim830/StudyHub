import type {
  UserInfoResponse,
  UserInfo,
} from "@/types/api-response-type/auth-response-type";

export const transformUserInfo = (raw: UserInfoResponse): UserInfo => {
  const { phone_number, profile_img_url, created_at, ...base } = raw;

  return {
    ...base,
    phoneNumber: phone_number,
    profileImgUrl: profile_img_url,
    createdAt: created_at,
  };
};
