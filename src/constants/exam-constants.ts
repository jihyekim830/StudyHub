import {
  CardRedIcon,
  CardYellowIcon,
  ModalRedIcon,
  ModalYellowIcon,
} from "@/assets/icons/cheating-icons";
import {
  AwsIcon,
  CssIcon,
  DatabaseIcon,
  DjangoIcon,
  FastapiIcon,
  FlaskIcon,
  GithubIcon,
  HtmlIcon,
  JavascriptIcon,
  NodejsIcon,
  PythonIcon,
  ReactIcon,
  ReactNativeIcon,
  TypescriptIcon,
} from "@/assets/icons/subject-icons";
import type {
  ExamCategoryOption,
  QuestionType,
  QuestionTypeDto,
} from "@/types";

export const EXAM_CATEGORY_OPTIONS: ExamCategoryOption[] = [
  { label: "전체보기", value: "all" },
  { label: "응시완료", value: "done" },
  { label: "미응시", value: "pending" },
];

export const EXAM_SUBJECT_ICON_MAP: Record<string, string> = {
  html: HtmlIcon,
  css: CssIcon,
  javascript: JavascriptIcon,
  github: GithubIcon,
  react: ReactIcon,
  nodejs: NodejsIcon,
  database: DatabaseIcon,
  typescript: TypescriptIcon,
  aws: AwsIcon,
  reactnative: ReactNativeIcon,
  python: PythonIcon,
  django: DjangoIcon,
  fastapi: FastapiIcon,
  flask: FlaskIcon,
};

export const EXAM_QUESTION_TYPE_LABEL_MAP: Record<QuestionType, string> = {
  fillBlank: "빈칸식",
  multipleChoice: "다중선택",
  ordering: "순서배열",
  ox: "OX선택",
  shortAnswer: "단답형",
  singleChoice: "단일선택",
};

export const CHEATING_COUNT_ICON_RULES = [
  { threshold: 1, icon: CardYellowIcon },
  { threshold: 2, icon: CardYellowIcon },
  { threshold: 3, icon: CardRedIcon },
] as const;

export const EXAM_CHEATING_MODAL_CONTENT_MAP: Record<
  number,
  { description: string; icon: string }
> = {
  1: {
    description:
      "다른 화면으로 이동했어요.\n부정행위로 간주되며, 누적 시 시험이 종료될 수 있어요.",
    icon: ModalYellowIcon,
  },
  2: {
    description:
      "한 번 더 화면을 이탈했어요.\n3회 이상 감지되면 시험이 종료됩니다.",
    icon: ModalYellowIcon,
  },
  3: {
    description:
      "세 번째 이탈이 감지됐어요.\n부정행위로 처리되어 시험이 종료됩니다.",
    icon: ModalRedIcon,
  },
};

export const EXAM_QUESTION_TYPE_DTO_TO_MODEL_MAP: Record<
  QuestionTypeDto,
  QuestionType
> = {
  fill_blank: "fillBlank",
  multiple_choice: "multipleChoice",
  ordering: "ordering",
  ox: "ox",
  short_answer: "shortAnswer",
  single_choice: "singleChoice",
};

export const EXAM_LAYOUT_BASE = "mx-auto max-w-6xl px-6";

export const EXAM_QUESTION_CONTENT_LAYOUT_BASE = "pt-5 pl-7";

export const EXAM_QUESTION_RADIO_STYLE_MAP = {
  base: "size-4 appearance-none rounded-full border-4 border-white bg-neutral-200 shadow-[0_0_0_1px] shadow-neutral-400",
  checked:
    "checked:border-primary-700 checked:shadow-primary-700 checked:bg-white",
  focus: "focus:outline-none",
} as const;

export const EXAM_QUESTION_CHECKBOX_STYLE_MAP = {
  base: "peer size-5 appearance-none rounded-xs border border-neutral-400 bg-white",
  checked: "checked:bg-primary-700 checked:border-primary-700",
  focus: "focus:outline-none",
} as const;

export const EXAM_QUESTION_SHORT_ANSWER_STYLE_MAP = {
  base: "h-12 w-3/5 rounded-sm bg-neutral-200 px-4",
  focus: "focus:outline-none",
  placeholder: "placeholder:text-neutral-400",
} as const;

export const EXAM_QUESTION_BLANK_TOKEN = "__";

export const EXAM_QUESTION_LABEL_START_CHAR_CODE = 65;

export const EXAM_QUESTION_OX_OPTIONS = [
  { label: "맞아요", value: "O" },
  { label: "아니에요", value: "X" },
] as const;
