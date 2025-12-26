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
import type { ExamCategoryOption, QuestionType } from "@/types";

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
  fill_blank: "빈칸식",
  multiple_choice: "다중선택",
  ordering: "순서배열",
  ox: "OX선택",
  short_answer: "단답형",
  single_choice: "단일선택",
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
