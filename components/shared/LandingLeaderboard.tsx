"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Pagination } from "@/components/ui/Pagination";
import { fullLeaderboard } from "@/data/mock-admin";

const PAGE_SIZE = 5;

export function LandingLeaderboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(fullLeaderboard.length / PAGE_SIZE);

  const start = (currentPage - 1) * PAGE_SIZE;
  const pageEntries = fullLeaderboard.slice(start, start + PAGE_SIZE);

  return (
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left">
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
            {pageEntries.map((entry) => (
              <tr key={entry.id} className="border-b border-line last:border-b-0">
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
                  {entry.rank === 1 ? <Badge tone="accent" className="ml-2">Top scorer</Badge> : null}
                </td>
                <td className="px-5 py-4 font-mono text-sm text-ink">{entry.totalScore.toLocaleString()}</td>
                <td className="px-5 py-4 font-mono text-sm text-slate">{entry.quizzesCompleted}</td>
                <td className="px-5 py-4 font-mono text-sm text-slate">{entry.accuracy}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-4">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </Card>
  );
}