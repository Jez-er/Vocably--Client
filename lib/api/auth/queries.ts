import { queryOptions } from "@tanstack/react-query";
import { refreshAccessToken } from "@/lib/api/core/client";
import { hasPersistedSession, readPersistedUser } from "@/lib/api/core/tokens";
import { queryKeys } from "@/lib/query/keys";
import type { User } from "@/lib/api/auth/types";

/**
 * The current session, or null when nobody is logged in.
 *
 * A queryOptions factory rather than a bare hook, so the same definition works in useQuery,
 * prefetchQuery, setQueryData and getQueryData without the key and the fetcher drifting apart.
 *
 * The access token only lives in memory, so a page reload starts with nothing. The HttpOnly
 * refreshToken cookie survives, so refreshing is what re-establishes the session.
 *
 * The user then comes from localStorage, not the network, because this server has no
 * GET /api/auth/me and /auth/refresh returns tokens only. That makes the profile potentially
 * stale — adding /me server-side is the real fix. TODO(server): swap the body of queryFn for a
 * /auth/me call once it exists.
 */
export const sessionQuery = () =>
  queryOptions({
    queryKey: queryKeys.auth.session(),
    queryFn: async (): Promise<User | null> => {
      const token = await refreshAccessToken();

      if (!token) return null;

      return readPersistedUser();
    },
    // Don't fire a refresh that is guaranteed to 400 for a visitor who has never logged in.
    enabled: hasPersistedSession(),
    // Refreshing is driven by 401s in the interceptor, not by staleness.
    staleTime: Infinity,
    retry: false,
  });
