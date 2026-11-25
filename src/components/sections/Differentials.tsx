"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { Info } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const costs = [
  { label: "Custo do produto", short: "produto", v: 52, color: "#0c2555", text: "O que a mercadoria custou para sua empresa." },
  { label: "Taxas do marketplace", short: "taxas", v: 14, color: "#2563ff", text: "Comissão e tarifas do canal." },
  { label: "Frete", short: "frete", v: 9, color: "#008cff", text: "Parte do frete paga pelo vendedor." },
  { label: "Impostos", short: "impostos", v: 8, color: "#7aa6ff", text: "Tributos sobre a venda, conforme o regime." },
];
const MARGIN = 100 - costs.reduce((a, c) => a + c.v, 0);
const STEP_MS = 850;

/**
 * A venda de R$ 100 é distribuída custo a custo: a conta aparece em tipografia grande
 * enquanto a barra se divide e o valor restante cai até a margem.
 * O servidor renderiza o estado final: sem JavaScript ou com movimento reduzido, tudo aparece completo.
 */
export function Differentials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -30% 0px" });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(costs.length + 1);
  const [shown, setShown] = useState(MARGIN);
  const armed = useRef(false);

  useEffect(() => {
    if (reduce || inView) return;
    armed.current = true;
    setStep(0);
    setShown(100);
  }, [reduce]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!inView || !armed.current) return;
    const timers: number[] = [];
    costs.forEach((_, i) => timers.push(window.setTimeout(() => setStep(i + 1), 500 + i * STEP_MS)));
    timers.push(window.setTimeout(() => setStep(costs.length + 1), 500 + costs.length * STEP_MS + 200));
    const ctl = animate(100, MARGIN, { duration: (costs.length * STEP_MS) / 1000, delay: 0.5, ease: "easeInOut", onUpdate: (v) => setShown(Math.round(v)) });
    return () => {
      timers.forEach(clearTimeout);
      ctl.stop();
    };
  }, [inView]);

  const done = step > costs.length;

  return (
    <section id="margem" className="relative overflow-hidden bg-ice py-16 sm:py-24" aria-labelledby="margem-title">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <Reveal variant="mask" className="max-w-4xl">
          <p className="text-sm font-bold text-electric-600">Resultados e rentabilidade</p>
          <h2 id="margem-title" className="h-section mt-3 text-[2.35rem] text-ink sm:text-[3.4rem] lg:text-[4rem]">
            Não basta vender. <span className="text-electric">É preciso entender quanto sobra.</span>
          </h2>
        </Reveal>

        <div ref={ref} className="mt-10 rounded-[36px] bg-white p-5 shadow-[0_40px_80px_-50px_rgba(12,37,85,0.45)] ring-1 ring-line sm:mt-14 sm:p-10 lg:p-12">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">Para onde vai cada R$ 100 vendidos?</h3>
            <span className="text-[12.5px] font-semibold text-slate-600">Simulação ilustrativa</span>
          </div>

          {/* A conta, em tipografia grande */}
          <p className="mt-10 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[2.1rem] font-extrabold leading-none tracking-[-0.04em] sm:gap-x-5 sm:text-[3.6rem] lg:text-[4.6rem]" aria-label={`R$ 100 menos 52 de produto, 14 de taxas, 9 de frete e 8 de impostos é igual a R$ ${MARGIN}`}>
            <span className="relative">
              <span className="absolute bottom-[calc(100%+0.06em)] left-0 text-[max(12px,0.24em)] font-bold leading-none tracking-normal text-[#08875a]">venda</span>
              <span className="bg-gradient-to-br from-[#0aa36b] to-[#14c38e] bg-clip-text text-transparent">
                <span className="mr-1 text-[0.42em] font-bold tracking-normal">R$</span>100
              </span>
            </span>
            {costs.map((c, i) => (
              <span
                key={c.label}
                className="transition-all duration-500"
                style={{ color: c.color, opacity: step > i ? 1 : 0.12, transform: step > i ? "none" : "translateY(10px)" }}
              >
                <span className="text-[0.7em]">−</span>
                {c.v}
                <span className="ml-1 hidden align-baseline text-[0.24em] font-bold tracking-normal text-slate-500 sm:inline">{c.short}</span>
              </span>
            ))}
            <span className={`transition-all duration-700 ${done ? "text-electric" : "text-slate-300"}`}>
              <span className="text-[0.7em]">=</span> {shown}
            </span>
          </p>

          {/* Barra de distribuição */}
          <div
            className="mt-8 flex h-14 overflow-hidden rounded-2xl bg-cyan/90 sm:h-20"
            role="img"
            aria-label={`Barra ilustrativa: R$ 52 produto, R$ 14 taxas, R$ 9 frete, R$ 8 impostos e R$ ${MARGIN} de margem de contribuição.`}
          >
            {costs.map((c, i) => (
              <div
                key={c.label}
                className="flex items-end overflow-hidden border-r-[3px] border-white transition-[width] duration-[800ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
                style={{ width: step > i ? `${c.v}%` : "0%", background: c.color }}
              />
            ))}
            <div className="flex min-w-0 flex-1 items-center justify-center">
              <span className={`whitespace-nowrap text-sm font-extrabold text-ink transition-opacity duration-500 sm:text-lg ${done ? "opacity-100" : "opacity-0"}`}>
                R$ {MARGIN}
              </span>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              {costs.map((c) => (
                <div key={c.label}>
                  <dt className="flex items-center gap-2 text-[13px] font-bold text-ink">
                    <span className="size-3 rounded-[4px]" style={{ background: c.color }} aria-hidden />
                    {c.label}
                  </dt>
                  <dd className="mt-1 text-[12.5px] font-medium leading-snug text-slate-600">{c.text}</dd>
                </div>
              ))}
            </dl>
            <div className={`rounded-3xl p-6 transition-all duration-700 ${done ? "bg-ink text-white shadow-[0_30px_60px_-30px_rgba(37,99,255,0.6)]" : "bg-ice text-ink"}`}>
              <p className="text-[13px] font-bold opacity-80">Margem de contribuição ilustrativa</p>
              <p className="mt-1 text-5xl font-extrabold tracking-[-0.04em] tabular">
                R$ {shown}
                <span className="ml-2 text-base font-bold tracking-normal opacity-70">{"de R$\u00a0100"}</span>
              </p>
              <p className="mt-4 flex gap-2 text-[13.5px] font-medium leading-relaxed opacity-85">
                <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
                <span>
                  <strong className="font-extrabold">Não é lucro líquido.</strong> Desse valor ainda saem publicidade, serviços de
                  gestão e outras despesas da empresa.
                </span>
              </p>
            </div>
          </div>
        </div>
        <p className="mt-4 text-[13px] font-medium text-slate-600">
          Valores hipotéticos para fins didáticos. Não representam resultados da DM e variam conforme produto, canal, frete e
          regime tributário.
        </p>
      </div>
    </section>
  );
}
