"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { QuizResult } from "@/types/quiz";
import { readQuizResult } from "@/lib/quiz-storage";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { performanceMessage, gradeLetter, titleCase, difficultyLabel } from "@/lib/format";

const letters = ["A", "B", "C", "D"];

export function ResultsView() {
  const [result, setResult] = useState<QuizResult | null | undefined>(undefined);

  useEffect(() => {
    setResult(readQuizResult());
  }, []);

  if (result === undefined) {
    return <div className="animate-pulse rounded-2xl bg-paper-dim" style={{ height: 300 }} aria-label="Loading results" role="status" />;
  }

  if (!result) {
    return (
      <EmptyState
        title="No quiz result found"
        description="Results only appear right after finishing a quiz in this session. Start a new one to see how you did."
        action={<Button href="/dashboard/quiz">Choose a subject</Button>}
      />
    );
  }

  const grade = gradeLetter(result.percentage);

  return (
    <div className="space-y-8">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-slate">Results</span>
        <h1 className="mt-1 font-display text-3xl font-semibold text-ink">
          {titleCase(result.category)} &middot; {difficultyLabel(result.difficulty)}
        </h1>
      </div>

      {/* Score card with the signature graded-stamp element */}
      <Card className="relative overflow-hidden p-6 sm:p-8">
        <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-slate">Final score</p>
            <p className="mt-1 font-display text-5xl font-semibold text-ink">{result.percentage}%</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate">{performanceMessage(result.percentage)}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Badge tone="correct">{result.correctCount} correct</Badge>
              <Badge tone="wrong">{result.wrongCount} wrong</Badge>
              <Badge tone="neutral">{result.totalQuestions} questions</Badge>
            </div>
          </div>

          {/* Signature element: a rotated grading stamp, like a returned exam */}
          <div
            className="flex h-28 w-28 shrink-0 -rotate-6 items-center justify-center rounded-full border-4 border-accent font-mono text-4xl font-bold text-accent sm:h-32 sm:w-32"
            aria-label={`Grade ${grade}`}
          >
            {grade}
          </div>
        </div>
      </Card>

      {/* Review answers */}
      <div>
        <h2 className="font-display text-lg font-semibold text-ink">Review answers</h2>
        <div className="mt-4 space-y-4">
          {result.answers.map((a, i) => {
            const isCorrect = a.selectedAnswer !== null && a.selectedAnswer === a.question.correctAnswer;
            const wasSkipped = a.selectedAnswer === null;
            return (
              <Card key={a.question.id} className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-display text-sm font-medium text-ink sm:text-base">
                    <span className="mr-2 font-mono text-xs text-slate">Q{String(i + 1).padStart(2, "0")}</span>
                    {a.question.question}
                  </p>
                  <Badge tone={isCorrect ? "correct" : "wrong"} className="shrink-0">
                    {isCorrect ? "Correct" : wasSkipped ? "Skipped" : "Wrong"}
                  </Badge>
                </div>

                <div className="mt-4 space-y-2">
                  {a.question.options.map((option, oi) => {
                    const isYourPick = a.selectedAnswer === oi;
                    const isRightAnswer = a.question.correctAnswer === oi;
                    return (
                      <div
                        key={oi}
                        className={`flex items-center gap-3 rounded-lg border px-3.5 py-2.5 text-sm ${
                          isRightAnswer
                            ? "border-correct/40 bg-correct/5 text-ink"
                            : isYourPick
                            ? "border-wrong/40 bg-wrong/5 text-ink"
                            : "border-line text-slate"
                        }`}
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-paper-dim font-mono text-[11px] text-slate">
                          {letters[oi]}
                        </span>
                        <span className="flex-1">{option}</span>
                        {isRightAnswer ? <span className="font-mono text-xs text-correct">Correct answer</span> : null}
                        {isYourPick && !isRightAnswer ? <span className="font-mono text-xs text-wrong">Your answer</span> : null}
                      </div>
                    );
                  })}
                </div>

                <p className="mt-4 border-t border-dashed border-line pt-3 text-sm leading-relaxed text-slate">
                  {a.question.explanation}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button href="/dashboard" variant="primary">Return to dashboard</Button>
        <Button href={`/dashboard/quiz/${result.category}`} variant="outline">
          Try another difficulty
        </Button>
      </div>
    </div>
  );
}
