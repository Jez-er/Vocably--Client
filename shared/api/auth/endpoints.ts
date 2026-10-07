import { http } from "@/shared/api/core/http";
import { publicRequest } from "@/shared/api/core/request-context";
import type { Endpoint, SimpleEndpoint } from "@/types/api/core";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  Tokens,
} from "@/types/api/auth";


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
