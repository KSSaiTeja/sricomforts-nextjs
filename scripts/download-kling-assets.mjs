#!/usr/bin/env node
/**
 * Download Kling-generated assets from a JSON manifest.
 *
 * Usage:
 *   npm run assets:download
 *   npm run assets:download -- --id hero-desktop
 *
 * Manifest: docs/kling-asset-manifest.json
 *   { "assets": [{ "id", "url", "dest" }] }
 *
 * dest paths are relative to repo root (e.g. public/images/home/hero.webp).
 * When dest is .webp and the source is not webp, converts via sharp if
 * installed; otherwise saves the raw file and prints an ffmpeg command.
 */

import { execSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = join(root, "docs/kling-asset-manifest.json");

const idFilter = process.argv.find((arg) => arg.startsWith("--id="))?.slice(5);

async function loadSharp() {
  try {
    const mod = await import("sharp");
    return mod.default ?? mod;
  } catch {
    return null;
  }
}

function extFromUrl(url) {
  try {
    return extname(new URL(url).pathname).toLowerCase();
  } catch {
    return "";
  }
}

function needsWebpConversion(destPath, sourceExt) {
  if (extname(destPath).toLowerCase() !== ".webp") return false;
  return sourceExt !== ".webp";
}

function cwebpCommand(inputPath, outputPath) {
  return `cwebp -q 82 "${inputPath}" -o "${outputPath}"`;
}

function convertToWebp(inputPath, outputPath) {
  try {
    execSync(cwebpCommand(inputPath, outputPath), { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

async function downloadBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`fetch failed: HTTP ${res.status} ${res.statusText}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

function downloadWithCurl(url, outPath) {
  execSync(`curl -fsSL -o "${outPath}" "${url}"`, { stdio: "inherit" });
  return readFileSync(outPath);
}

async function download(url, fallbackPath) {
  try {
    return await downloadBuffer(url);
  } catch (err) {
    console.warn(`  fetch failed (${err.message}), trying curl…`);
    mkdirSync(dirname(fallbackPath), { recursive: true });
    return downloadWithCurl(url, fallbackPath);
  }
}

async function main() {
  if (!existsSync(manifestPath)) {
    console.error(`Manifest not found: ${manifestPath}`);
    process.exit(1);
  }

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const assets = manifest.assets ?? [];

  if (!Array.isArray(assets) || assets.length === 0) {
    console.log("No assets in manifest.");
    return;
  }

  const sharp = await loadSharp();
  if (!sharp) {
    console.log(
      "Note: sharp not installed — webp targets will need manual ffmpeg steps.\n",
    );
  }

  const filtered = idFilter ? assets.filter((a) => a.id === idFilter) : assets;

  if (idFilter && filtered.length === 0) {
    console.error(`No asset with id: ${idFilter}`);
    process.exit(1);
  }

  let failed = 0;
  const pendingFfmpeg = [];

  for (const asset of filtered) {
    const { id, url, dest } = asset;

    if (!id || !url || !dest) {
      console.error("Skipping invalid entry (needs id, url, dest):", asset);
      failed++;
      continue;
    }

    const destPath = resolve(root, dest);
    const destDir = dirname(destPath);
    mkdirSync(destDir, { recursive: true });

    const sourceExt = extFromUrl(url) || ".bin";
    const tempPath = join(destDir, `.kling-${id}${sourceExt}`);

    console.log(`[${id}]`);
    console.log(`  url:  ${url}`);
    console.log(`  dest: ${dest}`);

    try {
      const data = await download(url, tempPath);

      if (needsWebpConversion(destPath, sourceExt)) {
        if (sharp) {
          await sharp(data).webp({ quality: 80 }).toFile(destPath);
          console.log("  done (converted to webp via sharp)");
        } else {
          writeFileSync(tempPath, data);
          if (convertToWebp(tempPath, destPath)) {
            unlinkSync(tempPath);
            console.log("  done (converted to webp via cwebp)");
          } else {
            const cmd = `cwebp -q 82 "${tempPath}" -o "${destPath}"`;
            pendingFfmpeg.push({ id, cmd });
            console.log(`  raw saved: ${tempPath}`);
            console.log(`  run: ${cmd}`);
          }
        }
      } else {
        writeFileSync(destPath, data);
        console.log("  done");
      }

      if (existsSync(tempPath) && tempPath !== destPath && sharp) {
        unlinkSync(tempPath);
      }
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
      failed++;
    }

    console.log("");
  }

  if (pendingFfmpeg.length > 0) {
    console.log("--- Manual ffmpeg steps (install sharp to automate) ---\n");
    for (const { id, cmd } of pendingFfmpeg) {
      console.log(`# ${id}`);
      console.log(cmd);
      console.log("");
    }
  }

  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
