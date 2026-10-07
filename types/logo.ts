/** Nav is the 44px mark, auth the 52px one (style-quide.md §2). */
export type LogoSize = "nav" | "auth";

export type LogoProps = {
  size?: LogoSize;
  className?: string;
};
