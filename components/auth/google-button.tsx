"use client";

import { GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function GoogleButton({ className }: { className?: string }) {
  function handleClick() {
    // TODO(server): no OAuth backend exists to call. The server has no
    // spring-boot-starter-oauth2-client dependency, no spring.security.oauth2.* config, no
    // /oauth2/authorization/google, and users.password_hash is NOT NULL with no provider
    // columns — so a federated user cannot even be persisted yet.
  }

  return (
    <Button
      variant="outline"
      className={cn("w-full", className)}
      onClick={handleClick}
    >
      Continue with Google
      <GoogleIcon className="h-5 w-5" />
    </Button>
  );
}
