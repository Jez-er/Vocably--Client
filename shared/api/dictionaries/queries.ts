import { queryOptions } from "@tanstack/react-query";
import { listDictionaries } from "@/shared/api/dictionaries/endpoints";
import { queryKeys } from "@/shared/query/keys";

export const dictionariesQuery = () =>
  queryOptions({
    queryKey: queryKeys.dictionaries.list(),
    queryFn: ({ signal }) => listDictionaries({ signal }),
  });
