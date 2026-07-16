import Link from "next/link";
import { Category } from "@/types/quiz";

/**
 * Signature UI element: each quiz category is presented as a library
 * catalog card - a punch hole, a printed glyph tab, and a dashed rule
 * before the description, evoking the index cards used to look up a
 * subject before choosing what to study.
 */
export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/dashboard/quiz/${category.id}`}
      className="group relative flex flex-col justify-between rounded-xl border border-line bg-white p-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-md"
    >
      <div className="absolute left-4 top-4 h-3 w-3 rounded-full punch-hole bg-paper" aria-hidden />
      <div className="flex items-start justify-between pl-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-slate">Category</p>
          <h3 className="mt-1 font-display text-lg font-semibold text-ink">{category.name}</h3>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-ink font-mono text-xs font-semibold text-paper">
          {category.glyph}
        </span>
      </div>
      <div className="my-4 border-t border-dashed border-line pl-6" />
      <p className="pl-6 text-sm leading-relaxed text-slate">{category.description}</p>
      <span className="mt-5 pl-6 font-display text-sm font-medium text-ink underline decoration-accent decoration-2 underline-offset-4 group-hover:decoration-4">
        Start studying &rarr;
      </span>
    </Link>
  );
}
