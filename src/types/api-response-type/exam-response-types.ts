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
  id: number;
  submitter_id: number;
  deployment_id: number;
  exam: {
    id: number;
    title: string;
    thumbnail_img_url: string;
  };
  questions: QuestionResultDto[];
  cheating_count: number;
  total_score: number;
  correct_answer_count: number;
  elapsed_time: string;
  started_at: string;
  submitted_at: string;
}

export interface ExamResultResponse {
  id: number;
  submitterId: number;
  deploymentId: number;
  exam: {
    id: number;
    title: string;
    thumbnailImgUrl: string;
  };
  questions: QuestionResult[];
  cheatingCount: number;
  totalScore: number;
  correctAnswerCount: number;
  elapsedTime: string;
  startedAt: string;
  submittedAt: string;
}
