import { cn } from "@/lib/utils";
import type { OrDividerProps } from "@/types/ui/or-divider";

export function OrDivider({ className }: OrDividerProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span aria-hidden="true" className="h-px flex-1 bg-border" />
      <span className="text-base text-muted-foreground">or</span>
      <span aria-hidden="true" className="h-px flex-1 bg-border" />
    </div>
  );
}
