"use client";

type PageItem = number | "ellipsis";

function getPageList(current: number, total: number): PageItem[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const result: PageItem[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push("ellipsis");
    result.push(sorted[i]);
  }
  return result;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = getPageList(currentPage, totalPages);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
      <p className="font-mono text-xs text-slate">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-line font-mono text-xs text-ink transition-colors hover:bg-paper-dim disabled:pointer-events-none disabled:opacity-30"
        >
          &lsaquo;
        </button>

        {pages.map((page, i) =>
          page === "ellipsis" ? (
            <span key={`ellipsis-${i}`} className="px-1 font-mono text-xs text-slate">
              &hellip;
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={`flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs transition-colors ${
                page === currentPage ? "bg-ink text-paper" : "text-ink hover:bg-paper-dim"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-line font-mono text-xs text-ink transition-colors hover:bg-paper-dim disabled:pointer-events-none disabled:opacity-30"
        >
          &rsaquo;
        </button>
      </div>
    </div>
  );
}