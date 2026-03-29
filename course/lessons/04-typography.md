# 04 — Typography: fonts and body defaults

**Goal:** You connect “Inter for body, Sofia for headings” to actual CSS: font loading in `<head>` and rules in `@layer base`.

**Concept:** Browsers only ship generic fonts; custom faces load from Google Fonts (or self-hosted files) via `<link>`. `preconnect` hints save a round-trip so text renders sooner. Setting `font-family`, `font-size`, `line-height`, and `color` on `body` gives every paragraph a default; heading tags can override the family so display type stays consistent with your brand.

**In your project**

- [`index.html` lines 9–13](../../index.html): Google Fonts links for Sofia Sans Condensed, Poppins, Inter.
- [`index.html` lines 58–72](../../index.html): `body` uses `var(--font-family-inter)` and readable size/line-height; headings use Sofia and bold weight.

**Try it:** Open [`playground/04-typography.html`](../playground/04-typography.html). Temporarily change the `body` `font-family` in `@layer base` to a different stack and reload to feel how much the page personality shifts.
