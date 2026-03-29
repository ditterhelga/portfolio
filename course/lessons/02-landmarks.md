# 02 — Landmarks: header, nav, section

**Goal:** You recognize “regions” of the page in HTML and understand why `id` on a section pairs with `href="#…"` in links.

**Concept:** Semantic tags (`header`, `nav`, `section`) describe structure, not just boxes. That helps screen readers and keeps your mental model aligned with the design (chrome vs content blocks). An `id` must be unique on the page; links use `#id` to scroll to that block. Your nav is a list of destinations; each anchor target is a section (or other element) with a matching `id`.

**In your project**

- [`index.html` lines 755–779](../../index.html): `header` with logo `div`, `nav` with `a href="#work"` etc., and the mobile `#burger` control.
- [`index.html` line 818](../../index.html): `<section id="about">` — one of the scroll targets for those links.

**Try it:** Open [`playground/02-header-section.html`](../playground/02-header-section.html). Add `id="demo"` on the `<section>` and an `<a href="#demo">` in the nav; click the link and confirm the page jumps to that section.
