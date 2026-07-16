import { CategoryId, Difficulty, Question } from "@/types/quiz";
import { biologyQuestions } from "./biology";
import { chemistryQuestions } from "./chemistry";
import { physicsQuestions } from "./physics";
import { mathematicsQuestions } from "./mathematics";
import { computerScienceQuestions } from "./computer-science";
import { programmingQuestions } from "./programming";
import { webDevelopmentQuestions } from "./web-development";
import { javascriptQuestions } from "./javascript";
import { typescriptQuestions } from "./typescript";
import { reactQuestions } from "./react";
import { nextjsQuestions } from "./nextjs";
import { htmlQuestions } from "./html";
import { cssQuestions } from "./css";
import { historyQuestions } from "./history";
import { geographyQuestions } from "./geography";
import { generalKnowledgeQuestions } from "./general-knowledge";

export const questionBank: Record<CategoryId, Question[]> = {
  biology: biologyQuestions,
  chemistry: chemistryQuestions,
  physics: physicsQuestions,
  mathematics: mathematicsQuestions,
  "computer-science": computerScienceQuestions,
  programming: programmingQuestions,
  "web-development": webDevelopmentQuestions,
  javascript: javascriptQuestions,
  typescript: typescriptQuestions,
  react: reactQuestions,
  nextjs: nextjsQuestions,
  html: htmlQuestions,
  css: cssQuestions,
  history: historyQuestions,
  geography: geographyQuestions,
  "general-knowledge": generalKnowledgeQuestions,
};

export function getQuestions(category: CategoryId, difficulty: Difficulty): Question[] {
  const all = questionBank[category] ?? [];
  return all.filter((q) => q.difficulty === difficulty);
}
