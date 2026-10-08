import type {
  ApiNotFetchRequest,
  RequestConfig,
  RequestOptions,
} from "@astralis-os/notfetch";

export type RequestContext = {
  skipAuth?: boolean;
  skipRefresh?: boolean;
  retried?: boolean;
};

export type AuthAwareConfig = RequestConfig & { context?: RequestContext };

export type Endpoint<Params, Result> = ApiNotFetchRequest<Params, Result>;

export type SimpleEndpoint<Result> = (config?: RequestOptions) => Promise<Result>;

export type ApiErrorKind = "network" | "http" | "unknown";
