import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router";

interface ExamHeaderTitleProps {
  title: string;
  subText: string;
}

function ExamHeaderTitle({ title, subText }: ExamHeaderTitleProps) {
  return (
    <div className="flex grow items-start gap-3">
      <Link to="/my-page/exams" replace aria-label="시험 목록으로 돌아가기">
        <ArrowLeftIcon className="mt-1 size-6" />
      </Link>
      <div className="flex flex-col gap-1">
        <span className="text-xl font-semibold">{title}</span>
        <span className="text-neutral-700">{subText}</span>
      </div>
    </div>
  );
}

export default ExamHeaderTitle;
