export type ExamStatus = "done" | "pending";

export type ExamCategory = "all" | ExamStatus;

export type ExamCategoryOption = { label: string; value: ExamCategory };

export interface Exam {
  id: number;
  submission_id: number | null;
  exam: {
    id: number;
    title: string;
    thumbnail_img_url: string;
    subject: {
      id: number;
      title: string;
      thumbnail_img_url: string | null;
    };
  };
  question_count: number;
  total_score: number;
  exam_info: {
    status: string;
    score: number | null;
    correct_answer_count: number | null;
  };
  is_done: boolean;
  duration_time: number;
}

export type QuestionType =
  | "single_choice"
  | "multiple_choice"
  | "ox"
  | "short_answer"
  | "ordering"
  | "fill_blank";

export interface Question {
  question_id: number;
  number: number;
  type: QuestionType;
  question: string;
  point: number;
  prompt: string | null;
  blank_count: number | null;
  options: string[] | null;
  answer_input: string | string[] | null;
}

interface ExamQuestionContentProps {
  question: Question;
  value: string | string[] | null;
  onChange: (
    questionId: number,
    submittedAnswer: string | string[] | null
  ) => void;
}

export type ExamQuestionContentComponent = React.FC<ExamQuestionContentProps>;

export type ExamDeploymentStatus = "activated" | "deactivated";

export interface AnswerDto {
  question_id: number;
  type: string;
  submitted_answer: unknown;
}

export interface Answer {
  type: QuestionType;
  submittedAnswer: string | string[] | null;
}
