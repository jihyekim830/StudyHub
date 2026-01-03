import { SideBarTapButton } from "@/components/common";
import { Link, Outlet, useLocation } from "react-router";

const EXAM_PATH = "/my-page/exams";
const PROFILE_PATH = "/my-page";
const PROFILE_EDIT_PATH = "/my-page/edit";
const CHANGE_PASSWORD_PATH = "/my-page/change-password";

export default function MyPageLayout() {
  const { pathname } = useLocation();

  return (
    <div className="flex w-full items-start justify-center p-10">
      <div className="flex w-full max-w-6xl items-start justify-center gap-5">
        <aside className="w-45">
          <SideBarTapButton
            as={Link}
            to={EXAM_PATH}
            isActive={pathname === EXAM_PATH}
          >
            쪽지시험
          </SideBarTapButton>
          <SideBarTapButton
            as={Link}
            to={PROFILE_PATH}
            isActive={
              pathname === PROFILE_PATH || pathname === PROFILE_EDIT_PATH
            }
          >
            마이페이지
          </SideBarTapButton>
          <SideBarTapButton
            as={Link}
            to={CHANGE_PASSWORD_PATH}
            isActive={pathname === CHANGE_PASSWORD_PATH}
          >
            비밀번호 변경
          </SideBarTapButton>
        </aside>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
