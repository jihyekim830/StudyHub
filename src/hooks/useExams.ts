import { useExamList } from "@/hooks/api";

function useExams() {
  const pendingQuery = useExamList("pending");
  const doneQuery = useExamList("done");

  const pendingExams = pendingQuery.data?.pages.flatMap((page) => page.results);
  const doneExams = doneQuery.data?.pages.flatMap((page) => page.results);
  const allExams = [...(pendingExams ?? []), ...(doneExams ?? [])];

  const isLoading = pendingQuery.isLoading || doneQuery.isLoading;
  const isError = pendingQuery.isError || doneQuery.isError;
  // 두 쿼리 모두에서 오류 발생하면 pending 쿼리 오류 우선 표시
  const error = pendingQuery.error ?? doneQuery.error;
  const hasNextPage = pendingQuery.hasNextPage || doneQuery.hasNextPage;
  const isFetchingNextPage =
    pendingQuery.isFetchingNextPage || doneQuery.isFetchingNextPage;

  const fetchNextPage = () => {
    if (pendingQuery.hasNextPage && doneQuery.hasNextPage) {
      pendingQuery.fetchNextPage();
      doneQuery.fetchNextPage();
      return;
    }
    if (pendingQuery.hasNextPage) return pendingQuery.fetchNextPage();
    if (doneQuery.hasNextPage) return doneQuery.fetchNextPage();
  };

  return {
    data: allExams,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
}

export default useExams;
