import { queryOptions } from "@tanstack/react-query";
import { refreshAccessToken } from "@/shared/api/core/client";
import { hasPersistedSession, readPersistedUser } from "@/shared/api/core/tokens";
import { queryKeys } from "@/shared/query/keys";
import type { User } from "@/shared/api/auth/types";

export const sessionQuery = () =>
  queryOptions({
    queryKey: queryKeys.auth.session(),
    queryFn: async (): Promise<User | null> => {
      const token = await refreshAccessToken();

      if (!token) return null;

      return readPersistedUser();
    },

    enabled: hasPersistedSession(),
    staleTime: Infinity,
    retry: false,
  });
