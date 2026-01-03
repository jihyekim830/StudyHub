import { ExamLayout, RootLayout, MyPageLayout } from "@/components/layout";
import { BrowserRouter, Route, Routes } from "react-router";
import { NotFound } from "@/components/common/not-found";
import {
  LoginPage,
  SignupPage,
  EmailSignupPage,
  Exams,
  Home,
  TakeExam,
  ChangePasswordPage,
  ExamResult,
  MyPage,
  MyPageEdit,
} from "@/pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<div>수강생 등록 페이지</div>} />

          <Route path="/my-page" element={<MyPageLayout />}>
            <Route index element={<MyPage />} />
            <Route path="edit" element={<MyPageEdit />} />
            <Route path="change-password" element={<ChangePasswordPage />} />
            <Route path="exams" element={<Exams />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/email-signup" element={<EmailSignupPage />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/exam" element={<ExamLayout />}>
          <Route path=":deploymentId" element={<TakeExam />} />
          <Route
            path=":deploymentId/result/:submissionId"
            element={<ExamResult />}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
