import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * shadcn's Input, restyled to style-quide.md §6 Inputs: 52px tall, the #F3F0E8 field fill, a 1px
 * #E4E0D4 border, 12px radius and 18px of horizontal padding.
 *
 * Departures from the generated file: no shadow (§5), the Vocably focus outline rather than
 * shadcn's 3px ring (so a field focuses like every other control in the app), and no `md:text-sm`
 * — the guide puts body text at 16–17px and does not shrink it on wider screens.
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-[52px] w-full min-w-0 rounded-field border border-border bg-surface-input px-[18px] text-base text-foreground transition-colors outline-none placeholder:text-placeholder focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-danger",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
