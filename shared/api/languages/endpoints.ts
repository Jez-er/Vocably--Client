import { http } from "@/shared/api/core/http";
import type { SimpleEndpoint } from "@/types/api/core";
import type { LanguageResponse } from "@/types/api/languages";

/**
 * The language catalogue.
 *
 * No `publicRequest` here: SecurityConfig ends with `anyRequest().authenticated()` and only
 * /api/auth/**, /api/health, /error and the docs are permitted, so this needs the Bearer token
 * like everything else.
 */
export const listLanguages: SimpleEndpoint<LanguageResponse[]> = (config) =>
  http.get("/languages", config);
