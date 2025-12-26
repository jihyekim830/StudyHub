import { useEffect, useRef, useState } from "react";

function useExamTimer(durationMinutes: number) {
  const startedAtRef = useRef(Date.now());
  const endsAtRef = useRef(startedAtRef.current + durationMinutes * 1000 * 60);
  const [remainingMs, setRemainingMs] = useState(
    endsAtRef.current - startedAtRef.current
  );
  const hasTimedOut = remainingMs <= 0;

  useEffect(() => {
    if (hasTimedOut) return;

    const intervalId = setInterval(() => {
      setRemainingMs(Math.max(0, endsAtRef.current - Date.now()));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [hasTimedOut]);

  return { startedAt: startedAtRef.current, remainingMs, hasTimedOut };
}

export default useExamTimer;
