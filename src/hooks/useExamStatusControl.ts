import { useExamStatusPolling } from "@/hooks/api";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useToast } from "@/hooks";

function useExamStatusControl(deploymentId: number) {
  const { data: examStatusDto } = useExamStatusPolling(deploymentId);
  const examStatus = examStatusDto?.examStatus;
  const navigate = useNavigate();
  const { triggerToast } = useToast();

  useEffect(() => {
    if (examStatus === "deactivated") {
      triggerToast({
        variant: "big",
        title: "시험이 종료되었습니다.",
        text: "시험이 비활성화되었습니다.",
        status: "danger",
      });
      navigate("/my-page/exams");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examStatus]);
}

export default useExamStatusControl;
