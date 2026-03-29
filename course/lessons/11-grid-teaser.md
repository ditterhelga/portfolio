# 11 — Grid: when `flex` becomes `xl:grid`

**Goal:** You notice one block that is a column on small screens and a two-column grid on wide screens — a common portfolio pattern.

**Concept:** Flex is great for one-dimensional flows (stack or toolbar). CSS Grid assigns children to rows and columns simultaneously; `grid-cols-2` makes two tracks so image and copy can sit side by side. Tailwind lets you switch layout systems by breakpoint (`xl:grid`) so mobile stays a single scroll story. Gap on grid controls both axes (`gap-x`, `gap-y`).

**In your project**

- [`index.html` lines 567–570](../../index.html): `#cards-beyond` uses `flex flex-col` then `xl:grid xl:grid-cols-2` with explicit `gap-x` / `gap-y`.

**Try it:** Open [`playground/11-grid-two-col.html`](../playground/11-grid-two-col.html). Resize until two columns appear; then change `grid-cols-2` to `grid-cols-3` and see the third cell wrap behavior.
