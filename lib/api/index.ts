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

export * as dictionariesApi from "@/lib/api/dictionaries/endpoints";
export {
  resolveDictionaryErrorMessage,
  type DictionaryIntent,
} from "@/lib/api/dictionaries/errors";
export {
  useCreateDictionary,
  useDictionaries,
  useDictionaryCards,
} from "@/lib/api/dictionaries/hooks";
export { dictionariesQuery } from "@/lib/api/dictionaries/queries";
export type {
  DictionaryCreateRequest,
  DictionaryResponse,
} from "@/lib/api/dictionaries/types";
export {
  availableLanguages,
  countWordsByDictionary,
  toDictionaryCards,
  type DictionaryCard,
} from "@/lib/api/dictionaries/view";

export * as languagesApi from "@/lib/api/languages/endpoints";
export { languagesQuery } from "@/lib/api/languages/queries";
export type { LanguageResponse } from "@/lib/api/languages/types";

export * as wordsApi from "@/lib/api/words/endpoints";
export { wordsQuery } from "@/lib/api/words/queries";
export type { WordResponse, WordStatus } from "@/lib/api/words/types";
