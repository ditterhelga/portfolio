# 06 — Flexbox I: column stack and `gap`

**Goal:** You read `flex flex-col` as “children stack vertically” and `gap-y-*` as vertical spacing without margin hacks.

**Concept:** Flexbox lines items along one main axis. `flex-col` makes the main axis vertical, so blocks flow top-to-bottom. `gap` (or `gap-y`) adds space *between* children uniformly; that’s why it’s cleaner than adding `margin-bottom` on every item except the last. Your page shell is a column: header, hero, sections, each as flex children of a parent.

**In your project**

- [`index.html` lines 751–753](../../index.html): `body` and the first wrapper use `flex flex-col` with large vertical gaps between major sections.
- [`index.html` line 820](../../index.html): inside About, another `flex flex-col gap-y-6 md:gap-y-8` tightens local rhythm.

**Try it:** Open [`playground/06-flex-column-gap.html`](../playground/06-flex-column-gap.html). Change `gap-y-4` to `gap-y-12` and watch only the space *between* cards change, not the cards’ internal padding.
