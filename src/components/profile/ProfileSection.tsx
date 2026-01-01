import { UserIcon } from "@/assets/icons/interface-icons";
import { LoadingUi } from "@/components/common";
import { useUserInformation } from "@/hooks/api";
import { creatProfileImageUrl } from "@/lib/utils";
import { useState } from "react";

export default function ProfileSection() {
  const { data: user, isPending } = useUserInformation();
  const [imageError, setImageError] = useState(false);

  if (isPending) {
    return (
      <div className="flex items-center justify-center">
        <LoadingUi />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center">
        유저 데이터를 불러오는데 문제가 발생했습니다. 잠시후 다시 시도해주세요.
      </div>
    );
  }

  const {
    nickname,
    email,
    name,
    phone_number: phoneNumber,
    gender,
    birthday,
    id: userId,
  } = user;

  const profileImageUrl = creatProfileImageUrl(userId);
  return (
    <section className="flex flex-col items-center gap-20 rounded-lg border p-11">
      {/* 프로필 */}
      <div className="flex w-full flex-col items-center gap-10">
        <div className="flex w-full flex-col items-center gap-2">
          <span className="text-primary-600 w-full text-xl font-semibold">
            프로필
          </span>
          <hr className="w-full" />
        </div>

        <img
          src={imageError || !profileImageUrl ? UserIcon : profileImageUrl}
          alt="프로필 이미지"
          width={184}
          height={184}
          className="w-full max-w-44"
          onError={() => {
            setImageError(true);
          }}
        />
        <div className="grid w-full grid-cols-3 gap-y-6">
          <span>닉네임</span>
          <span className="col-span-2">{nickname}</span>
          <span>이메일</span>
          <span className="col-span-2">{email}</span>
        </div>
      </div>

      {/* 개인정보 */}
      <div className="flex w-full flex-col items-center gap-10">
        <div className="flex w-full flex-col items-center gap-2">
          <span className="text-primary-600 w-full text-xl font-semibold">
            개인정보
          </span>
          <hr className="w-full" />
        </div>

        <div className="grid w-full grid-cols-3 gap-y-6">
          <span>이름</span>
          <span className="col-span-2">{name}</span>
          <span>휴대전화</span>
          <span className="col-span-2">{`${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7)}`}</span>
          <span>성별</span>
          <span className="col-span-2">{gender === "M" ? "남자" : "여자"}</span>
          <span>생년월일</span>
          <span className="col-span-2">{birthday}</span>
        </div>
      </div>
    </section>
  );
}
