export type ExamStatus = "done" | "pending";

export type ExamCategory = "all" | ExamStatus;

export type ExamCategoryOption = { label: string; value: ExamCategory };

export interface ExamDto {
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

export interface Exam {
  id: number;
  submissionId: number | null;
  exam: {
    id: number;
    title: string;
    thumbnailImgUrl: string;
    subject: {
      id: number;
      title: string;
      thumbnailImgUrl: string | null;
    };
  };
  questionCount: number;
  totalScore: number;
  examInfo: {
    status: string;
    score: number | null;
    correctAnswerCount: number | null;
  };
  isDone: boolean;
  durationTime: number;
}

export type QuestionTypeDto =
  | "single_choice"
  | "multiple_choice"
  | "ox"
  | "short_answer"
  | "ordering"
  | "fill_blank";

export type QuestionType =
  | "singleChoice"
  | "multipleChoice"
  | "ox"
  | "shortAnswer"
  | "ordering"
  | "fillBlank";

export interface QuestionDto {
  question_id: number;
  number: number;
  type: QuestionTypeDto;
  question: string;
  point: number;
  prompt: string | null;
  blank_count: number | null;
  options: string[] | null;
  answer_input: string | string[] | null;
}

export interface Question {
  questionId: number;
  number: number;
  type: QuestionType;
  question: string;
  point: number;
  prompt: string | null;
  blankCount: number | null;
  options: string[] | null;
  answerInput: string | string[] | null;
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
  type: QuestionTypeDto;
  submitted_answer: unknown;
}

export interface Answer {
  type: QuestionType;
  submittedAnswer: string | string[] | null;
}

export interface QuestionResultDto {
  id: number;
  question: string;
  prompt: string;
  blank_count: number;
  options: string[];
  type: QuestionTypeDto;
  answer: string[];
  point: number;
  explanation: string;
  is_correct: boolean;
  submitted_answer: string[];
}

export interface QuestionResult {
  id: number;
  question: string;
  prompt: string;
  blankCount: number;
  options: string[];
  type: QuestionType;
  answer: string[];
  point: number;
  explanation: string;
  isCorrect: boolean;
  submittedAnswer: string[];
}

interface ExamQuestionResultContentProps {
  question: QuestionResult;
}

export type ExamQuestionResultContentComponent =
  React.FC<ExamQuestionResultContentProps>;
