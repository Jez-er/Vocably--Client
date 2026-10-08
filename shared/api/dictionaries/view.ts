import type {
  DictionaryResponse,
  DictionaryView,
} from "@/types/api/dictionaries";
import type { LanguageResponse } from "@/types/api/languages";
import type { WordResponse } from "@/types/api/words";

export function countWordsByDictionary(
  words: readonly WordResponse[],
): Map<string, number> {
  const counts = new Map<string, number>();

  for (const word of words) {
    counts.set(word.dictionaryId, (counts.get(word.dictionaryId) ?? 0) + 1);
  }

  return counts;
}

export function toDictionaryCards(
  dictionaries: readonly DictionaryResponse[],
  languages: readonly LanguageResponse[],
  wordCounts: Map<string, number> | null,
): DictionaryView[] {
  const byCode = new Map(languages.map((language) => [language.code, language]));

  return dictionaries.map((dictionary) => {
    const language = byCode.get(dictionary.languageCode);

    return {
      id: dictionary.id,
      languageCode: dictionary.languageCode,
      title: language?.title ?? dictionary.languageCode.toUpperCase(),
      flag: language?.flag ?? "",
      wordCount: wordCounts ? (wordCounts.get(dictionary.id) ?? 0) : null,
    };
  });
}

export function availableLanguages(
  languages: readonly LanguageResponse[],
  dictionaries: readonly DictionaryResponse[],
): LanguageResponse[] {
  const owned = new Set(dictionaries.map((dictionary) => dictionary.languageCode));

  return languages
    .filter((language) => !owned.has(language.code))
    .sort((a, b) => a.title.localeCompare(b.title));
}
