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
      {WORDS.map((word, index) => (
        <span
          key={word}
          className={index === activeIndex ? "hero-rotating-word-active" : ""}
        >
          {Array.from(word, (letter, letterIndex) => (
            <span
              key={`${word}-${letterIndex}`}
              style={{ animationDelay: `${letterIndex * 55}ms` }}
            >
              {letter}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
