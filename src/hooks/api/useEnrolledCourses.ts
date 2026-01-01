import { API_PATHS } from "@/constants";
import { API_BASE_URL } from "@/constants/api-paths";
import { api } from "@/lib";
import type { EnrolledCourse } from "@/types/student-enrollment-types";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

type EnrolledCoursesQueryOptions = Omit<
  UseQueryOptions<EnrolledCourse[]>,
  "queryFn" | "queryKey"
>;

export default function useEnrolledCourses(
  options?: EnrolledCoursesQueryOptions
) {
  return useQuery({
    queryKey: ["enrollement", "enrolled-courses"],
    queryFn: async () => {
      const res = await api.get(
        `${API_BASE_URL}${API_PATHS.accounts.enrolledCourses}`
      );

      return res.data;
    },
    ...options,
  });
}
