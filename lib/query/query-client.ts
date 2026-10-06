import { QueryClient } from "@tanstack/react-query";
import { isApiError } from "@/lib/api/core/errors";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          // A 4xx is the server rejecting the request itself — retrying cannot change the answer.
          // Network failures (status 0) and 5xx are worth one more go.
          if (isApiError(error) && error.status >= 400 && error.status < 500) {
            return false;
          }

          return failureCount < 2;
        },
      },
      mutations: {
        // Never replay a mutation automatically: the auth endpoints are not idempotent, and this
        // server answers bad credentials with a 500, which a status-based rule would retry.
        retry: false,
      },
    },
  });
}
