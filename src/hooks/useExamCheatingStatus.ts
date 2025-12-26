import { useReportExamCheating } from "@/hooks/api";
import { useEffect } from "react";

function useExamCheatingStatus(deploymentId: number) {
  const { mutate: reportExamCheating, data } = useReportExamCheating();
  const cheatingCount = data?.cheating_count ?? 0;
  const isForcedSubmitted = data?.is_forced_submitted ?? false;

  useEffect(() => {
    if (isForcedSubmitted) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "hidden") return;
      reportExamCheating({ deploymentId, event: "focus_out" });
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [deploymentId, reportExamCheating, isForcedSubmitted]);

  return { cheatingCount, isForcedSubmitted };
}

export default useExamCheatingStatus;
