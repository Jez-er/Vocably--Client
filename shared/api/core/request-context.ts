import type { RequestOptions } from "@astralis-os/notfetch";
import type { RequestContext } from "@/types/api/core";

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
