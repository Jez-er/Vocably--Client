import { http } from "@/shared/api/core/http";
import type { SimpleEndpoint } from "@/shared/api/core/types";
import type { WordResponse } from "@/shared/api/words/types";

/** Every word the authenticated user owns, across all of their dictionaries. */
export const listWords: SimpleEndpoint<WordResponse[]> = (config) =>
  http.get("/words", config);
