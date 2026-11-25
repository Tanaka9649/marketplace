import { Reveal } from "@/components/ui/Reveal";
import { MaskWords } from "@/components/ui/MaskWords";
import { LeadForm } from "./LeadForm";

const steps = ["Você envia os dados", "Analisamos produtos e canais", "Você recebe uma proposta"];

export function FinalCta() {
  return (
    <section id="diagnostico" className="relative isolate overflow-hidden bg-electric py-16 text-white sm:py-24">
      {/* luz e conexões de fundo */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_10%_0%,#008cff_0%,transparent_55%),radial-gradient(ellipse_at_100%_100%,#1a3fc0_0%,transparent_60%)]" aria-hidden />
      <div className="bg-grid absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,#000,transparent)]" aria-hidden />
      <svg className="absolute inset-0 -z-10 h-full w-full opacity-40" viewBox="0 0 1440 800" preserveAspectRatio="none" aria-hidden>
        <path d="M-20,620 C300,560 420,300 760,330 S1200,120 1460,160" fill="none" stroke="#04d5e8" strokeWidth="2" />
        <path d="M-20,700 C360,660 520,420 860,440 S1240,260 1460,300" fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.5" />
      </svg>

      <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
        <div>
          <Reveal variant="mask">
            <h2 className="display text-[2.6rem] sm:text-[3.8rem] lg:text-[4.4rem]">
              <MaskWords text="Seu próximo canal de vendas" step={50} /> <span className="text-cyan"><MaskWords text="começa com uma conversa." start={300} step={50} /></span>
            </h2>
          </Reveal>
          <p className="mt-6 max-w-lg text-[17px] font-medium leading-relaxed text-white sm:text-lg">
            Vamos analisar seus produtos e identificar os caminhos para estruturar sua operação nos marketplaces.
          </p>
          <ol className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[14px] font-semibold text-white">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-2.5">
                <span className="grid size-7 place-items-center rounded-full bg-white/15 text-[12px] font-extrabold tabular ring-1 ring-white/25">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        </div>

        <Reveal variant="scale" delay={0.1}>
          <LeadForm />
        </Reveal>
      </div>
    </section>
  );
}
