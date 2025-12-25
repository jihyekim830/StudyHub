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
    },
  },
  accounts: {
    login: `${API_PREFIX}/accounts/login`,
    availableCourses: `${API_PREFIX}/accounts/available-courses`,
    enrollStudent: `${API_PREFIX}/accounts/enroll-student`,
    verification: {
      sendEmail: `${API_PREFIX}${VERIFICATION_API_PREFIX}/send-email`,
      verfiyEmail: `${API_PREFIX}${VERIFICATION_API_PREFIX}/verify-email`,
      sendSMS: `${API_PREFIX}${VERIFICATION_API_PREFIX}/send-sms`,
      verfiySMS: `${API_PREFIX}${VERIFICATION_API_PREFIX}/verify-sms`,
    },
    me: `${API_PREFIX}/accounts/me`,
  },
} as const;
