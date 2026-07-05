# Supabase asset CDN

All site media lives in one **public** Supabase Storage bucket (default: `assets`).

## Bucket layout

```
assets/
  frames/home/desktop/webp/   ← hero scroll frames (410)
  frames/home/mobile/webp/    ← hero scroll frames (409)
  videos/                     ← homepage feature videos (future)
  team/                       ← about team portraits (future)
  images/                     ← logos, photos, icons (future)
```

Paths mirror `public/static/` so uploads stay predictable.

## Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Copy **Project URL**, **anon key**, and **service role key** into `.env.local`
3. Upload hero frames:
   ```bash
   npm run supabase:upload-hero-frames
   ```
4. Set `NEXT_PUBLIC_SUPABASE_ASSETS=true` in `.env.local`
5. Restart dev server

## Upload other folders

```bash
npm run supabase:upload-assets -- videos
npm run supabase:upload-assets -- team
```

## Code

Use `assetUrl()` from `src/lib/supabase/assets.ts` for any asset:

```ts
import { assetUrl } from "@/lib/supabase/assets";

assetUrl("videos/hero.mp4", "/static/videos/hero.mp4");
```

When `NEXT_PUBLIC_SUPABASE_ASSETS=false`, local `/public` paths are used.

## Payload CMS (later)

- **Database:** Supabase Postgres (`@payloadcms/db-postgres`)
- **Media:** same bucket via `@payloadcms/storage-s3` + Supabase S3 endpoint
