import useExamList from "@/hooks/api/useExamList";
import useExamCodeVerification from "@/hooks/api/useExamCodeVerification";
import useAvailableCourses from "@/hooks/api/useAvailableCourses";
import useEnrollStudent from "@/hooks/api/useEnrollStudent";
import useSendEmail from "@/hooks/api/verification/useSendEmail";
import useVerifyEmail from "@/hooks/api/verification/useVerifyEmail";
import useSendSMS from "@/hooks/api/verification/useSendSMS";
import useVerifySMS from "@/hooks/api/verification/useVerifySMS";

export {
  useExamList,
  useExamCodeVerification,
  useAvailableCourses,
  useEnrollStudent,
  useSendEmail,
  useVerifyEmail,
  useSendSMS,
  useVerifySMS,
};
