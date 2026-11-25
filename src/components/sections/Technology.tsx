"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { BarChart3, Boxes, Database, PackageCheck, Wallet } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { BlingLogo, MarketplaceLogo, marketplaces } from "@/components/ui/MarketplaceLogo";

/*
  Fluxo ERP ↔ Bling ↔ Marketplaces → área gerencial.
  A rolagem avança por 4 momentos; cada um acende as conexões correspondentes.
  Sem JavaScript (stage = -1), todas as conexões aparecem acesas.
*/

const stages = [
  { t: "Produtos sincronizados", d: "O cadastro sai do seu sistema, passa pelo Bling e vira anúncio nos canais." },
  { t: "Pedidos chegando", d: "As vendas dos marketplaces entram no Bling para separação e faturamento." },
  { t: "Estoque atualizado", d: "Cada venda atualiza o saldo, conforme as integrações disponíveis em cada canal." },
  { t: "Informação para a gestão", d: "Vendas, estoque, pedidos e margens seguem para a área gerencial." },
];

type Geo = {
  vb: [number, number];
  erp: [number, number, number, number];
  bling: [number, number, number, number];
  mp: [number, number, number, number];
  ind: [number, number, number, number];
  l1: string;
  l2: string;
  l3: string;
};

const H: Geo = {
  vb: [720, 470],
  erp: [10, 70, 170, 140],
  bling: [270, 60, 180, 160],
  mp: [540, 55, 170, 170],
  ind: [150, 340, 420, 110],
  l1: "M180,140 H270",
  l2: "M450,140 H540",
  l3: "M360,220 V340",
};
const V: Geo = {
  vb: [360, 760],
  erp: [70, 0, 220, 120],
  bling: [70, 190, 220, 140],
  mp: [55, 400, 250, 160],
  ind: [20, 630, 320, 130],
  l1: "M180,120 V190",
  l2: "M180,330 V400",
  l3: "M330,260 C356,300 356,580 330,640",
};

const pct = (v: number, t: number) => `${(v / t) * 100}%`;

function Node({ g, r, className = "", children }: { g: Geo; r: [number, number, number, number]; className?: string; children: React.ReactNode }) {
  const [x, y, w, h] = r;
  return (
    <div
      className={`absolute ${className}`}
      style={{ left: pct(x, g.vb[0]), top: pct(y, g.vb[1]), width: pct(w, g.vb[0]), height: pct(h, g.vb[1]) }}
    >
      {children}
    </div>
  );
}

function Lane({ d, on, dashed, label, packets }: { d: string; on: boolean; dashed?: boolean; label?: string; packets: { text: string; reverse?: boolean; color: string; delay: number }[] }) {
  return (
    <g>
      <path d={d} fill="none" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="10" strokeLinecap="round" />
      <path
        d={d}
        fill="none"
        stroke={on ? "url(#lane)" : "#ffffff"}
        strokeOpacity={on ? 1 : 0.25}
        strokeWidth="2.5"
        strokeDasharray={dashed ? "6 6" : undefined}
        strokeLinecap="round"
        style={{ transition: "stroke-opacity .5s" }}
      />
      {label ? null : null}
      <g style={{ opacity: on ? 1 : 0, transition: "opacity .5s" }} className="pulse-dot-group">
        {packets.map((p, i) => (
          <g key={i} opacity="0">
            <animateMotion dur="2.6s" begin={`${p.delay}s`} repeatCount="indefinite" path={d} keyPoints={p.reverse ? "1;0" : "0;1"} keyTimes="0;1" calcMode="linear" />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.8;1" dur="2.6s" begin={`${p.delay}s`} repeatCount="indefinite" />
            <rect x="-30" y="-11" width="60" height="22" rx="11" fill={p.color} />
            <text x="0" y="4" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0c2555" fontFamily="Manrope Variable, sans-serif">
              {p.text}
            </text>
          </g>
        ))}
      </g>
    </g>
  );
}

function Diagram({ g, stage }: { g: Geo; stage: number }) {
  const all = stage < 0;
  const s0 = all || stage === 0;
  const s1 = all || stage === 1;
  const s2 = all || stage === 2;
  const s3 = all || stage === 3;
  const indicators = [
    { icon: BarChart3, t: "Vendas" },
    { icon: Boxes, t: "Estoque" },
    { icon: PackageCheck, t: "Pedidos" },
    { icon: Wallet, t: "Margem" },
  ];
  return (
    <div className="relative w-full" style={{ aspectRatio: `${g.vb[0]} / ${g.vb[1]}` }}>
      <svg viewBox={`0 0 ${g.vb[0]} ${g.vb[1]}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="lane" x1="0" x2="1">
            <stop offset="0" stopColor="#04d5e8" />
            <stop offset="1" stopColor="#7aa6ff" />
          </linearGradient>
        </defs>
        <Lane
          d={g.l1}
          dashed
          on={s0 || s2}
          packets={[
            ...(s0 ? [{ text: "Produto", color: "#04d5e8", delay: 0 }] : []),
            ...(s2 ? [{ text: "Estoque", color: "#ffffff", delay: 0.4, reverse: true }] : []),
          ]}
        />
        <Lane
          d={g.l2}
          on={s0 || s1 || s2}
          packets={[
            ...(s0 ? [{ text: "Produto", color: "#04d5e8", delay: 0.8 }] : []),
            ...(s1 ? [{ text: "Pedido", color: "#ffffff", delay: 0.2, reverse: true }] : []),
            ...(s2 ? [{ text: "Estoque", color: "#ffffff", delay: 1.2 }] : []),
          ]}
        />
        <Lane d={g.l3} on={s3} packets={s3 ? [{ text: "Dados", color: "#04d5e8", delay: 0.3 }] : []} />
      </svg>

      <Node g={g} r={g.erp}>
        <div className={`flex h-full flex-col justify-center rounded-3xl border border-white/15 bg-white/[0.06] p-4 transition-all duration-500 ${s0 || s2 ? "border-cyan/50" : ""}`}>
          <Database className="size-5 text-cyan" aria-hidden />
          <p className="mt-2 text-[15px] font-extrabold leading-tight text-white">ERP da sua empresa</p>
          <p className="mt-1 text-[11.5px] font-medium text-white/60">Integração quando compatível</p>
        </div>
      </Node>
      <Node g={g} r={g.bling}>
        <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-3xl bg-[#061633] p-5 text-white ring-2 ring-cyan/60 shadow-[0_0_0_8px_rgba(4,213,232,0.12),0_30px_60px_-20px_rgba(4,213,232,0.7)]">
          <span className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-[#7cf03c]/20 blur-2xl" aria-hidden />
          <p className="relative text-[10.5px] font-bold uppercase tracking-[0.16em] text-cyan">Central operacional</p>
          <BlingLogo className="relative mt-2 h-10 w-auto self-start drop-shadow-[0_0_14px_rgba(124,240,60,0.35)]" />
          <p className="relative mt-2 text-[11.5px] font-semibold text-white">Produtos · estoque · pedidos</p>
        </div>
      </Node>
      <Node g={g} r={g.mp}>
        <div className={`flex h-full flex-col justify-center rounded-3xl border border-white/15 bg-white/[0.06] p-3.5 transition-all duration-500 ${s1 ? "border-cyan/50" : ""}`}>
          <div className="grid grid-cols-3 gap-1.5">
            {marketplaces.map((m) => (
              <span key={m.id} className="flex aspect-[1.6] items-center justify-center rounded-xl bg-white p-1.5" title={m.name}>
                <MarketplaceLogo id={m.id} />
              </span>
            ))}
          </div>
          <p className="mt-2.5 text-[13px] font-extrabold text-white">Marketplaces</p>
        </div>
      </Node>
      <Node g={g} r={g.ind}>
        <div className={`flex h-full flex-col justify-center rounded-3xl border p-3.5 transition-all duration-700 ${s3 ? "border-cyan/60 bg-cyan/10" : "border-white/15 bg-white/[0.04]"}`}>
          <p className="text-[11px] font-bold text-white/70">Área gerencial</p>
          <ul className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
            {indicators.map(({ icon: I, t }, i) => (
              <li
                key={t}
                className={`flex items-center gap-1.5 rounded-xl bg-white/10 px-2.5 py-2 text-[12px] font-bold text-white transition-all duration-500 ${
                  s3 ? "translate-y-0 opacity-100" : "translate-y-1 opacity-40"
                }`}
                style={{ transitionDelay: s3 ? `${i * 0.12}s` : "0s" }}
              >
                <I className="size-3.5 text-cyan" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Node>
    </div>
  );
}

export function Technology() {
  const ref = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(-1);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const reduce = useReducedMotion();
  const [mobile, setMobile] = useState(false);

  // desktop: a rolagem conduz os 4 momentos (seção com painel fixo)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (window.innerWidth < 1024) return;
    setStage(Math.min(3, Math.max(0, Math.floor(v * 4.2))));
  });

  // mobile/tablet: sem painel fixo, os momentos se alternam enquanto a seção está visível
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const apply = () => {
      setMobile(mq.matches);
      if (mq.matches && !reduce) setStage((s) => (s < 0 ? 0 : s));
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [reduce]);
  useEffect(() => {
    if (!mobile || reduce || !inView) return;
    const t = window.setInterval(() => setStage((s) => (s + 1) % 4), 3200);
    return () => window.clearInterval(t);
  }, [mobile, reduce, inView]);

  return (
    <section ref={ref} id="tecnologia" className="relative bg-white px-3 py-6 sm:px-5 lg:h-[260vh] lg:py-0">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:py-6">
        <div className="relative isolate mx-auto w-full max-w-[1400px] overflow-hidden rounded-[36px] bg-[#0a2160] px-5 py-12 text-white sm:px-10 sm:py-14 lg:px-14 lg:pt-24">
          <div className="absolute -right-40 -top-40 -z-10 size-[560px] rounded-full bg-electric/50 blur-[140px]" aria-hidden />
          <div className="absolute -bottom-48 left-10 -z-10 size-[460px] rounded-full bg-cyan/20 blur-[140px]" aria-hidden />
          <div className="bg-grid absolute inset-0 -z-10 opacity-60" aria-hidden />

          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-14">
            <div>
              <Reveal variant="mask">
                <p className="text-sm font-bold text-cyan">Tecnologia e integração</p>
                <h2 className="h-section mt-3 text-[2.2rem] sm:text-[3rem] lg:text-[3.2rem]">
                  Seu estoque conectado. <span className="text-cyan">Sua operação mais organizada.</span>
                </h2>
                <p className="mt-4 text-[16.5px] font-medium leading-relaxed text-white/75">
                  Conectamos os sistemas para reduzir trabalho manual e facilitar o acompanhamento dos canais de venda.
                </p>
              </Reveal>

              <ol className="mt-6 space-y-1 lg:mt-8">
                {stages.map((s, i) => {
                  const on = stage === i;
                  return (
                    <li key={s.t} className={`rounded-2xl px-4 py-3 transition-colors duration-500 ${on ? "bg-white/[0.08]" : ""}`}>
                      <p className="flex items-center gap-3 text-[15px] font-extrabold">
                        <span
                          className={`grid size-7 place-items-center rounded-full text-[11px] tabular transition-colors duration-500 ${
                            on ? "bg-cyan text-ink" : "bg-white/10 text-white/80"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span className={on || stage < 0 ? "text-white" : "text-white/60"}>{s.t}</span>
                      </p>
                      <p className={`mt-1 pl-10 text-[13.5px] font-medium leading-snug ${stage < 0 ? "block text-white/70" : `hidden lg:block ${on ? "text-white/75" : "text-white/40"}`}`}>
                        {s.d}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div>
              <div className="hidden md:block">
                <Diagram g={H} stage={stage} />
              </div>
              <div className="mx-auto max-w-[380px] md:hidden">
                <Diagram g={V} stage={stage} />
              </div>
              <p className="mt-6 text-[12.5px] font-medium leading-relaxed text-white/60">
                O Bling centraliza a operação dos marketplaces, sem necessariamente substituir o sistema de gestão da sua
                empresa. A integração com o ERP depende de compatibilidade técnica, e a frequência de atualização segue as
                integrações disponíveis em cada canal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
