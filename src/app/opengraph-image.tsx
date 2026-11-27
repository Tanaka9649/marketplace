import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const dynamic = "force-static";
export const alt = "DM Empresarial — Gestão de Marketplaces";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/dm-logo-white.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 85% 20%, #0b4f6b 0%, #0a1a36 45%, #050d1d 100%)",
          color: "white",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={210} height={129} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 26, color: "#34d2dd", letterSpacing: 4, textTransform: "uppercase" }}>
            Gestão de Marketplaces
          </div>
          <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.1, maxWidth: 980 }}>
            Seus produtos em mais marketplaces. Sua empresa com mais oportunidades de vender.
          </div>
          <div style={{ fontSize: 26, color: "#a9bbd6" }}>
            Mercado Livre · Shopee · Amazon · Magalu · TikTok Shop
          </div>
        </div>
      </div>
    ),
    size,
  );
}
