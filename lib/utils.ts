/**
 * Re-exported rather than written here so that the ~9 existing `@/lib/utils` importers and the
 * `from "cn"` imports that `shadcn add` generates resolve to the same function.
 *
 * Unlike the bare join this replaced, `cn` resolves Tailwind conflicts: a caller's
 * className="h-12" now beats a component's h-[52px] deterministically instead of by stylesheet
 * order. That is what shadcn's className/asChild idiom depends on.
 */
export { cn } from "cn";
