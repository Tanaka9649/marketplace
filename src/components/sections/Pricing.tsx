import { CalendarCheck, Combine, Percent } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const models = [
  { icon: Percent, name: "Comissão sobre vendas", text: "Remuneração variável sobre as vendas elegíveis." },
  { icon: CalendarCheck, name: "Mensalidade fixa", text: "Valor mensal conforme o escopo da operação." },
  { icon: Combine, name: "Modelo híbrido", text: "Mensalidade combinada com remuneração variável." },
];

export function Pricing() {
  return (
    <section id="modelos" className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <Reveal className="grid gap-8 rounded-[32px] bg-ice p-6 ring-1 ring-line sm:p-10 lg:grid-cols-[0.9fr_1.6fr] lg:items-center lg:gap-12">
          <div>
            <p className="text-sm font-bold text-electric-600">Modelos de contratação</p>
            <h2 className="mt-2 text-[1.9rem] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink sm:text-[2.4rem]">
              Um formato para cada operação.
            </h2>
            <p className="mt-3 text-[15px] font-medium text-slate-600">Sem tabela de preços: a proposta nasce do diagnóstico.</p>
            <div className="mt-6">
              <Button href="#diagnostico" variant="electric" arrow event="cta_proposta" className="whitespace-nowrap max-sm:w-full max-sm:px-4 max-sm:text-[14px]">
                Solicitar proposta personalizada
              </Button>
            </div>
          </div>
          <ul className="stagger grid gap-3 sm:grid-cols-3">
            {models.map(({ icon: I, name, text }) => (
              <li
                key={name}
                className="group rounded-3xl bg-white p-4 ring-1 sm:p-5 ring-line transition-all duration-300 hover:-translate-y-1 hover:ring-electric/40 hover:shadow-[0_20px_40px_-24px_rgba(37,99,255,0.5)]"
              >
                <div className="flex items-start gap-4 sm:block">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-electric/10 text-electric transition-colors group-hover:bg-electric group-hover:text-white">
                    <I className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-[17px] font-extrabold leading-tight tracking-tight text-ink sm:mt-4">{name}</h3>
                    <p className="mt-1.5 text-[14px] font-medium leading-snug text-slate-600">{text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
