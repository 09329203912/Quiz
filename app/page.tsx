import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { categories } from "@/data/categories";
import { LandingLeaderboard } from "@/components/shared/LandingLeaderboard";

const features = [
  {
    glyph: "01",
    title: "Sixteen subjects, three levels deep",
    body: "From HTML basics to hard mode chemistry - pick a subject, pick a difficulty, and start where you actually are.",
  },
  {
    glyph: "02",
    title: "Every answer, explained",
    body: "Wrong answers come with a short explanation, not just a red mark. Review your quiz like a graded exam handed back.",
  },
  {
    glyph: "03",
    title: "A running ledger of your progress",
    body: "Your dashboard tracks quizzes completed, your highest score, and where you rank against everyone else studying.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-paper">
      <PublicNavbar />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-xs uppercase tracking-widest text-slate">
              Frontend preview &middot; 16 subjects
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Learn something.
              <br />
              Prove it.
              <br />
              <span className="text-accent">Repeat.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-slate">
              Quirenda turns study material into short, honest quizzes - easy, medium, and hard - across
              science, programming, and general knowledge. No fluff, just questions worth answering.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/register" variant="primary" size="lg">Create free account</Button>
              <Button href="/login" variant="outline" size="lg">I already have one</Button>
            </div>
          </div>

          <Card className="p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-slate">Today's ledger</p>
            <div className="mt-4 space-y-3">
              {[
                { label: "Questions answered", value: "12,480" },
                { label: "Average accuracy", value: "83%" },
                { label: "Subjects covered", value: "16" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between border-t border-dashed border-line pt-3 first:border-t-0 first:pt-0">
                  <span className="text-sm text-slate">{row.label}</span>
                  <span className="font-mono text-lg font-semibold text-ink">{row.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-lg bg-paper-dim px-4 py-3 text-xs text-slate">
              Sample figures shown for this frontend preview - the backend team will wire these to live data.
            </div>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-y border-line bg-white/60 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Built for actually learning, not just scoring</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {features.map((f) => (
              <div key={f.glyph}>
                <span className="font-mono text-sm text-accent">{f.glyph}</span>
                <h3 className="mt-3 font-display text-lg font-medium text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section id="leaderboard" className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">See who's leading the board</h2>
            <p className="mt-2 max-w-md text-sm text-slate">
              Ranked by total score across every completed quiz. Create an account to add your name to it.
            </p>
          </div>
          <Button href="/register" variant="ghost" size="sm" className="hidden sm:inline-flex">
            Join the board &rarr;
          </Button>
        </div>
        <div className="mt-8">
          <LandingLeaderboard />
        </div>
      </section>
      {/* Categories preview */}
      <section id="categories" className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Sixteen subjects on the shelf</h2>
          <Button href="/register" variant="ghost" size="sm" className="hidden sm:inline-flex">
            See them all &rarr;
          </Button>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((c) => (
            <span
              key={c.id}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 font-display text-sm text-ink"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded bg-ink font-mono text-[10px] text-paper">
                {c.glyph}
              </span>
              {c.name}
            </span>
          ))}
        </div>
      </section>

      <footer className="border-t border-line px-6 py-10 text-center font-mono text-xs text-slate">
        Quirenda — a frontend demo. Backend, accounts, and real scoring arrive later.
      </footer>
    </div>
  );
}
