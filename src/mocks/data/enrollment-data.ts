import {
  COHORT_STATUS,
  type AvailableCourse,
  type EnrolledCourse,
} from "@/types/student-enrollment-types";

export const availableCourseListMock: AvailableCourse[] = [
  {
    course: {
      id: 1,
      name: "웹 개발 초격차 프론트엔드 부트캠프",
    },
    cohort: {
      id: 101,
      number: 1,
      start_date: new Date("2024-01-15"),
      end_date: new Date("2024-06-15"),
    },
  },
  {
    course: {
      id: 1,
      name: "웹 개발 초격차 프론트엔드 부트캠프",
    },
    cohort: {
      id: 102,
      number: 2,
      start_date: new Date("2024-07-01"),
      end_date: new Date("2024-12-01"),
    },
  },

  {
    course: {
      id: 2,
      name: "웹 개발 초격차 백엔드 부트캠프",
    },
    cohort: {
      id: 201,
      number: 1,
      start_date: new Date("2024-02-01"),
      end_date: new Date("2024-07-01"),
    },
  },
  {
    course: {
      id: 2,
      name: "웹 개발 초격차 백엔드 부트캠프",
    },
    cohort: {
      id: 202,
      number: 2,
      start_date: new Date("2024-08-01"),
      end_date: new Date("2025-01-01"),
    },
  },

  {
    course: {
      id: 3,
      name: "IT스타트업 실무형 사업 개발자(BD) 부트캠프",
    },
    cohort: {
      id: 301,
      number: 1,
      start_date: new Date("2024-03-10"),
      end_date: new Date("2024-08-10"),
    },
  },
  {
    course: {
      id: 3,
      name: "IT스타트업 실무형 사업 개발자(BD) 부트캠프",
    },
    cohort: {
      id: 302,
      number: 2,
      start_date: new Date("2024-09-10"),
      end_date: new Date("2025-02-10"),
    },
  },

  {
    course: {
      id: 4,
      name: "스타트업 맞춤형 프로덕트 디자이너",
    },
    cohort: {
      id: 401,
      number: 1,
      start_date: new Date("2024-04-01"),
      end_date: new Date("2024-09-01"),
    },
  },
  {
    course: {
      id: 4,
      name: "스타트업 맞춤형 프로덕트 디자이너",
    },
    cohort: {
      id: 402,
      number: 2,
      start_date: new Date("2024-10-01"),
      end_date: new Date("2025-03-01"),
    },
  },
];

export const enrolledCourseListMock: EnrolledCourse[] = [
  {
    course: {
      id: 1,
      name: "웹 개발 초격차 프론트엔드 부트캠프",
      tag: "FE",
      thumbnail_img_url: "https://dummyimage.com/600x400/000/fff",
    },
    cohort: {
      id: 101,
      number: 1,
      start_date: new Date("2024-01-15"),
      end_date: new Date("2024-06-15"),
      status: COHORT_STATUS.IN_PROGRESS,
    },
  },
  {
    course: {
      id: 2,
      name: "웹 개발 초격차 백엔드 부트캠프",
      tag: "BE",
      thumbnail_img_url: "https://dummyimage.com/600x400/000/fff",
    },
    cohort: {
      id: 102,
      number: 2,
      start_date: new Date("2024-07-01"),
      end_date: new Date("2024-12-01"),
      status: COHORT_STATUS.PENDING,
    },
  },
];
