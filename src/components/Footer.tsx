export function Footer() {
  return (
    <footer className="theme-footer relative z-40 mt-auto border-t py-8 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="theme-footer-text mt-6 text-sm">
            &copy; {new Date().getFullYear()} <span className="font-bold text-cyan-400">Owencodes</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
