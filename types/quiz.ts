export type Difficulty = "easy" | "medium" | "hard";

export type CategoryId =
  | "biology"
  | "chemistry"
  | "physics"
  | "mathematics"
  | "computer-science"
  | "programming"
  | "web-development"
  | "javascript"
  | "typescript"
  | "react"
  | "nextjs"
  | "html"
  | "css"
  | "history"
  | "geography"
  | "general-knowledge";

export interface Category {
  id: CategoryId;
  name: string;
  shortLabel: string;
  description: string;
  glyph: string; // 1-2 letter mark shown on the index-card tab
}

export interface Question {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctAnswer: number; // index into options, 0-3
  explanation: string;
  category: CategoryId;
  difficulty: Difficulty;
}

export interface AnsweredQuestion {
  question: Question;
  selectedAnswer: number | null;
}

export interface QuizResult {
  category: CategoryId;
  difficulty: Difficulty;
  answers: AnsweredQuestion[];
  score: number;
  correctCount: number;
  wrongCount: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  totalScore: number;
  quizzesCompleted: number;
  accuracy: number;
}

export interface RecentActivityItem {
  category: CategoryId;
  difficulty: Difficulty;
  score: number;
  totalQuestions: number;
  date: string;
}

export interface UserProfile {
  name: string;
  username: string;
  avatarInitials: string;
  totalPoints: number;
  highestScore: number;
  completedQuizzes: number;
  favoriteCategory: CategoryId;
  history: RecentActivityItem[];
}
