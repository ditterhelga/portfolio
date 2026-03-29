# 12 — JS: `DOMContentLoaded`, `querySelector`, `click`

**Goal:** You read a script as “wait for HTML, find elements, react to events” — the minimum loop for interactions.

**Concept:** Scripts at the bottom of `body` (or guarded by `DOMContentLoaded`) run after the tree exists so `querySelector` can find nodes. `document.querySelector("#burger")` returns the first match; `addEventListener("click", …)` runs your function when the user clicks. `classList.toggle` flips a class for open/closed UI states; CSS then styles `.menu-open` differently. This is the same separation you know: behavior in JS, look in CSS.

**In your project**

- [`index.html` lines 1192–1236](../../index.html): on `DOMContentLoaded`, burger `click` toggles `stop-scrolling` on `html`’s parent and `menu-open` on `header`, and drives a GSAP timeline.
- [`index.html` lines 1238–1249](../../index.html): each nav link closes the menu if it was open.

**Try it:** Open [`playground/12-js-click-toggle.html`](../playground/12-js-click-toggle.html). This uses the same DOM APIs without GSAP. Change the toggled class name and update the matching CSS rule.
