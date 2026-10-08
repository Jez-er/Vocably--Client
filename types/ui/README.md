Prop types for Vocably's own components.

shadcn-generated primitives (`button.tsx` aside, which is restyled by hand) declare their props
inline and export none — that is the registry's house style, and every future `shadcn add` would
otherwise land a file that breaks the "prop types live in types/" rule. So this folder covers the
components written here, not the generated ones.

Component prop types that are a bare `{ children: React.ReactNode }` stay inline: a named
`ChildrenProps` per wrapper is noise, and Next already supplies `LayoutProps`/`PageProps`.

A labelled control takes a **required** `id`: it is what ties the `<label>` and the
`aria-describedby` ids together, so it cannot be optional. `TextFieldProps` re-declares `className`
after omitting it so the name clearly covers the wrapper's layout only — the input's own styling is
not overridable — and `PasswordFieldProps` omits `type` and `trailing` because `PasswordField` owns
both: it is always a password, and the eye toggle is the trailing slot.

`ButtonProps` describes a `<button>` even though `asChild` swaps in a Radix Slot and the rendered
element may be an `<a>`, because a button is what every call site writes.
