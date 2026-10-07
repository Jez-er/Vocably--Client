import { isApiError } from "@/shared/api/core/errors";

export type DictionaryIntent = "list" | "create";

/**
 * Turn an ApiError into copy a user can act on, or null when the caller handles it better itself.
 *
 * The contract for "create" is the non-obvious part: a 400 and a 409 both return **null**, because
 * the create form attaches those to the language field (a 400 through `applyFieldErrors`, a 409 as
 * an explicit message). Returning a string for them too would report the same failure twice —
 * once under the select and once in the form-level alert.
 *
 * Branch on `status` first and use `code` only to disambiguate: a rollback or an intermediary
 * error page can leave `code` undefined, and status-first mapping degrades gracefully.
 */
export function resolveDictionaryErrorMessage(
  error: unknown,
  intent: DictionaryIntent,
): string | null {
  if (!error) return null;

  if (!isApiError(error)) {
    return "Something went wrong. Please try again.";
  }

  if (error.status === 0) {
    return "Can't reach the server. Check your connection and try again.";
  }

  switch (error.status) {
    case 400:
    case 409:
      return intent === "create"
        ? null
        : "Something went wrong. Please try again.";
    case 401:
      return "Your session has ended. Log in to continue.";
    case 404:
      return intent === "create"
        ? "That language isn't available right now. Pick another one."
        : "We couldn't find your dictionaries.";
    case 500:
      return "Something went wrong on our side. Please try again.";
    default:
      return "Something went wrong. Please try again.";
  }
}
