import type { AnswerDto } from "@/types";

export interface ExamCheatingRequest {
  event: "focus_out";
}

export interface ExamSubmitRequest {
  started_at: string;
  cheating_count: number;
  answers: AnswerDto[];
}
