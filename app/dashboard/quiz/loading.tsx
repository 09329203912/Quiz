import { LoadingCards } from "@/components/ui/Loading";
import { LoadingBlock } from "@/components/ui/Loading";

export default function Loading() {
  return (
    <div className="space-y-6">
      <LoadingBlock className="h-8 w-56" />
      <LoadingCards count={6} />
    </div>
  );
}
