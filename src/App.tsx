import { ExamLayout, RootLayout } from "@/components/layout";
import { BrowserRouter, Route, Routes } from "react-router";
import { NotFound } from "@/components/common/not-found";
import {
  LoginPage,
  SignupPage,
  EmailSignupPage,
  Exams,
  Home,
  TakeExam,
} from "@/pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/community" element={<div>커뮤니티 페이지</div>} />
          <Route path="/qna" element={<div>질의응답 페이지</div>} />
          <Route path="/profile" element={<div>수강생 등록 페이지</div>} />
          <Route path="/my-page/exams" element={<Exams />} />
          <Route path="/my-page" element={<div>마이페이지</div>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/email-signup" element={<EmailSignupPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/exam" element={<ExamLayout />}>
          <Route path=":deploymentId" element={<TakeExam />} />
          {/* TODO 페이지 컴포넌트로 변경하기 */}
          <Route
            path=":deploymentId/result/:submissionId"
            element={<div>쪽지시험 결과</div>}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
