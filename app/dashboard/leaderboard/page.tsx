import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { leaderboardData } from "@/data/mock-users";

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-slate">Standings</span>
        <h1 className="mt-1 font-display text-3xl font-semibold text-ink">Leaderboard</h1>
        <p className="mt-1 text-sm text-slate">Ranked by total score across every completed quiz.</p>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line font-mono text-xs uppercase tracking-widest text-slate">
                <th className="px-5 py-3.5 font-medium">Rank</th>
                <th className="px-5 py-3.5 font-medium">Username</th>
                <th className="px-5 py-3.5 font-medium">Total score</th>
                <th className="px-5 py-3.5 font-medium">Quizzes</th>
                <th className="px-5 py-3.5 font-medium">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry) => {
                const isYou = entry.username === "you";
                return (
                  <tr
                    key={entry.rank}
                    className={`border-b border-line last:border-b-0 ${isYou ? "bg-accent-soft/40" : ""}`}
                  >
                    <td className="px-5 py-4">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full font-mono text-xs font-semibold ${
                          entry.rank <= 3 ? "bg-ink text-paper" : "bg-paper-dim text-slate"
                        }`}
                      >
                        {entry.rank}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-display text-sm font-medium text-ink">{entry.username}</span>
                      {isYou ? <Badge tone="accent" className="ml-2">You</Badge> : null}
                    </td>
                    <td className="px-5 py-4 font-mono text-sm text-ink">{entry.totalScore.toLocaleString()}</td>
                    <td className="px-5 py-4 font-mono text-sm text-slate">{entry.quizzesCompleted}</td>
                    <td className="px-5 py-4 font-mono text-sm text-slate">{entry.accuracy}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="font-mono text-xs text-slate">
        Sample standings shown for this frontend preview - the backend team will connect live rankings.
      </p>
    </div>
  );
}
