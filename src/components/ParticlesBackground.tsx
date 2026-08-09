"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { loadTextShape } from "@tsparticles/shape-text";
import type { ISourceOptions } from "@tsparticles/engine";
import { useTheme } from "@/lib/useTheme";

const DEFAULT_TECH_WORDS = [
  "Laravel",
  "Vue.js",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Shopify",
  "Livewire",
  "PHP",
  "Node.js",
  "Tailwind",
  "PostgreSQL",
  "OpenAI",
  "REST APIs",
  "</>",
  "{ }",
  "[ ]",
  "< />",
];

// Brand-like palette for the moving technology words, tuned to stay legible
// against the dark site background.
const DARK_WORD_COLORS = [
  "#FF2D20", // Laravel
  "#41B883", // Vue
  "#61DAFB", // React
  "#ffffff", // Next.js
  "#3178C6", // TypeScript
  "#F7DF1E", // JavaScript
  "#95BF47", // Shopify
  "#FB70A9", // Livewire
  "#777BB4", // PHP
  "#68A063", // Node.js
  "#38BDF8", // Tailwind CSS
  "#336791", // PostgreSQL
  "#10A37F", // OpenAI
  "#A3A3A3", // Generic symbols / APIs
];

// Same palette, deepened so each word stays readable against the light
// cream/mint site background instead of washing out.
const LIGHT_WORD_COLORS = [
  "#991B1B", // Laravel
  "#14532D", // Vue
  "#075985", // React
  "#0F172A", // Next.js
  "#1E40AF", // TypeScript
  "#78350F", // JavaScript
  "#3F6212", // Shopify
  "#831843", // Livewire
  "#3730A3", // PHP
  "#1A4D22", // Node.js
  "#075985", // Tailwind CSS
  "#172F4D", // PostgreSQL
  "#065F46", // OpenAI
  "#3F3F46", // Generic symbols / APIs
];

// Alpha-blending math means low opacity over a light background reads as
// pale gray no matter how dark the base color is (e.g. near-black at 24%
// opacity over the cream background comes out close to rgb(191,189,186)),
// so light mode needs a much higher opacity floor/ceiling than dark mode
// to actually look readable rather than washed out.
const DARK_WORD_OPACITY = { min: 0.24, max: 0.48 };
const LIGHT_WORD_OPACITY = { min: 0.55, max: 0.85 };

type ParticlesBackgroundProps = {
  words?: string[];
  id?: string;
};

export function ParticlesBackground({
  words = DEFAULT_TECH_WORDS,
  id = "projects-particles",
}: ParticlesBackgroundProps = {}) {
  const [ready, setReady] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      await loadTextShape(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  const wordColors = theme === "light" ? LIGHT_WORD_COLORS : DARK_WORD_COLORS;
  const wordOpacity = theme === "light" ? LIGHT_WORD_OPACITY : DARK_WORD_OPACITY;

  const options: ISourceOptions = {
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    detectRetina: true,
    particles: {
      number: {
        value: 22,
        density: { enable: true, width: 1920, height: 1080 },
      },
      shape: {
        type: "text",
        options: {
          text: {
            value: words,
            font: "Geist Mono, JetBrains Mono, Menlo, monospace",
            style: "",
            weight: "700",
            fill: true,
          },
        },
      },
      color: {
        value: wordColors,
      },
      opacity: {
        value: wordOpacity,
        animation: {
          enable: true,
          speed: 0.4,
          sync: false,
          startValue: "random",
        },
      },
      size: {
        value: { min: 14, max: 28 },
      },
      move: {
        enable: true,
        speed: { min: 0.2, max: 0.8 },
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" },
      },
      rotate: {
        value: { min: -8, max: 8 },
        direction: "random",
        animation: { enable: true, speed: 2, sync: false },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "bubble" },
      },
      modes: {
        bubble: { distance: 120, duration: 2, opacity: 0.7, size: 28 },
      },
    },
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-0 w-full min-w-0 max-w-full overflow-hidden">
      <Particles key={theme} id={id} options={options} className="!size-full" />
    </div>
  );
}
