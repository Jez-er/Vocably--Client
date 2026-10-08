import { http } from "@/shared/api/core/http";
import type { SimpleEndpoint } from "@/types/api/core";
import type { LanguageResponse } from "@/types/api/languages";

export const listLanguages: SimpleEndpoint<LanguageResponse[]> = (config) =>
  http.get("/languages", config);
