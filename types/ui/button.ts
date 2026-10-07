import type * as React from "react";
import type { VariantProps } from "class-variance-authority";
import type { buttonVariants } from "@/components/ui/button";

/**
 * `asChild` swaps the <button> for a Radix Slot, so the rendered element may be an <a>. The props
 * still describe a button, because that is what every call site writes.
 */
export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };
