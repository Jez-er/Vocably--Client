/**
 * Typed off `com.vocably.dictionary.dto.DictionaryResponse` / `DictionaryCreateRequest`.
 *
 * Note what is *not* here: no title, no word count, no timestamps. A dictionary is little more
 * than a user/language pair, so anything displayable has to be joined on from the language
 * catalogue and the word list — see `lib/api/dictionaries/view.ts`.
 */
export type DictionaryResponse = {
  id: string;
  userId: string;
  languageCode: string;
};

/**
 * There is deliberately no userId: the server reads the owner from the access token, so a client
 * cannot create a dictionary for someone else.
 */
export type DictionaryCreateRequest = {
  languageCode: string;
};
