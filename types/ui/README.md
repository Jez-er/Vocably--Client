Prop types for Vocably's own components.

shadcn-generated primitives (`button.tsx` aside, which is restyled by hand) declare their props
inline and export none — that is the registry's house style, and every future `shadcn add` would
otherwise land a file that breaks the "prop types live in types/" rule. So this folder covers the
components written here, not the generated ones.

Component prop types that are a bare `{ children: React.ReactNode }` stay inline: a named
`ChildrenProps` per wrapper is noise, and Next already supplies `LayoutProps`/`PageProps`.
