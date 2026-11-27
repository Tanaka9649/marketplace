import { ScanSearch } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MaskWords } from "@/components/ui/MaskWords";
import { HeroScene } from "./HeroScene";

export function Hero() {
  return (
    <section id="topo" className="relative isolate overflow-hidden bg-ice pb-16 pt-36 sm:pt-40 lg:pb-16 lg:pt-32">
      <div className="bg-grid-light absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_65%_at_70%_40%,#000_10%,transparent_75%)]" aria-hidden />
      <div className="absolute -right-40 top-0 -z-10 h-[640px] w-[760px] rounded-full bg-vibrant/[0.10] blur-[130px]" aria-hidden />

      <div className="mx-auto grid max-w-[1320px] items-center gap-4 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <div className="relative z-10 max-w-[40rem]">
          <p className="drop-in inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[10px] font-bold tracking-[0.1em] text-electric sm:text-[11px] sm:tracking-[0.16em] shadow-[0_6px_20px_-10px_rgba(37,99,255,0.5)] ring-1 ring-electric/15">
            <span className="size-1.5 rounded-full bg-cyan" aria-hidden />
            GESTÃO DE MARKETPLACES | DM EMPRESARIAL
          </p>

          <h1 className="display mt-6 text-[2.75rem] text-ink sm:text-[4.1rem] xl:text-[5rem]">
            <MaskWords text="Transforme seu estoque em" start={150} />{" "}
            <span className="text-electric">
              <MaskWords text="novos canais de venda." start={500} />
            </span>
          </h1>

          <p className="mt-6 animate-rise text-[17px] font-medium leading-relaxed text-slate-600 sm:text-[19px]" style={{ animationDelay: "850ms" }}>
            Criamos seus anúncios, conectamos seu estoque e gerenciamos sua presença no Mercado Livre, Shopee, Amazon, Magalu
            e TikTok Shop.
          </p>
          <p className="mt-3 animate-rise text-[17px] font-bold leading-snug text-ink sm:text-lg" style={{ animationDelay: "950ms" }}>
            Você cuida dos produtos e das entregas. Nós cuidamos dos marketplaces.
          </p>

          <div className="mt-8 animate-rise" style={{ animationDelay: "1150ms" }}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="#diagnostico" variant="electric" arrow event="cta_hero_avaliar" className="sm:px-7">
                Quero avaliar minha empresa
              </Button>
              <Button href="#como-funciona" variant="outline" event="cta_hero_como_funciona">
                Entenda como funciona
              </Button>
            </div>
            <p className="mt-4 flex items-center gap-2 text-[14px] font-semibold text-slate-600">
              <ScanSearch className="size-4 text-electric" aria-hidden />
              Analisamos seus produtos, estoque e potencial comercial.
            </p>
          </div>
        </div>

        <div className="relative -mx-4 sm:mx-0">
          <HeroScene />
        </div>
      </div>
    </section>
  );
}
