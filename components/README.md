Shared components. Anything tied to a single route belongs in that route's `_widgets/` instead.

`components/ui/` is shadcn's output, restyled to `style-quide.md`. The files stay recognisably
generated so a future `shadcn add` or upgrade is a readable diff; prop types are declared inline and
not exported (see `types/ui/README.md` for why).

## Restyling rules

These hold for every primitive, so a component pulled in fresh from the registry gets the same four
edits:

1. **No shadows** (§5). Surfaces are separated by a 1px `--border`, never by elevation. Popover and
   Dialog drop shadcn's shadow and ring for that border.
2. **One focus style.** `focus-visible:outline-2 outline-offset-2 outline-primary`, replacing
   shadcn's 3px ring. It is used by non-shadcn elements too (`TextLink`), so the whole app focuses
   alike.
3. **48px minimum touch target** (§9). shadcn's size scale (h-6 to h-9) is below the floor, so it is
   replaced rather than extended: Button `default` is 52px (§6 puts primary at 52–56px), `sm` is
   48px, Command rows are 48px.
4. **Body text does not shrink.** The guide puts it at 16–17px, so generated `md:text-sm` and
   14px labels go up to 16px.

## Things that are deliberate

`Button` defaults `type="button"` — only when it really renders a `<button>`, since `asChild` may
render an `<a>`, where `type` is not a valid attribute. A `<button>` inside a `<form>` defaults to
`type="submit"`, so without this an unannotated Cancel button submits the form.

`Dialog` inverts shadcn's `showCloseButton` to `false`: the X would be the first tabbable element
and would steal the initial focus that belongs to the first field, and every dialog here has an
explicit Cancel in its actions row. Radix covers the top layer, focus trap, Escape, the
outside-press guard and unmounting the content when closed (which is what resets react-hook-form and
mutation state between opens). It does **not** cover focus restoration for these dialogs, because
they are driven by external state and have no `DialogTrigger` to return to — hence the module-level
tracker of the last element focused outside any dialog. It is tracked continuously rather than
snapshotted at mount, since the content mount is not tied to the click that opened the dialog.
Dismissing by pressing the backdrop still leaves focus on `<body>`: Radix deliberately does not pull
focus back after a pointer press outside, and overriding that would make focus fight the click.

`TextField` is kept as a wrapper rather than inlining Input + Label at each call site, because it
carries four things neither primitive provides: the hint on the label row, the relative box the
`trailing` slot positions against, the error paragraph, and the `aria-describedby` id joining. The
hint shares the label row so it stays visible next to an error and both ids can be referenced
without ever dangling.

`FormError` renders nothing without a message, so a caller can pass a possibly-undefined value
straight through. `role="alert"` so a failed submit the user has not scrolled to is announced.

`Logo`'s size classes are static `Record<LogoSize, string>` lookup tables: Tailwind cannot see
runtime-interpolated class names, and the `Record` makes adding a size to the type fail here until
every table is filled in.

## Icons

`components/ui/icons/` is for third-party brand marks only; everything else comes from
`lucide-react`. `GoogleIcon` necessarily breaks §7 ("line icons … no gradient fills") because
Google's brand guidelines require the official four-colour mark — that is why it is hand-written and
why it sits here rather than in a general icon module.

## className

Merge with `cn` from `@/lib/utils`, never by string concatenation — see `lib/README.md`.
