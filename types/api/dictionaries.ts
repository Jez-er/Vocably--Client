/**
 * Typed off `com.vocably.dictionary.dto.DictionaryResponse` / `DictionaryCreateRequest`.
 *
 * Note what is *not* here: no title, no word count, no timestamps. A dictionary is little more
 * than a user/language pair, so anything displayable has to be joined on from the language
 * catalogue and the word list — see `shared/api/dictionaries/view.ts`.
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

/** Which dictionaries call produced an error, so the copy can name the right action. */
export type DictionaryIntent = "list" | "create";

/**
 * What a dictionary card renders: the join of a dictionary, its language and a word count.
 *
 * `wordCount: null` means "not known", never "zero".
 *
 * Named DictionaryView, not DictionaryCard, because DictionaryCard is the component that renders
 * it — importing the type into that file unaliased would be a name collision.
 */
export type DictionaryView = {
  id: string;
  languageCode: string;
  title: string;
  flag: string;
  wordCount: number | null;
};
