"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { currentUserProfile } from "@/data/mock-users";
import { clearSession } from "@/lib/session";

const navItems = [
  { href: "/dashboard", label: "Dashboard", glyph: "Db" },
  { href: "/dashboard/leaderboard", label: "Leaderboard", glyph: "Lb" },
  { href: "/dashboard/profile", label: "Profile", glyph: "Pf" },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname.startsWith(href);
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    clearSession();
    router.push("/login");
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
              active ? "bg-ink text-paper" : "text-ink/70 hover:bg-paper-dim hover:text-ink"
            }`}
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-[11px] ${
                active ? "bg-paper/15 text-paper" : "bg-paper-dim text-slate"
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
    <div className="min-h-screen bg-paper">
      {/* Desktop sidebar */}
      <aside className="ledger-rule fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-line bg-paper px-4 py-6 lg:flex">
        <Link href="/dashboard" className="mb-8 flex items-center gap-2 px-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-ink font-mono text-sm font-semibold text-paper">
            Q
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-ink">Quirenda</span>
        </Link>
        <NavLinks />
        <Link
          href="/dashboard/profile"
          className="mt-auto flex items-center gap-3 rounded-lg border border-line px-3 py-2.5 hover:bg-paper-dim"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent font-mono text-xs font-semibold text-ink">
            {currentUserProfile.avatarInitials}
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-medium text-ink">{currentUserProfile.name}</p>
            <p className="truncate font-mono text-xs text-slate">@{currentUserProfile.username}</p>
          </div>
        </Link>
        <button
          onClick={handleLogout}
          className="mt-2 flex items-center justify-center gap-2 rounded-lg px-3 py-2 font-mono text-xs uppercase tracking-widest text-slate hover:bg-paper-dim hover:text-ink"
        >
          Log out
        </button>
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-line bg-paper/95 px-4 py-3 backdrop-blur lg:hidden">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-ink font-mono text-xs font-semibold text-paper">
            Q
          </span>
          <span className="font-display text-base font-semibold text-ink">Quirenda</span>
        </Link>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-line"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-[3px]">
            <span className="h-[2px] w-4 bg-ink" />
            <span className="h-[2px] w-4 bg-ink" />
            <span className="h-[2px] w-4 bg-ink" />
          </div>
        </button>
      </div>
      {menuOpen ? (
        <div className="border-b border-line bg-paper px-4 py-4 lg:hidden">
          <NavLinks />
          <button
            onClick={handleLogout}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-line px-3 py-2.5 font-mono text-xs uppercase tracking-widest text-slate"
          >
            Log out
          </button>
        </div>
      ) : null}

      <main className="px-4 py-8 sm:px-8 lg:ml-64 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
