"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createDictionary } from "@/lib/api/dictionaries/endpoints";
import { dictionariesQuery } from "@/lib/api/dictionaries/queries";
import type {
  DictionaryCreateRequest,
  DictionaryResponse,
} from "@/lib/api/dictionaries/types";
import {
  availableLanguages,
  countWordsByDictionary,
  toDictionaryCards,
  type DictionaryCard,
} from "@/lib/api/dictionaries/view";
import { languagesQuery } from "@/lib/api/languages/queries";
import type { LanguageResponse } from "@/lib/api/languages/types";
import { wordsQuery } from "@/lib/api/words/queries";
import { queryKeys } from "@/lib/query/keys";

export function useDictionaries() {
  return useQuery(dictionariesQuery());
}

/**
 * Everything the dictionaries page renders, from three independent queries.
 *
 * Three `useQuery` calls rather than `useQueries`: they already fetch in parallel, and the words
 * query must be allowed to fail on its own without blanking the grid — which a single combined
 * result makes harder to express, not easier.
 *
 * The grid is gated on dictionaries + languages only. Word counts arrive separately and are
 * reported as `null` until (or unless) they do, so a slow or failed /api/words degrades to "count
 * unavailable" instead of blocking the page or claiming every dictionary is empty.
 */
export function useDictionaryCards(): {
  cards: DictionaryCard[];
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
      // The 201 carries the complete row, so this is the exact new state rather than a guess —
      // which is also why there is no optimistic onMutate: it would buy one localhost round trip
      // at the cost of a fake id, a reconcile step, and a card that pops in and vanishes on the
      // most likely failure (a duplicate language).
      queryClient.setQueryData<DictionaryResponse[]>(
        queryKeys.dictionaries.list(),
        (previous) => (previous ? [...previous, created] : [created]),
      );
      // findAllByUserId has no ORDER BY, so refetch to settle on whatever order the server uses.
      void queryClient.invalidateQueries({
        queryKey: queryKeys.dictionaries.list(),
      });
      // Not words (a new dictionary has none) and not languages (a seeded, static catalogue).
    },
  });
}
