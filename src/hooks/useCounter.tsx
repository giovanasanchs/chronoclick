import { useState, useRef, useCallback, useEffect } from "react";

export function useCounter() {
  const [count, setCount] = useState(
    () => Number(localStorage.getItem("chronoclick-count")) || 0,
  );
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const increment = useCallback(() => setCount((p) => p + 1), []);

  const reset = useCallback(() => {
    setCount(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsTimerRunning(false);
    localStorage.setItem("chronoclick-count", "0");
  }, []);

  const toggleTimer = useCallback(() => {
    if (isTimerRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsTimerRunning(false);
      localStorage.setItem("chronoclick-count", String(count));
    } else {
      setIsTimerRunning(true);
      intervalRef.current = setInterval(() => setCount((p) => p + 1), 1000);
    }
  }, [isTimerRunning, count]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { count, isTimerRunning, increment, reset, toggleTimer };
}
