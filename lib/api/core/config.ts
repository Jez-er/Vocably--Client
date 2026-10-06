// Written out literally, not destructured off process.env: Next only inlines verbatim
// `process.env.NEXT_PUBLIC_*` reads at build time. `const { NEXT_PUBLIC_API_BASE_URL } =
// process.env` or `process.env[name]` would silently come out undefined in the browser.
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";
