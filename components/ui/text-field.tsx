import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { TextFieldProps } from "@/types/ui/text-field";

export function TextField({
  id,
  label,
  error,
  hint,
  trailing,
  className,
  ...props
}: TextFieldProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <Label htmlFor={id}>{label}</Label>
        {hint && (
          <span id={hintId} className="text-sm text-muted-foreground">
            {hint}
          </span>
        )}
      </div>

      <div className="relative">
        <Input
          {...props}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={trailing ? "pr-[52px]" : undefined}
        />
        {trailing}
      </div>

      {error && (
        <p id={errorId} className="text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
