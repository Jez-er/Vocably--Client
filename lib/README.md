Framework-agnostic helpers: the className merger and the form schemas.

## utils.ts

`cn` is re-exported from the `cn` package rather than written here, so the `@/lib/utils` importers
and the `from "cn"` imports that `shadcn add` generates resolve to the same function.

Use it for every className merge. Unlike a bare join, `cn` resolves Tailwind conflicts: a caller's
`className="h-12"` beats a component's `h-[52px]` deterministically instead of by stylesheet order.
That is what shadcn's `className` / `asChild` idiom depends on.

## validations/

Zod schemas, one file per domain.

**Mirror the Spring DTOs exactly.** No `.trim()` or other transforms, so the client accepts and
rejects precisely what `@NotBlank` / `@Email` / `@Size` accept and reject. A client rule the server
does not have produces a form that refuses valid input; the reverse produces a round trip that
fails for reasons the form cannot explain.

**Name fields after the Java record components.** A 400 `VALIDATION_FAILED` body keys `fieldErrors`
by record component name, so `languageCode` (not `language`) is what lets `applyFieldErrors` land
the server's message on the right field.

Every form is `noValidate`, so the schema is the only thing stopping an empty submit — a `min(1)`
on a field with an empty initial value is load-bearing, not decoration.

Attach a cross-field error to the field the user can actually fix: the password-match `refine`
carries `path: ["confirmPassword"]`.

Zod-inferred types (`LoginValues`, `CreateDictionaryValues`, …) stay here next to their schema and
not in `types/` — they are not independent declarations. See `types/README.md`.
