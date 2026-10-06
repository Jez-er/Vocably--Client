import { cn } from "@/lib/utils";

export type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "primary" | "outline";
};

// Exported so a <Link> can borrow the look without turning into a <button>.
export const buttonBaseClass =
  "inline-flex h-[52px] items-center justify-center gap-3 rounded-button px-6 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60";

export const buttonVariantClass = {
  primary: "bg-primary text-white hover:brightness-95",
  outline: "border border-border bg-surface text-foreground hover:bg-background",
} as const;

export function Button({
  variant = "primary",
  type = "button",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonBaseClass, buttonVariantClass[variant], className)}
      {...props}
    />
  );
}
