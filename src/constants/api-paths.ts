export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const MSW_BASE_URL = "https://msw.local";

const API_PREFIX = "/api/v1";

const VERIFICATION_API_PREFIX = "/accounts/verification";

export const API_PATHS = {
  exams: {
    deployments: {
      base: `${API_PREFIX}/exams/deployments`,
      list: (page: number) => `${API_PREFIX}/exams/deployments?page=${page}`,
      checkCode: (deploymentId: number) =>
        `${API_PREFIX}/exams/deployments/${deploymentId}/check-code`,
      questionList: (deploymentId: number) =>
        `${API_PREFIX}/exams/deployments/${deploymentId}`,
      cheating: (deploymentId: number) =>
        `${API_PREFIX}/exams/deployments/${deploymentId}/cheating`,
      status: (deploymentId: number) =>
        `${API_PREFIX}/exams/deployments/${deploymentId}/status`,
    },
    submissions: {
      base: `${API_PREFIX}/exams/submissions`,
      result: (submissionId: number) =>
        `${API_PREFIX}/exams/submissions/${submissionId}`,
    },
  },
  accounts: {
    login: `${API_PREFIX}/accounts/login`,
    checkNickname: `${API_PREFIX}/accounts/check-nickname`,
    signup: `${API_PREFIX}/accounts/signup`,
    availableCourses: `${API_PREFIX}/accounts/available-courses`,
    enrolledCourses: `${API_PREFIX}/accounts/me/enrolled-courses`,
    enrollStudent: `${API_PREFIX}/accounts/enroll-student`,
    verification: {
      sendEmail: `${API_PREFIX}${VERIFICATION_API_PREFIX}/send-email`,
      verfiyEmail: `${API_PREFIX}${VERIFICATION_API_PREFIX}/verify-email`,
      sendSMS: `${API_PREFIX}${VERIFICATION_API_PREFIX}/send-sms`,
      verfiySMS: `${API_PREFIX}${VERIFICATION_API_PREFIX}/verify-sms`,
    },
    me: `${API_PREFIX}/accounts/me`,
    refresh: `${API_PREFIX}/accounts/refresh`,
    changePassword: `${API_PREFIX}/accounts/change-password`,
  },
} as const;
