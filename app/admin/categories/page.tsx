import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { categories } from "@/data/categories";
import { categoryStats } from "@/data/mock-admin";

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-slate">Admin panel</span>
        <h1 className="mt-1 font-display text-3xl font-semibold text-ink">Categories</h1>
        <p className="mt-1 text-sm text-slate">{categories.length} subjects, 15 questions each (5 per difficulty).</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const stats = categoryStats.find((s) => s.category === category.id);
          return (
            <Link key={category.id} href={`/admin/categories/${category.id}`}>
              <Card className="h-full p-5 transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-slate">Category</p>
                    <h3 className="mt-1 font-display text-lg font-semibold text-ink">{category.name}</h3>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-ink font-mono text-xs font-semibold text-paper">
                    {category.glyph}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-dashed border-line pt-4 text-center">
                  <div>
                    <p className="font-mono text-sm font-semibold text-ink">{stats?.attempts ?? 0}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-slate">Attempts</p>
                  </div>
                  <div>
                    <p className="font-mono text-sm font-semibold text-ink">{stats?.averageScore ?? 0}%</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-slate">Avg score</p>
                  </div>
                  <div>
                    <p className="font-mono text-sm font-semibold text-ink">15</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-slate">Questions</p>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
