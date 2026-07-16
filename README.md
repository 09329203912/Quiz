# Quirenda — Quiz Learning Platform (Frontend Only)

A frontend-only quiz platform built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**. No backend, no database, no real authentication — every "account", score, and leaderboard entry is mock data living in the `data/` folder, ready for a backend team to swap in real APIs later.

## Getting started

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000. Register or log in (any values work — there's no real check) to land on the dashboard.

## How the app is organized

```
app/
  page.tsx                              Landing page
  (auth)/login/page.tsx                 Login form (UI only)
  (auth)/register/page.tsx              Register form (UI only)
  dashboard/layout.tsx                  Sidebar + top bar shell for every dashboard route
  dashboard/page.tsx                    Dashboard home: stats, activity, leaderboard preview, categories
  dashboard/quiz/page.tsx               Step 1 — choose a subject (all 16 categories)
  dashboard/quiz/[category]/page.tsx    Step 2 — choose Easy / Medium / Hard
  dashboard/quiz/[category]/[difficulty]/page.tsx           Step 3 — the interactive quiz
  dashboard/quiz/[category]/[difficulty]/results/page.tsx   Score + review screen
  dashboard/leaderboard/page.tsx        Full leaderboard table
  dashboard/profile/page.tsx            Mock profile + quiz history

components/
  ui/           Small generic building blocks (Button, Card, Badge, ProgressBar, EmptyState, Loading)
  layout/       PublicNavbar (landing/auth pages) and DashboardShell (sidebar/topbar/mobile menu)
  shared/       StatCard, CategoryCard (the "index card" category tiles)
  quiz/         QuizRunner (the interactive quiz) and ResultsView (score + review)

data/
  categories.ts       The 16 subjects shown across the app
  mock-users.ts       Mock leaderboard rows and the current user's profile
  questions/          One file per category, each exporting 15 questions (5 easy / 5 medium / 5 hard)
  questions/index.ts  Combines every category file into one lookup used by the quiz pages

types/quiz.ts   Shared TypeScript types: Question, Category, QuizResult, LeaderboardEntry, UserProfile, etc.
lib/            Frontend-only helpers — format.ts (labels, dates, grading) and quiz-storage.ts
```

## How the quiz flow works (no backend involved)

1. **Dashboard → Choose subject** (`/dashboard/quiz`) renders a card per category from `data/categories.ts`.
2. **Choose difficulty** (`/dashboard/quiz/[category]`) reads how many Easy/Medium/Hard questions exist for that category from `data/questions`.
3. **Take the quiz** (`/dashboard/quiz/[category]/[difficulty]`) — `QuizRunner` is a client component that holds all quiz state (current question, selected answers, running score) in React state. Nothing is sent anywhere.
4. **Submit** — on the last question, `QuizRunner` computes the score, and temporarily saves the full result (including every answer) to `sessionStorage` via `lib/quiz-storage.ts`, then navigates to the results route.
5. **Results** (`/dashboard/quiz/[category]/[difficulty]/results`) — `ResultsView` reads that result back out of `sessionStorage` and renders the score, a grade stamp, and a full answer-by-answer review with explanations.

`sessionStorage` here is just a stand-in so the two routes can hand off data without a server. A backend team can replace `saveQuizResult` / `readQuizResult` with a real API call (e.g. `POST /api/quiz-results` then fetch by ID) without touching the UI components.

## Design system

Custom Tailwind v4 theme tokens live in `app/globals.css` under `@theme`:

- **Colors** — `ink` (near-black text/background), `paper` (warm off-white background), `accent` (amber/gold), `correct` / `wrong` (green/rust for quiz feedback), `slate` (secondary text), `line` (hairline borders).
- **Type** — `font-display` (Space Grotesk, for headings), `font-body` (Inter, for paragraph text), `font-mono` (JetBrains Mono, for scores, stats, and labels — a nod to a scorekeeper's ledger).
- **Signature elements** — category cards are styled like library index cards (a punch hole + printed glyph tab), and the results page shows a rotated "graded stamp" badge with a letter grade, echoing a handed-back exam.

## What's intentionally missing (for the backend team)

- No real authentication, sessions, or password handling — `login`/`register` forms just simulate a short delay and redirect to `/dashboard`.
- No database — all data comes from static TypeScript files in `data/`.
- No API routes — quiz results, leaderboard rankings, and profile stats are all mock values.
- `sessionStorage` hand-off between the quiz and results pages should be replaced with a real persisted result once an API exists.

## Logging in as admin vs. a regular user

There's one login form for everyone. There's a single **fixed admin account** (no admin sign-up flow):

```
username: Admin123
password: Adminpass123
```

Log in with those exact values and you're routed to `/admin`. Anything else is treated as an already-registered regular user and routed to `/dashboard` - since there's no real backend, any other email/password combination "succeeds" (there's nothing to check it against). Registering a new account always creates a regular user; there's no way to register as admin.

**Admin access is guarded.** `AdminShell` checks `sessionStorage` on mount (via `lib/session.ts`) and immediately redirects anyone who isn't signed in as `Admin123` back to `/login` - so a regular user (or someone who hasn't logged in at all) can't view `/admin` just by typing the URL. This is a client-side check for demo purposes, not real security (the session is just a plain object in `sessionStorage`, easy to fake in devtools) - a backend team should replace it with real server-side authorization and sessions.

**Logging out** (available in both the student dashboard sidebar and the admin sidebar) clears that session and sends you back to `/login`.

## Admin panel

A separate `/admin` section gives an administrator a full view of the platform:

```
app/admin/layout.tsx                     Dark sidebar shell, distinct from the student dashboard
app/admin/page.tsx                       Overview - system stats, weekly activity, top subjects, recent signups
app/admin/users/page.tsx                 Full user directory - search, filter by status, suspend/reactivate
app/admin/users/[id]/page.tsx            Single user's profile, stats, and quiz history
app/admin/leaderboard/page.tsx           Full ranking across every registered student (not just the top 10 shown to students)
app/admin/categories/page.tsx            All 16 subjects with attempt counts and average scores
app/admin/categories/[category]/page.tsx Question bank viewer per subject, tabbed by difficulty
app/admin/reports/page.tsx               Average score by subject, attempts by difficulty, accuracy distribution
```

It pulls from `data/mock-admin.ts` (a wider mock user directory, system stats, weekly activity, and category performance) plus the same `data/categories.ts` and `data/questions/` used by the student side, so question data only lives in one place.

There's no role-based access control on the backend (there is no backend) - but `/admin` does check the client-side session described above and will bounce anyone who isn't signed in as `Admin123` back to `/login`. The "Suspend / Reactivate" button and "+ Add question" button are interactive in the UI, but changes only live in local component state for the current session - nothing is persisted.

## Adding more questions

Each category file in `data/questions/` exports an array of `Question` objects (see `types/quiz.ts`). To add a question, append an object with a unique `id`, `question`, four `options`, the `correctAnswer` index (0-3), an `explanation`, and the matching `category` / `difficulty`. No other file needs to change — `data/questions/index.ts` and `getQuestions()` pick it up automatically.
