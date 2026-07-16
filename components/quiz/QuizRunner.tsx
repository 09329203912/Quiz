"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Category, Difficulty, Question, QuizResult, AnsweredQuestion } from "@/types/quiz";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { saveQuizResult } from "@/lib/quiz-storage";
import { difficultyLabel } from "@/lib/format";

const letters = ["A", "B", "C", "D"];

export function QuizRunner({
  category,
  difficulty,
  questions,
}: {
  category: Category;
  difficulty: Difficulty;
  questions: Question[];
}) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [submitting, setSubmitting] = useState(false);

  const total = questions.length;
  const currentQuestion = questions[currentIndex];
  const selected = answers[currentIndex];

  const answeredCount = useMemo(() => answers.filter((a) => a !== null).length, [answers]);
  const runningScore = useMemo(
    () => answers.reduce((acc, a, i) => (a !== null && a === questions[i].correctAnswer ? acc + 1 : acc), 0),
    [answers, questions]
  );

  function selectOption(optionIndex: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = optionIndex;
      return next;
    });
  }

  function goNext() {
    if (currentIndex < total - 1) setCurrentIndex((i) => i + 1);
  }

  function goPrevious() {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  }

  function handleSubmit() {
    setSubmitting(true);
    const answeredQuestions: AnsweredQuestion[] = questions.map((q, i) => ({
      question: q,
      selectedAnswer: answers[i],
    }));
    const correctCount = answeredQuestions.filter(
      (a) => a.selectedAnswer !== null && a.selectedAnswer === a.question.correctAnswer
    ).length;
    const wrongCount = total - correctCount;
    const percentage = Math.round((correctCount / total) * 100);

    const result: QuizResult = {
      category: category.id,
      difficulty,
      answers: answeredQuestions,
      score: percentage,
      correctCount,
      wrongCount,
      totalQuestions: total,
      percentage,
      completedAt: new Date().toISOString(),
    };

    saveQuizResult(result);
    router.push(`/dashboard/quiz/${category.id}/${difficulty}/results`);
  }

  const isLastQuestion = currentIndex === total - 1;

  return (
    <div className="space-y-6">
      {/* Header: exam-paper style question ticket */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-slate">
            {category.name} &middot; {difficultyLabel(difficulty)}
          </span>
          <h1 className="mt-1 font-display text-2xl font-semibold text-ink">
            Q{String(currentIndex + 1).padStart(2, "0")} <span className="text-slate">/ {String(total).padStart(2, "0")}</span>
          </h1>
        </div>
        <Badge tone="accent">Score {runningScore}/{total}</Badge>
      </div>

      <ProgressBar value={answeredCount} max={total} label="Answered" />

      {/* Question card */}
      <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
        <p className="font-display text-lg font-medium leading-snug text-ink sm:text-xl">
          {currentQuestion.question}
        </p>

        <div className="mt-6 space-y-3">
          {currentQuestion.options.map((option, i) => {
            const isSelected = selected === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => selectOption(i)}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition-colors ${
                  isSelected
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-paper text-ink hover:border-ink/30 hover:bg-paper-dim"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold ${
                    isSelected ? "bg-paper/15 text-paper" : "bg-paper-dim text-slate"
                  }`}
                >
                  {letters[i]}
                </span>
                <span className="leading-snug">{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <Button variant="outline" onClick={goPrevious} disabled={currentIndex === 0}>
          &larr; Previous
        </Button>

        {isLastQuestion ? (
          <Button variant="secondary" onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Submitting..." : "Submit quiz"}
          </Button>
        ) : (
          <Button variant="primary" onClick={goNext}>
            Next &rarr;
          </Button>
        )}
      </div>
    </div>
  );
}
