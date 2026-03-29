# 01 — Page skeleton

**Goal:** You can name the three main parts of every web page and know why the first lines in `<head>` matter on phones.

**Concept:** `<!DOCTYPE html>` tells the browser to use modern HTML rules. `<html lang="en">` wraps everything and sets the document language (accessibility and fonts). `<head>` holds invisible setup: encoding, viewport, title, and links to fonts or scripts. `<body>` is everything the user sees. The viewport meta tag maps CSS pixels to the device screen so layouts don’t look like a tiny desktop page on mobile.

**In your project**

- [`index.html` lines 1–7](../../index.html): doctype, `html`, `head`, charset, viewport, title — same pattern every site uses.
- [`index.html` lines 749–752](../../index.html): `</head>` then `<body …>` — visible page starts here.

**Try it:** Open [`playground/01-minimal-page.html`](../playground/01-minimal-page.html). Change the `<title>` text, save, refresh the tab, and watch the browser tab label update.
