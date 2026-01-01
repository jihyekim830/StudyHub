import { API_PATHS, MSW_BASE_URL } from "@/constants";
import {
  availableCourseListMock,
  enrolledCourseListMock,
} from "@/mocks/data/enrollment-data";
import { http, HttpResponse } from "msw";

const getAvailableCourseshandler = http.get(
  `${MSW_BASE_URL}${API_PATHS.accounts.availableCourses}`,
  () => {
    return HttpResponse.json(availableCourseListMock);
  }
);

const postEnrollStudent = http.post<{ cohort_id: string }>(
  `${MSW_BASE_URL}${API_PATHS.accounts.enrollStudent}`,
  async ({ request }) => {
    const body = (await request.clone().json()) as { cohort_id: string };

    const { cohort_id } = body;

    if (!cohort_id) {
      return HttpResponse.json(
        {
          error_detail: {
            cohort_id: ["이 필드는 필수 항목입니다."],
          },
        },
        { status: 400 }
      );
    }

    return HttpResponse.json({}, { status: 201 });
  }
);

const getEnrolledCoureseHandler = http.get(
  `${MSW_BASE_URL}${API_PATHS.accounts.enrolledCourses}`,
  () => {
    return HttpResponse.json(enrolledCourseListMock, { status: 200 });
  }
);

export const enrollmentHandlers = [
  getAvailableCourseshandler,
  postEnrollStudent,
  getEnrolledCoureseHandler,
];
