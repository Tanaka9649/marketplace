import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";
import { hasProductionUrl, site } from "@/config/site";
import { Providers } from "@/components/Providers";
import { Analytics } from "@/components/Analytics";
import { revealScript } from "@/lib/reveal-script";

export const metadata: Metadata = {
  // Sem domínio de produção conhecido, não publicamos canonical nem URLs absolutas apontando para localhost.
  ...(hasProductionUrl ? { metadataBase: new URL(site.url), alternates: { canonical: "/" } } : {}),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "gestão de marketplaces",
    "Mercado Livre",
    "Shopee",
    "Amazon",
    "Magalu",
    "TikTok Shop",
    "iFood",
    "integração Bling",
    "vender online",
    "DM Empresarial",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    ...(hasProductionUrl ? { url: "/" } : {}),
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f7faff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* revelação ao rolar: JavaScript puro, independente da hidratação do React */}
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      </head>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-navy-900"
        >
          Pular para o conteúdo
        </a>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
