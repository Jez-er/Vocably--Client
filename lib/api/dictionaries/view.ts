import type { DictionaryResponse } from "@/lib/api/dictionaries/types";
import type { LanguageResponse } from "@/lib/api/languages/types";
import type { WordResponse } from "@/lib/api/words/types";

/**
 * Pure derivations for the dictionaries page. No React, no React Query.
 *
 * These live outside the hooks on purpose. A dictionary on its own is only {id, userId,
 * languageCode}, so everything the UI shows is a join across three endpoints — and a join across
 * three cache entries cannot honestly live in any single query's `select`.
 */

/** What a dictionary card renders. `wordCount: null` means "not known", never "zero". */
export type DictionaryCard = {
  id: string;
  languageCode: string;
  title: string;
  flag: string;
  wordCount: number | null;
};

export function countWordsByDictionary(
  words: readonly WordResponse[],
): Map<string, number> {
  const counts = new Map<string, number>();

  for (const word of words) {
    counts.set(word.dictionaryId, (counts.get(word.dictionaryId) ?? 0) + 1);
  }

  return counts;
}

/**
 * Join dictionaries to their language, and to a word count when one is available.
 *
 * `wordCounts` is nullable so the grid can render as soon as dictionaries and languages resolve,
 * rather than waiting on (or being blanked by) the word list. A dictionary missing from the map
 * genuinely has no words, so it counts 0 — the "unknown" case is the whole map being absent.
 */
export function toDictionaryCards(
  dictionaries: readonly DictionaryResponse[],
  languages: readonly LanguageResponse[],
  wordCounts: Map<string, number> | null,
): DictionaryCard[] {
  const byCode = new Map(languages.map((language) => [language.code, language]));

  return dictionaries.map((dictionary) => {
    const language = byCode.get(dictionary.languageCode);

    return {
      id: dictionary.id,
      languageCode: dictionary.languageCode,
      // dictionaries.language_code is a foreign key to languages(code), so a miss should be
      // impossible; falling back to the code keeps a card readable if that ever changes.
      title: language?.title ?? dictionary.languageCode.toUpperCase(),
      flag: language?.flag ?? "",
      wordCount: wordCounts ? (wordCounts.get(dictionary.id) ?? 0) : null,
    };
  });
}

/**
 * The languages the user can still add, sorted by title.
 *
 * Owned languages are removed rather than disabled: the server rejects a duplicate with a 409, a
 * disabled row in a 162-option list is noise the user cannot act on, and several mobile pickers
 * render disabled options indistinguishably from enabled ones.
 *
 * The sort is not optional — LanguageRepository.findAll() has no ORDER BY.
 */
export function availableLanguages(
  languages: readonly LanguageResponse[],
  dictionaries: readonly DictionaryResponse[],
): LanguageResponse[] {
  const owned = new Set(dictionaries.map((dictionary) => dictionary.languageCode));

  return languages
    .filter((language) => !owned.has(language.code))
    .sort((a, b) => a.title.localeCompare(b.title));
}
