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
  speedMs = 120,
  startDelayMs = 300,
}: TypewriterTextProps) {
  const [charCount, setCharCount] = useState(0);
  const [lastText, setLastText] = useState(text);
  if (lastText !== text) {
    setLastText(text);
    setCharCount(0);
  }

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        setCharCount((count) => {
          if (count >= text.length) {
            if (interval) clearInterval(interval);
            return count;
          }
          return count + 1;
        });
      }, speedMs);
    }, startDelayMs);

    return () => {
      clearTimeout(startTimeout);
      if (interval) clearInterval(interval);
    };
  }, [text, speedMs, startDelayMs]);

  const isDone = charCount >= text.length;

  return (
    <span className={className}>
      <span aria-hidden="true" className="whitespace-pre-line">
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
