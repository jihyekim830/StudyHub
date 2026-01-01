import type { ExamQuestionResultContentComponent, QuestionType } from "@/types";
import SingleChoice from "@/components/questionResult/SingleChoice";
import MultipleChoice from "@/components/questionResult/MultipleChoice";
import ShortAnswer from "@/components/questionResult/ShortAnswer";
import FillBlank from "@/components/questionResult/FillBlank";
import Ox from "@/components/questionResult/Ox";
import Ordering from "@/components/questionResult/Ordering";

export const EXAM_QUESTION_RESULT_CONTENT_MAP: Record<
  QuestionType,
  ExamQuestionResultContentComponent
> = {
  singleChoice: SingleChoice,
  multipleChoice: MultipleChoice,
  shortAnswer: ShortAnswer,
  fillBlank: FillBlank,
  ox: Ox,
  ordering: Ordering,
};
