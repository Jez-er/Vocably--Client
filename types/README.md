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

## api/

One file per server module, typed literally off the Spring records in `com.vocably.<module>.dto`.

Payloads are camelCase throughout (`spring.jackson.property-naming-strategy: LOWER_CAMEL_CASE` in
`application.yml`), so there is no per-module case handling and no global case transform. A Java
`Instant` arrives as an ISO-8601 string with an offset.

Declare the whole record even when only one field is read today, as long as the shape is small and
fully known — a convenient subset invites a second, conflicting declaration later.

Two shapes are deliberately incomplete, and that is the server's doing rather than an omission:
`DictionaryResponse` has no title, word count or timestamps, so anything displayable has to be
joined on in `shared/api/dictionaries/view.ts`; and `DictionaryCreateRequest` has no `userId`,
because the server reads the owner from the access token and a client must not be able to create a
dictionary for someone else.

`DictionaryView` is named for the join it represents and not after the card that renders it, so
`dictionary-card.tsx` can import the type unaliased.
