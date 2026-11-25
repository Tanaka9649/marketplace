import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Hero } from "@/components/sections/Hero";
import { Marketplaces } from "@/components/sections/Marketplaces";
import { Services } from "@/components/sections/Services";
import { Technology } from "@/components/sections/Technology";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Responsibilities } from "@/components/sections/Responsibilities";
import { Differentials } from "@/components/sections/Differentials";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { faq } from "@/components/sections/faq-data";
import { hasProductionUrl, site } from "@/config/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Gestão de Marketplaces",
      serviceType: "Gestão de operações em marketplaces",
      provider: {
        "@type": "Organization",
        name: site.name,
        ...(hasProductionUrl ? { url: site.url, logo: `${site.url}/brand/dm-logo.png` } : {}),
      },
      areaServed: "BR",
      description: site.description,
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="conteudo">
        <Hero />
        <Marketplaces />
        <Services />
        <Technology />
        <Differentials />
        <HowItWorks />
        <Responsibilities />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
