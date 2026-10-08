The data layer: one configured HTTP client, the endpoints written against it, and React Query on
top.

```
api/core/        the notfetch instance, interceptors, errors, token storage
api/<domain>/    endpoints.ts, queries.ts, hooks.ts, errors.ts, view.ts
query/           the QueryClient, its provider, and every query key
```

## Import rules

`shared/api/index.ts` is the public surface, and it exports **values only**. Types live in
`@/types/api/*` and are imported from there, so a name has exactly one import path. The rule is
*types from `@/types`, values from `@/shared/api`*.

That barrel is a convenience for one-line imports in forms, not a wall. Reach into a module directly
where the barrel would cost something: `app/layout.tsx` imports `@/shared/api/auth/session-provider`
on its own, because going through the barrel would pull every endpoint module and notfetch into the
root layout's graph and widen the client boundary.

## The client

One instance, from `notfetch.create()` — not the default export, which is a shared singleton, and
not `new NotFetch()`, which despite the package README is not a named export (the only runtime named
exports are `ResponseError` and `DEFAULT_VALIDATE_STATUS`).

`parse` is left unset so notfetch auto-detects from the content type: some endpoints answer
`text/plain`, where a forced `response.json()` would throw, and an empty 204 body already parses to
`undefined`.

Endpoints are written against the `http` facade, which unwraps `.data` and guarantees a failure
throws an `ApiError`. Its status re-check is not redundant — with a response interceptor registered,
notfetch no longer throws on a bad status by itself, so that check is the backstop if the failure
path is ever bypassed.

### Exactly one interceptor of each kind

This is load-bearing, not tidiness. notfetch re-checks `validateStatus` on every interceptor
iteration against the **original** response, so with two or more response interceptors a response
recovered after a refresh is invalidated again by the next iteration and the 401 is re-raised once
per interceptor.

Every interceptor needs an `onFailure` that **throws**. notfetch's failure branch is
`else Promise.reject(error)` with no return, so an interceptor without `onFailure` drops the error as
an unhandled rejection; returning a value instead of throwing makes it the successful response.

A 401 refreshes the token once and replays the request. The replay passes `baseURL: ""` because
`config.url` already carries the base URL and the query string, drops the stale `Authorization`
header for the request interceptor to re-add, and sets `context.retried` so it can never loop.
Concurrent 401s share one in-flight refresh. `publicRequest()` marks the `/auth/*` calls, which are
`permitAll` server-side: no Bearer token, and a 401 there is not "refresh and retry".

### Base URL and the dev proxy

`API_BASE_URL` reads `process.env.NEXT_PUBLIC_API_BASE_URL` **literally**. Next only inlines
verbatim `process.env.NEXT_PUBLIC_*` reads at build time, so destructuring it or indexing
`process.env[name]` would silently come out `undefined` in the browser.

The default is `/api`, proxied by `next.config.ts` to the Spring server. The server has no CORS
configuration, so the browser cannot talk to `:8080` directly; proxying keeps API calls same-origin,
which avoids preflight and makes Spring's `Set-Cookie: refreshToken` a first-party cookie (also
avoiding `SameSite=Lax` breaking on a split-domain deploy).

## Errors

`ApiError` is the single error type the layer throws, and normalising is not optional: the server has
two mutually incompatible error bodies (the 401 from `JwtAuthenticationEntryPoint` is
`{status, error, message, path}`, every other failure gets Boot's default
`{timestamp, status, error, path}`), and notfetch awaits `fetch()` *before* its response
interceptors, so an offline `TypeError` never reaches them at all.

**Branch on `status` first and use `code` only to narrow.** Several distinct failures share a status
(409 is both `CONFLICT` and `EMAIL_ALREADY_USED`), but an intermediary error page or a rollback can
leave `code` undefined, so status-first mapping degrades gracefully.

`AbortError` is rethrown untouched — React Query treats it as a cancellation and it must stay exactly
as it is. A `TypeError` from `fetch()` (DNS failure, dropped connection, offline) becomes `status: 0`.

`isMaskedServerError` exists because the server does not list `/error` under `permitAll`: any
exception gets forwarded there, arrives unauthenticated, and comes back as a generic 401. The only
thing distinguishing it from a real 401 is `path`, which is always `"/error"`. A masked error is not
an expired token, so it is excluded from refresh-and-replay.

A domain's `errors.ts` turns an `ApiError` into copy a user can act on, or `null` when the caller
handles it better itself. `resolveDictionaryErrorMessage("create", …)` returning `null` for 400 and
409 is the non-obvious part: the create form attaches those to the language field, and a string would
report the same failure twice.

## Tokens — browser only

Do not import `api/core/tokens.ts` from a Server Component. The token lives in module state, which on
the server is shared across every request and would leak one user's token to another.

The access token is kept **in memory only**, never `localStorage`, so an XSS payload cannot read it.
The refresh token is never touched here: the server mirrors it into an HttpOnly cookie, and the copy
it also returns in the response body is ignored on purpose.

`user` is persisted because there is no `GET /api/auth/me` — after a reload `/auth/refresh` hands back
tokens but no user, so there would be nothing to rehydrate from. Only non-sensitive profile fields go
in, and `hasPersistedSession()` gates the session query so an anonymous visitor does not fire a
doomed refresh on every cold load. Every storage access is wrapped in try/catch: it throws in a
private window with site data blocked, and `window` is absent during the server render.

## Queries

Keys are defined only in `query/keys.ts`, as `as const` tuples so `useQuery`, `invalidateQueries` and
`getQueryData` agree on the shape, with a root key per domain to invalidate wholesale.

A fresh `QueryClient` per server render keeps one request's data out of another's; a single client in
the browser keeps the cache alive across re-renders.

A 4xx is never retried — the server is rejecting the request itself and the answer will not change.
Network failures (status 0) and 5xx get one more go. **Mutations are never retried automatically**:
the auth endpoints are not idempotent, and this server answers bad credentials with a 500, which a
status-based rule would retry.

The language catalogue is a seeded reference table that only changes on a migration, so its query
runs at `staleTime: Infinity, gcTime: Infinity`.

After a create, seed the cache from the 201 (it carries the complete row, so it is the exact new
state rather than a guess) and then invalidate, because `findAllByUserId` has no `ORDER BY` and only
the server knows the order. There is deliberately no optimistic `onMutate`: it would buy one
localhost round trip at the cost of a fake id, a reconcile step, and a card that pops in and vanishes
on the most likely failure, a duplicate language.

## Derivations

`<domain>/view.ts` holds pure derivations — no React, no React Query. They live outside the hooks
because a dictionary is little more than a `{id, userId, languageCode}` pair, so everything the UI
shows is a join across three endpoints, and a join across three cache entries cannot honestly live in
any single query's `select`.

The dictionaries grid is gated on dictionaries + languages only. Word counts arrive separately and
are reported as `null` until they do, so a slow or failed `/api/words` degrades to "count unavailable"
instead of blocking the page or claiming every dictionary is empty. `null` means *not known*, never
zero. Owned languages are removed from the picker rather than disabled: the server rejects a
duplicate with a 409, a disabled row in a 162-option list is noise the user cannot act on, and
several mobile pickers render disabled options indistinguishably from enabled ones. The sort is not
optional — `LanguageRepository.findAll()` has no `ORDER BY`.

## Pending server work

- `/error` is not `permitAll` and there is no `@ControllerAdvice` returning real codes, so
  `isMaskedServerError` has to exist. It can be deleted once that changes.
- The dictionaries page subscribes to every word the user owns just to render one integer per card.
  A `wordCount` on `DictionaryResponse`, or `GET /api/dictionaries/{id}/words/count`, would let
  `wordsQuery` be dropped from that page outright.
