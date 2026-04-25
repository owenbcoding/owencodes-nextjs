"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";

type ProjectCardDescriptionProps = {
  text: string;
  idPrefix: string;
};

export function ProjectCardDescription({ text, idPrefix }: ProjectCardDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const pRef = useRef<HTMLParagraphElement>(null);
  const descId = `${idPrefix}-description`;

  const measure = useCallback(() => {
    const el = pRef.current;
    if (!el) return;
    if (expanded) return;
    setIsTruncated(el.scrollHeight > el.clientHeight + 1);
  }, [expanded, text]);

  useLayoutEffect(() => {
    measure();
    const el = pRef.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure, text]);

  return (
    <div className="mb-4 shrink-0">
      <p
        ref={pRef}
        id={descId}
        className={
          "theme-body antialiased text-sm font-medium leading-relaxed tracking-wide md:text-base " +
          (expanded ? "" : "line-clamp-2")
        }
      >
        {text}
      </p>
      {isTruncated ? (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mt-1.5 w-full text-left text-sm font-medium text-teal-300/90 underline decoration-teal-500/50 underline-offset-2 transition-colors hover:text-teal-200 hover:decoration-teal-300/80 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400/60"
          aria-expanded={expanded}
          aria-controls={descId}
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      ) : null}
    </div>
  );
}
