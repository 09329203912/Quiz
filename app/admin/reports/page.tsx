import { Card } from "@/components/ui/Card";
import { HorizontalBarList } from "@/components/shared/Charts";
import { categoryStats, difficultyBreakdown, adminUsers } from "@/data/mock-admin";
import { titleCase, difficultyLabel } from "@/lib/format";

export default function AdminReportsPage() {
  const scoreByCategory = [...categoryStats]
    .sort((a, b) => b.averageScore - a.averageScore)
    .map((c) => ({ label: titleCase(c.category), value: c.averageScore }));

  const attemptsByDifficulty = difficultyBreakdown.map((d) => ({
    label: difficultyLabel(d.difficulty),
    value: d.attempts,
  }));

  const buckets = [
    { label: "90–100%", min: 90, max: 100 },
    { label: "80–89%", min: 80, max: 89 },
    { label: "70–79%", min: 70, max: 79 },
    { label: "60–69%", min: 60, max: 69 },
    { label: "Below 60%", min: 0, max: 59 },
  ];
  const students = adminUsers.filter((u) => u.role === "user");
  const accuracyDistribution = buckets.map((b) => ({
    label: b.label,
    value: students.filter((u) => u.accuracy >= b.min && u.accuracy <= b.max).length,
  }));

  return (
    <div className="space-y-6">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-slate">Admin panel</span>
        <h1 className="mt-1 font-display text-3xl font-semibold text-ink">Reports</h1>
        <p className="mt-1 text-sm text-slate">How students are performing, by subject and difficulty.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="font-display text-lg font-semibold text-ink">Average score by subject</h2>
          <div className="mt-5">
            <HorizontalBarList items={scoreByCategory} valueSuffix="%" />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-display text-lg font-semibold text-ink">Attempts by difficulty</h2>
          <div className="mt-5">
            <HorizontalBarList items={attemptsByDifficulty} />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-dashed border-line pt-4 text-center">
            {difficultyBreakdown.map((d) => (
              <div key={d.difficulty}>
                <p className="font-mono text-sm font-semibold text-ink">{d.averageScore}%</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-slate">{difficultyLabel(d.difficulty)} avg</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <h2 className="font-display text-lg font-semibold text-ink">Student accuracy distribution</h2>
          <p className="mt-1 text-sm text-slate">How many students fall into each accuracy band.</p>
          <div className="mt-5">
            <HorizontalBarList items={accuracyDistribution} valueSuffix=" students" />
          </div>
        </Card>
      </div>

      <p className="font-mono text-xs text-slate">
        Figures are sample data for this frontend preview - the backend team will connect real analytics.
      </p>
    </div>
  );
}
