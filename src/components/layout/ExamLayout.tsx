import { Outlet } from "react-router";
import ToastBox from "@/components/common/toast/ToastBox";

function ExamLayout() {
  return (
    <div>
      <Outlet />
      <ToastBox />
    </div>
  );
}

export default ExamLayout;
