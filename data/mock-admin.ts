import { AdminUser, CategoryStats, SystemStats, WeeklyActivityPoint, DifficultyBreakdown, RankedUser } from "@/types/admin";
import { CategoryId } from "@/types/quiz";

export const adminUsers: AdminUser[] = [
  { id: "u001", name: "Kate Nolan", username: "quantum_kate", email: "kate.nolan@example.com", role: "user", status: "active", joinedDate: "2025-11-02", lastActive: "2026-07-15", quizzesCompleted: 62, totalScore: 9840, accuracy: 96, favoriteCategory: "physics" },
  { id: "u002", name: "Devon Marsh", username: "devon.codes", email: "devon.marsh@example.com", role: "user", status: "active", joinedDate: "2025-11-10", lastActive: "2026-07-15", quizzesCompleted: 58, totalScore: 9420, accuracy: 94, favoriteCategory: "javascript" },
  { id: "u003", name: "Priya Suresh", username: "priya_learns", email: "priya.suresh@example.com", role: "user", status: "active", joinedDate: "2025-11-14", lastActive: "2026-07-14", quizzesCompleted: 55, totalScore: 9110, accuracy: 92, favoriteCategory: "biology" },
  { id: "u004", name: "Marcus Villanueva", username: "marcus_v", email: "marcus.v@example.com", role: "user", status: "active", joinedDate: "2025-12-01", lastActive: "2026-07-13", quizzesCompleted: 51, totalScore: 8760, accuracy: 90, favoriteCategory: "mathematics" },
  { id: "u005", name: "Sana Khan", username: "sana.k", email: "sana.khan@example.com", role: "user", status: "active", joinedDate: "2025-12-05", lastActive: "2026-07-15", quizzesCompleted: 49, totalScore: 8420, accuracy: 89, favoriteCategory: "react" },
  { id: "u006", name: "Alex Rivera", username: "alex.rivera", email: "alex.rivera@example.com", role: "user", status: "active", joinedDate: "2025-12-10", lastActive: "2026-07-14", quizzesCompleted: 47, totalScore: 8100, accuracy: 87, favoriteCategory: "javascript" },
  { id: "u007", name: "Leo Bautista", username: "leo_builds", email: "leo.bautista@example.com", role: "user", status: "active", joinedDate: "2025-12-18", lastActive: "2026-07-12", quizzesCompleted: 44, totalScore: 7650, accuracy: 85, favoriteCategory: "nextjs" },
  { id: "u008", name: "Aisha Rahman", username: "aisha_r", email: "aisha.rahman@example.com", role: "user", status: "active", joinedDate: "2026-01-04", lastActive: "2026-07-11", quizzesCompleted: 41, totalScore: 7290, accuracy: 84, favoriteCategory: "chemistry" },
  { id: "u009", name: "Tomás Duarte", username: "tomás.dev", email: "tomas.duarte@example.com", role: "user", status: "active", joinedDate: "2026-01-09", lastActive: "2026-07-10", quizzesCompleted: 39, totalScore: 6980, accuracy: 82, favoriteCategory: "typescript" },
  { id: "u010", name: "Wei Chen", username: "wei_chen", email: "wei.chen@example.com", role: "user", status: "active", joinedDate: "2026-01-15", lastActive: "2026-07-09", quizzesCompleted: 36, totalScore: 6540, accuracy: 80, favoriteCategory: "computer-science" },
  { id: "u011", name: "Grace Odom", username: "grace.o", email: "grace.odom@example.com", role: "user", status: "suspended", joinedDate: "2026-01-20", lastActive: "2026-05-02", quizzesCompleted: 18, totalScore: 2980, accuracy: 61, favoriteCategory: "history" },
  { id: "u012", name: "Farid Haidari", username: "farid.h", email: "farid.haidari@example.com", role: "user", status: "active", joinedDate: "2026-02-02", lastActive: "2026-07-08", quizzesCompleted: 33, totalScore: 5920, accuracy: 79, favoriteCategory: "geography" },
  { id: "u013", name: "Nadia Petrova", username: "nadia.p", email: "nadia.petrova@example.com", role: "user", status: "active", joinedDate: "2026-02-14", lastActive: "2026-07-14", quizzesCompleted: 30, totalScore: 5480, accuracy: 78, favoriteCategory: "css" },
  { id: "u014", name: "Owen Fitzgerald", username: "owen.f", email: "owen.fitzgerald@example.com", role: "user", status: "suspended", joinedDate: "2026-02-20", lastActive: "2026-04-11", quizzesCompleted: 12, totalScore: 1860, accuracy: 55, favoriteCategory: "html" },
  { id: "u015", name: "Mei Lin", username: "mei.lin", email: "mei.lin@example.com", role: "user", status: "active", joinedDate: "2026-03-03", lastActive: "2026-07-13", quizzesCompleted: 27, totalScore: 4950, accuracy: 77, favoriteCategory: "programming" },
  { id: "u016", name: "Samuel Osei", username: "sam.osei", email: "samuel.osei@example.com", role: "user", status: "active", joinedDate: "2026-03-18", lastActive: "2026-07-15", quizzesCompleted: 24, totalScore: 4310, accuracy: 75, favoriteCategory: "web-development" },
  { id: "u017", name: "Ines Costa", username: "ines.c", email: "ines.costa@example.com", role: "user", status: "active", joinedDate: "2026-04-01", lastActive: "2026-07-12", quizzesCompleted: 20, totalScore: 3640, accuracy: 73, favoriteCategory: "general-knowledge" },
  { id: "u018", name: "Ravi Iyer", username: "ravi.i", email: "ravi.iyer@example.com", role: "user", status: "active", joinedDate: "2026-04-20", lastActive: "2026-07-06", quizzesCompleted: 15, totalScore: 2710, accuracy: 70, favoriteCategory: "mathematics" },
  { id: "u019", name: "Hana Suzuki", username: "hana.s", email: "hana.suzuki@example.com", role: "admin", status: "active", joinedDate: "2025-09-15", lastActive: "2026-07-15", quizzesCompleted: 8, totalScore: 1420, accuracy: 88, favoriteCategory: "biology" },
  { id: "u020", name: "Jordan Blake", username: "jordan.blake", email: "jordan.blake@example.com", role: "admin", status: "active", joinedDate: "2025-08-01", lastActive: "2026-07-15", quizzesCompleted: 5, totalScore: 890, accuracy: 91, favoriteCategory: "computer-science" },
];

export const systemStats: SystemStats = {
  totalUsers: adminUsers.length,
  totalQuizzesTaken: adminUsers.reduce((acc, u) => acc + u.quizzesCompleted, 0),
  activeToday: 34,
  averageScore: 81,
  newSignupsThisWeek: 12,
  suspendedUsers: adminUsers.filter((u) => u.status === "suspended").length,
};

export const weeklyActivity: WeeklyActivityPoint[] = [
  { day: "Mon", quizzesTaken: 62 },
  { day: "Tue", quizzesTaken: 74 },
  { day: "Wed", quizzesTaken: 58 },
  { day: "Thu", quizzesTaken: 81 },
  { day: "Fri", quizzesTaken: 69 },
  { day: "Sat", quizzesTaken: 45 },
  { day: "Sun", quizzesTaken: 38 },
];

export const difficultyBreakdown: DifficultyBreakdown[] = [
  { difficulty: "easy", attempts: 512, averageScore: 88 },
  { difficulty: "medium", attempts: 398, averageScore: 76 },
  { difficulty: "hard", attempts: 214, averageScore: 61 },
];

const attemptsByCategory: Record<CategoryId, { attempts: number; averageScore: number }> = {
  biology: { attempts: 96, averageScore: 82 },
  chemistry: { attempts: 74, averageScore: 77 },
  physics: { attempts: 88, averageScore: 74 },
  mathematics: { attempts: 102, averageScore: 71 },
  "computer-science": { attempts: 91, averageScore: 79 },
  programming: { attempts: 85, averageScore: 80 },
  "web-development": { attempts: 68, averageScore: 83 },
  javascript: { attempts: 121, averageScore: 78 },
  typescript: { attempts: 76, averageScore: 75 },
  react: { attempts: 89, averageScore: 76 },
  nextjs: { attempts: 58, averageScore: 73 },
  html: { attempts: 63, averageScore: 90 },
  css: { attempts: 60, averageScore: 85 },
  history: { attempts: 47, averageScore: 81 },
  geography: { attempts: 41, averageScore: 79 },
  "general-knowledge": { attempts: 55, averageScore: 84 },
};

export const categoryStats: CategoryStats[] = (Object.keys(attemptsByCategory) as CategoryId[]).map((category) => ({
  category,
  attempts: attemptsByCategory[category].attempts,
  averageScore: attemptsByCategory[category].averageScore,
  questionCounts: { easy: 5, medium: 5, hard: 5 },
}));

export function getAdminUserById(id: string): AdminUser | undefined {
  return adminUsers.find((u) => u.id === id);
}

export const fullLeaderboard: RankedUser[] = [...adminUsers]
  .filter((u) => u.role === "user")
  .sort((a, b) => b.totalScore - a.totalScore)
  .map((u, i) => ({ ...u, rank: i + 1 }));

const sampleCategoryCycle: CategoryId[] = [
  "javascript",
  "react",
  "mathematics",
  "biology",
  "css",
  "nextjs",
  "history",
  "general-knowledge",
];
const sampleDifficultyCycle = ["easy", "medium", "hard"] as const;

/**
 * Generates a short, deterministic quiz-history sample for a given admin
 * user so the detail page has something to show. This is presentational
 * mock data only - a backend team will replace it with real per-user
 * quiz records.
 */
export function getUserQuizHistory(user: AdminUser) {
  const entries = Math.min(6, Math.max(2, Math.round(user.quizzesCompleted / 8)));
  return Array.from({ length: entries }).map((_, i) => {
    const category = i === 0 ? user.favoriteCategory : sampleCategoryCycle[(i + user.id.length) % sampleCategoryCycle.length];
    const difficulty = sampleDifficultyCycle[i % sampleDifficultyCycle.length];
    const scoreVariance = ((i * 7) % 15) - 7;
    const score = Math.max(20, Math.min(100, user.accuracy + scoreVariance));
    const date = new Date(user.lastActive);
    date.setDate(date.getDate() - i * 3);
    return {
      category,
      difficulty,
      score,
      totalQuestions: 5,
      date: date.toISOString().slice(0, 10),
    };
  });
}
