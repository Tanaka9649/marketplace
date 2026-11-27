import Image from "next/image";

export type MarketplaceId = "mercado-livre" | "shopee" | "amazon" | "magalu" | "tiktok-shop";

export const marketplaces: {
  id: MarketplaceId;
  name: string;
  file: string;
  color: string;
  w: number;
  h: number;
}[] = [
  { id: "mercado-livre", name: "Mercado Livre", file: "/marketplaces/mercado-livre.svg", color: "#FFE600", w: 150, h: 104 },
  { id: "shopee", name: "Shopee", file: "/marketplaces/shopee.svg", color: "#EE4D2D", w: 24, h: 24 },
  { id: "amazon", name: "Amazon", file: "/marketplaces/amazon.png", color: "#FF9900", w: 480, h: 155 },
  { id: "magalu", name: "Magalu", file: "/marketplaces/magalu.png", color: "#0086FF", w: 480, h: 138 },
  { id: "tiktok-shop", name: "TikTok Shop", file: "/marketplaces/tiktok.svg", color: "#FE2C55", w: 352, h: 399 },
];

export function MarketplaceLogo({ id, className = "size-full" }: { id: MarketplaceId; className?: string }) {
  const m = marketplaces.find((x) => x.id === id)!;
  return <Image src={m.file} alt={`Logo ${m.name}`} width={m.w} height={m.h} className={`max-h-full max-w-full object-contain ${className}`}
      style={{ width: "100%", height: "100%" }}
      unoptimized
    />;
}

/** Logo oficial do Bling (hub operacional). */
export function BlingLogo({ className = "h-6 w-auto", badge = false }: { className?: string; badge?: boolean }) {
  // eslint-disable-next-line @next/next/no-img-element
  const img = <img src="/marketplaces/bling.png" alt="Bling" width={480} height={237} className={`object-contain ${className}`} />;
  // o verde do Bling ganha contraste sobre um selo escuro
  return badge ? <span className="inline-flex items-center rounded-md bg-[#0c2555] px-1.5 py-[3px] align-middle">{img}</span> : img;
}
