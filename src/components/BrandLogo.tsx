export function BrandLogo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg
        aria-hidden="true"
        className="h-7 w-12 shrink-0 sm:h-8 sm:w-14"
        viewBox="0 0 56 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17 5 5 16l12 11M39 5l12 11-12 11"
          stroke="var(--brand-cyan)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="m32 3-8 26"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
      <span className="brand-wordmark whitespace-nowrap font-extrabold tracking-tight">
        Owen<span className="brand-wordmark-accent">codes</span>
      </span>
    </span>
  );
}
