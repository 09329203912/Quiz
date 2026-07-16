import { ReactNode } from "react";

type Tone = "neutral" | "accent" | "correct" | "wrong";

const toneClasses: Record<Tone, string> = {
  neutral: "bg-paper-dim text-slate",
  accent: "bg-accent-soft text-ink",
  correct: "bg-correct/10 text-correct",
  wrong: "bg-wrong/10 text-wrong",
};

export function Badge({ children, tone = "neutral", className = "" }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-mono uppercase tracking-wide ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
