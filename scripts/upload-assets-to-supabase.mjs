#!/usr/bin/env node
/**
 * Upload files from public/static/ to Supabase Storage.
 *
 * Requires in .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   NEXT_PUBLIC_SUPABASE_ASSETS_BUCKET  (default: assets)
 *
 * Usage:
 *   npm run supabase:upload-hero-frames
 *   npm run supabase:upload-assets -- frames/home
 *   npm run supabase:upload-assets -- videos
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const STATIC_ROOT = join(ROOT, "public/static");

function loadEnv() {
  try {
    const raw = readFileSync(join(ROOT, ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // optional
  }
}

loadEnv();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_ASSETS_BUCKET ?? "assets";

function walkFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(fullPath));
    } else if (entry.isFile() && !entry.name.startsWith(".")) {
      files.push(fullPath);
    }
  }

  return files;
}

function contentType(filePath) {
  if (filePath.endsWith(".webp")) return "image/webp";
  if (filePath.endsWith(".png")) return "image/png";
  if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) return "image/jpeg";
  if (filePath.endsWith(".svg")) return "image/svg+xml";
  if (filePath.endsWith(".mp4")) return "video/mp4";
  if (filePath.endsWith(".webm")) return "video/webm";
  if (filePath.endsWith(".pdf")) return "application/pdf";
  return "application/octet-stream";
}

async function ensureBucket(supabase) {
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some((bucket) => bucket.name === BUCKET);

  if (!exists) {
    const { error } = await supabase.storage.createBucket(BUCKET, { public: true });
    if (error) throw new Error(`Failed to create bucket "${BUCKET}": ${error.message}`);
    console.log(`Created public bucket: ${BUCKET}`);
  }
}

async function uploadDirectory(supabase, localSubdir) {
  const sourceDir = join(STATIC_ROOT, localSubdir);
  if (!statSync(sourceDir).isDirectory()) {
    throw new Error(`Directory not found: ${sourceDir}`);
  }

  const files = walkFiles(sourceDir);
  console.log(`Uploading ${files.length} files from static/${localSubdir}…`);

  let uploaded = 0;

  for (const filePath of files) {
    const storagePath = relative(STATIC_ROOT, filePath).replace(/\\/g, "/");
    const body = readFileSync(filePath);

    const { error } = await supabase.storage.from(BUCKET).upload(storagePath, body, {
      contentType: contentType(filePath),
      upsert: true,
    });

    if (error) {
      throw new Error(`Upload failed for ${storagePath}: ${error.message}`);
    }

    uploaded += 1;
    if (uploaded % 25 === 0 || uploaded === files.length) {
      console.log(`  ${uploaded}/${files.length}`);
    }
  }

  return uploaded;
}

async function main() {
  if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local",
    );
    process.exit(1);
  }

  const target = process.argv[2] ?? "frames/home";
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  await ensureBucket(supabase);
  const count = await uploadDirectory(supabase, target);

  console.log(`\nDone. ${count} files uploaded to bucket "${BUCKET}".`);
  console.log("Set in .env.local: NEXT_PUBLIC_SUPABASE_ASSETS=true");
  console.log(
    `Public URL pattern: ${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/<path>`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
