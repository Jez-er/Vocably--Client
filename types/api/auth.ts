/**
 * Typed literally off the Spring records in `com.vocably.auth.dto` / `com.vocably.user.dto`.
 *
 * The auth and user modules serialise as camelCase. Other modules on this server do not (words are
 * snake_case, dictionaries PascalCase), so type each module against its own payload rather than
 * adding a global case transform.
 */

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type User = {
  id: string;
  email: string;
  displayName: string;
  /** Java Instant, so an ISO-8601 string with an offset. */
  createdAt: string;
};

/** Returned by /auth/register and /auth/login. /auth/refresh returns a bare Tokens instead. */
export type AuthResponse = {
  tokens: Tokens;
  user: User;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  displayName: string;
  password: string;
};

/** Which auth call produced an error, so the copy can name the right action. */
export type AuthIntent = "login" | "register";
