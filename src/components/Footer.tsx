export function Footer({ compact = false }: { compact?: boolean }) {
  return (
    <footer
      className={`theme-footer relative z-40 mt-auto border-t backdrop-blur-md ${
        compact ? "py-4" : "py-8"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className={`theme-footer-text text-sm ${compact ? "" : "mt-6"}`}>
            &copy; {new Date().getFullYear()}{" "}
            <span className="brand-wordmark font-bold">
              Owen<span className="brand-wordmark-accent">codes</span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
