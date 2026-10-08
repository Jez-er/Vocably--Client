import * as React from "react";
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "@/types/ui/button";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-3 rounded-button border border-transparent bg-clip-padding font-semibold whitespace-nowrap transition-colors select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-danger [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:brightness-95",
        outline: "border-border bg-surface text-foreground hover:bg-background",
        inverse: "bg-surface text-primary hover:brightness-95",
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
      type={asChild ? type : (type ?? "button")}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
