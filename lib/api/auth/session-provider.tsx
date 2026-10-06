"use client";

import { useSession } from "@/lib/api/auth/hooks";

/**
 * Establishes the session once, for the whole app.
 *
 * Without this nothing subscribes to sessionQuery, so after a reload the in-memory access token
 * would stay empty until some other component happened to ask for it — and the first authenticated
 * request would take an avoidable 401-then-refresh detour.
 *
 * Renders children unconditionally: the session resolving is not a reason to block the UI, and a
 * visitor who has never logged in never fires a request at all.
 */
export function SessionProvider({ children }: { children: React.ReactNode }) {
  useSession();

  return <>{children}</>;
}
