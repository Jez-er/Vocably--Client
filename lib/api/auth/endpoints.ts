import { http } from "@/lib/api/core/http";
import { publicRequest } from "@/lib/api/core/request-context";
import type { Endpoint, SimpleEndpoint } from "@/lib/api/core/types";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  Tokens,
} from "@/lib/api/auth/types";


export const register: Endpoint<RegisterRequest, AuthResponse> = ({
  params,
  config,
}) => http.post("/auth/register", params, publicRequest(config));

export const login: Endpoint<LoginRequest, AuthResponse> = ({
  params,
  config,
}) => http.post("/auth/login", params, publicRequest(config));

export const refresh: SimpleEndpoint<Tokens> = (config) =>
  http.post("/auth/refresh", undefined, publicRequest(config));

export const logout: SimpleEndpoint<void> = (config) =>
  http.post("/auth/logout", undefined, publicRequest(config));
