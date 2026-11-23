"use client";

import { useEffect, useRef } from "react";

type Point = [number, number];

export function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const element = canvasRef.current;
    if (!element) return;
    const context = element.getContext("2d", { alpha: false });
    if (!context) return;
    // Explicit types keep the non-null narrowing inside the nested render
    // helpers below, which TypeScript does not carry over from the guards.
    const canvas: HTMLCanvasElement = element;
    const ctx: CanvasRenderingContext2D = context;

    let w = 1920;
    let h = 1080;
    let scale = 1;
    let frame = 0;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      scale = Math.min(1.5, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * scale);
      canvas.height = Math.round(h * scale);
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
    }

    function strand(
      base: number,
      amp: number,
      offset: number,
      slope: number,
      thickness: number,
      phase: number,
      speed: number,
      glow: string,
      bright: string,
      fade: number,
      t: number,
    ) {
      const n = 105;
      const step = w / n;

      function fy(x: number) {
        const u = x / w;
        return (
          h * base +
          h * slope * (u - 0.5) +
          h * amp * Math.sin(u * 5.2 + t * speed + phase) +
          h * 0.018 * Math.sin(u * 10.4 - t * speed * 0.6 + phase * 0.55)
        );
      }

      const upper: Point[] = [];
      const lower: Point[] = [];
      for (let i = 0; i <= n; i++) {
        const x = i * step;
        const u = x / w;
        const f = 0.6 + 0.4 * Math.sin(u * 3.2 + phase + t * 0.13);
        const center = fy(x) + offset * h;
        upper.push([x, center - thickness * h * f * 0.43]);
        lower.push([x, center + thickness * h * f * 0.57]);
      }

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const mid = h * (base + offset);
      const g = ctx.createLinearGradient(
        0,
        mid - thickness * h * 0.8,
        0,
        mid + thickness * h * 0.9,
      );
      g.addColorStop(0, "rgba(6,76,79,0.005)");
      g.addColorStop(0.23, "rgba(0,137,145,0.075)");
      g.addColorStop(0.54, glow);
      g.addColorStop(0.75, "rgba(6,119,127,0.14)");
      g.addColorStop(1, "rgba(0,20,28,0.005)");

      ctx.beginPath();
      upper.forEach(([x, y], i) => {
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      for (let i = lower.length - 1; i >= 0; i--) {
        const p = lower[i];
        if (p) ctx.lineTo(p[0], p[1]);
      }
      ctx.closePath();
      ctx.fillStyle = g;
      ctx.fill();

      ctx.globalAlpha = fade;
      ctx.beginPath();
      lower.forEach(([x, y], i) => {
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = bright;
      ctx.lineWidth = Math.max(1.5, w * 0.0015);
      ctx.shadowColor = "#1ff2dc";
      ctx.shadowBlur = Math.min(28, w * 0.014);
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.lineWidth = Math.max(1, w * 0.0007);
      ctx.strokeStyle = "rgba(170,255,246,.52)";
      ctx.stroke();
      ctx.restore();
    }

    function render(ms: number) {
      const t = ms / 1000;
      ctx.setTransform(scale, 0, 0, scale, 0, 0);

      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, "#02131a");
      bg.addColorStop(0.39, "#000508");
      bg.addColorStop(0.74, "#010e15");
      bg.addColorStop(1, "#03171e");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const blob = (x: number, y: number, r: number, color: string) => {
        const gr = ctx.createRadialGradient(x, y, 0, x, y, r);
        gr.addColorStop(0, color);
        gr.addColorStop(1, "rgba(0,44,47,0)");
        ctx.fillStyle = gr;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
      };

      blob(w * (0.12 + 0.028 * Math.sin(t * 0.12)), h * 0.05, w * 0.49, "rgba(4,140,139,.15)");
      blob(w * (0.86 - 0.022 * Math.sin(t * 0.11)), h * 0.76, w * 0.51, "rgba(0,128,122,.16)");
      blob(w * 0.48, h * 0.5, w * 0.38, "rgba(1,37,39,.11)");

      strand(-0.12, 0.09, 0, 0.36, 0.35, 0.4, 0.18, "rgba(11,194,183,.24)", "rgba(46,243,220,.68)", 0.57, t);
      strand(0.8, 0.1, 0.02, -0.18, 0.3, 2.2, -0.17, "rgba(12,215,197,.24)", "rgba(25,252,223,.95)", 0.76, t);
      strand(0.93, 0.053, -0.11, -0.29, 0.16, 4.2, 0.21, "rgba(10,148,153,.17)", "rgba(62,203,212,.58)", 0.35, t);
      strand(0.19, 0.052, 0, -0.19, 0.18, 1.9, 0.12, "rgba(8,151,152,.12)", "rgba(46,204,204,.42)", 0.25, t);

      frame = requestAnimationFrame(render);
    }

    resize();
    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
