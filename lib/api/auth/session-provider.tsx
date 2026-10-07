"use client";

import { useSession } from "@/lib/api/auth/hooks";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  useSession();

  return <>{children}</>;
}
