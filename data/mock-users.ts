import { LeaderboardEntry, UserProfile } from "@/types/quiz";

export const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, username: "quantum_kate", totalScore: 9840, quizzesCompleted: 62, accuracy: 96 },
  { rank: 2, username: "devon.codes", totalScore: 9420, quizzesCompleted: 58, accuracy: 94 },
  { rank: 3, username: "priya_learns", totalScore: 9110, quizzesCompleted: 55, accuracy: 92 },
  { rank: 4, username: "marcus_v", totalScore: 8760, quizzesCompleted: 51, accuracy: 90 },
  { rank: 5, username: "sana.k", totalScore: 8420, quizzesCompleted: 49, accuracy: 89 },
  { rank: 6, username: "you", totalScore: 8100, quizzesCompleted: 47, accuracy: 87 },
  { rank: 7, username: "leo_builds", totalScore: 7650, quizzesCompleted: 44, accuracy: 85 },
  { rank: 8, username: "aisha_r", totalScore: 7290, quizzesCompleted: 41, accuracy: 84 },
  { rank: 9, username: "tomás.dev", totalScore: 6980, quizzesCompleted: 39, accuracy: 82 },
  { rank: 10, username: "wei_chen", totalScore: 6540, quizzesCompleted: 36, accuracy: 80 },
];

export const currentUserProfile: UserProfile = {
  name: "Alex Rivera",
  username: "alex.rivera",
  avatarInitials: "AR",
  totalPoints: 8100,
  highestScore: 100,
  completedQuizzes: 47,
  favoriteCategory: "javascript",
  history: [
    { category: "javascript", difficulty: "medium", score: 80, totalQuestions: 5, date: "2026-07-14" },
    { category: "react", difficulty: "hard", score: 60, totalQuestions: 5, date: "2026-07-12" },
    { category: "css", difficulty: "easy", score: 100, totalQuestions: 5, date: "2026-07-10" },
    { category: "nextjs", difficulty: "medium", score: 80, totalQuestions: 5, date: "2026-07-08" },
    { category: "mathematics", difficulty: "hard", score: 40, totalQuestions: 5, date: "2026-07-05" },
  ],
};

export const dashboardStats = {
  totalQuizzesCompleted: 47,
  highestScore: 100,
  totalPoints: 8100,
  currentStreak: 5,
};
