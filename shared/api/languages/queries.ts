import { queryOptions } from "@tanstack/react-query";
import { listLanguages } from "@/shared/api/languages/endpoints";
import { queryKeys } from "@/shared/query/keys";

/**
 * The language catalogue. A seeded reference table that only changes on a migration, so it never
 * goes stale within a session and is worth keeping through a remount.
 */
export const languagesQuery = () =>
  queryOptions({
    queryKey: queryKeys.languages.list(),
    queryFn: ({ signal }) => listLanguages({ signal }),
    staleTime: Infinity,
    gcTime: Infinity,
  });
