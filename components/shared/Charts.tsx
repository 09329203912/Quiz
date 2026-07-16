export function HorizontalBarList({
  items,
  valueSuffix = "",
}: {
  items: { label: string; value: number }[];
  valueSuffix?: string;
}) {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.label}>
          <div className="mb-1 flex items-center justify-between font-mono text-xs text-slate">
            <span className="font-display text-sm text-ink">{item.label}</span>
            <span>
              {item.value}
              {valueSuffix}
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-paper-dim">
            <div
              className="h-full rounded-full bg-accent"
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function WeeklyColumnChart({ items }: { items: { day: string; quizzesTaken: number }[] }) {
  const max = Math.max(...items.map((i) => i.quizzesTaken), 1);
  return (
    <div className="flex h-40 items-end justify-between gap-2">
      {items.map((item) => (
        <div key={item.day} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex h-32 w-full items-end">
            <div
              className="w-full rounded-t-md bg-ink"
              style={{ height: `${(item.quizzesTaken / max) * 100}%` }}
              title={`${item.quizzesTaken} quizzes`}
            />
          </div>
          <span className="font-mono text-[11px] text-slate">{item.day}</span>
        </div>
      ))}
    </div>
  );
}
