import Link from "next/link";
import { cn } from "@/lib/utils";
import type { TextLinkProps } from "@/types/ui/text-link";

export function TextLink({ href, children, className }: TextLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center rounded-sm py-1 font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className,
      )}
    >
      {children}
    </Link>
  );
}
