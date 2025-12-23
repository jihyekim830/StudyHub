import { API_PATHS, MSW_BASE_URL } from "@/constants";
import { api } from "@/lib";
import type { AvailableCourse } from "@/types/student-enrollment-types";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

type AvailableCoursesQueryOptions = Omit<
  UseQueryOptions<AvailableCourse[]>,
  "queryKey" | "queryFn"
>;

export default function useAvailableCourses(
  options?: AvailableCoursesQueryOptions
) {
  return useQuery<AvailableCourse[]>({
    queryKey: ["enrollment", "available-courses"],
    queryFn: async () => {
      const res = await api.get(
        `${MSW_BASE_URL}${API_PATHS.accounts.availableCourses}`
      );

      return res.data;
    },
    ...options,
  });
}
