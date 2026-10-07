import type { NotFetchInstance } from "@astralis-os/notfetch";
import { tokenStore } from "@/shared/api/core/tokens";
import type { Tokens } from "@/types/api/auth";

/**
 * Single-flight access-token refresh.
 *
 * Takes the instance as an argument rather than importing it, so client.ts can wire this up
 * without a circular import.
 */
export function createRefresher(api: NotFetchInstance) {
  let inflight: Promise<string | null> | null = null;

  async function requestNewToken(): Promise<string | null> {
    try {
      // No body by design: the server reads the refreshToken cookie and ignores everything else.
      // skipRefresh stops a 401 here from recursing back into the response interceptor.
      const response = await api.post<Tokens>("/auth/refresh", undefined, {
        context: { skipAuth: true, skipRefresh: true },
      });

      tokenStore.set(response.data.accessToken);

      return response.data.accessToken;
    } catch {
      // A missing cookie is a 400 from Spring, not a 401, so this cannot loop.
      tokenStore.clear();

      return null;
    }
  }

  /** Concurrent 401s share one in-flight refresh instead of each firing their own. */
  return function refreshAccessToken(): Promise<string | null> {
    inflight ??= requestNewToken().finally(() => {
      inflight = null;
    });

    return inflight;
  };
}
