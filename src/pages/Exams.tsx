import { ExamCategorySelector, ExamList } from "@/components";
import type { ExamCategory } from "@/types";
import { useEffect, useState } from "react";
import { NotFound } from "@/components/common/not-found";
import { LoadingUi } from "@/components/common";
import { useInfiniteScroll } from "@/hooks";
import { useExamList } from "@/hooks/api";

function Exams() {
  const [category, setCategory] = useState<ExamCategory>("all");

  const {
    data: exams,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useExamList();

  const bottomRef = useInfiniteScroll<HTMLDivElement>(
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    category === "all"
  );

  const filteredExams =
    exams?.pages.flatMap((page) => {
      if (category === "all") return page.results;
      return page.results.filter((item) => item.examInfo.status === category);
    }) ?? [];

  const handleCategoryClick = (category: ExamCategory) => setCategory(category);

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  if (isError)
    return <NotFound statusCode={error.response?.status ?? error.message} />;
  return (
    <section className="flex min-h-dvh flex-col">
      <h1 className="mb-10 text-4xl font-bold">쪽지시험</h1>
      <ExamCategorySelector
        category={category}
        onChange={handleCategoryClick}
      />
      {isLoading ? (
        <LoadingUi className="flex grow items-center self-center" />
      ) : (
        <>
          <ExamList exams={filteredExams} />
          <div className="h-5" ref={bottomRef}></div>
          {isFetchingNextPage && <LoadingUi className="mb-10 self-center" />}
        </>
      )}
    </section>
  );
}

export default Exams;
