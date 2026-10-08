Routes, and the global stylesheet they all share.

## Where a file goes

`page.tsx` stays thin: `metadata`, the route's params, and the component that renders it.

**A page's view lives next to `page.tsx`, not in `_widgets/`** — `dictionaries/dictionaries-view.tsx`
beside `dictionaries/page.tsx`. The view is the page; burying it one folder deeper hides the thing
you are looking for behind the parts it is made of.

`_widgets/` holds what a view composes: forms, cards, pickers. **Forms are the exception to the rule
above and always stay in `_widgets/`**, even on a route whose `page.tsx` renders the form directly
(`forgot-password`). A form is a part, not the page.

`_widgets/` at a route-group root (`(app)/_widgets/`) is for the pieces every page in that group
uses — the shell, the auth guard. A widget tied to one form stays in that route's folder
(`LanguageCombobox`); only the primitives underneath it are shared, and those live in
`components/ui/`.

## globals.css

The `:root` palette is the source of truth, straight from `style-quide.md` §3.

Below it, shadcn's token contract is expressed in Vocably terms. Every name a generated component
can emit has to resolve to something there: a name that does not resolve yields an invalid colour,
which renders fully transparent rather than as an error. That block is what keeps `shadcn add` safe.

Two shadcn names do not mean what the Vocably name suggests:

- `muted` is a **surface** in shadcn (`bg-muted`), while Vocably's muted was a text colour. That is
  why the text colour is `--muted-foreground`: one `--color-*` entry in Tailwind v4 generates the
  whole utility family, so a single `--color-muted` cannot be both.
- `input` is a **border** colour in shadcn (`border-input`), not a field fill. The fill stays
  `--surface-input`.

`--radius: 14px` (the guide's button radius) drives shadcn's generic `rounded-sm/md/lg/xl` scale, so
an un-restyled `rounded-md` in a generated component lands on the Vocably scale instead of
Tailwind's defaults — and conveniently makes `--radius-md` 12px, the guide's input radius. At call
sites prefer the named radii (`rounded-field`, `rounded-button`, `rounded-stat`, `rounded-hero`,
`rounded-card`): they state the guide's value rather than deriving it.

Two variants are declared by hand:

- `compact` tightens spacing on **short** viewports as well as narrow ones — the auth card and the
  dialog both need it.
- `dark` never matches; the app is light-only. It is declared anyway because shadcn-generated
  components carry `dark:` classes and `shadcn add` re-inserts the line when it is missing.

`html { scrollbar-gutter: stable }` reserves the scrollbar's space. Radix locks the scroll while a
dialog is open (via react-remove-scroll, which also pads the body); a stable gutter keeps the page
from shifting sideways either way.

## Route notes

`AuthCard`'s heading is an `<h1>` carrying the guide's H2 type style — one per page, so the visual
scale and the document outline are decided separately.

The language picker is a combobox rather than a Select because of what the options look like: each
one reads `🇩🇪 German`, so the first character of every option is a flag emoji. A Select — native or
Radix — matches typed characters against the start of the option text, which means no letter ever
matches anything. `CommandInput` matches a substring of the title instead, so "ger" finds both German
and Nigerian Pidgin. The flag is rendered in its own `aria-hidden` span so it stays out of both the
filter and the accessible name; the filter runs on `CommandItem`'s `value`, which is the title alone.
A combobox is not a native form control, so it goes through react-hook-form's `Controller` rather
than `register()`.

## Pending server work

`reset-password` has no endpoint yet, so `ResetPasswordForm`'s `onSubmit` is a stub. Once
`POST /api/auth/reset-password { token, password }` exists, add it to `shared/api/auth/endpoints.ts`
and send the `token` prop with `values.password`. Never log or display the token itself.
