#!/usr/bin/env python3
"""Regenerate assets/js/img-lqip.js from raster paths (existing map keys + heavy case assets)."""
import base64
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CASE_FILES = ["subway.html", "billfold.html", "gazelkin.html", "dreamkas.html"]
MIN_BYTES = 800_000


def collect_keys_from_case_html() -> set[str]:
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


def collect_keys_from_img_lqip_js() -> set[str]:
    js = (ROOT / "assets/js/img-lqip.js").read_text(encoding="utf-8")
    return set(re.findall(r'"(assets/images/[^"]+)":\s*"data:', js))


def build_map(keys: set[str]) -> dict[str, str]:
    tmp = ROOT / "_lqip_regen_out.jpg"
    out: dict[str, str] = {}
    for rel in sorted(keys):
        path = ROOT / rel
        if not path.is_file():
            print("skip missing", rel, file=sys.stderr)
            continue
        p = subprocess.run(
            [
                "sips",
                "-s",
                "format",
                "jpeg",
                "-s",
                "formatOptions",
                "28",
                "-Z",
                "40",
                str(path),
                "--out",
                str(tmp),
            ],
            capture_output=True,
            text=True,
        )
        if p.returncode != 0:
            print("sips fail", rel, p.stderr, file=sys.stderr)
            continue
        b64 = base64.b64encode(tmp.read_bytes()).decode("ascii")
        out[rel] = "data:image/jpeg;base64," + b64
    if tmp.exists():
        tmp.unlink()
    return out


def write_js(lq_map: dict[str, str]) -> None:
    body = (
        "(function () {\n"
        "  var LQIP_MAP = %s;\n\n"
        "  function markLoaded(img) {\n"
        "    img.classList.add(\"lqip-loaded\");\n"
        "  }\n\n"
        "  function bindImg(img) {\n"
        "    if (img.complete && img.naturalWidth > 0) markLoaded(img);\n"
        "    else {\n"
        "      img.addEventListener(\"load\", function () { markLoaded(img); }, { once: true });\n"
        "      img.addEventListener(\"error\", function () { markLoaded(img); }, { once: true });\n"
        "    }\n"
        "  }\n\n"
        "  document.querySelectorAll(\"[data-lqip-ref]\").forEach(function (host) {\n"
        "    var key = host.getAttribute(\"data-lqip-ref\");\n"
        "    var url = LQIP_MAP[key];\n"
        "    if (url) host.style.setProperty(\"--lqip\", \"url(\" + JSON.stringify(url) + \")\");\n"
        "    host.querySelectorAll(\"img.lqip-fadein\").forEach(bindImg);\n"
        "  });\n"
        "})();\n"
    ) % json.dumps(lq_map, ensure_ascii=False)
    (ROOT / "assets/js/img-lqip.js").write_text(body, encoding="utf-8")


def main() -> None:
    keys = collect_keys_from_case_html() | collect_keys_from_img_lqip_js()
    print("LQIP keys:", len(keys))
    lq_map = build_map(keys)
    print("encoded:", len(lq_map))
    write_js(lq_map)
    print("wrote assets/js/img-lqip.js", (ROOT / "assets/js/img-lqip.js").stat().st_size, "bytes")


if __name__ == "__main__":
    main()
