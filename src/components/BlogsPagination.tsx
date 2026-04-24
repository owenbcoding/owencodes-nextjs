import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
};

function pageHref(page: number): string {
  return page === 1 ? "/blogs" : `/blogs?page=${page}`;
}

export function BlogsPagination({ currentPage, totalPages }: Props) {
  if (totalPages <= 1) return null;

  const prevPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-10 flex items-center justify-center gap-2"
    >
      <Link
        href={pageHref(prevPage)}
        aria-disabled={!hasPrev}
        tabIndex={hasPrev ? 0 : -1}
        className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
          hasPrev
            ? "border-white/10 bg-black/30 text-slate-200 backdrop-blur-sm hover:border-teal-400/50 hover:text-teal-300"
            : "pointer-events-none border-white/5 bg-black/20 text-slate-500"
        }`}
      >
        Previous
      </Link>

      {pages.map((page) => {
        const isActive = page === currentPage;
        return (
          <Link
            key={page}
            href={pageHref(page)}
            aria-current={isActive ? "page" : undefined}
            className={`min-w-9 rounded-full border px-3 py-1.5 text-center text-sm font-medium transition-colors duration-200 ${
              isActive
                ? "border-teal-400/50 bg-white text-slate-900 shadow-[0_0_12px_rgba(45,212,191,0.4)]"
                : "border-white/10 bg-black/30 text-slate-200 backdrop-blur-sm hover:border-teal-400/50 hover:text-teal-300"
            }`}
          >
            {page}
          </Link>
        );
      })}

      <Link
        href={pageHref(nextPage)}
        aria-disabled={!hasNext}
        tabIndex={hasNext ? 0 : -1}
        className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
          hasNext
            ? "border-white/10 bg-black/30 text-slate-200 backdrop-blur-sm hover:border-teal-400/50 hover:text-teal-300"
            : "pointer-events-none border-white/5 bg-black/20 text-slate-500"
        }`}
      >
        Next
      </Link>
    </nav>
  );
}
