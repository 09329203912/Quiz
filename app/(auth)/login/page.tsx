"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { isAdminCredentials, saveSession } from "@/lib/session";

export default function LoginPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  // UI-only auth. There's a single fixed admin account (see lib/session.ts);
  // anything else is treated as a regular, already-registered user. The
  // backend team will replace this with real credential checking.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const identifier = String(formData.get("identifier") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    setSubmitting(true);

    if (isAdminCredentials(identifier, password)) {
      saveSession({ role: "admin", identifier });
      setTimeout(() => router.push("/admin"), 500);
      return;
    }

    saveSession({ role: "user", identifier: identifier || "student" });
    setTimeout(() => router.push("/dashboard"), 500);
  }

  return (
    <div className="min-h-screen bg-paper">
      <PublicNavbar />
      <div className="mx-auto flex max-w-md flex-col px-6 py-16">
        <span className="font-mono text-xs uppercase tracking-widest text-slate">Welcome back</span>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink">Log in</h1>
        <p className="mt-2 text-sm text-slate">Pick up your streak where you left it.</p>

        <Card className="mt-8 p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="identifier" className="mb-1.5 block font-display text-sm font-medium text-ink">
                Email or username
              </label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                required
                placeholder="alex@example.com"
                className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-slate/60 focus:border-ink/40 focus:outline-none focus:ring-2 focus:ring-accent-soft"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block font-display text-sm font-medium text-ink">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-slate/60 focus:border-ink/40 focus:outline-none focus:ring-2 focus:ring-accent-soft"
              />
            </div>

            <Button type="submit" variant="primary" size="md" className="mt-2 w-full" disabled={submitting}>
              {submitting ? "Logging in..." : "Log in"}
            </Button>
          </form>
        </Card>

        <div className="mt-4 rounded-lg bg-paper-dim px-4 py-3 font-mono text-xs text-slate">
          Demo admin login &middot; username <span className="text-ink">Admin123</span> &middot; password{" "}
          <span className="text-ink">Adminpass123</span>
        </div>

        <p className="mt-6 text-center text-sm text-slate">
          New here?{" "}
          <Link href="/register" className="font-medium text-ink underline decoration-accent underline-offset-4">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
