# 07 — Flexbox II: row and `justify-between`

**Goal:** You read the header row as “logo left, nav right” using a single flex row and space distribution.

**Concept:** Default flex direction is row (`flex-row`). `justify-between` pushes the first child to the start edge and the last to the end edge, with free space between — perfect for toolbars. `w-full` on that row lets the two clusters use the full header width. This maps directly to common UI patterns you already design in auto-layout.

**In your project**

- [`index.html` lines 755–757](../../index.html): `header` → inner `div` with `flex justify-between w-full` wrapping logo and nav.

**Try it:** Open [`playground/07-flex-row-toolbar.html`](../playground/07-flex-row-toolbar.html). Toggle `justify-between` to `justify-center` and see how the two groups collapse to the middle.
