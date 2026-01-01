import { LoadingUi } from "@/components/common";
import { useEnrolledCourses } from "@/hooks/api";

export default function EnrolledCouresSection() {
  const { data: courses, isPending, isError } = useEnrolledCourses();

  if (isPending) {
    return (
      <div className="flex items-center justify-center">
        <LoadingUi />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center">
        수강 정보를 불러오는데 문제가 발생했습니다. 잠시후 다시 시도해주세요.
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center gap-10 rounded-lg border p-11">
      <div className="flex w-full flex-col items-center gap-2">
        <span className="text-primary-600 w-full text-xl font-semibold">
          수강중인 과정
        </span>
        <hr className="w-full" />
      </div>

      <div className="flex w-full flex-col items-center gap-2">
        {courses.length > 0 ? (
          <>
            {courses.map(
              (
                {
                  cohort: { id: cohortId, number },
                  course: { id: courseId, thumbnail_img_url: imageUrl, name },
                },
                i
              ) => (
                <div
                  key={`${cohortId}-${courseId}-${i}`}
                  className="flex w-full items-center justify-between"
                >
                  <div className="flex w-full flex-1 flex-col items-start justify-center">
                    <span className="text-sm text-neutral-500">
                      익스턴십 개발 캠프 · 오즈코딩
                    </span>
                    <span>{`${name} <${number}기>`}</span>
                  </div>
                  <img src={imageUrl} className="w-36" />
                </div>
              )
            )}
          </>
        ) : (
          <span>아직 수강중인 과정이 없습니다.</span>
        )}
      </div>
    </section>
  );
}
