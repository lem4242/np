# np

Public CDN assets for **nuco**, served raw via jsDelivr. The name is deliberately
short because these URLs are emitted per-render inside Claude chat widgets, where
every character is an output token.

## `v.js`

Interactive tree-explorer engine (the workspace "finder"/"view"). Exports
`mount(selector, data)`; the data tree lives in the caller, not here.

```js
import { mount } from 'https://cdn.jsdelivr.net/gh/lem4242/np@v1/v.js';
mount('#xp', DATA);
```

Each node: `{ n:'name', m:'meta', b:['badge','tone'], note:'detail', c:[…children…] }`.
`c` present → folder (click to open); no `c` → leaf (click shows `note`).
Badge tones: `m` muted · `i` info/shared · `w` read-only · `o` world/public.

Versioned by tag (`@v1`, `@v2`, …) — jsDelivr caches pinned tags permanently, so
bump the tag to ship an engine change. Consumed by the `workspace-explorer` skill.
