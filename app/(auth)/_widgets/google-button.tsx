"use client";

import { GoogleIcon } from "@/components/ui/icons/google-icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function GoogleButton({ className }: { className?: string }) {
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
