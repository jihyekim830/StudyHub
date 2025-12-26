import type { Exam, Question } from "@/types";
import type { ExamCheatingResponse } from "@/types/api-response-type/exam-response-types";

export const examList: Exam[] = [
  {
    id: 101,
    submission_id: 333,
    exam: {
      id: 1,
      title: "HTML 기초",
      thumbnail_img_url: "default_img_url",
      subject: {
        id: 10,
        title: "HTML",
        thumbnail_img_url: "https://cdn.ozcoding/html.png",
      },
    },
    question_count: 10,
    total_score: 100,
    exam_info: {
      status: "done",
      score: 80,
      correct_answer_count: 8,
    },
    is_done: true,
    duration_time: 20,
  },
  {
    id: 102,
    submission_id: null,
    exam: {
      id: 2,
      title: "AWS 심화",
      thumbnail_img_url: "default_img_url",
      subject: {
        id: 11,
        title: "AWS",
        thumbnail_img_url: "https://cdn.ozcoding/aws.png",
      },
    },
    question_count: 10,
    total_score: 100,
    exam_info: {
      status: "pending",
      score: null,
      correct_answer_count: null,
    },
    is_done: false,
    duration_time: 20,
  },
  {
    id: 103,
    submission_id: null,
    exam: {
      id: 3,
      title: "Github 응용",
      thumbnail_img_url: "default_img_url",
      subject: {
        id: 12,
        title: "github",
        thumbnail_img_url: "https://cdn.ozcoding/github.png",
      },
    },
    question_count: 10,
    total_score: 100,
    exam_info: {
      status: "pending",
      score: null,
      correct_answer_count: null,
    },
    is_done: false,
    duration_time: 20,
  },
  {
    id: 104,
    submission_id: null,
    exam: {
      id: 4,
      title: "React 심화",
      thumbnail_img_url: "default_img_url",
      subject: {
        id: 13,
        title: "React",
        thumbnail_img_url: "https://cdn.ozcoding/react.png",
      },
    },
    question_count: 10,
    total_score: 100,
    exam_info: {
      status: "pending",
      score: null,
      correct_answer_count: null,
    },
    is_done: false,
    duration_time: 20,
  },
  {
    id: 105,
    submission_id: null,
    exam: {
      id: 5,
      title: "JavaScript 응용",
      thumbnail_img_url: "default_img_url",
      subject: {
        id: 14,
        title: "Javascript",
        thumbnail_img_url: "https://cdn.ozcoding/js.png",
      },
    },
    question_count: 10,
    total_score: 100,
    exam_info: {
      status: "pending",
      score: null,
      correct_answer_count: null,
    },
    is_done: false,
    duration_time: 20,
  },
];

export const questionList: Question[] = [
  {
    question_id: 1,
    number: 1,
    type: "single_choice",
    question:
      "TypeScript 타입 호환성 규칙상, 안전하게 허용되는 상·하위 타입 간 값 할당 방식은 무엇인가요?",
    point: 10,
    prompt: null,
    blank_count: null,
    options: [
      "상위 타입 값을 하위 타입 변수에 할당",
      "하위 타입 값을 상위 타입 변수에 할당",
      "서로소 유니온 타입 간 값은 일부 유니온 타입 변수에 할당",
      "하위 타입 값을 상위 타입 변수에 할당2",
    ],
    answer_input: null,
  },
  {
    question_id: 2,
    number: 2,
    type: "multiple_choice",
    question: "다음 중 TypeScript의 특징으로 올바른 것을 모두 골라주세요.",
    point: 15,
    prompt: null,
    blank_count: null,
    options: [
      "정적 타입 검사 지원",
      "런타임 시 타입 오류 발생",
      "자바스크립트와 호환됨",
      "브라우저가 직접 실행함",
      "인터페이스와 제네릭을 지원함",
    ],
    answer_input: null,
  },
  {
    question_id: 3,
    number: 3,
    type: "short_answer",
    question:
      "TypeScript 타입 호환성 규칙상, 안전하게 허용되는 상·하위 타입 간 값 할당 방식은 무엇인가요? 안전하게 허용되는 상·하위 타입 간 값 할당 방식은 무엇인가요?",
    point: 10,
    prompt: null,
    blank_count: null,
    options: null,
    answer_input: "",
  },
  {
    question_id: 4,
    number: 4,
    type: "short_answer",
    question:
      "TypeScript 타입 호환성 규칙상, 안전하게 허용되는 상·하위 타입 간 값 할당 방식은 무엇인가요?",
    point: 10,
    prompt: null,
    blank_count: null,
    options: null,
    answer_input: "",
  },
  {
    question_id: 5,
    number: 5,
    type: "fill_blank",
    question:
      "TypeScript 타입 호환성 규칙상, 안전하게 허용되는 상·하위 타입 간 값 할당 방식은 무엇인가요?",
    point: 10,
    prompt:
      "변수나 함수의 매개변수, 반환값에 타입을 명시하는 것을 __ 이라고 한다. interface 또는 type 키워드를 사용하여 객체의 구조를 정의할 수 있는데, 이렇게 만든 타입을 __ 이라고 부른다.",
    blank_count: 2,
    options: null,
    answer_input: ["", ""],
  },
  {
    question_id: 6,
    number: 6,
    type: "ox",
    question: "TypeScript에서 any 타입을 사용하면 모든 타입과 호환된다.",
    point: 15,
    prompt: null,
    blank_count: null,
    options: ["O", "X"],
    answer_input: null,
  },
  {
    question_id: 7,
    number: 7,
    type: "ordering",
    question:
      "코드가 실행되기까지의 과정을 순서 없이 모아뒀어요. 올바른 순서로 정리해볼까요?",
    point: 10,
    prompt: null,
    blank_count: null,
    options: [
      "Typescript 파일 작성",
      "Transpile 작업 실행",
      "자바스크립트로 변환",
      "컴파일 결과 실행",
    ],
    answer_input: ["", "", "", ""],
  },
];

export const cheatingState: ExamCheatingResponse = {
  cheating_count: 0,
  is_forced_submitted: false,
};
