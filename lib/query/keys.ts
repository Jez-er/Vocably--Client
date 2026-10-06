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
} as const;
