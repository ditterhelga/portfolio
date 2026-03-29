# 05 — Box model: width, padding, max-width

**Goal:** You read `max-w-[1280px]` and `px-4 sm:px-8` as “content column + horizontal breathing room,” not magic numbers.

**Concept:** Every element is a box: content, optional padding, border, margin. `max-width` caps how wide the main column grows on huge screens so line length stays readable. Horizontal padding (`px-*`) keeps text off the screen edges on small viewports. Tailwind’s spacing scale turns `px-4` into a real pixel padding via CSS variables; arbitrary values like `max-w-[1280px]` match your grid in Figma.

**In your project**

- [`index.html` line 751](../../index.html): `body` — `w-full max-w-[1280px]` constrains the whole page column.
- [`index.html` line 753](../../index.html): outer wrapper — `px-4 sm:px-8` increases side padding from small screens upward.

**Try it:** Open [`playground/05-box-model.html`](../playground/05-box-model.html). Shrink the browser window: compare `max-w-*` with and without padding to see edge clipping vs comfortable margins.
