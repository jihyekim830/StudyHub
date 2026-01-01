import { Button, Dropdown, Textarea } from "@/components/common";
import { Modal, ModalContent, ModalTrigger } from "@/components/common/modal";
import { useToast } from "@/hooks";
import { useDeleteAccount } from "@/hooks/api";
import type { DropdownOption } from "@/types";
import {
  ACCOUNT_DELETE_REASON,
  type AccountDeleteReason,
} from "@/types/api-request-type/account-request-types";
import { useState } from "react";
import { useNavigate } from "react-router";

const dropdownOptions: DropdownOption[] = [
  {
    label: "원하는 종류의 강의가 없어서",
    value: ACCOUNT_DELETE_REASON.NO_LONGER_NEEDED,
  },
  {
    label: "타 부트캠프에 더 양질의 컨텐츠가 있어서",
    value: ACCOUNT_DELETE_REASON.TRANSFER,
  },
  {
    label: "사이트 내 UI/UX가 불편해서",
    value: ACCOUNT_DELETE_REASON.SERVICE_DISSATISFACTION,
  },
  {
    label: "부트캠프를 수강 완료해서",
    value: ACCOUNT_DELETE_REASON.GRADUATION,
  },
  {
    label: "개인정보 보호를 위해서",
    value: ACCOUNT_DELETE_REASON.PRIVACY_CONCERN,
  },
  {
    label: "기타(직접입력)",
    value: ACCOUNT_DELETE_REASON.OTHER,
  },
];

function isAccountDeleteReason(value: string): value is AccountDeleteReason {
  return Object.values(ACCOUNT_DELETE_REASON).includes(
    value as AccountDeleteReason
  );
}

export default function AccountDeleteModal() {
  const [deleteReason, setDeleteReason] = useState<AccountDeleteReason>();
  const [detailReason, setDetailReason] = useState("");

  const { triggerToast } = useToast();

  const navigation = useNavigate();

  const { mutate: deleteAccount, isPending } = useDeleteAccount({
    onSuccess: () => {
      //TODO: 로그아웃 로직 추가
      triggerToast({
        variant: "small",
        status: "success",
        text: "회원탈퇴에 성공했습니다.",
      });

      navigation("/", { replace: true });
    },
    onError: () => {
      triggerToast({
        variant: "small",
        status: "danger",
        text: "회원탈퇴에 실패했습니다. 잠시후 다시 시도해주세요.",
      });
    },
  });

  const handleDropdownChange = (value: string) => {
    if (isAccountDeleteReason(value)) {
      setDeleteReason(value);
    }
  };

  const handleDeleteAccountButtonClick = () => {
    if (!deleteReason) return;

    deleteAccount({ deleteReason, detailReason });
  };

  return (
    <Modal>
      <ModalTrigger>
        <Button variant={"neutral"} className="w-38">
          회원 탈퇴하기
        </Button>
      </ModalTrigger>
      <ModalContent className="w-full max-w-2xl">
        <div className="flex flex-col items-start gap-5">
          <span className="w-full text-xl font-semibold">
            오즈코딩스쿨을 탈퇴하시는 이유는 무엇인가요?
          </span>

          <span className="w-full text-sm text-wrap text-neutral-400">
            계정을 삭제하시면 회원님의 모든 콘텐츠와 활동 기록, 수강 기간 /
            포인트 / 쿠폰 내역이 사라지며 환불되지 않습니다. 삭제된 정보는
            복구할 수 없습니다.
          </span>

          <Dropdown options={dropdownOptions} onChange={handleDropdownChange} />

          <span className="w-full text-sm text-wrap">
            서비스를 이용하시면서 불편했 점이나 보완할 수 있는 방안을
            알려주시면, 서비스 개선에 적극적으로 반영하겠습니다. 감사합니다!
          </span>

          <Textarea
            placeholder="소중한 의견을 반영해 더 좋은 서비스를 위해 노력하겠습니다."
            className="h-40 w-full"
            value={detailReason}
            onChange={(e) => {
              setDetailReason(e.target.value);
            }}
            disabled={!deleteReason}
          />

          <div className="flex w-full items-center justify-center">
            <Button
              disabled={!deleteReason || !detailReason || isPending}
              onClick={handleDeleteAccountButtonClick}
            >
              회원탈퇴하기
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
