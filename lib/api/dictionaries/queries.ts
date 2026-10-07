import { queryOptions } from "@tanstack/react-query";
import { listDictionaries } from "@/lib/api/dictionaries/endpoints";
import { queryKeys } from "@/lib/query/keys";

export const dictionariesQuery = () =>
  queryOptions({
    queryKey: queryKeys.dictionaries.list(),
    queryFn: ({ signal }) => listDictionaries({ signal }),
  });
