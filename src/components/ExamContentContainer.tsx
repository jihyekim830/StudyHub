import { EXAM_LAYOUT_BASE } from "@/constants";
import { cn } from "@/lib";

interface ExamContentContainerProps {
  children: React.ReactNode;
}

function ExamContentContainer({ children }: ExamContentContainerProps) {
  return (
    <ul className={cn(EXAM_LAYOUT_BASE, "mt-15 flex flex-col gap-24")}>
      {children}
    </ul>
  );
}

export default ExamContentContainer;
