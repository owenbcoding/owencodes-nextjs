"use client";

import { useEffect, useState } from "react";

type TypewriterTextProps = {
  text: string;
  className?: string;
  speedMs?: number;
  startDelayMs?: number;
};

export function TypewriterText({
  text,
  className,
  speedMs = 45,
  startDelayMs = 300,
}: TypewriterTextProps) {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(0);

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setCharCount((count) => {
          if (count >= text.length) {
            clearInterval(interval);
            return count;
          }
          return count + 1;
        });
      }, speedMs);

      return () => clearInterval(interval);
    }, startDelayMs);

    return () => clearTimeout(startTimeout);
  }, [text, speedMs, startDelayMs]);

  const isDone = charCount >= text.length;

  return (
    <span className={className}>
      <span aria-hidden="true">
        {text.slice(0, charCount)}
        <span
          className={`ml-0.5 inline-block w-0.5 bg-current align-middle ${
            isDone ? "animate-pulse" : ""
          }`}
          style={{ height: "1em" }}
        />
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
