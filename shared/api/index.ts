/**
 * Public surface of the data layer: values only.
 *
 * Types are NOT re-exported here. They live in `@/types/api/*` and are imported from there, so a
 * type has exactly one import path — the whole point of having a types/ folder. The rule is
 * "types from @/types, values from @/shared/api".
 *
 * This barrel is a convenience for the one-line imports in forms, not a wall. Reaching into a
 * module directly is correct where the barrel would cost something: `app/layout.tsx` imports
 * `@/shared/api/auth/session-provider` on its own, because going through here would pull every
 * endpoint module and notfetch into the root layout's graph and widen the client boundary.
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
} from "@/shared/api/core/errors";
export { publicRequest } from "@/shared/api/core/request-context";
export {
  hasPersistedSession,
  persistUser,
  readPersistedUser,
  tokenStore,
} from "@/shared/api/core/tokens";

export * as authApi from "@/shared/api/auth/endpoints";
export { resolveAuthErrorMessage } from "@/shared/api/auth/errors";
export { useLogin, useLogout, useRegister, useSession } from "@/shared/api/auth/hooks";
export { sessionQuery } from "@/shared/api/auth/queries";
export { SessionProvider } from "@/shared/api/auth/session-provider";

export * as dictionariesApi from "@/shared/api/dictionaries/endpoints";
export { resolveDictionaryErrorMessage } from "@/shared/api/dictionaries/errors";
export {
  useCreateDictionary,
  useDictionaries,
  useDictionaryCards,
} from "@/shared/api/dictionaries/hooks";
export { dictionariesQuery } from "@/shared/api/dictionaries/queries";
export {
  availableLanguages,
  countWordsByDictionary,
  toDictionaryCards,
} from "@/shared/api/dictionaries/view";

export * as languagesApi from "@/shared/api/languages/endpoints";
export { languagesQuery } from "@/shared/api/languages/queries";

export * as wordsApi from "@/shared/api/words/endpoints";
export { wordsQuery } from "@/shared/api/words/queries";
