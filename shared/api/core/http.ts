import {
  DEFAULT_VALIDATE_STATUS,
  type NotFetchResponse,
  type RequestBody,
  type RequestOptions,
} from "@astralis-os/notfetch";
import { api } from "@/shared/api/core/client";
import { apiErrorFromResponse, toApiError } from "@/shared/api/core/errors";

type BodylessOptions = Omit<RequestOptions, "body">;

/**
 * Unwrap `.data` and guarantee a failed request throws an ApiError.
 *
 * The status re-check is not redundant. Because a response interceptor is registered, notfetch no
 * longer throws on a bad status by itself — if its onFailure path is ever bypassed, the caller
 * would otherwise receive an error response as a successful one. This is the backstop for that.
 */
async function unwrap<Data>(
  request: Promise<NotFetchResponse<Data>>,
): Promise<Data> {
  let response: NotFetchResponse<Data>;

  try {
    response = await request;
  } catch (error) {
    // Catches both ApiErrors from the interceptor and the raw TypeError/AbortError that a network
    // failure throws before the interceptors ever run.
    throw toApiError(error);
  }

  if (!DEFAULT_VALIDATE_STATUS(response.status)) {
    throw apiErrorFromResponse(response);
  }

  return response.data;
}

/**
 * The facade endpoints are written against: same shape as the instance, but resolving to the
 * payload instead of the full NotFetchResponse.
 */
export const http = {
  get: <Data>(endpoint: string, options?: BodylessOptions) =>
    unwrap(api.get<Data>(endpoint, options)),

  delete: <Data>(endpoint: string, options?: BodylessOptions) =>
    unwrap(api.delete<Data>(endpoint, options)),

  post: <Data>(endpoint: string, body?: RequestBody, options?: RequestOptions) =>
    unwrap(api.post<Data>(endpoint, body, options)),

  put: <Data>(endpoint: string, body?: RequestBody, options?: RequestOptions) =>
    unwrap(api.put<Data>(endpoint, body, options)),

  patch: <Data>(endpoint: string, body?: RequestBody, options?: RequestOptions) =>
    unwrap(api.patch<Data>(endpoint, body, options)),

  /** Escape hatch for the rare endpoint that needs the status or response headers. */
  raw: api,
};
