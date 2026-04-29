# 13 — Motion: GSAP and `prefers-reduced-motion`

**Goal:** You conceptualize GSAP as “time-based tweens on properties the browser can animate” (opacity, transform), layered with scroll position via ScrollTrigger.

**Concept:** CSS transitions handle simple hovers; timelines chain many steps (burger icon morph, staggered links). ScrollTrigger maps animation progress to scroll so cards pin and fade as you move. Respecting `prefers-reduced-motion: reduce` avoids forcing motion on users who asked the OS for less animation — your file wraps heavy scroll effects in a media check. You don’t need to master GSAP on day one; recognize *what* it’s driving so you can brief engineers or tweak timing labels.

**In your project**

- [`index.html` lines 1196–1218](../../index.html): `gsap.timeline` targets `.menulink` and burger SVG paths — paused timeline, played/reversed on menu toggle.
- [`index.html` lines 1280–1327](../../index.html): `ScrollTrigger.matchMedia` runs card stack behavior only at `(min-width: 1280px)` and when reduced motion is off.
- [`index.html` lines 1333–1375](../../index.html): hero blobs follow the pointer with `gsap.to` on `mousemove`.

**Try it:** No playground — use the live site. In your OS accessibility settings, turn on “Reduce motion,” reload, and compare scroll/card behavior. Then open DevTools → Elements and watch `class` on `header` when you tap the burger.
