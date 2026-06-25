# np

Public CDN assets for **nuco**, served raw via jsDelivr. The name is deliberately
short because these URLs are emitted per-render inside Claude chat widgets, where
every character is an output token.

## `v.js`

Collapsible workspace browser. A black launcher bar shows the current path
(`nuco > loaf > assets`) with a down-arrow; click it to drop the tree, click a
path segment to jump up, a folder to go in, a leaf to show its `note`. The engine
and all CSS live here — the caller injects **only** the data.

```js
import { mount } from 'https://cdn.jsdelivr.net/gh/lem4242/np@v2/v.js';
mount('#xp', DATA);                 // or mount('#xp', DATA, { root:'nuco', sep:'>', open:false })
```

Each node: `{ n:'name', m:'meta', b:['badge','tone'], note:'detail', c:[…children…] }`.
`c` present → folder (click to open); no `c` → leaf (click shows `note`).
Badge tones: `m` muted · `i` info/shared · `w` read-only · `o` world/public.
Opts: `root` (bar root label), `sep` (path separator), `open` (start expanded).

Versioned by tag (`@v1` = tree/breadcrumb, `@v2` = bar). jsDelivr caches pinned
tags permanently, so bump the tag to ship an engine change. Consumed by the `nuco` skill.
