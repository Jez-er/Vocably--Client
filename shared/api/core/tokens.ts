import type { User } from "@/shared/api/auth/types";

/**
 * Access-token and session storage. Browser-only.
 *
 * Do not import this from a Server Component: the token lives in module state, which on the server
 * would be shared across every request and leak one user's token to another.
 *
 * The access token is deliberately kept in memory only — never localStorage, so an XSS payload
 * cannot read it. The refresh token is never touched here at all: the server mirrors it into an
 * HttpOnly cookie, and the copy it also returns in the response body is ignored on purpose.
 *
 * `user` is persisted because the server has no GET /api/auth/me — after a reload, /auth/refresh
 * hands back tokens but no user, so there would otherwise be nothing to rehydrate the session
 * from. Only non-sensitive profile fields go in.
 */

const USER_KEY = "vocably.user";

let accessToken: string | null = null;

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

export const tokenStore = {
  get: () => accessToken,

  set(token: string) {
    accessToken = token;
    emit();
  },

  clear() {
    accessToken = null;
    clearPersistedUser();
    emit();
  },

  /** For useSyncExternalStore, so components can react to login/logout. */
  subscribe(listener: () => void) {
    listeners.add(listener);

    return () => listeners.delete(listener);
  },
};

// Every storage access is guarded: it throws in a private window with site data blocked, and
// `window` is absent during the server render.
export function readPersistedUser(): User | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(USER_KEY);

    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function persistUser(user: User) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {
    // A session that only lives until reload is better than a failed login.
  }
}

export function clearPersistedUser() {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(USER_KEY);
  } catch {
    // Nothing useful to do.
  }
}

/**
 * Whether this browser has ever been logged in. Gates the session query, so an anonymous visitor
 * does not fire a doomed /auth/refresh on every cold load.
 */
export function hasPersistedSession(): boolean {
  return readPersistedUser() !== null;
}
