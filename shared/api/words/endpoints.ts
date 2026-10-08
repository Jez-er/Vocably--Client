import { http } from "@/shared/api/core/http";
import type { SimpleEndpoint } from "@/types/api/core";
import type { WordResponse } from "@/types/api/words";

export const listWords: SimpleEndpoint<WordResponse[]> = (config) =>
  http.get("/words", config);
