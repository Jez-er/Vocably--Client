import type * as React from "react";
import type Link from "next/link";

export type TextLinkProps = {
  href: React.ComponentProps<typeof Link>["href"];
  children: React.ReactNode;
  className?: string;
};
