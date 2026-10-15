"use client";

import { useSyncExternalStore } from "react";
import type { Theme } from "@/lib/theme";

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getServerSnapshot(): Theme {
  return "dark";
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, readTheme, getServerSnapshot);
}
