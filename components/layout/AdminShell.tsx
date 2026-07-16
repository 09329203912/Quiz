"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { clearSession, readSession, Session } from "@/lib/session";

const navItems = [
  { href: "/admin", label: "Overview", glyph: "Ov" },
  { href: "/admin/users", label: "Users", glyph: "Us" },
  { href: "/admin/leaderboard", label: "Leaderboard", glyph: "Lb" },
  { href: "/admin/categories", label: "Categories", glyph: "Ct" },
  { href: "/admin/reports", label: "Reports", glyph: "Rp" },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname.startsWith(href);
}

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [checked, setChecked] = useState(false);

  // Access guard: only the fixed admin account may view this area. Anyone
  // else - including a logged-in regular user - is sent back to the login
  // screen. This is a client-side check against sessionStorage (see
  // lib/session.ts); a backend team should replace it with real
  // server-side authorization.
  useEffect(() => {
    const current = readSession();
    if (current?.role !== "admin") {
      router.replace("/login");
      return;
    }
    setSession(current);
    setChecked(true);
  }, [router]);

  function handleLogout() {
    clearSession();
    router.push("/login");
  }

  if (!checked) {
    return <div className="min-h-screen bg-paper-dim" />;
  }

  const NavLinks = () => (
    <nav className="flex flex-1 flex-col gap-1">
      {navItems.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 font-display text-sm transition-colors ${
              active ? "bg-accent text-ink" : "text-paper/70 hover:bg-white/5 hover:text-paper"
            }`}
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-[11px] ${
                active ? "bg-ink/15 text-ink" : "bg-white/5 text-paper/60"
              }`}
            >
              {item.glyph}
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-paper-dim">
      {/* Desktop sidebar - dark, distinct from the student dashboard */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col bg-ink px-4 py-6 lg:flex">
        <Link href="/admin" className="mb-8 flex items-center gap-2 px-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent font-mono text-sm font-semibold text-ink">
            Q
          </span>
          <div>
            <span className="block font-display text-lg font-semibold tracking-tight text-paper">Quirenda</span>
            <span className="block font-mono text-[10px] uppercase tracking-widest text-paper/50">
              Signed in as {session?.identifier}
            </span>
          </div>
        </Link>
        <NavLinks />
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2.5 font-display text-sm text-paper/70 hover:bg-white/5 hover:text-paper"
        >
          Log out
        </button>
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between bg-ink px-4 py-3 lg:hidden">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent font-mono text-xs font-semibold text-ink">
            Q
          </span>
          <span className="font-display text-base font-semibold text-paper">Admin panel</span>
        </Link>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-[3px]">
            <span className="h-[2px] w-4 bg-paper" />
            <span className="h-[2px] w-4 bg-paper" />
            <span className="h-[2px] w-4 bg-paper" />
          </div>
        </button>
      </div>
      {menuOpen ? (
        <div className="bg-ink px-4 py-4 lg:hidden">
          <NavLinks />
          <button
            onClick={handleLogout}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2.5 font-display text-sm text-paper/70"
          >
            Log out
          </button>
        </div>
      ) : null}

      <main className="px-4 py-8 sm:px-8 lg:ml-64 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
