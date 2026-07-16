export function LoadingBlock({ className = "h-24 w-full" }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl bg-paper-dim ${className}`} aria-label="Loading" role="status" />;
}

export function LoadingCards({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <LoadingBlock key={i} className="h-40 w-full" />
      ))}
    </div>
  );
}
