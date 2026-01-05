import type { ExamDto, QuestionDto, QuestionResultDto } from "@/types";
import type { ExamCheatingResponseDto } from "@/types/api-response-type/exam-response-types";

export const examList: ExamDto[] = [
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

export const questionList: QuestionDto[] = [
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

export const reactQuestionList: QuestionDto[] = [
  {
    question_id: 1,
    number: 1,
    type: "single_choice",
    question:
      "React에서 state가 변경될 때 컴포넌트가 다시 렌더링되는 이유로 가장 올바른 것은 무엇인가요?",
    point: 10,
    prompt: null,
    blank_count: null,
    options: [
      "state는 전역 변수이기 때문에",
      "state 변경 시 React가 변경을 감지하고 렌더링을 트리거하기 때문에",
      "state는 항상 비동기적으로 변경되기 때문에",
      "state는 props보다 우선순위가 높기 때문에",
    ],
    answer_input: null,
  },
  {
    question_id: 2,
    number: 2,
    type: "multiple_choice",
    question: "다음 중 React의 특징으로 올바른 것을 모두 골라주세요.",
    point: 15,
    prompt: null,
    blank_count: null,
    options: [
      "컴포넌트 기반 구조를 사용한다",
      "가상 DOM을 사용한다",
      "브라우저가 JSX를 직접 실행한다",
      "단방향 데이터 흐름을 따른다",
      "상태 관리 로직과 UI를 분리할 수 있다",
    ],
    answer_input: null,
  },
  {
    question_id: 3,
    number: 3,
    type: "short_answer",
    question: "React에서 props와 state의 가장 큰 차이점은 무엇인가요?",
    point: 10,
    prompt: null,
    blank_count: null,
    options: null,
    answer_input: "",
  },
  {
    question_id: 4,
    number: 4,
    type: "fill_blank",
    question:
      "React 컴포넌트에서 상태를 관리하기 위해 사용하는 Hook과, 컴포넌트의 생명주기와 관련된 작업을 처리하는 Hook을 작성해보세요.",
    point: 10,
    prompt:
      "React에서 상태를 관리하기 위해 사용하는 Hook은 __ 이며, 컴포넌트 렌더링 이후 특정 작업을 수행하기 위해 사용하는 Hook은 __ 이다.",
    blank_count: 2,
    options: null,
    answer_input: ["", ""],
  },
  {
    question_id: 5,
    number: 5,
    type: "ox",
    question: "React에서 props는 자식 컴포넌트에서 직접 수정할 수 있다.",
    point: 15,
    prompt: null,
    blank_count: null,
    options: ["O", "X"],
    answer_input: null,
  },
  {
    question_id: 6,
    number: 6,
    type: "ordering",
    question:
      "React 함수 컴포넌트가 화면에 표시되기까지의 과정을 순서 없이 모아뒀어요. 올바른 순서로 정리해볼까요?",
    point: 10,
    prompt: null,
    blank_count: null,
    options: [
      "컴포넌트 함수 호출",
      "JSX 반환",
      "가상 DOM 생성",
      "실제 DOM에 반영",
    ],
    answer_input: ["", "", "", ""],
  },
];

export const cheatingState: ExamCheatingResponseDto = {
  cheating_count: 0,
  is_forced_submitted: false,
};

export const questionResultList: QuestionResultDto[] = [
  {
    id: 1,
    question:
      "TypeScript 타입 호환성 규칙상, 안전하게 허용되는 상·하위 타입 간 값 할당 방식은 무엇인가요?",
    prompt: "",
    blank_count: 0,
    options: [
      "상위 타입 값을 하위 타입 변수에 할당",
      "하위 타입 값을 상위 타입 변수에 할당",
      "서로소 유니온 타입 간 값은 일부 유니온 타입 변수에 할당",
      "하위 타입 값을 상위 타입 변수에 할당2",
    ],
    type: "single_choice",
    answer: ["서로소 유니온 타입 간 값은 일부 유니온 타입 변수에 할당"],
    point: 10,
    explanation:
      "하위 타입 값을 상위 타입으로 취급하는 것을 업캐스팅이라고하며, 이는 대부분의 경우 안전하게 허용됩니다.",
    is_correct: false,
    submitted_answer: ["상위 타입 값을 하위 타입 변수에 할당"],
  },
  {
    id: 2,
    question: "다음 중 TypeScript의 특징으로 올바른 것을 모두 골라주세요.",
    prompt: "",
    blank_count: 0,
    options: [
      "정적 타입 검사 지원",
      "런타임 시 타입 오류 발생",
      "자바스크립트와 호환됨",
      "브라우저가 직접 실행함",
      "인터페이스와 제네릭을 지원함",
    ],
    type: "multiple_choice",
    answer: ["정적 타입 검사 지원", "인터페이스와 제네릭을 지원함"],
    point: 15,
    explanation:
      "하위 타입 값을 상위 타입으로 취급하는 것을 업캐스팅이라고하며, 이는 대부분의 경우 안전하게 허용됩니다. 다운캐스팅을 일반적으로 허용되지 않아요. 다운캐스팅을 일반적으로 허용되지 않아요.",
    is_correct: true,
    submitted_answer: ["인터페이스와 제네릭을 지원함", "정적 타입 검사 지원"],
  },
  {
    id: 3,
    question:
      "TypeScript 타입 호환성 규칙상, 안전하게 허용되는 상·하위 타입 간 값 할당 방식은 무엇인가요? 안전하게 허용되는 상·하위 타입 간 값 할당 방식은 무엇인가요?",
    prompt: "",
    blank_count: 0,
    options: [],
    type: "short_answer",
    answer: ["정적 타입 검사 지원"],
    point: 10,
    explanation:
      "하위 타입 값을 상위 타입으로 취급하는 것을 업캐스팅이라고하며, 이는 대부분의 경우 안전하게 허용됩니다. 다운캐스팅을 일반적으로 허용되지 않아요. 다운캐스팅을 일반적으로 허용되지 않아요.",
    is_correct: true,
    submitted_answer: ["정적 타입 검사 지원"],
  },
  {
    id: 4,
    question:
      "TypeScript 타입 호환성 규칙상, 안전하게 허용되는 상·하위 타입 간 값 할당 방식은 무엇인가요?",
    prompt: "",
    blank_count: 0,
    options: [],
    type: "short_answer",
    answer: ["업캐스팅"],
    point: 10,
    explanation:
      "하위 타입 값을 상위 타입으로 취급하는 것을 업캐스팅이라고하며, 이는 대부분의 경우 안전하게 허용됩니다.",
    is_correct: false,
    submitted_answer: [""],
  },
  {
    id: 5,
    question:
      "TypeScript 타입 호환성 규칙상, 안전하게 허용되는 상·하위 타입 간 값 할당 방식은 무엇인가요?",
    prompt:
      "변수나 함수의 매개변수, 반환값에 타입을 명시하는 것을 __ 이라고 한다. interface 또는 type 키워드를 사용하여 객체의 구조를 정의할 수 있는데, 이렇게 만든 타입을 __ 이라고 부른다.",
    blank_count: 2,
    options: [],
    type: "fill_blank",
    answer: ["정답1", "정답2"],
    point: 10,
    explanation: "",
    is_correct: false,
    submitted_answer: ["정답1", "오답1"],
  },
  {
    id: 6,
    question: "TypeScript에서 any 타입을 사용하면 모든 타입과 호환된다.",
    prompt: "",
    blank_count: 0,
    options: ["O", "X"],
    type: "ox",
    answer: ["O"],
    point: 15,
    explanation: "",
    is_correct: true,
    submitted_answer: ["O"],
  },
  {
    id: 7,
    question:
      "코드가 실행되기까지의 과정을 순서 없이 모아뒀어요. 올바른 순서로 정리해볼까요?",
    prompt: "",
    blank_count: 0,
    options: [
      "Typescript 파일 작성",
      "Transpile 작업 실행",
      "자바스크립트로 변환",
      "컴파일 결과 실행",
    ],
    type: "ordering",
    answer: [
      "Typescript 파일 작성",
      "Transpile 작업 실행",
      "자바스크립트로 변환",
      "컴파일 결과 실행",
    ],
    point: 10,
    explanation: "",
    is_correct: false,
    submitted_answer: [
      "Transpile 작업 실행",
      "Typescript 파일 작성",
      "자바스크립트로 변환",
      "컴파일 결과 실행",
    ],
  },
];

export const reactQuestionResultList: QuestionResultDto[] = [
  {
    id: 1,
    question:
      "React에서 state가 변경될 때 컴포넌트가 다시 렌더링되는 이유로 가장 올바른 것은 무엇인가요?",
    prompt: "",
    blank_count: 0,
    options: [
      "state는 전역 변수이기 때문에",
      "state 변경 시 React가 변경을 감지하고 렌더링을 트리거하기 때문에",
      "state는 항상 비동기적으로 변경되기 때문에",
      "state는 props보다 우선순위가 높기 때문에",
    ],
    type: "single_choice",
    answer: [
      "state 변경 시 React가 변경을 감지하고 렌더링을 트리거하기 때문에",
    ],
    point: 10,
    explanation:
      "React는 state 변경을 감지하면 가상 DOM을 통해 변경 사항을 비교하고, 필요한 경우 컴포넌트를 다시 렌더링합니다.",
    is_correct: false,
    submitted_answer: [""],
  },
  {
    id: 2,
    question: "다음 중 React의 특징으로 올바른 것을 모두 골라주세요.",
    prompt: "",
    blank_count: 0,
    options: [
      "컴포넌트 기반 구조를 사용한다",
      "가상 DOM을 사용한다",
      "브라우저가 JSX를 직접 실행한다",
      "단방향 데이터 흐름을 따른다",
      "상태 관리 로직과 UI를 분리할 수 있다",
    ],
    type: "multiple_choice",
    answer: [
      "컴포넌트 기반 구조를 사용한다",
      "가상 DOM을 사용한다",
      "단방향 데이터 흐름을 따른다",
      "상태 관리 로직과 UI를 분리할 수 있다",
    ],
    point: 15,
    explanation:
      "React는 컴포넌트 기반 구조와 가상 DOM을 사용하며, 단방향 데이터 흐름을 따릅니다. JSX는 브라우저가 직접 실행하지 않습니다.",
    is_correct: false,
    submitted_answer: ["", "", "", ""],
  },
  {
    id: 3,
    question: "React에서 props와 state의 가장 큰 차이점은 무엇인가요?",
    prompt: "",
    blank_count: 0,
    options: [],
    type: "short_answer",
    answer: [
      "props는 부모로부터 전달받는 읽기 전용 데이터이고 state는 컴포넌트 내부에서 관리되는 변경 가능한 데이터이다",
    ],
    point: 10,
    explanation:
      "props는 외부에서 주어지는 값으로 컴포넌트 내부에서 직접 수정할 수 없고, state는 컴포넌트가 자체적으로 관리하며 변경 시 렌더링을 유발합니다.",
    is_correct: false,
    submitted_answer: [""],
  },
  {
    id: 4,
    question:
      "React 컴포넌트에서 상태를 관리하기 위해 사용하는 Hook과, 컴포넌트의 생명주기와 관련된 작업을 처리하는 Hook을 작성해보세요.",
    prompt:
      "React에서 상태를 관리하기 위해 사용하는 Hook은 __ 이며, 컴포넌트 렌더링 이후 특정 작업을 수행하기 위해 사용하는 Hook은 __ 이다.",
    blank_count: 2,
    options: [],
    type: "fill_blank",
    answer: ["useState", "useEffect"],
    point: 10,
    explanation:
      "useState는 컴포넌트의 상태를 관리하는 Hook이며, useEffect는 렌더링 이후 사이드 이펙트를 처리하는 데 사용됩니다.",
    is_correct: false,
    submitted_answer: ["", ""],
  },
  {
    id: 5,
    question: "React에서 props는 자식 컴포넌트에서 직접 수정할 수 있다.",
    prompt: "",
    blank_count: 0,
    options: ["O", "X"],
    type: "ox",
    answer: ["X"],
    point: 15,
    explanation:
      "props는 부모 컴포넌트로부터 전달되는 읽기 전용 데이터이므로 자식 컴포넌트에서 직접 수정할 수 없습니다.",
    is_correct: false,
    submitted_answer: [""],
  },
  {
    id: 6,
    question:
      "React 함수 컴포넌트가 화면에 표시되기까지의 과정을 순서 없이 모아뒀어요. 올바른 순서로 정리해볼까요?",
    prompt: "",
    blank_count: 0,
    options: [
      "컴포넌트 함수 호출",
      "JSX 반환",
      "가상 DOM 생성",
      "실제 DOM에 반영",
    ],
    type: "ordering",
    answer: [
      "컴포넌트 함수 호출",
      "JSX 반환",
      "가상 DOM 생성",
      "실제 DOM에 반영",
    ],
    point: 10,
    explanation:
      "React는 컴포넌트 함수를 호출하여 JSX를 반환받고, 이를 기반으로 가상 DOM을 생성한 뒤 실제 DOM에 반영합니다.",
    is_correct: false,
    submitted_answer: ["", "", "", ""],
  },
];

export const examSubmission = {
  started_at: "",
  submitted_at: "",
  elapsed_time: "",
  score: 0,
  correct_answer_count: 0,
};
