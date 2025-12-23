import type { DropdownOption } from "@/types";
import type { AvailableCourse } from "@/types/student-enrollment-types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createCoursesDropdownOptions(
  availableCourses: AvailableCourse[]
) {
  const newCourses: DropdownOption[] = [];

  const courseIds: number[] = [];

  availableCourses.forEach((availableCourse) => {
    if (!courseIds.includes(availableCourse.course.id)) {
      const courseDropdownOption: DropdownOption = {
        label: availableCourse.course.name,
        value: String(availableCourse.course.id),
      };

      courseIds.push(availableCourse.course.id);

      newCourses.push(courseDropdownOption);
    }
  });

  return newCourses;
}

export function createCohortsDropdownOptions(
  availableCourses: AvailableCourse[],
  selectedCourseId: string
) {
  const newCohorts: DropdownOption[] = [];

  availableCourses.forEach((availableCourse) => {
    if (selectedCourseId === String(availableCourse.course.id)) {
      const cohortDropdownOption: DropdownOption = {
        label: `${availableCourse.cohort.number}기`,
        value: String(availableCourse.cohort.id),
      };

      newCohorts.push(cohortDropdownOption);
    }
  });

  return newCohorts;
}
