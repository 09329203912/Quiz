import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg py-16">
      <EmptyState
        title="We couldn't find that page"
        description="The subject, difficulty, or quiz you're looking for doesn't exist. Head back and pick from the list."
        action={<Button href="/dashboard/quiz">Choose a subject</Button>}
      />
    </div>
  );
}
