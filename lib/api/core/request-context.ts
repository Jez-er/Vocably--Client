import type { RequestOptions } from "@astralis-os/notfetch";
import type { RequestContext } from "@/lib/api/core/types";

/**
 * Mark a request as public: no Bearer token, and a 401 is not treated as "refresh and retry".
 *
 * Used by the /auth/* endpoints, which are permitAll server-side. Caller-supplied context wins, so
 * a call site can still override a flag.
 */
export function publicRequest(config?: RequestOptions): RequestOptions {
  return {
    ...config,
    context: {
      skipAuth: true,
      skipRefresh: true,
      ...(config?.context as RequestContext | undefined),
    },
  };
}
