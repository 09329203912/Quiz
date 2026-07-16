import { QuizResult } from "@/types/quiz";

/**
 * Frontend-only persistence for the just-completed quiz result.
 * This is NOT real storage/backend - it simply lets the quiz page hand
 * results off to the results page within the browser session using
 * sessionStorage. The backend team can replace this with a real API call.
 */
const STORAGE_KEY = "quiz-platform:last-result";

export function saveQuizResult(result: QuizResult) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  } catch {
    // sessionStorage may be unavailable (private mode, etc.) - fail silently.
  }
}

export function readQuizResult(): QuizResult | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as QuizResult) : null;
  } catch {
    return null;
  }
}
