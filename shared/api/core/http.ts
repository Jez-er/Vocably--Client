import {
  DEFAULT_VALIDATE_STATUS,
  type NotFetchResponse,
  type RequestBody,
  type RequestOptions,
} from "@astralis-os/notfetch";
import { api } from "@/shared/api/core/client";
import { apiErrorFromResponse, toApiError } from "@/shared/api/core/errors";

type BodylessOptions = Omit<RequestOptions, "body">;

async function unwrap<Data>(
  request: Promise<NotFetchResponse<Data>>,
): Promise<Data> {
  let response: NotFetchResponse<Data>;

  try {
    response = await request;
  } catch (error) {
    throw toApiError(error);
  }

  if (!DEFAULT_VALIDATE_STATUS(response.status)) {
    throw apiErrorFromResponse(response);
  }

  return response.data;
}

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

  raw: api,
};
