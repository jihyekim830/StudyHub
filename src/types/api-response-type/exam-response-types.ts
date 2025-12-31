import type {
  Exam,
  ExamDeploymentStatus,
  ExamDto,
  Question,
  QuestionDto,
  QuestionResult,
  QuestionResultDto,
} from "@/types";

export interface ExamListResponseDto {
  page: number;
  has_next: boolean;
  results: ExamDto[];
}

export interface ExamListResponse {
  page: number;
  hasNext: boolean;
  results: Exam[];
}

export interface ExamQuestionListResponseDto {
  exam_id: number;
  exam_name: string;
  duration_time: number;
  elapsed_time: number;
  cheating_count: number;
  questions: QuestionDto[];
}

export interface ExamQuestionListResponse {
  examId: number;
  examName: string;
  durationTime: number;
  elapsedTime: number;
  cheatingCount: number;
  questions: Question[];
}

export interface ExamCheatingResponseDto {
  cheating_count: number;
  is_forced_submitted: boolean;
}

export interface ExamCheatingResponse {
  cheatingCount: number;
  isForcedSubmitted: boolean;
}

export interface ExamStatusResponseDto {
  exam_status: ExamDeploymentStatus;
  force_submit: boolean;
}

export interface ExamStatusResponse {
  examStatus: ExamDeploymentStatus;
  forceSubmit: boolean;
}

export interface ExamSubmitResponseDto {
  submission_id: number;
  score: number;
  correct_answer_count: number;
  redirect_url: string;
}

export interface ExamSubmitResponse {
  submissionId: number;
  score: number;
  correctAnswerCount: number;
  redirectUrl: string;
}

export interface ExamResultResponseDto {
  exam_title: string;
  thumbnail_img_url: string;
  duration: string;
  score: number;
  total_score: number;
  cheating_count: number;
  questions: QuestionResultDto[];
}

export interface ExamResultResponse {
  examTitle: string;
  thumbnailImgUrl: string;
  duration: string;
  score: number;
  totalScore: number;
  cheatingCount: number;
  questions: QuestionResult[];
}
