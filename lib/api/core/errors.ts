import { ResponseError, type NotFetchResponse } from "@astralis-os/notfetch";

export type ApiErrorKind = "network" | "http" | "unknown";

/**
 * The single error type the whole data layer throws.
 *
 * Normalising is not optional here. The server has two mutually incompatible error bodies — the
 * 401 from JwtAuthenticationEntryPoint is `{status, error, message, path}` with no `timestamp`,
 * while every other failure gets Boot's default `{timestamp, status, error, path}` with no
 * `message` — and notfetch awaits fetch() *before* its response interceptors, so an offline
 * TypeError never reaches them at all.
 */
export class ApiError extends Error {
  /** HTTP status, or 0 when the request never got a response. */
  readonly status: number;
  readonly kind: ApiErrorKind;
  /** The server's `error` field, e.g. "Unauthorized", "Bad Request". */
  readonly statusText?: string;
  readonly path?: string;
  /** The `message` field. Only the 401 body carries one. */
  readonly serverMessage?: string;
  /**
   * Per-field validation messages, keyed by form field name.
   *
   * Always empty against the current server: it has no @ControllerAdvice, and Boot's
   * `include-binding-errors` default of `never` strips binding errors from the 400 body. Kept so
   * forms can wire up field mapping now and have it start working when the server is fixed.
   */
  readonly fieldErrors: Record<string, string>;

  constructor(
    message: string,
    init: {
      status: number;
      kind: ApiErrorKind;
      statusText?: string;
      path?: string;
      serverMessage?: string;
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
    this.fieldErrors = init.fieldErrors ?? {};
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/**
 * Whether a 401 is Spring masking some *other* failure rather than a real authentication problem.
 *
 * The server does not list `/error` under permitAll, so any exception — a validation failure, a
 * duplicate email, a bad password, a service bug — gets forwarded to `/error`, arrives there
 * unauthenticated, and comes back from JwtAuthenticationEntryPoint as a generic 401. The only thing
 * that distinguishes it from a genuine 401 is the `path`: a real one names the route that was
 * called, a masked one always says "/error".
 *
 * TODO(server): delete this once `/error` is permitAll and a @ControllerAdvice returns real codes.
 */
export function isMaskedServerError(error: unknown): boolean {
  return isApiError(error) && error.status === 401 && error.path === "/error";
}

/** React Query treats AbortError as a cancellation, so it must stay exactly as it is. */
export function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === "AbortError";
}

type ServerErrorBody = {
  status?: number;
  error?: string;
  message?: string;
  path?: string;
  fieldErrors?: Record<string, string>;
};

function readBody(data: unknown): ServerErrorBody {
  if (typeof data === "string") {
    // Some endpoints answer text/plain, and a body-less 204 parses to undefined.
    return data ? { message: data } : {};
  }

  return data && typeof data === "object" ? (data as ServerErrorBody) : {};
}

/** Build an ApiError from a response that carries a non-2xx status. */
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
      fieldErrors: body.fieldErrors,
    },
  );
}

/**
 * Normalise anything thrown by the transport into an ApiError.
 *
 * Rethrows AbortError untouched, and passes an existing ApiError straight through so wrapping
 * twice is a no-op.
 */
export function toApiError(error: unknown): ApiError {
  if (isAbortError(error)) throw error;
  if (isApiError(error)) return error;

  if (error instanceof ResponseError) {
    return apiErrorFromResponse(error.response);
  }

  // fetch() rejects with a TypeError for DNS failures, a dropped connection and offline.
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

/**
 * Push an ApiError's field errors into a react-hook-form `setError`.
 *
 * Returns true when it handled at least one field, so a caller can fall back to a form-level
 * message. Against the current server this always returns false — see ApiError.fieldErrors.
 */
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
