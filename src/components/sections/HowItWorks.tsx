"use client";
import { useRef, type ReactNode } from "react";
import { BatteryCharging, CalendarDays, Check, Rocket, ScanSearch, TrendingUp, type LucideIcon } from "lucide-react";
import { MarketplaceLogo, marketplaces } from "@/components/ui/MarketplaceLogo";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  { t: "Diagnóstico", d: "Avaliamos seus produtos, estoque e potencial comercial." },
  { t: "Implantação", d: "Criamos anúncios, configuramos os canais e integramos os sistemas." },
  { t: "Gestão", d: "Administramos preços, campanhas, anúncios e reputação." },
  { t: "Otimização", d: "Analisamos os indicadores e identificamos oportunidades de melhoria." },
];

/* Representação de cada etapa: pequenas telas com conteúdo de exemplo */
function Shell({ icon: I, title, meta, children }: { icon: LucideIcon; title: string; meta: string; children: ReactNode }) {
  return (
    <div className="w-full max-w-[340px] rounded-[24px] bg-white p-4 shadow-[0_24px_50px_-30px_rgba(12,37,85,0.55)] ring-1 ring-line">
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-electric to-vibrant text-white shadow-[0_8px_18px_-8px_rgba(37,99,255,0.8)]">
          <I className="size-[18px]" aria-hidden />
        </span>
        <span className="leading-tight">
          <span className="block text-[13.5px] font-extrabold text-ink">{title}</span>
          <span className="block text-[11px] font-semibold text-slate-500">{meta}</span>
        </span>
      </div>
      <div className="mt-3.5">{children}</div>
    </div>
  );
}

function Mini({ i }: { i: number }) {
  if (i === 0)
    return (
      <Shell icon={ScanSearch} title="Diagnóstico comercial" meta="Exemplo ilustrativo">
        <ul className="stagger space-y-2.5">
          {[
            { t: "Produtos com potencial", w: "78%", c: "from-electric to-vibrant" },
            { t: "Estoque disponível", w: "62%", c: "from-vibrant to-cyan" },
            { t: "Canais recomendados", w: "88%", c: "from-electric to-cyan" },
          ].map((r) => (
            <li key={r.t}>
              <span className="flex justify-between text-[11.5px] font-bold text-ink">{r.t}</span>
              <span className="mt-1 block h-2 overflow-hidden rounded-full bg-ice ring-1 ring-line">
                <span className={`grow block h-full rounded-full bg-gradient-to-r ${r.c}`} style={{ width: r.w }} />
              </span>
            </li>
          ))}
        </ul>
      </Shell>
    );
  if (i === 1)
    return (
      <Shell icon={Rocket} title="Anúncio criado" meta="Exemplo ilustrativo">
        <div className="flex items-center gap-3 rounded-2xl bg-ice p-2.5 ring-1 ring-line">
          <span className="grid size-11 place-items-center rounded-xl bg-white text-electric-600 ring-1 ring-line">
            <BatteryCharging className="size-5" aria-hidden />
          </span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate text-[12.5px] font-extrabold text-ink">Bateria 48V 13Ah</span>
            <span className="tabular block text-[12px] font-bold text-electric-600">R$ 1.890,00</span>
          </span>
        </div>
        <p className="mt-3 text-[11px] font-semibold text-slate-600">Publicado em</p>
        <ul className="stagger mt-1.5 grid grid-cols-6 gap-1.5">
          {marketplaces.map((m) => (
            <li key={m.id} className="relative grid aspect-[1.2] place-items-center rounded-lg bg-white p-1 ring-1 ring-line" title={m.name}>
              <MarketplaceLogo id={m.id} />
              <span className="absolute -right-1 -top-1 grid size-3.5 place-items-center rounded-full bg-emerald-500 text-white ring-2 ring-white">
                <Check className="size-2" strokeWidth={4} aria-hidden />
              </span>
            </li>
          ))}
        </ul>
      </Shell>
    );
  if (i === 2)
    return (
      <Shell icon={CalendarDays} title="Agenda da semana" meta="Exemplo ilustrativo">
        <ul className="stagger space-y-1.5">
          {[
            { d: "Seg", t: "Ajuste de preço", s: "Feito", on: true },
            { d: "Qua", t: "Cupom de 10%", s: "Feito", on: true },
            { d: "Sex", t: "Campanha do canal", s: "Agendado", on: false },
          ].map((r) => (
            <li key={r.t} className="flex items-center gap-2.5 rounded-xl bg-ice px-2.5 py-2 ring-1 ring-line">
              <span className="grid h-7 w-9 place-items-center rounded-lg bg-white text-[10.5px] font-extrabold text-ink ring-1 ring-line">{r.d}</span>
              <span className="flex-1 text-[12px] font-bold text-ink">{r.t}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                  r.on ? "bg-emerald-50 text-emerald-700" : "bg-white text-electric-600 ring-1 ring-electric/25"
                }`}
              >
                {r.s}
              </span>
            </li>
          ))}
        </ul>
      </Shell>
    );
  return (
    <Shell icon={TrendingUp} title="Indicadores" meta="Exemplo ilustrativo">
      <div className="flex gap-1.5">
        {["Vendas", "Margem", "Reputação"].map((k) => (
          <span key={k} className="rounded-full bg-ice px-2.5 py-1 text-[10.5px] font-extrabold text-ink ring-1 ring-line">
            {k}
          </span>
        ))}
      </div>
      <svg viewBox="0 0 300 90" className="mt-3 h-[84px] w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="hiw-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#2563ff" stopOpacity="0.22" />
            <stop offset="1" stopColor="#2563ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hiw-line" x1="0" x2="1">
            <stop offset="0" stopColor="#2563ff" />
            <stop offset="1" stopColor="#04d5e8" />
          </linearGradient>
        </defs>
        {[22, 45, 68].map((y) => (
          <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#dde6f3" strokeDasharray="3 5" />
        ))}
        <path d="M0,70 C40,66 60,58 95,60 S150,44 185,40 S245,22 300,12 L300,90 L0,90 Z" fill="url(#hiw-area)" />
        <path d="M0,70 C40,66 60,58 95,60 S150,44 185,40 S245,22 300,12" fill="none" stroke="url(#hiw-line)" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="300" cy="12" r="5.5" fill="#04d5e8" stroke="#fff" strokeWidth="2.5" />
      </svg>
    </Shell>
  );
}

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });

  return (
    <section id="como-funciona" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal variant="mask" className="mx-auto max-w-3xl lg:text-center">
          <p className="text-sm font-bold text-electric-600">Como funciona</p>
          <h2 className="h-section mt-3 text-[2.35rem] text-ink sm:text-[3.4rem] lg:text-[4rem]">
            Quatro etapas. <span className="text-electric">Uma operação estruturada.</span>
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-12 lg:mt-16">
          {/* linha que se desenha com a rolagem */}
          <div className="absolute bottom-4 left-[19px] top-4 w-[3px] rounded-full bg-line lg:left-1/2 lg:-translate-x-1/2" aria-hidden>
            <motion.div className="h-full w-full origin-top rounded-full bg-gradient-to-b from-electric to-cyan" style={{ scaleY: reduce ? 1 : progress }} />
          </div>

          <ol className="space-y-8 lg:space-y-6">
            {steps.map((s, i) => {
              const right = i % 2 === 1;
              return (
                <li key={s.t} className="relative grid items-center gap-5 pl-14 lg:grid-cols-2 lg:gap-24 lg:pl-0">
                  <span
                    className="absolute left-0 top-0 z-10 grid size-10 place-items-center rounded-full bg-electric text-[14px] font-extrabold text-white shadow-[0_0_0_6px_#fff,0_10px_24px_-8px_rgba(37,99,255,0.7)] tabular lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <Reveal className={`${right ? "lg:order-2" : "lg:text-right"}`} delay={0.05}>
                    <p className="text-[13px] font-bold text-electric-600 tabular">Etapa {String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-1 text-[1.9rem] font-extrabold leading-none tracking-[-0.035em] text-ink sm:text-[2.4rem]">{s.t}</h3>
                    <p className={`mt-3 max-w-md text-[16px] font-medium leading-relaxed text-slate-600 ${right ? "" : "lg:ml-auto"}`}>{s.d}</p>
                  </Reveal>
                  <Reveal variant="scale" delay={0.15} className={`hidden sm:block ${right ? "lg:order-1" : ""}`}>
                    <div className={`flex w-full max-w-[380px] justify-center rounded-[30px] bg-gradient-to-br from-ice to-[#e8f0ff] p-5 ring-1 ring-line ${right ? "lg:ml-auto" : ""}`}>
                      <Mini i={i} />
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
