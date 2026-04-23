export function Footer() {
  return (
    <footer className="relative z-40 mt-auto border-t border-teal-500/20 py-6 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} <span className="font-bold text-cyan-400">Owencodes</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
