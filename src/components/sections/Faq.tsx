import { MessageCircle, Plus } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { whatsappLink } from "@/lib/whatsapp";
import { faq } from "./faq-data";

export function Faq() {
  const wa = whatsappLink("Olá! Tenho uma dúvida sobre a gestão de marketplaces da DM Empresarial.");

  return (
    <section id="faq" className="bg-ice py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="h-section text-[2.2rem] text-ink sm:text-[3rem]">Perguntas frequentes</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-slate-600">Não encontrou sua dúvida? Fale com a equipe.</p>
          <div className="mt-7">
            <Button
              href={wa ?? "#diagnostico"}
              external={Boolean(wa)}
              variant="outline"
              event="Contact"
              icon={<MessageCircle className="size-4" aria-hidden />}
            >
              Falar com a equipe
            </Button>
          </div>
        </Reveal>

        <div className="divide-y divide-line border-y border-line">
          {faq.map((item, i) => (
            <details key={item.q} className="group" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                <h3 className="text-[17px] font-bold text-ink">{item.q}</h3>
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-navy-800 ring-1 ring-line transition-all duration-300 group-open:rotate-45 group-open:bg-electric group-open:text-white group-open:ring-electric">
                  <Plus className="size-4" aria-hidden />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 pr-10 leading-relaxed text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
