"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createDictionary } from "@/shared/api/dictionaries/endpoints";
import { dictionariesQuery } from "@/shared/api/dictionaries/queries";
import type {
  DictionaryCreateRequest,
  DictionaryResponse,
  DictionaryView,
} from "@/types/api/dictionaries";
import {
  availableLanguages,
  countWordsByDictionary,
  toDictionaryCards,
} from "@/shared/api/dictionaries/view";
import { languagesQuery } from "@/shared/api/languages/queries";
import type { LanguageResponse } from "@/types/api/languages";
import { wordsQuery } from "@/shared/api/words/queries";
import { queryKeys } from "@/shared/query/keys";

export function useDictionaries() {
  return useQuery(dictionariesQuery());
}

export function useDictionaryCards(): {
  cards: DictionaryView[];
  languages: LanguageResponse[];
  isPending: boolean;
  error: unknown;
  refetch: () => void;
  languagesError: unknown;
  isLanguagesPending: boolean;
} {
  const dictionaries = useQuery(dictionariesQuery());
  const languages = useQuery(languagesQuery());
  const words = useQuery(wordsQuery());

  const dictionaryList = dictionaries.data ?? [];
  const languageList = languages.data ?? [];

  return {
    cards: toDictionaryCards(
      dictionaryList,
      languageList,
      words.data ? countWordsByDictionary(words.data) : null,
    ),
    languages: availableLanguages(languageList, dictionaryList),
    isPending: dictionaries.isPending || languages.isPending,
    error: dictionaries.error ?? languages.error,
    refetch: () => {
      void dictionaries.refetch();
      void languages.refetch();
      void words.refetch();
    },
    languagesError: languages.error,
    isLanguagesPending: languages.isPending,
  };
}

export function useCreateDictionary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: DictionaryCreateRequest) => createDictionary({ params }),
    onSuccess: (created: DictionaryResponse) => {
      queryClient.setQueryData<DictionaryResponse[]>(
        queryKeys.dictionaries.list(),
        (previous) => (previous ? [...previous, created] : [created]),
      );
      void queryClient.invalidateQueries({
        queryKey: queryKeys.dictionaries.list(),
      });
    },
  });
}
