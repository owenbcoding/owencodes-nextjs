"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

const CONFETTI_COLORS = ["#f43f5e", "#facc15", "#2dd4bf", "#a78bfa", "#fb923c"];
const CONFETTI_COUNT = 22;
const BIRTHDAY_LETTERS = Array.from("HAPPY BIRTHDAY").filter(
  (letter) => letter !== " ",
);

type FallStyle = CSSProperties & {
  "--fall-delay": string;
  "--fall-duration": string;
  "--fall-drift": string;
  "--fall-tilt": string;
};

function getFallStyle(index: number, count: number): FallStyle {
  const waveProgress = index / count;

  return {
    left: `${((index + 0.5) / count) * 100}%`,
    "--fall-delay": `${waveProgress * 2.4}s`,
    "--fall-duration": `${10 + (index % 3)}s`,
    "--fall-drift": `${index % 2 === 0 ? 1 : -1}${18 + (index % 4) * 9}px`,
    "--fall-tilt": `${index % 2 === 0 ? 1 : -1}${25 + (index % 5) * 13}deg`,
  };
}

function getLetterFallStyle(index: number): FallStyle {
  const spacedIndex = index < 5 ? index : index + 2;

  return {
    ...getFallStyle(index, BIRTHDAY_LETTERS.length),
    left: `${((spacedIndex + 0.5) / (BIRTHDAY_LETTERS.length + 2)) * 100}%`,
    "--fall-delay": `${index * 0.04}s`,
    "--fall-duration": "13s",
    "--fall-drift": `${index % 2 === 0 ? 1 : -1}4px`,
    "--fall-tilt": `${index % 2 === 0 ? 1 : -1}${12 + (index % 4) * 4}deg`,
  };
}

export function BirthdayConfetti() {
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    const now = new Date();
    if (now.getMonth() !== 5 || now.getDate() !== 17) return;

    const timeout = window.setTimeout(() => setIsBirthday(true), 0);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!isBirthday) return null;

  return (
    <div className="birthday-confetti-layer" aria-hidden="true">
      {Array.from({ length: CONFETTI_COUNT }, (_, index) => (
        <span
          key={`confetti-${index}`}
          className="birthday-confetti-piece"
          style={{
            ...getFallStyle(index, CONFETTI_COUNT),
            backgroundColor: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
          }}
        />
      ))}
      {BIRTHDAY_LETTERS.map((letter, index) => (
        <span
          key={`letter-${index}`}
          className="birthday-confetti-letter"
          style={{
            ...getLetterFallStyle(index),
            color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
          }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
}
