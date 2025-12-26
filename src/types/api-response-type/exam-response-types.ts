import type { Exam, ExamDeploymentStatus, Question } from "@/types";

export interface ExamListResponse {
  page: number;
  has_next: boolean;
  results: Exam[];
}

export interface ExamQuestionListResponse {
  exam_id: number;
  exam_name: string;
  duration_time: number;
  elapsed_time: number;
  cheating_count: number;
  questions: Question[];
}

export interface ExamCheatingResponse {
  cheating_count: number;
  is_forced_submitted: boolean;
}

export interface ExamStatusResponse {
  exam_status: ExamDeploymentStatus;
  force_submit: boolean;
}

export interface ExamSubmitResponse {
  submission_id: number;
  score: number;
  correct_answer_count: number;
  redirect_url: string;
}
