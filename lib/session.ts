/**
 * Frontend-only "authentication" for demo purposes. There is no backend,
 * no password hashing, and no real session - this just lets the login
 * form tell an admin apart from a regular user so it can route to the
 * right area and the admin shell can show who's "signed in".
 *
 * The backend team should replace this whole file with real
 * authentication (hashed passwords, sessions/JWTs, etc).
 */

export const ADMIN_CREDENTIALS = {
  username: "Admin123",
  password: "Adminpass123",
};

export function isAdminCredentials(identifier: string, password: string): boolean {
  return identifier === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
}

export type SessionRole = "admin" | "user";

export interface Session {
  role: SessionRole;
  identifier: string;
}

const SESSION_KEY = "quiz-platform:session";

export function saveSession(session: Session) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // sessionStorage may be unavailable (private mode, etc.) - fail silently.
  }
}

export function readSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}
