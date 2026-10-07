"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "@/shared/api/auth/hooks";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isResolving, isAuthenticated } = useSession();

  useEffect(() => {
    if (!isResolving && !isAuthenticated) router.replace("/login");
  }, [isResolving, isAuthenticated, router]);

  if (isAuthenticated) return <>{children}</>;

  return (
    <main className="mx-auto w-full max-w-[1100px] flex-1 px-6 py-10 sm:px-12">
      <p role="status" className="text-base text-muted-foreground">
        Opening your garden…
      </p>
    </main>
  );
}
