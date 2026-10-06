/**
 * Public surface of the data layer. Import from "@/lib/api" rather than reaching into core/.
 */

export { api, refreshAccessToken } from "@/lib/api/core/client";
export { http } from "@/lib/api/core/http";
export { API_BASE_URL } from "@/lib/api/core/config";
export {
  ApiError,
  applyFieldErrors,
  isAbortError,
  isApiError,
  isMaskedServerError,
  toApiError,
  type ApiErrorKind,
} from "@/lib/api/core/errors";
export { publicRequest } from "@/lib/api/core/request-context";
export {
  hasPersistedSession,
  persistUser,
  readPersistedUser,
  tokenStore,
} from "@/lib/api/core/tokens";
export type {
  AuthAwareConfig,
  Endpoint,
  RequestContext,
  SimpleEndpoint,
} from "@/lib/api/core/types";

export * as authApi from "@/lib/api/auth/endpoints";
export { resolveAuthErrorMessage, type AuthIntent } from "@/lib/api/auth/errors";
export { useLogin, useLogout, useRegister, useSession } from "@/lib/api/auth/hooks";
export { sessionQuery } from "@/lib/api/auth/queries";
export { SessionProvider } from "@/lib/api/auth/session-provider";
export type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  Tokens,
  User,
} from "@/lib/api/auth/types";
