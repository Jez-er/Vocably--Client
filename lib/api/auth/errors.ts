import { isApiError } from "@/lib/api/core/errors";

export type AuthIntent = "login" | "register";

/**
 * Turn an ApiError into copy a user can act on.
 *
 * TODO(server): the status code carries almost no information today, so this mapping is coarser
 * than it should be. `/error` is missing from the permitAll list in SecurityConfig, so *every*
 * server-side failure — wrong password, unknown email, duplicate email, bean validation — is
 * forwarded to /error, arrives unauthenticated, and comes back as an identical generic 401 with
 * `path: "/error"`. Once /error is permitted and a @ControllerAdvice returns 401 for bad
 * credentials, 409 for a duplicate email and 400 with field errors for validation, the 401 branch
 * below should be narrowed to genuine authentication failures.
 */
export function resolveAuthErrorMessage(
  error: unknown,
  intent: AuthIntent,
): string {
  if (!isApiError(error)) {
    return "Something went wrong. Please try again.";
  }

  if (error.status === 0) {
    return "Can't reach the server. Check your connection and try again.";
  }

  switch (error.status) {
    // Validation errors never reach the client with field details attached — Boot's
    // include-binding-errors defaults to `never`.
    case 400:
      return "Check the details you entered and try again.";
    // Today this covers every rejected submit, not just an authentication failure.
    case 401:
      return intent === "login"
        ? "Incorrect email or password."
        : "We couldn't create that account. That email may already be registered.";
    case 409:
      return "That email is already registered.";
    case 500:
      return "Something went wrong on our side. Please try again.";
    default:
      return "Something went wrong. Please try again.";
  }
}
