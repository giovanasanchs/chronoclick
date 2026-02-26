import { useState, useRef, useCallback, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useCounter() {
  const [count, setCount] = useLocalStorage("chronoclick-count", 0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const increment = useCallback(() => setCount((p) => p + 1), [setCount]);

  const reset = useCallback(() => {
    setCount(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsTimerRunning(false);
  }, [setCount]);

  const toggleTimer = useCallback(() => {
    if (isTimerRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsTimerRunning(false);
    } else {
      setIsTimerRunning(true);
      intervalRef.current = setInterval(() => setCount((p) => p + 1), 1000);
    }
  }, [isTimerRunning, setCount]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { count, isTimerRunning, increment, reset, toggleTimer };
}
