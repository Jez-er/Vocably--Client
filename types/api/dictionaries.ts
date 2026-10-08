export type DictionaryResponse = {
  id: string;
  userId: string;
  languageCode: string;
};

export type DictionaryCreateRequest = {
  languageCode: string;
};

export type DictionaryIntent = "list" | "create";

export type DictionaryView = {
  id: string;
  languageCode: string;
  title: string;
  flag: string;
  wordCount: number | null;
};
