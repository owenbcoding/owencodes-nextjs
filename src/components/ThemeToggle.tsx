"use client";

type Theme = "dark" | "light";

const STORAGE_KEY = "owencodes-theme";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(STORAGE_KEY, theme);
}

export function ThemeToggle() {
  return (
    <button
      type="button"
      className="theme-toggle hidden h-10 w-10 items-center justify-center rounded-full transition duration-200 lg:inline-flex"
      aria-label="Toggle light and dark mode"
      onClick={() => {
        const isLight = document.documentElement.dataset.theme === "light";
        const nextTheme = isLight ? "dark" : "light";
        applyTheme(nextTheme);
      }}
    >
      <svg
        className="theme-toggle-moon h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8Z" />
      </svg>
      <svg
        className="theme-toggle-sun h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    </button>
  );
}
