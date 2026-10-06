import { http } from "@/lib/api/core/http";
import { publicRequest } from "@/lib/api/core/request-context";
import type { Endpoint, SimpleEndpoint } from "@/lib/api/core/types";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  Tokens,
} from "@/lib/api/auth/types";

/**
 * The auth endpoints. All of /api/auth/** is permitAll server-side, so every call here is public.
 *
 * Adding an endpoint is one `export const` of this shape: annotate it with Endpoint<Params, Result>
 * and the `{ params, config }` argument types itself, including whether it is optional.
 */

/** 201 on success. */
export const register: Endpoint<RegisterRequest, AuthResponse> = ({
  params,
  config,
}) => http.post("/auth/register", params, publicRequest(config));

export const login: Endpoint<LoginRequest, AuthResponse> = ({
  params,
  config,
}) => http.post("/auth/login", params, publicRequest(config));

/**
 * Reads the HttpOnly refreshToken cookie and returns rotated tokens — no `user`, and no request
 * body is sent or read. Prefer `refreshAccessToken` from the client module, which de-duplicates
 * concurrent calls and updates the token store.
 */
export const refresh: SimpleEndpoint<Tokens> = (config) =>
  http.post("/auth/refresh", undefined, publicRequest(config));

/** 204, so it resolves to undefined. Clears the refreshToken cookie server-side. */
export const logout: SimpleEndpoint<void> = (config) =>
  http.post("/auth/logout", undefined, publicRequest(config));
