import { cn } from "@/lib/utils";

export type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "primary" | "outline";
  size?: "md" | "sm";
};

// Exported so a <Link> can borrow the look without turning into a <button>. A <Link> must compose
// all three: base + variant + size.
export const buttonBaseClass =
  "inline-flex items-center justify-center gap-3 rounded-button font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60";

export const buttonVariantClass = {
  primary: "bg-primary text-white hover:brightness-95",
  outline: "border border-border bg-surface text-foreground hover:bg-background",
} as const;

/** "sm" is 48px — the style guide's minimum touch target. */
export const buttonSizeClass = {
  md: "h-[52px] px-6 text-base",
  sm: "h-12 px-5 text-[15px]",
} as const;

export function Button({
  variant = "primary",
  size = "md",
  type = "button",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        buttonBaseClass,
        buttonVariantClass[variant],
        buttonSizeClass[size],
        className,
      )}
      {...props}
    />
  );
}
