import * as React from "react";
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "@/types/ui/button";

/**
 * shadcn's Button, restyled to style-quide.md §6.
 *
 * Three deliberate departures from the generated file:
 *
 * 1. Every size shadcn ships (h-6 to h-9) is below the guide's 48px minimum touch target, so the
 *    scale is replaced rather than extended. "default" is 52px (§6: primary 52–56px) and "sm" is
 *    48px, the floor.
 * 2. shadcn focuses with a 3px ring; Vocably uses a 2px offset outline in seven other places,
 *    including non-shadcn elements like TextLink. One focus style for the whole app wins.
 * 3. No shadows anywhere (§5), and no active:translate-y press effect — neither is in the guide.
 */
const buttonVariants = cva(
  // The svg rule is shadcn's: an icon inside a button gets 20px unless it sets its own size-*.
  "group/button inline-flex shrink-0 items-center justify-center gap-3 rounded-button border border-transparent bg-clip-padding font-semibold whitespace-nowrap transition-colors select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-danger [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        // §6 Primary: #465A3A, white text. One per screen or block.
        default: "bg-primary text-primary-foreground hover:brightness-95",
        // §6 Outline: white background, 1px border, dark text. Secondary actions.
        outline: "border-border bg-surface text-foreground hover:bg-background",
        // §6 Inverse: for use on the dark hero block.
        inverse: "bg-surface text-primary hover:brightness-95",
        // §6 Soft: Tint fill, Light border, green text. Positive choices such as "Easy".
        soft: "border-brand-light bg-brand-tint text-primary hover:brightness-95",
        ghost: "text-foreground hover:bg-brand-tint hover:text-primary",
        destructive: "bg-danger text-primary-foreground hover:brightness-95",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[52px] px-6 text-base",
        sm: "h-12 px-5 text-[15px]",
        icon: "size-12",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  type,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      // A <button> inside a <form> defaults to type="submit", so an unannotated Cancel button
      // submits the form. The generated component leaves `type` alone; defaulting it here keeps
      // the safety property the hand-written Button had. Only when it really is a <button>:
      // asChild may render an <a>, where `type` is not a valid attribute.
      type={asChild ? type : (type ?? "button")}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
