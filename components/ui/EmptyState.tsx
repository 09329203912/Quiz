import { ReactNode } from "react";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line px-6 py-16 text-center">
      <div className="mb-4 h-10 w-10 rounded-full border border-line ledger-rule" aria-hidden />
      <h3 className="font-display text-lg font-medium text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-slate">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
