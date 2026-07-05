#!/usr/bin/env python3
"""Serve the Terminal Industries offline mirror with local asset routing."""
from __future__ import annotations

import argparse
import mimetypes
import re
from functools import partial
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SITE_ROOT = ROOT / "assets" / "terminal-industries.com"
STORYBLOK_ROOT = ROOT / "assets" / "a.storyblok.com"
PORT_DEFAULT = 8765


def patch_html_for_offline(html: str, base: str) -> str:
    html = html.replace("https://terminal-industries.com", "")
    html = html.replace("http://terminal-industries.com", "")
    html = html.replace("https://a.storyblok.com", f"{base}/storyblok")
    html = html.replace("http://a.storyblok.com", f"{base}/storyblok")
    html = re.sub(
        r"https?://a\.storyblok\.com(/[^\"'\\s>]+)",
        rf"{base}/storyblok\1",
        html,
    )
    return html


def is_html_file(path: Path) -> bool:
    if path.suffix.lower() in {".html", ".htm"}:
        return True
    if path.suffix:
        return False
    try:
        head = path.read_bytes()[:200].lstrip()
        return head.startswith(b"<!DOCTYPE") or head.startswith(b"<html")
    except OSError:
        return False


class MirrorHandler(BaseHTTPRequestHandler):
    site_root: Path = SITE_ROOT
    storyblok_root: Path = STORYBLOK_ROOT
    base_url: str = ""

    def resolve_path(self) -> Path | None:
        clean = self.path.split("?", 1)[0].split("#", 1)[0]
        if clean.startswith("/storyblok/"):
            rel = clean[len("/storyblok") :]
            target = (self.storyblok_root / rel.lstrip("/")).resolve()
            root = self.storyblok_root.resolve()
            if str(target).startswith(str(root)) and target.is_file():
                return target
            return None

        rel = clean.lstrip("/")
        if not rel:
            rel = "index.html"
        target = (self.site_root / rel).resolve()
        root = self.site_root.resolve()
        if str(target).startswith(str(root)) and target.is_file():
            return target
        return None

    def _send_html(self, target: Path) -> bytes:
        text = target.read_text(encoding="utf-8", errors="replace")
        if "terminal-industries.com" in text or "storyblok.com" in text:
            text = patch_html_for_offline(text, self.base_url)
        return text.encode("utf-8")

    def do_HEAD(self) -> None:
        target = self.resolve_path()
        if target is None:
            self.send_error(404, "File not found")
            return
        if is_html_file(target):
            body = self._send_html(target)
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            return
        size = target.stat().st_size
        ctype = mimetypes.guess_type(str(target))[0] or "application/octet-stream"
        self.send_response(200)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(size))
        self.send_header("Accept-Ranges", "bytes")
        self.end_headers()

    def do_GET(self) -> None:
        target = self.resolve_path()
        if target is None:
            self.send_error(404, "File not found")
            return

        if is_html_file(target):
            body = self._send_html(target)
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return

        self._send_file(target)

    def _send_file(self, path: Path) -> None:
        size = path.stat().st_size
        ctype = mimetypes.guess_type(str(path))[0] or "application/octet-stream"
        range_header = self.headers.get("Range")

        if range_header:
            m = re.match(r"bytes=(\d+)-(\d*)", range_header)
            if m:
                start = int(m.group(1))
                end = int(m.group(2)) if m.group(2) else size - 1
                end = min(end, size - 1)
                if start <= end:
                    with path.open("rb") as f:
                        f.seek(start)
                        chunk = f.read(end - start + 1)
                    self.send_response(206)
                    self.send_header("Content-Type", ctype)
                    self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
                    self.send_header("Content-Length", str(len(chunk)))
                    self.send_header("Accept-Ranges", "bytes")
                    self.end_headers()
                    self.wfile.write(chunk)
                    return

        with path.open("rb") as f:
            data = f.read()
        self.send_response(200)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Accept-Ranges", "bytes")
        self.end_headers()
        self.wfile.write(data)

    def log_message(self, fmt: str, *args) -> None:
        print(f"[mirror] {self.address_string()} - {fmt % args}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Serve Terminal Industries mirror")
    parser.add_argument("--port", type=int, default=PORT_DEFAULT)
    args = parser.parse_args()
    base = f"http://127.0.0.1:{args.port}"

    handler = partial(MirrorHandler)
    handler.site_root = SITE_ROOT
    handler.storyblok_root = STORYBLOK_ROOT
    handler.base_url = base

    server = ThreadingHTTPServer(("127.0.0.1", args.port), handler)
    print(f"Mirror: {base}/")
    print(f"Site root: {SITE_ROOT}")
    print(f"Storyblok proxy: {base}/storyblok/")
    server.serve_forever()


if __name__ == "__main__":
    main()
