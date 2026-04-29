# 10 — `@apply` and reusable classes

**Goal:** You see `.section-header` as “a bundle of typography utilities with responsive sizes” you can put on any heading.

**Concept:** `@apply` copies utility output into a named class. Use it when the same combo repeats or when you want a semantic name in HTML (`class="section-header"`) instead of ten utilities. Too many `@apply` layers can fight specificity; for one-off layouts, utilities on the element stay clearer. Your portfolio uses both patterns deliberately.

**In your project**

- [`index.html` lines 75–81](../../index.html): `.section-header` applies Sofia, large type, responsive `md:` / `xl:` text sizes, semibold.

**Try it:** Open [`playground/10-apply-component.html`](../playground/10-apply-component.html). Add a second `<h2 class="lesson-heading">` without duplicating utilities — only the shared class.
