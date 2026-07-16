import { HTMLAttributes, ReactNode } from "react";

export function Card({ children, className = "", ...rest }: { children: ReactNode; className?: string } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-2xl border border-line bg-white/70 backdrop-blur-sm shadow-[0_1px_0_0_var(--color-line)] ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
