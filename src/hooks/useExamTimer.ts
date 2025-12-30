import { useCallback, useEffect, useRef, useState } from "react";

function useExamTimer(durationMinutes: number) {
  const startedAtRef = useRef(Date.now());
  const endsAtRef = useRef(startedAtRef.current + durationMinutes * 1000 * 60);
  const intervalIdRef = useRef<NodeJS.Timeout>(null);
  const [remainingMs, setRemainingMs] = useState(
    endsAtRef.current - startedAtRef.current
  );
  const hasTimedOut = remainingMs <= 0;

  const stopTimer = useCallback(() => {
    if (!intervalIdRef.current) return;

    clearInterval(intervalIdRef.current);
    intervalIdRef.current = null;
  }, []);

  useEffect(() => {
    if (hasTimedOut) return;
    if (intervalIdRef.current) return;

    const intervalId = setInterval(() => {
      setRemainingMs(Math.max(0, endsAtRef.current - Date.now()));
    }, 1000);
    intervalIdRef.current = intervalId;

    return stopTimer;
  }, [hasTimedOut, stopTimer]);

  return {
    startedAt: startedAtRef.current,
    remainingMs,
    hasTimedOut,
    stopTimer,
  };
}

export default useExamTimer;
