"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { loadTextShape } from "@tsparticles/shape-text";
import type { ISourceOptions } from "@tsparticles/engine";

const DEFAULT_TECH_WORDS = [
  "Laravel",
  "Vue.js",
  "React",
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

type ParticlesBackgroundProps = {
  words?: string[];
  id?: string;
};

export function ParticlesBackground({
  words = DEFAULT_TECH_WORDS,
  id = "projects-particles",
}: ParticlesBackgroundProps = {}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      await loadTextShape(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

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
      // Brand-like palette for the moving technology words.
      color: {
        value: [
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
        ],
      },
      opacity: {
        value: { min: 0.24, max: 0.48 },
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
    <div className="pointer-events-none absolute inset-0 z-0">
      <Particles id={id} options={options} />
    </div>
  );
}
