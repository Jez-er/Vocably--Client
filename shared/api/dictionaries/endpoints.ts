import { http } from "@/shared/api/core/http";
import type { Endpoint, SimpleEndpoint } from "@/types/api/core";
import type {
  DictionaryCreateRequest,
  DictionaryResponse,
} from "@/types/api/dictionaries";

export const listDictionaries: SimpleEndpoint<DictionaryResponse[]> = (config) =>
  http.get("/dictionaries", config);

export const createDictionary: Endpoint<
  DictionaryCreateRequest,
  DictionaryResponse
> = ({ params, config }) => http.post("/dictionaries", params, config);
