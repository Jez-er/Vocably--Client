import { queryOptions } from "@tanstack/react-query";
import { listWords } from "@/shared/api/words/endpoints";
import { queryKeys } from "@/shared/query/keys";

/**
 * Every word the user owns.
 *
 * TODO(server): the dictionaries page subscribes to this only to render one integer per card. The
 * payload carries every definition and example array the user has ever written. A `wordCount` on
 * DictionaryResponse, or GET /api/dictionaries/{id}/words/count, would let this query be dropped
 * from that page outright.
 */
export const wordsQuery = () =>
  queryOptions({
    queryKey: queryKeys.words.list(),
    queryFn: ({ signal }) => listWords({ signal }),
  });
