import type { User } from "@/types/api/auth";

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

  subscribe(listener: () => void) {
    listeners.add(listener);

    return () => listeners.delete(listener);
  },
};

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
  } catch {}
}

export function clearPersistedUser() {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(USER_KEY);
  } catch {}
}

export function hasPersistedSession(): boolean {
  return readPersistedUser() !== null;
}
