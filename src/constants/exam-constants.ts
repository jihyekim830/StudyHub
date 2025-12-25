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
