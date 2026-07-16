import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-ink font-mono text-sm font-semibold text-paper">
            Q
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-ink">Quirenda</span>
        </Link>
        <nav className="hidden items-center gap-8 font-display text-sm text-ink/80 sm:flex">
          <a href="#features" className="hover:text-ink">Features</a>
          <a href="#categories" className="hover:text-ink">Categories</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button href="/login" variant="ghost" size="sm">Log in</Button>
          <Button href="/register" variant="primary" size="sm">Register</Button>
        </div>
      </div>
    </header>
  );
}
