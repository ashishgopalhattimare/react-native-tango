import { useCallback, useEffect, useRef, useState } from "react";

export const useTimer = (delay: number = 1000) => {

  const [isStarted, setIsStarted] = useState(false);
  const [time, setTime] = useState(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Has stopped running
    if (!isStarted) return;

    // Has started running
    startTimeRef.current = Date.now();
    const ref = setInterval(() => {
      if (startTimeRef.current) {
        setTime(Date.now() - startTimeRef.current);
      }
    }, delay);

    return () => {
      clearInterval(ref);
    };
  }, [isStarted, delay]);

  const start = useCallback(() => setIsStarted(true), []);
  const stop = useCallback(() => setIsStarted(false), []);

  return { start, stop, time: Math.floor(time / 1000) };
};
