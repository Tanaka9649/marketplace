export const site = {
  name: "DM Empresarial",
  service: "Gestão de Marketplaces",
  title: "Gestão de Marketplaces | DM Empresarial",
  description:
    "A DM Empresarial estrutura, integra e gerencia a operação da sua empresa no Mercado Livre, Shopee, Amazon, Magalu, TikTok Shop e iFood — da implantação à inteligência de dados.",
  // Ordem: domínio configurado → domínio de produção da Vercel → localhost (dev)
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
    "http://localhost:3000"
  ).replace(/\/$/, ""),
  whatsapp: {
    number: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, ""),
    defaultMessage:
      process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ||
      "Olá! Quero saber mais sobre a gestão de marketplaces da DM Empresarial.",
  },
  analytics: {
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
    gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  },
} as const;

/** true quando nenhum domínio de produção foi configurado (ambiente local ou prévia). */
export const hasProductionUrl = !site.url.includes("localhost");

export const nav = [
  { id: "canais", label: "Canais" },
  { id: "servicos", label: "Serviços" },
  { id: "tecnologia", label: "Integração" },
  { id: "margem", label: "Rentabilidade" },
  { id: "como-funciona", label: "Como funciona" },
] as const;

export const footerExtra = [
  { id: "modelos", label: "Contratação" },
  { id: "faq", label: "Dúvidas" },
  { id: "diagnostico", label: "Diagnóstico" },
] as const;

export const segments = [
  "Lojas físicas",
  "Distribuidores",
  "Materiais de construção",
  "Bicicletas elétricas e acessórios",
  "Produtos técnicos",
  "Comércio com estoque estruturado",
  "Outros segmentos",
];
