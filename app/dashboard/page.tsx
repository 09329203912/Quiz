import Link from "next/link";
import { StatCard } from "@/components/shared/StatCard";
import { CategoryCard } from "@/components/shared/CategoryCard";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { categories } from "@/data/categories";
import { currentUserProfile, dashboardStats, leaderboardData } from "@/data/mock-users";
import { titleCase, difficultyLabel, formatDate } from "@/lib/format";

export default function DashboardPage() {
  const previewCategories = categories.slice(0, 6);
  const topThree = leaderboardData.slice(0, 3);

  return (
    <div className="space-y-10">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-slate">Dashboard</span>
        <h1 className="mt-1 font-display text-3xl font-semibold text-ink">
          Welcome back, {currentUserProfile.name.split(" ")[0]}.
        </h1>
        <p className="mt-1 text-sm text-slate">Here's where your ledger stands today.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Quizzes completed" value={dashboardStats.totalQuizzesCompleted} />
        <StatCard label="Highest score" value={dashboardStats.highestScore} suffix="%" />
        <StatCard label="Total points" value={dashboardStats.totalPoints.toLocaleString()} />
        <StatCard label="Current streak" value={dashboardStats.currentStreak} suffix="days" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">Recent activity</h2>
            <Link href="/dashboard/profile" className="font-mono text-xs uppercase tracking-widest text-slate hover:text-ink">
              View all
            </Link>
          </div>
          <div className="mt-4 divide-y divide-line">
            {currentUserProfile.history.slice(0, 4).map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 first:pt-0">
                <div>
                  <p className="font-display text-sm font-medium text-ink">{titleCase(item.category)}</p>
                  <p className="mt-0.5 font-mono text-xs text-slate">{formatDate(item.date)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge tone="neutral">{difficultyLabel(item.difficulty)}</Badge>
                  <span className="font-mono text-sm font-semibold text-ink">{item.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">Leaderboard preview</h2>
            <Link href="/dashboard/leaderboard" className="font-mono text-xs uppercase tracking-widest text-slate hover:text-ink">
              Full board
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {topThree.map((entry) => (
              <div key={entry.rank} className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink font-mono text-xs font-semibold text-paper">
                  {entry.rank}
                </span>
                <span className="flex-1 truncate font-display text-sm text-ink">{entry.username}</span>
                <span className="font-mono text-sm font-semibold text-ink">{entry.totalScore.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <div className="flex items-end justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">Pick a subject</h2>
          <Link href="/dashboard/quiz" className="font-mono text-xs uppercase tracking-widest text-slate hover:text-ink">
            View all {categories.length} &rarr;
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {previewCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}
