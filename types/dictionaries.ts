import type { DictionaryView } from "./api/dictionaries";
import type { LanguageResponse } from "./api/languages";

export type DictionaryCardProps = Omit<DictionaryView, "id" | "languageCode">;

export type CreateDictionaryFormProps = {
  languages: LanguageResponse[];
  isLanguagesPending: boolean;
  languagesError: unknown;
  onCancel: () => void;
  onCreated: () => void;
};

export type LanguageComboboxProps = {
  id: string;
  label: string;
  languages: LanguageResponse[];
  value: string;
  onChange: (languageCode: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
};
