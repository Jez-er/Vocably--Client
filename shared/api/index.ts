/**
 * Public surface of the data layer. Import from "@/shared/api" rather than reaching into core/.
 */

export { api, refreshAccessToken } from "@/shared/api/core/client";
export { http } from "@/shared/api/core/http";
export { API_BASE_URL } from "@/shared/api/core/config";
export {
  ApiError,
  applyFieldErrors,
  isAbortError,
  isApiError,
  isMaskedServerError,
  toApiError,
  type ApiErrorKind,
} from "@/shared/api/core/errors";
export { publicRequest } from "@/shared/api/core/request-context";
export {
  hasPersistedSession,
  persistUser,
  readPersistedUser,
  tokenStore,
} from "@/shared/api/core/tokens";
export type {
  AuthAwareConfig,
  Endpoint,
  RequestContext,
  SimpleEndpoint,
} from "@/shared/api/core/types";

export * as authApi from "@/shared/api/auth/endpoints";
export { resolveAuthErrorMessage, type AuthIntent } from "@/shared/api/auth/errors";
export { useLogin, useLogout, useRegister, useSession } from "@/shared/api/auth/hooks";
export { sessionQuery } from "@/shared/api/auth/queries";
export { SessionProvider } from "@/shared/api/auth/session-provider";
export type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  Tokens,
  User,
} from "@/shared/api/auth/types";

export * as dictionariesApi from "@/shared/api/dictionaries/endpoints";
export {
  resolveDictionaryErrorMessage,
  type DictionaryIntent,
} from "@/shared/api/dictionaries/errors";
export {
  useCreateDictionary,
  useDictionaries,
  useDictionaryCards,
} from "@/shared/api/dictionaries/hooks";
export { dictionariesQuery } from "@/shared/api/dictionaries/queries";
export type {
  DictionaryCreateRequest,
  DictionaryResponse,
} from "@/shared/api/dictionaries/types";
export {
  availableLanguages,
  countWordsByDictionary,
  toDictionaryCards,
  type DictionaryCard,
} from "@/shared/api/dictionaries/view";

export * as languagesApi from "@/shared/api/languages/endpoints";
export { languagesQuery } from "@/shared/api/languages/queries";
export type { LanguageResponse } from "@/shared/api/languages/types";

export * as wordsApi from "@/shared/api/words/endpoints";
export { wordsQuery } from "@/shared/api/words/queries";
export type { WordResponse, WordStatus } from "@/shared/api/words/types";
