import type {
  NotFetchInstance,
  NotFetchResponse,
  RequestMethod,
} from "@astralis-os/notfetch";
import { isMaskedServerError, toApiError } from "@/shared/api/core/errors";
import { createRefresher } from "@/shared/api/core/interceptors/refresh";
import { tokenStore } from "@/shared/api/core/tokens";
import type { AuthAwareConfig } from "@/types/api/core";

/**
 * Normalises failures and refreshes the access token on a 401.
 *
 * Exactly *one* response interceptor is registered, and that is load-bearing rather than tidiness.
 * notfetch re-checks validateStatus on every interceptor iteration against the *original*
 * response, so with two or more interceptors the response recovered here after a refresh would be
 * immediately invalidated again by the next iteration, and the 401 would be re-raised once per
 * interceptor.
 *
 * onFailure also *must* throw to signal failure — returning a value makes it the successful
 * response, and omitting onFailure entirely makes notfetch swallow the error and hand the caller
 * the error response as if it had succeeded.
 */
export function registerResponseInterceptor(api: NotFetchInstance) {
  const refreshAccessToken = createRefresher(api);

  /**
   * Re-issue a request once, with the fresh token.
   *
   * `baseURL: ""` is required: config.url already contains the base URL and the query string, so
   * without it the base would be prepended a second time. `query` is likewise not passed again.
   */
  function replay(config: AuthAwareConfig): Promise<NotFetchResponse<unknown>> {
    // Drop the stale token: the request interceptor puts the fresh one on.
    const headers = { ...((config.headers ?? {}) as Record<string, string>) };

    delete headers.Authorization;

    return api.call<unknown>(config.method as RequestMethod, config.url, {
      baseURL: "",
      // Already serialised by notfetch's prepareBody, so it passes through untouched.
      body: config.body as BodyInit | null | undefined,
      headers,
      credentials: config.credentials,
      signal: config.signal,
      parse: config.parse,
      context: { ...config.context, retried: true },
    });
  }

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const apiError = toApiError(error);
      // notfetch assigns `config` and `response` onto the error at runtime without typing them,
      // and ResponseError additionally carries `request`.
      const decorated = error as { request?: unknown; config?: unknown };
      const config = (decorated.request ?? decorated.config) as
        | AuthAwareConfig
        | undefined;
      const context = config?.context;

      const canRefresh =
        apiError.status === 401 &&
        // A masked error is not an expired token, so refreshing and replaying would burn a round
        // trip and re-run a request that is going to fail for the same reason.
        !isMaskedServerError(apiError) &&
        config !== undefined &&
        !context?.skipAuth &&
        !context?.skipRefresh &&
        !context?.retried;

      if (!canRefresh) throw apiError;

      const token = await refreshAccessToken();

      if (!token) {
        tokenStore.clear();
        throw apiError;
      }

      // Returned, not thrown: this becomes the response the original caller receives.
      return replay(config);
    },
  );

  return { refreshAccessToken };
}
