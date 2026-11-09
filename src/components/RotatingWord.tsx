"use client";

import { useEffect, useState } from "react";

const WORDS = ["Engineer", "Developer", "Innovator"];

export function RotatingWord() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((index) => (index + 1) % WORDS.length);
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="hero-rotating-word" aria-hidden="true">
      <span key={WORDS[activeIndex]}>
        {Array.from(WORDS[activeIndex], (letter, letterIndex) => (
          <span
            key={`${WORDS[activeIndex]}-${letterIndex}`}
            style={{ animationDelay: `${letterIndex * 55}ms` }}
          >
            {letter}
          </span>
        ))}
      </span>
    </span>
  );
}
