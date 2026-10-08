import type {
  NotFetchInstance,
  NotFetchResponse,
  RequestMethod,
} from "@astralis-os/notfetch";
import { isMaskedServerError, toApiError } from "@/shared/api/core/errors";
import { createRefresher } from "@/shared/api/core/interceptors/refresh";
import { tokenStore } from "@/shared/api/core/tokens";
import type { AuthAwareConfig } from "@/types/api/core";

export function registerResponseInterceptor(api: NotFetchInstance) {
  const refreshAccessToken = createRefresher(api);

  function replay(config: AuthAwareConfig): Promise<NotFetchResponse<unknown>> {
    const headers = { ...((config.headers ?? {}) as Record<string, string>) };

    delete headers.Authorization;

    return api.call<unknown>(config.method as RequestMethod, config.url, {
      baseURL: "",
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
      const decorated = error as { request?: unknown; config?: unknown };
      const config = (decorated.request ?? decorated.config) as
        | AuthAwareConfig
        | undefined;
      const context = config?.context;

      const canRefresh =
        apiError.status === 401 &&
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

      return replay(config);
    },
  );

  return { refreshAccessToken };
}
