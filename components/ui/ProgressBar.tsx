export function ProgressBar({
  value,
  max = 100,
  label,
  toneClassName = "bg-accent",
}: {
  value: number;
  max?: number;
  label?: string;
  toneClassName?: string;
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="w-full">
      {label ? (
        <div className="mb-1.5 flex items-center justify-between font-mono text-xs text-slate">
          <span>{label}</span>
          <span>{Math.round(pct)}%</span>
        </div>
      ) : null}
      <div className="h-2 w-full overflow-hidden rounded-full bg-paper-dim">
        <div
          className={`h-full rounded-full transition-all duration-300 ${toneClassName}`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
