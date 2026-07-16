import Link from "next/link";
import { StatCard } from "@/components/shared/StatCard";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { HorizontalBarList, WeeklyColumnChart } from "@/components/shared/Charts";
import { adminUsers, systemStats, weeklyActivity, categoryStats } from "@/data/mock-admin";
import { titleCase, formatDate } from "@/lib/format";

export default function AdminOverviewPage() {
  const recentSignups = [...adminUsers]
    .sort((a, b) => new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime())
    .slice(0, 5);

  const topCategories = [...categoryStats]
    .sort((a, b) => b.attempts - a.attempts)
    .slice(0, 5)
    .map((c) => ({ label: titleCase(c.category), value: c.attempts }));

  return (
    <div className="space-y-8">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-slate">Admin panel</span>
        <h1 className="mt-1 font-display text-3xl font-semibold text-ink">Overview</h1>
        <p className="mt-1 text-sm text-slate">Everything happening on Quirenda, at a glance.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatCard label="Total users" value={systemStats.totalUsers} />
        <StatCard label="Quizzes taken" value={systemStats.totalQuizzesTaken.toLocaleString()} />
        <StatCard label="Active today" value={systemStats.activeToday} />
        <StatCard label="Average score" value={systemStats.averageScore} suffix="%" />
        <StatCard label="New signups (7d)" value={systemStats.newSignupsThisWeek} />
        <StatCard label="Suspended accounts" value={systemStats.suspendedUsers} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card className="p-6">
          <h2 className="font-display text-lg font-semibold text-ink">Quizzes taken this week</h2>
          <div className="mt-6">
            <WeeklyColumnChart items={weeklyActivity} />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-display text-lg font-semibold text-ink">Most attempted subjects</h2>
          <div className="mt-5">
            <HorizontalBarList items={topCategories} valueSuffix=" attempts" />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">Recent signups</h2>
          <Link href="/admin/users" className="font-mono text-xs uppercase tracking-widest text-slate hover:text-ink">
            All users
          </Link>
        </div>
        <div className="mt-4 divide-y divide-line">
          {recentSignups.map((user) => (
            <Link
              key={user.id}
              href={`/admin/users/${user.id}`}
              className="flex items-center justify-between gap-4 py-3.5 first:pt-0 hover:opacity-70"
            >
              <div>
                <p className="font-display text-sm font-medium text-ink">{user.name}</p>
                <p className="font-mono text-xs text-slate">@{user.username} &middot; joined {formatDate(user.joinedDate)}</p>
              </div>
              <Badge tone={user.status === "active" ? "correct" : "wrong"}>{user.status}</Badge>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
