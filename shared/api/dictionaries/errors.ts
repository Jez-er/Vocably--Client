import type { DictionaryIntent } from "@/types/api/dictionaries";
import { isApiError } from "@/shared/api/core/errors";

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
