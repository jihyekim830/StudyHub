import { cn } from "@/lib";
import type { Exam } from "@/types";
import { LinkButton } from "@/components/common";
import { NotFoundExam } from "@/components/common/not-found";
import { ExamEntryModal, SubjectThumbnail } from "@/components";

interface ExamListProps {
  exams: Exam[];
}

function ExamList({ exams }: ExamListProps) {
  if (exams.length === 0) return <NotFoundExam />;
  return (
    <ul className="grid grid-cols-1 gap-4 py-6">
      {exams.map(
        ({
          id,
          submissionId,
          exam,
          questionCount,
          totalScore,
          examInfo,
          isDone,
          durationTime,
        }) => (
          <li
            key={id}
            className="flex rounded-lg border border-neutral-200 bg-neutral-50 px-8 py-7"
          >
            <SubjectThumbnail
              thumbnailUrl={exam.subject.thumbnailImgUrl}
              subjectTitle={exam.subject.title}
            />
            <div className="mx-4 grow">
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold">{exam.title}</span>
                <div
                  className={cn(
                    "flex h-6 w-14 items-center justify-center rounded-xs text-xs",
                    {
                      "bg-green-200 text-green-900": isDone,
                      "bg-red-200 text-red-900": !isDone,
                    }
                  )}
                >
                  {isDone ? "응시완료" : "미응시"}
                </div>
              </div>
              <span className="text-sm">{`${exam.subject.title} ㆍ ${examInfo.score ?? 0}점/${totalScore}점 ㆍ ${examInfo.correctAnswerCount ?? 0}/${questionCount}개 정답`}</span>
            </div>
            {isDone ? (
              <LinkButton
                variant="outline"
                className="flex h-12 w-28 items-center justify-center p-0 font-semibold"
                to={`/exam/${id}/result/${submissionId}`}
              >
                상세보기
              </LinkButton>
            ) : (
              <ExamEntryModal
                subjectThumbnailUrl={exam.subject.thumbnailImgUrl}
                subjectTitle={exam.subject.title}
                questionCount={questionCount}
                durationTime={durationTime}
                deploymentId={id}
              />
            )}
          </li>
        )
      )}
    </ul>
  );
}

export default ExamList;
