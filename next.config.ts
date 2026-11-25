import type { NextConfig } from "next";

// STATIC_EXPORT=1 gera uma versão estática (apenas para prévias).
// No deploy normal da Vercel, deixe essa variável vazia.
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(isStaticExport
    ? { output: "export", images: { unoptimized: true }, trailingSlash: true }
    : {
        images: { formats: ["image/avif", "image/webp"] },
        async headers() {
          return [
            {
              source: "/(.*)",
              headers: [
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                { key: "X-Frame-Options", value: "SAMEORIGIN" },
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
