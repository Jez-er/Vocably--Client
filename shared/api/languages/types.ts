/**
 * Typed off `com.vocably.language.dto.LanguageResponse`.
 *
 * The whole server serialises camelCase (`spring.jackson.property-naming-strategy:
 * LOWER_CAMEL_CASE` in application.yml), so no per-module case handling is needed.
 */
export type LanguageResponse = {
  id: string;
  title: string;
  code: string;
  /** A flag emoji, seeded for all 162 languages by migration V2. May be an empty string. */
  flag: string;
};
