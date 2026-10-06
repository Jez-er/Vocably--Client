import { cn } from "@/lib/utils";

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
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-base font-medium text-foreground">
          {label}
        </label>
        {hint && (
          <span id={hintId} className="text-sm text-muted">
            {hint}
          </span>
        )}
      </div>

      <div className="relative">
        <input
          {...props}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "h-[52px] w-full rounded-field border border-border bg-surface-input px-[18px] text-base text-foreground placeholder:text-placeholder focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-invalid:border-danger",
            trailing ? "pr-[52px]" : undefined,
          )}
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
