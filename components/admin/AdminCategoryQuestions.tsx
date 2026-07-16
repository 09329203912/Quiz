"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Category, Difficulty, Question } from "@/types/quiz";
import { getQuestions } from "@/data/questions";

const letters = ["A", "B", "C", "D"];
const tabs: { id: Difficulty; label: string }[] = [
  { id: "easy", label: "Easy" },
  { id: "medium", label: "Medium" },
  { id: "hard", label: "Hard" },
];

export function AdminCategoryQuestions({ category }: { category: Category }) {
  const [activeTab, setActiveTab] = useState<Difficulty>("easy");
  const questions: Question[] = getQuestions(category.id, activeTab);

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/categories" className="font-mono text-xs uppercase tracking-widest text-slate hover:text-ink">
          &larr; All categories
        </Link>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold text-ink">{category.name}</h1>
            <p className="mt-1 text-sm text-slate">{category.description}</p>
          </div>
          <Button variant="outline" size="sm">
            + Add question
          </Button>
        </div>
      </div>

      <div className="flex gap-1 rounded-full border border-line bg-white p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-full px-4 py-1.5 font-display text-sm font-medium transition-colors ${
              activeTab === tab.id ? "bg-ink text-paper" : "text-slate hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {questions.map((q, i) => (
          <Card key={q.id} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <p className="font-display text-sm font-medium text-ink sm:text-base">
                <span className="mr-2 font-mono text-xs text-slate">Q{String(i + 1).padStart(2, "0")}</span>
                {q.question}
              </p>
              <div className="flex shrink-0 items-center gap-2">
                <Badge tone="neutral">{q.id}</Badge>
                <button className="font-display text-xs font-medium text-ink underline decoration-accent decoration-2 underline-offset-4 hover:decoration-4">
                  Edit
                </button>
              </div>
            </div>
            <div className="mt-3 space-y-1.5">
              {q.options.map((option, oi) => (
                <div
                  key={oi}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                    oi === q.correctAnswer ? "bg-correct/5 text-ink" : "text-slate"
                  }`}
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-paper-dim font-mono text-[10px] text-slate">
                    {letters[oi]}
                  </span>
                  <span>{option}</span>
                  {oi === q.correctAnswer ? <span className="font-mono text-xs text-correct">Correct</span> : null}
                </div>
              ))}
            </div>
            <p className="mt-3 border-t border-dashed border-line pt-3 text-sm text-slate">{q.explanation}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
