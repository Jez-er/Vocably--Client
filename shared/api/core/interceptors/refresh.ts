import type { NotFetchInstance } from "@astralis-os/notfetch";
import { tokenStore } from "@/shared/api/core/tokens";
import type { Tokens } from "@/types/api/auth";

export function createRefresher(api: NotFetchInstance) {
  let inflight: Promise<string | null> | null = null;

  async function requestNewToken(): Promise<string | null> {
    try {
      const response = await api.post<Tokens>("/auth/refresh", undefined, {
        context: { skipAuth: true, skipRefresh: true },
      });

      tokenStore.set(response.data.accessToken);

      return response.data.accessToken;
    } catch {
      tokenStore.clear();

      return null;
    }
  }

  return function refreshAccessToken(): Promise<string | null> {
    inflight ??= requestNewToken().finally(() => {
      inflight = null;
    });

    return inflight;
  };
}
