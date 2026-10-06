import { cn } from "@/lib/utils";

export function OrDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span aria-hidden="true" className="h-px flex-1 bg-border" />
      <span className="text-base text-muted">or</span>
      <span aria-hidden="true" className="h-px flex-1 bg-border" />
    </div>
  );
}
