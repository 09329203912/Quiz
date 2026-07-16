"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { saveSession } from "@/lib/session";

export default function RegisterPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  // UI-only submit handler. There is no backend yet - this simply
  // simulates a short loading state and drops the visitor into the
  // dashboard so the rest of the flow can be demoed end to end.
  // Registration always creates a regular user - there is no admin
  // sign-up flow, since the single admin account is fixed (see lib/session.ts).
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = String(formData.get("username") ?? "").trim();
    setSubmitting(true);
    saveSession({ role: "user", identifier: username || "student" });
    setTimeout(() => router.push("/dashboard"), 500);
  }

  return (
    <div className="min-h-screen bg-paper">
      <PublicNavbar />
      <div className="mx-auto flex max-w-md flex-col px-6 py-16">
        <span className="font-mono text-xs uppercase tracking-widest text-slate">Get started</span>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink">Create your account</h1>
        <p className="mt-2 text-sm text-slate">Set up a profile to track quizzes, scores, and your place on the leaderboard.</p>

        <Card className="mt-8 p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Field label="Full name" htmlFor="name">
              <input id="name" name="name" type="text" required placeholder="Alex Rivera" className={inputClasses} />
            </Field>
            <Field label="Username" htmlFor="username">
              <input id="username" name="username" type="text" required placeholder="alex.rivera" className={inputClasses} />
            </Field>
            <Field label="Email" htmlFor="email">
              <input id="email" name="email" type="email" required placeholder="alex@example.com" className={inputClasses} />
            </Field>
            <Field label="Password" htmlFor="password">
              <input id="password" name="password" type="password" required placeholder="••••••••" className={inputClasses} />
            </Field>
            <Field label="Confirm password" htmlFor="confirmPassword">
              <input id="confirmPassword" name="confirmPassword" type="password" required placeholder="••••••••" className={inputClasses} />
            </Field>

            <Button type="submit" variant="primary" size="md" className="mt-2 w-full" disabled={submitting}>
              {submitting ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </Card>

        <p className="mt-6 text-center text-sm text-slate">
          Already registered?{" "}
          <Link href="/login" className="font-medium text-ink underline decoration-accent underline-offset-4">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputClasses =
  "w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-slate/60 focus:border-ink/40 focus:outline-none focus:ring-2 focus:ring-accent-soft";

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block font-display text-sm font-medium text-ink">
        {label}
      </label>
      {children}
    </div>
  );
}
