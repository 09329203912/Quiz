import { notFound } from "next/navigation";
import { getCategoryById } from "@/data/categories";
import { getQuestions } from "@/data/questions";
import { Difficulty } from "@/types/quiz";
import { QuizRunner } from "@/components/quiz/QuizRunner";

const validDifficulties: Difficulty[] = ["easy", "medium", "hard"];

export default async function QuizPage({
  params,
}: {
  params: Promise<{ category: string; difficulty: string }>;
}) {
  const { category: categorySlug, difficulty: difficultySlug } = await params;
  const category = getCategoryById(categorySlug);
  const difficulty = difficultySlug as Difficulty;

  if (!category || !validDifficulties.includes(difficulty)) notFound();

  const questions = getQuestions(category.id, difficulty);
  if (questions.length === 0) notFound();

  return <QuizRunner category={category} difficulty={difficulty} questions={questions} />;
}
