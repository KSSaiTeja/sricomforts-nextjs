#!/usr/bin/env node
/**
 * Extract hero scroll webp frames from a Kling master MP4.
 *
 * Usage:
 *   node scripts/extract-hero-frames.mjs <input.mp4> [desktop|mobile]
 *
 * Env:
 *   HERO_FPS=60          Target fps (default 60 — use 30 if Kling exported 30fps)
 *   HERO_DURATION=6.833  Trim length in seconds (default 6.833333)
 *
 * Output:
 *   public/static/frames/home/{desktop|mobile}/webp/hero_anim_{variant}_{fps}_{n}.webp
 */

import { execSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const input = process.argv[2];
const variant = process.argv[3] === "mobile" ? "mobile" : "desktop";

if (!input) {
  console.error(
    "Usage: node scripts/extract-hero-frames.mjs <input.mp4> [desktop|mobile]",
  );
  process.exit(1);
}

if (!existsSync(input)) {
  console.error(`Input not found: ${input}`);
  process.exit(1);
}

const fps = Number(process.env.HERO_FPS ?? "60");
const duration = Number(process.env.HERO_DURATION ?? "6.833333");
const frameCount = Math.round(duration * fps);
const prefix = `hero_anim_${variant}_${fps}`;
const outDir = join(root, "public/static/frames/home", variant, "webp");

mkdirSync(outDir, { recursive: true });

const trimmed = join(outDir, `_trimmed_${variant}.mp4`);
const pngPattern = join(outDir, `${prefix}_%d.png`);

console.log(`Variant:   ${variant}`);
console.log(`FPS:       ${fps}`);
console.log(`Duration:  ${duration}s`);
console.log(`Frames:    ~${frameCount}`);
console.log(`Output:    ${outDir}`);

execSync(
  `ffmpeg -y -i "${input}" -t ${duration} -an "${trimmed}"`,
  { stdio: "inherit" },
);

execSync(
  `ffmpeg -y -i "${trimmed}" -vf "fps=${fps}" -frames:v ${frameCount} -start_number 0 "${pngPattern}"`,
  { stdio: "inherit" },
);

for (let i = 0; i < frameCount; i++) {
  const png = join(outDir, `${prefix}_${i}.png`);
  const webp = join(outDir, `${prefix}_${i}.webp`);
  execSync(`cwebp -q 80 "${png}" -o "${webp}"`, { stdio: "ignore" });
  execSync(`rm -f "${png}"`);
}

console.log("\nDone. Update src/data/homepage.ts:");
console.log(`  HERO_FPS = ${fps}`);
console.log(
  `  HERO_${variant.toUpperCase()}_FRAMES = ${frameCount}  (verify with ls | wc -l)`,
);
console.log("  Bump NEXT_PUBLIC_HERO_FRAMES_VERSION");
