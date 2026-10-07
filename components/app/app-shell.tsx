"use client";

import Link from "next/link";
import { AuthGuard } from "@/components/app/auth-guard";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useLogout, useSession } from "@/shared/api/auth/hooks";


function AppChrome({ children }: { children: React.ReactNode }) {
  const { user } = useSession();
  const logout = useLogout();

  return (
    <>
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex h-[72px] w-full max-w-[1100px] items-center justify-between gap-4 px-6 sm:px-12">
          <Link
            href="/"
            aria-label="Vocably home"
            className="rounded-field focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Logo />
          </Link>

          <div className="flex items-center gap-4">
            {user && (
              <span className="hidden text-[15px] font-medium text-foreground sm:inline">
                {user.displayName}
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => logout.mutate()}
              disabled={logout.isPending}
            >
              {logout.isPending ? "Logging out…" : "Log out"}
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1100px] flex-1 px-6 py-10 sm:px-12 compact:py-6">
        {children}
      </main>
    </>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <AuthGuard>
        <AppChrome>{children}</AppChrome>
      </AuthGuard>
    </div>
  );
}
