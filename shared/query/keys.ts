/**
 * The one place query keys are defined.
 *
 * Keys are `as const` tuples so useQuery, invalidateQueries and getQueryData all agree on the
 * shape, and each domain gets a root key you can invalidate wholesale.
 */
export const queryKeys = {
  auth: {
    root: ["auth"] as const,
    session: () => [...queryKeys.auth.root, "session"] as const,
  },
  dictionaries: {
    root: ["dictionaries"] as const,
    list: () => [...queryKeys.dictionaries.root, "list"] as const,
  },
  languages: {
    root: ["languages"] as const,
    list: () => [...queryKeys.languages.root, "list"] as const,
  },
  words: {
    root: ["words"] as const,
    list: () => [...queryKeys.words.root, "list"] as const,
  },
} as const;
