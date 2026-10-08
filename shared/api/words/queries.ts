import { queryOptions } from "@tanstack/react-query";
import { listWords } from "@/shared/api/words/endpoints";
import { queryKeys } from "@/shared/query/keys";

export const wordsQuery = () =>
  queryOptions({
    queryKey: queryKeys.words.list(),
    queryFn: ({ signal }) => listWords({ signal }),
  });
