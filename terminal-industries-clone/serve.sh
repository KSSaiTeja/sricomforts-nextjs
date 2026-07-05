#!/usr/bin/env bash
# Serve the Terminal Industries mirror locally so /_nuxt/ and /static/ paths resolve.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/assets/terminal-industries.com" && pwd)"
PORT="${1:-8765}"
echo "Serving mirror at http://127.0.0.1:${PORT}/"
echo "Root: ${ROOT}"
cd "$ROOT"
python3 -m http.server "$PORT"
