/**
 * Central asset URL helper for Supabase Storage (CDN) with local /public fallback.
 *
 * Bucket layout (public bucket: `assets`):
 *   frames/home/desktop/webp/…   — hero scroll frames
 *   frames/home/mobile/webp/…
 *   videos/…                     — homepage & feature videos
 *   team/…                       — about team portraits
 *   images/…                     — general site images
 *
 * Set NEXT_PUBLIC_SUPABASE_ASSETS=true after uploading files.
 */

const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_ASSETS_BUCKET ?? "assets";

export const supabaseAssetsEnabled =
  process.env.NEXT_PUBLIC_SUPABASE_ASSETS === "true" &&
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

export function getSupabasePublicUrl(storagePath: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  if (!base) return storagePath;

  const path = storagePath.replace(/^\//, "");
  return `${base}/storage/v1/object/public/${BUCKET}/${path}`;
}

/** Resolve a site asset path — Supabase CDN when enabled, otherwise local /public path. */
export function assetUrl(storagePath: string, localFallback?: string) {
  const normalized = storagePath.replace(/^\//, "");

  if (supabaseAssetsEnabled) {
    return getSupabasePublicUrl(normalized);
  }

  const local = localFallback ?? `/static/${normalized.replace(/^static\//, "")}`;
  return local.startsWith("/") ? local : `/${local}`;
}

export function heroFrameStoragePath(
  isDesktop: boolean,
  index: number,
  fps = 60,
) {
  const variant = isDesktop ? "desktop" : "mobile";
  const prefix = `hero_anim_${variant}_${fps}`;
  return `frames/home/${variant}/webp/${prefix}_${index}.webp`;
}
