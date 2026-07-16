import { Difficulty } from "@/types/quiz";

export function titleCase(value: string): string {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function difficultyLabel(difficulty: Difficulty): string {
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function performanceMessage(percentage: number): string {
  if (percentage === 100) return "Perfect score. That's a clean sheet.";
  if (percentage >= 80) return "Strong result. You know this material well.";
  if (percentage >= 60) return "Solid effort. A little more review and you'll have it locked in.";
  if (percentage >= 40) return "You're getting there. Revisit the explanations below.";
  return "Rough round. Review the answers and try this set again.";
}

export function gradeLetter(percentage: number): string {
  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";
  if (percentage >= 60) return "D";
  return "F";
}
