import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure KB markdown ships with the chat route on Vercel
  outputFileTracingIncludes: {
    "/api/chat": ["./docs/chatbase-kb/**/*"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/static/frames/:path*",
        headers: [
          {
            key: "Cache-Control",
            // Dev + post-replace: never pin frames forever. Version query still used.
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
