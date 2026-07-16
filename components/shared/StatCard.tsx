import { Card } from "@/components/ui/Card";
import { ReactNode } from "react";

export function StatCard({
  label,
  value,
  suffix,
  icon,
}: {
  label: string;
  value: string | number;
  suffix?: string;
  icon?: ReactNode;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <p className="font-mono text-xs uppercase tracking-widest text-slate">{label}</p>
        {icon ? <span className="text-slate/70">{icon}</span> : null}
      </div>
      <p className="mt-3 font-display text-3xl font-semibold text-ink">
        {value}
        {suffix ? <span className="ml-1 text-base font-normal text-slate">{suffix}</span> : null}
      </p>
    </Card>
  );
}
