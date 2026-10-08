import type { ApiErrorKind } from "@/types/api/core";
import { ResponseError, type NotFetchResponse } from "@astralis-os/notfetch";

export class ApiError extends Error {
  readonly status: number;
  readonly kind: ApiErrorKind;
  readonly statusText?: string;
  readonly path?: string;
  readonly serverMessage?: string;
  readonly code?: string;
  readonly fieldErrors: Record<string, string>;

  constructor(
    message: string,
    init: {
      status: number;
      kind: ApiErrorKind;
      statusText?: string;
      path?: string;
      serverMessage?: string;
      code?: string;
      fieldErrors?: Record<string, string>;
      cause?: unknown;
    },
  ) {
    super(message, { cause: init.cause });
    this.name = "ApiError";
    this.status = init.status;
    this.kind = init.kind;
    this.statusText = init.statusText;
    this.path = init.path;
    this.serverMessage = init.serverMessage;
    this.code = init.code;
    this.fieldErrors = init.fieldErrors ?? {};
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function isMaskedServerError(error: unknown): boolean {
  return isApiError(error) && error.status === 401 && error.path === "/error";
}

export function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === "AbortError";
}

type ServerErrorBody = {
  status?: number;
  error?: string;
  message?: string;
  code?: string;
  path?: string;
  fieldErrors?: Record<string, string>;
};

function readBody(data: unknown): ServerErrorBody {
  if (typeof data === "string") {
    return data ? { message: data } : {};
  }

  return data && typeof data === "object" ? (data as ServerErrorBody) : {};
}

export function apiErrorFromResponse(
  response: NotFetchResponse<unknown>,
): ApiError {
  const body = readBody(response.data);
  const statusText = body.error ?? response.statusText;

  return new ApiError(
    body.message ?? statusText ?? `Request failed with status ${response.status}`,
    {
      status: response.status,
      kind: "http",
      statusText,
      path: body.path ?? response.url,
      serverMessage: body.message,
      code: body.code,
      fieldErrors: body.fieldErrors,
    },
  );
}

export function toApiError(error: unknown): ApiError {
  if (isAbortError(error)) throw error;
  if (isApiError(error)) return error;

  if (error instanceof ResponseError) {
    return apiErrorFromResponse(error.response);
  }

  if (error instanceof TypeError) {
    return new ApiError("Could not reach the server.", {
      status: 0,
      kind: "network",
      cause: error,
    });
  }

  return new ApiError(
    error instanceof Error ? error.message : "Unexpected request failure.",
    { status: 0, kind: "unknown", cause: error },
  );
}

export function applyFieldErrors<Field extends string>(
  error: unknown,
  setError: (field: Field, error: { type: string; message: string }) => void,
  knownFields: readonly Field[],
): boolean {
  if (!isApiError(error)) return false;

  let applied = false;

  for (const field of knownFields) {
    const message = error.fieldErrors[field];

    if (message) {
      setError(field, { type: "server", message });
      applied = true;
    }
  }

  return applied;
}
