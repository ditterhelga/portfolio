# 08 — Responsive utilities: `sm:`, `md:`, `xl:`

**Goal:** You read one class list as “base style + overrides at breakpoints,” same idea as Figma variant properties at frame width.

**Concept:** Tailwind prefixes mean “apply this utility only from this min-width upward.” Mobile-first: unprefixed classes apply everywhere; `md:flex` might turn on a horizontal nav only from tablet up. `hidden` + `md:flex` is the classic “hide on small, show on medium” pattern for desktop nav vs burger. One long `class` string is normal; read it left-to-right as layers of behavior.

**In your project**

- [`index.html` line 753](../../index.html): `px-4 sm:px-8` and stepped `gap-y-*` — padding and section rhythm grow with viewport.
- [`index.html` line 763](../../index.html): `nav` uses `hidden … md:flex md:flex-row md:gap-x-16` — desktop nav visible from `md` up.

**Try it:** Open [`playground/08-responsive-md.html`](../playground/08-responsive-md.html). Resize across the `md` breakpoint (~768px) and watch the label switch between `block` and `hidden`.
