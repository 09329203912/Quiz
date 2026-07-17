"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Pagination } from "@/components/ui/Pagination";
import { adminUsers as initialUsers } from "@/data/mock-admin";
import { AdminUser, UserStatus } from "@/types/admin";
import { formatDate } from "@/lib/format";

type StatusFilter = "all" | UserStatus;
const PAGE_SIZE = 8;

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchesQuery =
        query.trim() === "" ||
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.username.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "all" || u.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [users, query, statusFilter]);

  // Jump back to page 1 whenever the search or status filter changes,
  // so pagination never gets stuck past the end of a smaller result set.
  useEffect(() => {
    setCurrentPage(1);
  }, [query, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pageUsers = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  function toggleStatus(id: string) {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u))
    );
  }

  const statusTabs: { id: StatusFilter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "suspended", label: "Suspended" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-slate">Admin panel</span>
        <h1 className="mt-1 font-display text-3xl font-semibold text-ink">Users</h1>
        <p className="mt-1 text-sm text-slate">{users.length} registered accounts.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, username, or email..."
          className="w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-slate/60 focus:border-ink/40 focus:outline-none focus:ring-2 focus:ring-accent-soft sm:max-w-sm"
        />
        <div className="flex gap-1 rounded-full border border-line bg-white p-1">
          {statusTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`rounded-full px-3.5 py-1.5 font-display text-xs font-medium transition-colors ${
                statusFilter === tab.id ? "bg-ink text-paper" : "text-slate hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line font-mono text-xs uppercase tracking-widest text-slate">
                <th className="px-5 py-3.5 font-medium">User</th>
                <th className="px-5 py-3.5 font-medium">Role</th>
                <th className="px-5 py-3.5 font-medium">Quizzes</th>
                <th className="px-5 py-3.5 font-medium">Score</th>
                <th className="px-5 py-3.5 font-medium">Accuracy</th>
                <th className="px-5 py-3.5 font-medium">Last active</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageUsers.map((user) => (
                <tr key={user.id} className="border-b border-line last:border-b-0">
                  <td className="px-5 py-4">
                    <Link href={`/admin/users/${user.id}`} className="block hover:opacity-70">
                      <p className="font-display text-sm font-medium text-ink">{user.name}</p>
                      <p className="font-mono text-xs text-slate">@{user.username}</p>
                    </Link>
                  </td>
                  <td className="px-5 py-4">
                    <Badge tone={user.role === "admin" ? "accent" : "neutral"}>{user.role}</Badge>
                  </td>
                  <td className="px-5 py-4 font-mono text-sm text-ink">{user.quizzesCompleted}</td>
                  <td className="px-5 py-4 font-mono text-sm text-ink">{user.totalScore.toLocaleString()}</td>
                  <td className="px-5 py-4 font-mono text-sm text-slate">{user.accuracy}%</td>
                  <td className="px-5 py-4 font-mono text-sm text-slate">{formatDate(user.lastActive)}</td>
                  <td className="px-5 py-4">
                    <Badge tone={user.status === "active" ? "correct" : "wrong"}>{user.status}</Badge>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => toggleStatus(user.id)}
                      className="font-display text-xs font-medium text-ink underline decoration-accent decoration-2 underline-offset-4 hover:decoration-4"
                    >
                      {user.status === "active" ? "Suspend" : "Reactivate"}
                    </button>
                  </td>
                </tr>
              ))}
              {pageUsers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center text-sm text-slate">
                    No users match "{query}".
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-4">
          <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </Card>

      <p className="font-mono text-xs text-slate">
        Status changes here are local to this session for demo purposes - the backend team will wire this to real account actions.
      </p>
    </div>
  );
}