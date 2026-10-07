import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A native <select>, styled to match TextField exactly.
 *
 * Native rather than a custom combobox: the browser gives type-ahead (typing "ger" jumps to
 * German), full keyboard navigation, a mobile sheet, screen-reader support and virtualisation for
 * free. A faithful ARIA combobox is several hundred lines and the only thing it adds — search —
 * is what native type-ahead already does for a title-sorted list.
 *
 * No forwardRef: React 19 passes `ref` through as an ordinary prop, so {...register("field")}
 * lands react-hook-form's ref on the <select>.
 */
export type SelectProps = Omit<React.ComponentProps<"select">, "className"> & {
  /** Required: ties the <label> and the aria-describedby ids together. */
  id: string;
  label: string;
  error?: string;
  hint?: string;
  /** Wrapper layout only — the select's own styling is not overridable. */
  className?: string;
};

export function Select({
  id,
  label,
  error,
  hint,
  className,
  children,
  ...props
}: SelectProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
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
        <select
          {...props}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className="h-[52px] w-full appearance-none rounded-field border border-border bg-surface-input px-[18px] pr-[46px] text-base text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-invalid:border-danger"
        >
          {children}
        </select>
        <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-[18px] h-5 w-5 -translate-y-1/2 text-muted" />
      </div>

      {error && (
        <p id={errorId} className="text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
