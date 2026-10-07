"use client";

import { GoogleIcon } from "@/components/ui/icons/google-icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { GoogleButtonProps } from "@/types/auth";

export function GoogleButton({ className }: GoogleButtonProps) {
  function handleClick() {

  }

  return (
    <Button
      variant="outline"
      className={cn("w-full", className)}
      onClick={handleClick}
    >
      Continue with Google
      <GoogleIcon className="size-5" />
    </Button>
  );
}
