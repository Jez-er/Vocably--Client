import { http } from "@/lib/api/core/http";
import type { SimpleEndpoint } from "@/lib/api/core/types";
import type { WordResponse } from "@/lib/api/words/types";

/** Every word the authenticated user owns, across all of their dictionaries. */
export const listWords: SimpleEndpoint<WordResponse[]> = (config) =>
  http.get("/words", config);
