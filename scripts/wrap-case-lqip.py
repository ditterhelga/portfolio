#!/usr/bin/env python3
"""Wrap heavy raster <img> tags on case pages with .lqip-parallax-host."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CASE_FILES = ["subway.html", "billfold.html", "gazelkin.html", "dreamkas.html"]
MIN_BYTES = 800_000


def heavy_srcs() -> set[str]:
    keys: set[str] = set()
    for name in CASE_FILES:
        t = (ROOT / name).read_text(encoding="utf-8", errors="replace")
        for m in re.finditer(r'src="(assets/images/[^"]+)"', t):
            p = m.group(1)
            if p.lower().endswith(".svg"):
                continue
            fp = ROOT / p
            if fp.is_file() and fp.stat().st_size >= MIN_BYTES:
                keys.add(p)
    return keys


def add_lqip_class(tag: str) -> str:
    if "lqip-fadein" in tag:
        return tag
    if 'class="' in tag:
        return re.sub(
            r'class="([^"]*)"',
            lambda m: f'class="{m.group(1)} lqip-fadein"',
            tag,
            count=1,
        )
    return tag.replace("<img", '<img class="lqip-fadein"', 1)


def wrap_html(html: str, heavy: set[str]) -> str:
    out: list[str] = []
    pos = 0
    while True:
        i = html.find("<img", pos)
        if i == -1:
            out.append(html[pos:])
            break
        j = html.find(">", i)
        if j == -1:
            out.append(html[pos:])
            break
        tag = html[i : j + 1]
        out.append(html[pos:i])
        m = re.search(r'src="(assets/images/[^"]+)"', tag)
        if m and m.group(1) in heavy:
            if "lqip-fadein" in tag:
                out.append(tag)
            else:
                src = m.group(1)
                tag_wrapped = add_lqip_class(tag)
                host_cls = "lqip-parallax-host min-w-0"
                if "absolute inset-0" in tag:
                    host_cls = "lqip-parallax-host absolute inset-0 z-0 min-w-0"
                out.append(
                    f'<div class="{host_cls}" data-lqip-ref="{src}">{tag_wrapped}</div>'
                )
        else:
            out.append(tag)
        pos = j + 1
    return "".join(out)


def main() -> None:
    heavy = heavy_srcs()
    print("heavy count", len(heavy))
    for name in CASE_FILES:
        path = ROOT / name
        old = path.read_text(encoding="utf-8")
        new = wrap_html(old, heavy)
        if new != old:
            path.write_text(new, encoding="utf-8")
            print("updated", name)
        else:
            print("unchanged", name)


if __name__ == "__main__":
    main()
