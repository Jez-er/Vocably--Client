import { isApiError } from "@/lib/api/core/errors";

export type AuthIntent = "login" | "register";

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
    case 400:
      return "Check the details you entered and try again.";
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
