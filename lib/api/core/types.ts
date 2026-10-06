import type {
  ApiNotFetchRequest,
  RequestConfig,
  RequestOptions,
} from "@astralis-os/notfetch";

/**
 * Per-request flags that travel through the whole request lifecycle via notfetch's `context`.
 *
 * `context` is declared on RequestOptions but *not* on RequestConfig, even though notfetch spreads
 * it into the config at runtime — so the interceptors have to read it through AuthAwareConfig.
 */
export type RequestContext = {
  /** Don't attach the Bearer token. Set on the public /auth/* endpoints. */
  skipAuth?: boolean;
  /** Don't try to refresh on a 401. Set on the refresh call itself, to stop recursion. */
  skipRefresh?: boolean;
  /** Marks the single replay after a successful refresh, so it can never loop. */
  retried?: boolean;
};

/** RequestConfig as it actually exists at runtime: with `context` on it. */
export type AuthAwareConfig = RequestConfig & { context?: RequestContext };

/**
 * An endpoint that takes parameters. notfetch's own helper: it resolves to
 * `({ params, config }) => Promise<Result>`, and makes the argument optional when every field of
 * Params is optional (destructure as `({ params, config } = {})` in that case).
 */
export type Endpoint<Params, Result> = ApiNotFetchRequest<Params, Result>;

/**
 * An endpoint that takes no parameters. Hand-written rather than `Endpoint<undefined, R>`, because
 * that conditional resolves to a *required* argument for `undefined` and would force `logout({})`.
 */
export type SimpleEndpoint<Result> = (config?: RequestOptions) => Promise<Result>;
