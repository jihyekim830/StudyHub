import { EXAM_LAYOUT_BASE } from "@/constants";
import { cn } from "@/lib";

interface ExamHeaderContainerProps {
  children: React.ReactNode;
}

function ExamHeaderContainer({ children }: ExamHeaderContainerProps) {
  return (
    <header className="fixed inset-0 z-20 flex h-32 items-center justify-center border-b border-b-neutral-400 bg-neutral-100">
      <div className={cn(EXAM_LAYOUT_BASE, "flex grow items-center")}>
        {children}
      </div>
    </header>
  );
}

export default ExamHeaderContainer;
