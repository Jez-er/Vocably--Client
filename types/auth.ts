import type { ReactNode } from "react";

export type AuthCardProps = {
  title: string;
  subtitle?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
};

export type GoogleButtonProps = {
  className?: string;
};
