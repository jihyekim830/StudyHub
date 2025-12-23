import { useState } from "react";
import { Link } from "react-router";
import { UserIcon } from "@/assets/icons/interface-icons/";
import { SideBarTapButton } from "@/components/common";
import StudentEnrollModal from "@/components/header/StudentEnrollModal";

interface UserMenuProps {
  onLogout: () => void;
}

export default function UserMenu({ onLogout }: UserMenuProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  //TODO: 실제 상태 반영
  const [isStudent] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowUserMenu(!showUserMenu)}
        className="flex items-center space-x-2 rounded-lg px-4 py-2 transition-colors hover:bg-gray-100"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-400">
          <img src={UserIcon} alt="유저아이콘" />
        </div>
      </button>

      {showUserMenu && (
        <div className="absolute left-0 mt-2 flex w-48 -translate-x-3/4 flex-col rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-lg">
          <div className="mb-2">
            <span className="block text-sm font-medium text-gray-900">
              오즈오즈
            </span>
            <span className="block text-xs text-gray-500">
              ozschool234@gmail.com
            </span>
          </div>
          <hr className="my-2 border-gray-200" />

          {!isStudent && <StudentEnrollModal />}
          <SideBarTapButton as={Link} to="/my-page">
            마이페이지
          </SideBarTapButton>
          <SideBarTapButton as="button" onClick={onLogout}>
            로그아웃(임시)
          </SideBarTapButton>
        </div>
      )}
    </div>
  );
}
