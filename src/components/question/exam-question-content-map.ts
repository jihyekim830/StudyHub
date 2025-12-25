import type { QuestionType, ExamQuestionContentComponent } from "@/types";
import SingleChoice from "@/components/question/SingleChoice";
import MultipleChoice from "@/components/question/MultipleChoice";
import ShortAnswer from "@/components/question/ShortAnswer";
import FillBlank from "@/components/question/FillBlank";
import Ox from "@/components/question/Ox";
import Ordering from "@/components/question/Ordering";

export const EXAM_QUESTION_CONTENT_MAP: Record<
  QuestionType,
  ExamQuestionContentComponent
> = {
  single_choice: SingleChoice,
  multiple_choice: MultipleChoice,
  short_answer: ShortAnswer,
  fill_blank: FillBlank,
  ox: Ox,
  ordering: Ordering,
};
