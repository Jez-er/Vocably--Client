import type { NotFetchInstance } from "@astralis-os/notfetch";
import { tokenStore } from "@/shared/api/core/tokens";
import type { AuthAwareConfig } from "@/types/api/core";

export function registerRequestInterceptor(api: NotFetchInstance) {
  api.interceptors.request.use(
    (config) => {
      const { context } = config as AuthAwareConfig;

      config.credentials ??= "include";

      if (!context?.skipAuth) {
        const token = tokenStore.get();

        if (token) {
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
