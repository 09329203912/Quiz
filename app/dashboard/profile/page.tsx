import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/shared/StatCard";
import { currentUserProfile } from "@/data/mock-users";
import { titleCase, difficultyLabel, formatDate } from "@/lib/format";

export default function ProfilePage() {
  const user = currentUserProfile;

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-xl font-semibold text-ink">
          {user.avatarInitials}
        </span>
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">{user.name}</h1>
          <p className="font-mono text-sm text-slate">@{user.username}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total points" value={user.totalPoints.toLocaleString()} />
        <StatCard label="Highest score" value={user.highestScore} suffix="%" />
        <StatCard label="Completed quizzes" value={user.completedQuizzes} />
        <StatCard label="Favorite category" value={titleCase(user.favoriteCategory)} />
      </div>

      <Card className="p-6">
        <h2 className="font-display text-lg font-semibold text-ink">Recent quiz history</h2>
        <div className="mt-4 divide-y divide-line">
          {user.history.map((item, i) => (
            <div key={i} className="flex items-center justify-between gap-4 py-3.5 first:pt-0">
              <div>
                <p className="font-display text-sm font-medium text-ink">{titleCase(item.category)}</p>
                <p className="mt-0.5 font-mono text-xs text-slate">{formatDate(item.date)}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge tone="neutral">{difficultyLabel(item.difficulty)}</Badge>
                <span className="font-mono text-sm font-semibold text-ink">
                  {item.score}% <span className="text-slate">of {item.totalQuestions}q</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
