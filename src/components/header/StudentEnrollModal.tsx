import {
  Button,
  Dropdown,
  LoadingUi,
  SideBarTapButton,
} from "@/components/common";
import { Modal, ModalContent, ModalTrigger } from "@/components/common/modal";
import { useExternalModalController, useToast } from "@/hooks";
import { useAvailableCourses, useEnrollStudent } from "@/hooks/api";
import {
  createCohortsDropdownOptions,
  createCoursesDropdownOptions,
} from "@/lib";
import type { DropdownOption } from "@/types";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function StudentEnrollModal() {
  const { data: availableCourses, isPending: isAvailableCoursePending } =
    useAvailableCourses();

  const { triggerToast } = useToast();

  const modalController = useExternalModalController();

  const { mutate: enrollStudent, isPending: isEnrollStudentPending } =
    useEnrollStudent({
      onSuccess: () => {
        triggerToast({
          variant: "small",
          status: "success",
          text: "수강생 등록을 완료했습니다.",
        });

        modalController.close();
      },
      onError: () => {
        triggerToast({
          variant: "small",
          status: "danger",
          text: "수강생 등록에 실패했습니다. 잠시후 다시 시도해주세요.",
        });
      },
    });

  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedCohortId, setSelectedCohortId] = useState("");

  const [courses, setCourses] = useState<DropdownOption[]>([]);
  const [cohorts, setCohorts] = useState<DropdownOption[]>([]);

  //선택 가능한 코스 설정
  useEffect(() => {
    if (!availableCourses) return;

    const newCourses = createCoursesDropdownOptions(availableCourses);

    setCourses(newCourses);
  }, [availableCourses]);

  //선택 가능한 기수 설정
  useEffect(() => {
    if (!(selectedCourseId && availableCourses)) return;

    const newCohorts = createCohortsDropdownOptions(
      availableCourses,
      selectedCourseId
    );

    setCohorts(newCohorts);
  }, [selectedCourseId, availableCourses]);

  const onEnrollButtonClick = () => {
    enrollStudent({ cohortId: Number(selectedCohortId) });
  };

  const handleCourseChange = (newValue: string) =>
    setSelectedCourseId(newValue);
  const handleCohortChange = (newValue: string) =>
    setSelectedCohortId(newValue);

  return (
    <Modal externalModalControl={modalController}>
      <ModalTrigger>
        <SideBarTapButton>수강생 등록</SideBarTapButton>
      </ModalTrigger>
      <ModalContent className="flex w-full max-w-sm flex-col gap-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <CheckIcon className="bg-primary-300 text-primary-500 size-7 rounded-full" />
          <span className="text-xl font-semibold">내 과정 선택하기</span>
          <span className="text-sm text-neutral-400">
            해당하는 과정과 기수를 선택 해주세요.
          </span>
        </div>
        <div className="flex w-full max-w-sm flex-col items-center gap-8">
          {isAvailableCoursePending ? (
            <LoadingUi />
          ) : (
            <>
              <Dropdown
                options={courses}
                onChange={handleCourseChange}
                className="w-full"
              />
              <Dropdown
                options={cohorts}
                onChange={handleCohortChange}
                className="w-full"
              />
            </>
          )}
        </div>
        <Button
          onClick={onEnrollButtonClick}
          disabled={!selectedCohortId || isEnrollStudentPending}
          className="flex items-center justify-center"
        >
          {isEnrollStudentPending ? <LoadingUi /> : "등록하기"}
        </Button>
      </ModalContent>
    </Modal>
  );
}
