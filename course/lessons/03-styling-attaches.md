# 03 — How styling attaches: `class` + `<style type="text/tailwindcss">`

**Goal:** You see two ways rules hit elements: Tailwind **utility classes** on the tag, and **CSS rules** (including nested selectors) inside the big `<style>` block.

**Concept:** A `class` attribute lists tokens; the browser matches them to CSS. Tailwind’s build (here, the browser script) turns utilities like `flex` into real CSS. Your file also uses a Tailwind-aware `<style type="text/tailwindcss">` block for `@theme`, `@layer`, `@apply`, and plain CSS with nesting (`& .logo img`). That mix is normal: utilities for quick layout, scoped rules for one-off or complex pieces (hover lines, hero mask).

**In your project**

- [`index.html` lines 15–16](../../index.html): Tailwind loaded from CDN.
- [`index.html` lines 25–47](../../index.html): `@theme` and `@utility` — custom design-time definitions.
- [`index.html` lines 75–81](../../index.html): `.section-header` — a named class built from utilities via `@apply`.

**Try it:** Open [`playground/03-class-and-style.html`](../playground/03-class-and-style.html). Add a utility to the `<p>` (e.g. `text-lg`) and add a small nested rule under `.box` in the style block; refresh and compare which approach is faster for a one-off tweak.
