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
          submission_id,
          exam,
          question_count,
          total_score,
          exam_info,
          is_done,
          duration_time,
        }) => (
          <li
            key={id}
            className="flex rounded-lg border border-neutral-200 bg-neutral-50 px-8 py-7"
          >
            <SubjectThumbnail
              thumbnailUrl={exam.subject.thumbnail_img_url}
              subjectTitle={exam.subject.title}
            />
            <div className="mx-4 grow">
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold">{exam.title}</span>
                <div
                  className={cn(
                    "flex h-6 w-14 items-center justify-center rounded-xs text-xs",
                    {
                      "bg-green-200 text-green-900": is_done,
                      "bg-red-200 text-red-900": !is_done,
                    }
                  )}
                >
                  {is_done ? "응시완료" : "미응시"}
                </div>
              </div>
              <span className="text-sm">{`${exam.subject.title} ㆍ ${exam_info.score ?? 0}점/${total_score}점 ㆍ ${exam_info.correct_answer_count ?? 0}/${question_count}개 정답`}</span>
            </div>
            {is_done ? (
              <LinkButton
                variant="outline"
                className="flex h-12 w-28 items-center justify-center p-0 font-semibold"
                to={`/exam/${id}/result/${submission_id}`}
              >
                상세보기
              </LinkButton>
            ) : (
              <ExamEntryModal
                subjectThumbnailUrl={exam.subject.thumbnail_img_url}
                subjectTitle={exam.subject.title}
                questionCount={question_count}
                durationTime={duration_time}
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
