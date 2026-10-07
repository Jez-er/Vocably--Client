Every type in the project that is not derived from something else.

**The one rule: `types/` is a leaf.** A file here may import from `react`, `next` and third-party
packages, and from its sibling files — and from nothing else in the repo, except where a type is
genuinely derived from a value (`ButtonProps` off `buttonVariants`). That keeps `shared/ → types/`
a one-way dependency.

Siblings are imported by relative path, and there is deliberately **no `index.ts`**. With the
`@/*` alias, `@/types/api/auth` is no longer to type than `@/types`, and a barrel would turn
`types/dictionaries.ts` referencing `types/api/languages.ts` into a self-cycle — legal in
TypeScript, erased at runtime, and the source of baffling "implicitly has type any" errors.

Zod-inferred types (`LoginValues`, `CreateDictionaryValues`, …) stay in `lib/validations/` next to
the schemas they come from. They are not independent declarations; moving them here would mean
re-exporting `z.infer` from a second place.

Import types from here and values from `@/shared/api`, so each name has exactly one import path.
