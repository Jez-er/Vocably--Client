import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/**
 * A labelled field, composed from shadcn's Input and Label.
 *
 * Kept as a wrapper rather than replaced by Input + Label at each call site, because it carries
 * four things neither primitive provides: the hint on the label row, the relative box that the
 * `trailing` slot positions against, the error paragraph, and the aria-describedby id joining.
 * Five forms would otherwise repeat all four.
 */
export type TextFieldProps = Omit<
  React.ComponentProps<"input">,
  "className"
> & {
  /** Required: ties the <label> and the aria-describedby ids together. */
  id: string;
  label: string;
  error?: string;
  hint?: string;
  /** Rendered inside the field box, against its right edge. */
  trailing?: React.ReactNode;
  /** Wrapper layout only — the input's own styling is not overridable. */
  className?: string;
};

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
  // The hint shares the label row, so it stays visible next to an error and
  // aria-describedby can reference both ids without ever dangling.
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    // gap-2 is the guide's 8px label-to-field gap (§6).
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
