"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export function ContactBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const options: ISourceOptions = {
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    detectRetina: true,
    particles: {
      number: {
        value: 28,
        density: { enable: true, width: 1920, height: 1080 },
      },
      shape: { type: "square" },
      color: {
        value: ["#2dd4bf", "#14b8a6", "#5eead4", "#0d9488"],
      },
      opacity: {
        value: { min: 0.2, max: 0.55 },
        animation: {
          enable: true,
          speed: 0.3,
          sync: false,
          startValue: "random",
        },
      },
      size: {
        value: { min: 2, max: 6 },
      },
      move: {
        enable: true,
        speed: { min: 0.15, max: 0.6 },
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" },
      },
      rotate: {
        value: { min: 0, max: 90 },
        direction: "random",
        animation: { enable: true, speed: 1, sync: false },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "bubble" },
      },
      modes: {
        bubble: { distance: 100, duration: 2, opacity: 0.8, size: 8 },
      },
    },
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(45,212,191,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(45,212,191,0.08) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.3) 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.3) 100%)",
        }}
      />

      {ready && (
        <Particles
          id="contact-particles"
          options={options}
          className="absolute inset-0"
        />
      )}
    </div>
  );
}
