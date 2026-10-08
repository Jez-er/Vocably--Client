import { queryOptions } from "@tanstack/react-query";
import { listLanguages } from "@/shared/api/languages/endpoints";
import { queryKeys } from "@/shared/query/keys";

export const languagesQuery = () =>
  queryOptions({
    queryKey: queryKeys.languages.list(),
    queryFn: ({ signal }) => listLanguages({ signal }),
    staleTime: Infinity,
    gcTime: Infinity,
  });
