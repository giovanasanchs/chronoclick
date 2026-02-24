import { useState, useRef, useCallback, useEffect } from 'react';

export function useCounter() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('chronoclick-count');
    return saved ? Number(saved) : 0;
  });
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    localStorage.setItem('chronoclick-count', String(count));
  }, [count]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const reset = useCallback(() => {
    setCount(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsTimerRunning(false);
  }, []);

  const toggleTimer = useCallback(() => {
    if (isTimerRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsTimerRunning(false);
    } else {
      intervalRef.current = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 1000);
      setIsTimerRunning(true);
    }
  }, [isTimerRunning]);

  return { count, isTimerRunning, increment, reset, toggleTimer };
}
