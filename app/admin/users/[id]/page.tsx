import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/shared/StatCard";
import { getAdminUserById, adminUsers, getUserQuizHistory } from "@/data/mock-admin";
import { titleCase, difficultyLabel, formatDate } from "@/lib/format";

export function generateStaticParams() {
  return adminUsers.map((u) => ({ id: u.id }));
}

export default async function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = getAdminUserById(id);
  if (!user) notFound();

  const history = getUserQuizHistory(user);

  return (
    <div className="space-y-8">
      <div>
        <Link href="/admin/users" className="font-mono text-xs uppercase tracking-widest text-slate hover:text-ink">
          &larr; All users
        </Link>
      </div>

      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-lg font-semibold text-ink">
            {user.name
              .split(" ")
              .map((p) => p[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </span>
          <div>
            <h1 className="font-display text-2xl font-semibold text-ink">{user.name}</h1>
            <p className="font-mono text-sm text-slate">@{user.username} &middot; {user.email}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge tone={user.role === "admin" ? "accent" : "neutral"}>{user.role}</Badge>
          <Badge tone={user.status === "active" ? "correct" : "wrong"}>{user.status}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Quizzes completed" value={user.quizzesCompleted} />
        <StatCard label="Total score" value={user.totalScore.toLocaleString()} />
        <StatCard label="Accuracy" value={user.accuracy} suffix="%" />
        <StatCard label="Favorite subject" value={titleCase(user.favoriteCategory)} />
      </div>

      <Card className="p-6">
        <h2 className="font-display text-lg font-semibold text-ink">Account details</h2>
        <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-xs uppercase tracking-widest text-slate">Joined</dt>
            <dd className="mt-1 font-display text-sm text-ink">{formatDate(user.joinedDate)}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-widest text-slate">Last active</dt>
            <dd className="mt-1 font-display text-sm text-ink">{formatDate(user.lastActive)}</dd>
          </div>
        </dl>
      </Card>

      <Card className="p-6">
        <h2 className="font-display text-lg font-semibold text-ink">Quiz history</h2>
        <div className="mt-4 divide-y divide-line">
          {history.map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3.5 first:pt-0">
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
    </div>
  );
}
