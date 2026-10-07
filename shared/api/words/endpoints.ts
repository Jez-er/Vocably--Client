import { http } from "@/shared/api/core/http";
import type { SimpleEndpoint } from "@/types/api/core";
import type { WordResponse } from "@/types/api/words";

/** Every word the authenticated user owns, across all of their dictionaries. */
export const listWords: SimpleEndpoint<WordResponse[]> = (config) =>
  http.get("/words", config);
