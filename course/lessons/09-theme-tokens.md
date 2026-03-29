# 09 — Design tokens: `@theme` and CSS variables

**Goal:** You connect names like `--color-text-primary` to one place to edit brand color instead of hunting hex codes.

**Concept:** `@theme` in Tailwind v4 registers tokens the compiler (browser build) knows about. You can reference them in arbitrary CSS as `var(--color-text-primary)` or map them to Tailwind color utilities depending on setup. Centralizing tokens matches a design system: change the token once, ripple to base styles and components. Raw hex in one-off rules is fine for exceptions; tokens are for repeats.

**In your project**

- [`index.html` lines 26–41](../../index.html): `@theme { … }` — fonts, text color, primaries, accent yellow, etc.

**Try it:** Open [`playground/09-theme-token.html`](../playground/09-theme-token.html). Change `--color-text-primary` in `@theme` and confirm both the utility-based text and a `var()` rule update together.
