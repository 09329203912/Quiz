import { LoadingBlock } from "@/components/ui/Loading";

export default function Loading() {
  return (
    <div className="space-y-6">
      <LoadingBlock className="h-8 w-64" />
      <LoadingBlock className="h-2 w-full" />
      <LoadingBlock className="h-64 w-full" />
      <div className="flex justify-between gap-3">
        <LoadingBlock className="h-11 w-28" />
        <LoadingBlock className="h-11 w-28" />
      </div>
    </div>
  );
}
