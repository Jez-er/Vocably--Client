import { Sprout } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LogoProps, LogoSize } from "@/types/logo";

// Static lookup tables: Tailwind cannot see runtime-interpolated class names. Typed as
// Record<LogoSize, …> so adding a size to the type fails here until all three are filled in.
const MARK: Record<LogoSize, string> = {
  nav: "h-11 w-11",
  auth: "h-[52px] w-[52px]",
};
const ICON: Record<LogoSize, string> = {
  nav: "h-[22px] w-[22px]",
  auth: "h-[26px] w-[26px]",
};
const WORD: Record<LogoSize, string> = {
  nav: "text-2xl",
  auth: "text-[28px]",
};

export function Logo({ size = "nav", className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "flex items-center justify-center rounded-field bg-brand",
          MARK[size],
        )}
      >
        <Sprout aria-hidden="true" className={cn("text-white", ICON[size])} />
      </span>
      <span className={cn("font-serif font-bold leading-none", WORD[size])}>
        Vocably
      </span>
    </span>
  );
}
