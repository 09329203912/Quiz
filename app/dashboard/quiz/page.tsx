import { CategoryCard } from "@/components/shared/CategoryCard";
import { categories } from "@/data/categories";

export default function CategorySelectionPage() {
  return (
    <div className="space-y-6">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-slate">Step 1 of 3</span>
        <h1 className="mt-1 font-display text-3xl font-semibold text-ink">Choose a subject</h1>
        <p className="mt-1 text-sm text-slate">Pick a category, then a difficulty, then start answering.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
