/**
 * Typed off `com.vocably.word.dto.WordResponse`.
 *
 * Only `dictionaryId` is read today (to count words per dictionary), but the record is small and
 * fully known, so the whole shape is declared rather than a convenient subset.
 */

/** The garden metaphor: words grow Seed -> Sprout -> Bloom. */
export type WordStatus = "SEED" | "SPROUT" | "BLOOM";

export type WordResponse = {
  id: string;
  dictionaryId: string;
  word: string;
  definitions: string[];
  examples: string[];
  /** Ids of related words, as strings — the server names them *Id but sends arrays. */
  synonymsId: string[];
  antonymsId: string[];
  scores: number;
  status: WordStatus;
  /** Java Instant, so an ISO-8601 string with an offset. */
  createdAt: string;
  updatedAt: string;
};
