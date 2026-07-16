import { CategoryId, Difficulty } from "@/types/quiz";

export type UserStatus = "active" | "suspended";
export type UserRole = "user" | "admin";

export interface AdminUser {
  id: string;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinedDate: string;
  lastActive: string;
  quizzesCompleted: number;
  totalScore: number;
  accuracy: number;
  favoriteCategory: CategoryId;
}

export interface CategoryStats {
  category: CategoryId;
  attempts: number;
  averageScore: number;
  questionCounts: Record<Difficulty, number>;
}

export interface SystemStats {
  totalUsers: number;
  totalQuizzesTaken: number;
  activeToday: number;
  averageScore: number;
  newSignupsThisWeek: number;
  suspendedUsers: number;
}

export interface WeeklyActivityPoint {
  day: string;
  quizzesTaken: number;
}

export interface DifficultyBreakdown {
  difficulty: Difficulty;
  attempts: number;
  averageScore: number;
}
