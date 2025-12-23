export enum COHORT_STATUS {
  "PENDING",
  "IN_PROGRESS",
  "COMPLETED",
}

export interface Cohort {
  id: number;
  number: number;
  start_date: Date;
  end_date: Date;
  status: COHORT_STATUS;
}

export interface Course {
  id: number;
  name: string;
  tag: string;
  thumbnail_img_url: string;
}

export interface AvailableCourse {
  cohort: Omit<Cohort, "status">;
  course: Pick<Course, "id" | "name">;
}
