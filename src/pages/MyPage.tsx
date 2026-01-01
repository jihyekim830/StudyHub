import AccountDeleteModal from "@/components/AccountDeleteModal";
import { LinkButton } from "@/components/common";

import { EnrolledCouresSection, ProfileSection } from "@/components/profile";

export default function MyPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">내 정보</h1>
        <LinkButton to={"/my-page/edit"}>수정하기</LinkButton>
      </div>

      <ProfileSection />

      <EnrolledCouresSection />

      <section className="flex items-center justify-between gap-5">
        <div className="flex flex-col gap-3 text-neutral-500">
          <span className="text-lg">회원 탈퇴 안내</span>
          <span className="text-sm">
            탈퇴 처리 시, 수강 기간 / 포인트 / 쿠폰은 소멸되며 환불되지
            않습니다. 필요한 경우, 반드시 탈퇴 전에 문의 바랍니다.
          </span>
        </div>
        <AccountDeleteModal />
      </section>
    </div>
  );
}
