import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryById, categories } from "@/data/categories";
import { Difficulty } from "@/types/quiz";
import { getQuestions } from "@/data/questions";

const difficulties: { id: Difficulty; label: string; blurb: string }[] = [
  { id: "easy", label: "Easy", blurb: "Warm-up questions to check the fundamentals." },
  { id: "medium", label: "Medium", blurb: "Applied questions that need real understanding." },
  { id: "hard", label: "Hard", blurb: "Advanced questions that test the edge cases." },
];

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export default async function DifficultySelectionPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = getCategoryById(categorySlug);
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/quiz" className="font-mono text-xs uppercase tracking-widest text-slate hover:text-ink">
          &larr; Change subject
        </Link>
        <span className="mt-3 block font-mono text-xs uppercase tracking-widest text-slate">Step 2 of 3</span>
        <h1 className="mt-1 font-display text-3xl font-semibold text-ink">
          {category.name}: pick a difficulty
        </h1>
        <p className="mt-1 text-sm text-slate">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {difficulties.map((d, i) => {
          const count = getQuestions(category.id, d.id).length;
          return (
            <Link
              key={d.id}
              href={`/dashboard/quiz/${category.id}/${d.id}`}
              className="group flex flex-col justify-between rounded-xl border border-line bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-md"
            >
              <div>
                <span className="font-mono text-xs text-slate">Level {String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-2 font-display text-xl font-semibold text-ink">{d.label}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate">{d.blurb}</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-dashed border-line pt-4">
                <span className="font-mono text-xs text-slate">{count} questions</span>
                <span className="font-display text-sm font-medium text-ink underline decoration-accent decoration-2 underline-offset-4 group-hover:decoration-4">
                  Begin &rarr;
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
