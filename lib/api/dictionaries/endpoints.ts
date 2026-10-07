import { http } from "@/lib/api/core/http";
import type { Endpoint, SimpleEndpoint } from "@/lib/api/core/types";
import type {
  DictionaryCreateRequest,
  DictionaryResponse,
} from "@/lib/api/dictionaries/types";

/**
 * The dictionary endpoints. Unlike /auth/**, these are authenticated — no `publicRequest`, so the
 * request interceptor attaches the Bearer token and a 401 goes through refresh-and-replay.
 */

/** Scoped to the authenticated user by the server; no filtering is needed client-side. */
export const listDictionaries: SimpleEndpoint<DictionaryResponse[]> = (config) =>
  http.get("/dictionaries", config);

/**
 * 201 with the complete created row.
 *
 * 400 VALIDATION_FAILED for a blank code, 404 NOT_FOUND for a code that is not in the catalogue,
 * 409 CONFLICT when the user already has a dictionary for that language (uq_dictionaries_user_language).
 */
export const createDictionary: Endpoint<
  DictionaryCreateRequest,
  DictionaryResponse
> = ({ params, config }) => http.post("/dictionaries", params, config);
