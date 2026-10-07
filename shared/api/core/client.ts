import notfetch from "@astralis-os/notfetch";
import { API_BASE_URL } from "@/shared/api/core/config";
import { registerRequestInterceptor } from "@/shared/api/core/interceptors/request";
import { registerResponseInterceptor } from "@/shared/api/core/interceptors/response";

/**
 * The one configured notfetch instance.
 *
 * `notfetch.create()` and not the default export, which is a shared singleton — and not
 * `new NotFetch()`, because despite what the README shows, NotFetch is not a named export of the
 * package (the only runtime named exports are `ResponseError` and `DEFAULT_VALIDATE_STATUS`).
 *
 * `parse` is intentionally left unset so notfetch auto-detects from the content-type: some server
 * endpoints answer text/plain, where a forced `response.json()` would throw, and an empty 204 body
 * already parses to undefined.
 */
export const api = notfetch.create({ baseURL: API_BASE_URL });

registerRequestInterceptor(api);

const { refreshAccessToken } = registerResponseInterceptor(api);

export { refreshAccessToken };
