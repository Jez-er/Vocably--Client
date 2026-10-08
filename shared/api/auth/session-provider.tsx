"use client";

import { useSession } from "@/shared/api/auth/hooks";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  useSession();

  return <>{children}</>;
}
