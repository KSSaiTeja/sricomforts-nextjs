#!/usr/bin/env python3
"""Download missing mirror assets and patch HTML for offline use."""
from __future__ import annotations

import concurrent.futures
import re
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SITE = ROOT / "assets" / "terminal-industries.com"
NUXT = SITE / "_nuxt"
BASE = "https://terminal-industries.com"
UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)


def fetch(url: str, dest: Path, retries: int = 4) -> bool:
    if dest.exists() and dest.stat().st_size > 0:
        return True
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Referer": BASE + "/"})
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                data = resp.read()
            if not data:
                raise RuntimeError("empty body")
            dest.write_bytes(data)
            return True
        except Exception as exc:  # noqa: BLE001
            if attempt == retries - 1:
                print(f"FAIL {url}: {exc}")
            time.sleep(0.5 * (attempt + 1))
    return False


def missing_nuxt_refs() -> list[str]:
    pky = (NUXT / "pkyDfx59.js").read_text(encoding="utf-8")
    refs = sorted(set(re.findall(r'"\./([^"]+)"', pky)))
    have = {p.name for p in NUXT.iterdir()}
    out = []
    for ref in refs:
        if "/" in ref or ref.startswith("#"):
            continue
        if Path(ref).name not in have:
            out.append(ref)
    return out


def patch_html_file(path: Path) -> bool:
    try:
        text = path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        return False
    if "<html" not in text[:500].lower() and "<!doctype" not in text[:500].lower():
        return False
    patched = text.replace("https://terminal-industries.com", "")
    patched = patched.replace("http://terminal-industries.com", "")
    patched = patched.replace("https://a.storyblok.com", "/storyblok")
    patched = patched.replace("http://a.storyblok.com", "/storyblok")
    patched = re.sub(
        r"https?://a\.storyblok\.com(/[^\"'\\s>]+)",
        r"/storyblok\1",
        patched,
    )
    if patched != text:
        path.write_text(patched, encoding="utf-8")
        return True
    return False


def main() -> None:
    # 1) Missing Nuxt chunks (CSS/JS/worker)
    missing = missing_nuxt_refs()
    print(f"Downloading {len(missing)} missing _nuxt assets...")
    ok = 0
    for name in missing:
        if fetch(f"{BASE}/_nuxt/{name}", NUXT / name):
            ok += 1
    print(f"  _nuxt: {ok}/{len(missing)} ok")

    worker = "video-sequence.worker-B5BJOqje.js"
    if fetch(f"{BASE}/_nuxt/{worker}", NUXT / worker):
        print(f"  worker: ok")

    # Copy index css from rendered-homepage if still missing
    src = ROOT / "rendered-homepage/assets/terminal-industries.com/_nuxt/index.CWHlnDAF.css"
    dst = NUXT / "index.CWHlnDAF.css"
    if not dst.exists() and src.exists():
        dst.write_bytes(src.read_bytes())
        print("  copied index.CWHlnDAF.css from rendered-homepage")

    # 2) Hero WebP frame sequences (canvas animation)
    sequences = [
        ("static/frames/home/desktop/webp/hero_anim_desktop_60_{i}.webp", 410),
        ("static/frames/home/mobile/webp/hero_anim_mobile_60_{i}.webp", 409),
    ]

    def frame_job(item: tuple[str, str]) -> bool:
        rel, url = item
        return fetch(url, SITE / rel)

    jobs: list[tuple[str, str]] = []
    for pattern, count in sequences:
        for i in range(count):
            rel = pattern.format(i=i)
            jobs.append((rel, f"{BASE}/{rel}"))

    print(f"Downloading {len(jobs)} hero animation frames...")
    done = 0
    failed = 0
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        for success in pool.map(lambda j: frame_job(j), jobs):
            done += 1
            if not success:
                failed += 1
            if done % 50 == 0 or done == len(jobs):
                print(f"  frames: {done}/{len(jobs)} (failed {failed})")

    # 3) Patch all HTML (extensionless route files + index.html)
    patched = 0
    for path in SITE.rglob("*"):
        if not path.is_file():
            continue
        if path.suffix.lower() in {".html", ".htm"} or not path.suffix:
            if patch_html_file(path):
                patched += 1
    pages = ROOT / "pages"
    if pages.is_dir():
        for path in pages.glob("*.html"):
            if patch_html_file(path):
                patched += 1
    print(f"Patched {patched} HTML files")
    print("Done.")


if __name__ == "__main__":
    main()
