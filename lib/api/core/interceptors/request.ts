import type { NotFetchInstance } from "@astralis-os/notfetch";
import { tokenStore } from "@/lib/api/core/tokens";
import type { AuthAwareConfig } from "@/lib/api/core/types";

/**
 * Attaches credentials and the Bearer token.
 *
 * Exactly one request interceptor is registered. Its onFailure *must* rethrow: notfetch's failure
 * branch is `else Promise.reject(error)` with no return, so an interceptor without onFailure drops
 * the error on the floor as an unhandled rejection.
 */
export function registerRequestInterceptor(api: NotFetchInstance) {
  api.interceptors.request.use(
    (config) => {
      const { context } = config as AuthAwareConfig;

      // Needed for the refreshToken cookie. Harmless while /api is same-origin, and required the
      // moment NEXT_PUBLIC_API_BASE_URL points straight at the server.
      config.credentials ??= "include";

      if (!context?.skipAuth) {
        const token = tokenStore.get();

        if (token) {
          // RequestConfig types `headers` as HeadersInit & Record<string, string>, so a plain
          // object needs the cast even though notfetch only ever reads it as a record.
          const headers: Record<string, string> = {
            ...(config.headers as Record<string, string> | undefined),
            Authorization: `Bearer ${token}`,
          };

          config.headers = headers as typeof config.headers;
        }
      }

      return config;
    },
    (error) => {
      throw error;
    },
  );
}
