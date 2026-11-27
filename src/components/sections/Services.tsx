"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, BadgePercent, Check, CircleDollarSign, Megaphone, Radio, Star, Tag, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { MarketplaceLogo, marketplaces } from "@/components/ui/MarketplaceLogo";
import { Battery } from "@/components/ui/ProductArt";

type Step = { n: string; label: string; title: string; items: string[] };

const steps: Step[] = [
  {
    n: "01",
    label: "Implantação",
    title: "Da primeira configuração ao anúncio publicado.",
    items: ["Criação e configuração dos canais", "Cadastro de produtos", "Títulos e descrições", "Organização de variações", "Integração de estoque", "Otimização dos anúncios"],
  },
  {
    n: "02",
    label: "Gestão",
    title: "Sua operação acompanhada, todos os dias.",
    items: ["Preços", "Promoções", "Campanhas", "Cupons", "Produtos", "Reputação", "Estratégias comerciais"],
  },
  {
    n: "03",
    label: "Inteligência",
    title: "Cada venda gera dados. Cada dado pode orientar uma decisão.",
    items: ["Vendas por canal", "Margens", "Custos", "Estoque", "Produtos mais rentáveis", "Oportunidades comerciais"],
  },
];

/* ───────── Visual 01: o produto vira anúncio ───────── */
function VisualSetup({ on }: { on: boolean }) {
  return (
    <div className={`vis grid h-full grid-rows-[auto_1fr] gap-4 ${on ? "is-on" : ""}`}>
      <p className="text-[12px] font-semibold text-slate-500">Exemplo ilustrativo · do cadastro ao anúncio</p>
      <div className="relative grid items-center gap-4 sm:grid-cols-[0.8fr_auto_1.2fr]">
        {/* produto bruto */}
        <div className="hidden rounded-3xl bg-white p-5 sm:block shadow-[0_24px_50px_-30px_rgba(12,37,85,0.45)] ring-1 ring-line">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">Seu produto</p>
          <div className="mx-auto mt-3 h-28 w-24">
            <Battery uid="s1" />
          </div>
          <dl className="mt-3 space-y-1.5 text-[12px]">
            {[
              ["SKU", "BT-4813"],
              ["Peso", "3,2 kg"],
              ["Estoque", "24 un."],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-line pb-1.5 last:border-0">
                <dt className="font-medium text-slate-500">{k}</dt>
                <dd className="font-bold text-ink tabular">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        {/* transformação */}
        <div className="hidden justify-center sm:flex sm:flex-col" aria-hidden>
          <span className="vis-flow grid size-11 place-items-center rounded-full bg-electric text-white shadow-[0_10px_24px_-8px_rgba(37,99,255,0.8)]">
            <ArrowRight className="size-5 rotate-90 sm:rotate-0" />
          </span>
        </div>
        {/* anúncio pronto */}
        <div className="vis-pop rounded-3xl bg-white p-5 shadow-[0_30px_60px_-30px_rgba(37,99,255,0.5)] ring-2 ring-electric/25">
          <div className="flex items-center justify-between">
            <span className="flex size-8 items-center justify-center rounded-lg bg-ice p-1.5 ring-1 ring-line">
              <MarketplaceLogo id="mercado-livre" />
            </span>
            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
              <Check className="size-3.5" /> Publicado
            </span>
          </div>
          <div className="mt-3 flex gap-3">
            <div className="grid size-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-ice to-brand-100 p-2">
              <Battery uid="s2" />
            </div>
            <div className="min-w-0">
              <p className="text-[13.5px] font-extrabold leading-snug text-ink">Bateria 48V 13Ah para Bicicleta Elétrica com Carregador</p>
              <p className="mt-1.5 text-xl font-extrabold text-ink tabular">R$ 1.890</p>
              <p className="text-[11.5px] font-bold text-emerald-700">Frete grátis</p>
            </div>
          </div>
          <ul className="vis-list mt-4 grid grid-cols-2 gap-1.5 text-[11.5px] font-semibold text-slate-600">
            {["Título otimizado", "6 fotos", "3 variações", "Ficha técnica"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="size-3.5 text-electric" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ───────── Visual 02: ações comerciais em andamento ───────── */
function VisualManage({ on }: { on: boolean }) {
  const actions = [
    { icon: BadgePercent, t: "Cupom de 10%", ch: "shopee" as const, st: "Ativo", p: 64, tone: "bg-emerald-50 text-emerald-700" },
    { icon: Tag, t: "Ajuste de preço · 3 produtos", ch: "mercado-livre" as const, st: "Concluído", p: 100, tone: "bg-brand-100 text-electric-600" },
    { icon: Radio, t: "Live de lançamento", ch: "tiktok-shop" as const, st: "Em preparação", p: 40, tone: "bg-amber-50 text-amber-700" },
    { icon: Megaphone, t: "Campanha de recompra", ch: "magalu" as const, st: "Agendada", p: 15, tone: "bg-slate-100 text-slate-600" },
  ];
  return (
    <div className={`vis flex h-full flex-col gap-4 ${on ? "is-on" : ""}`}>
      <p className="text-[12px] font-semibold text-slate-500">Exemplo ilustrativo · ações comerciais da semana</p>
      <div className="relative rounded-3xl bg-white p-5 shadow-[0_30px_60px_-34px_rgba(12,37,85,0.5)] ring-1 ring-line">
        <div className="flex items-center justify-between">
          <p className="text-[15px] font-extrabold text-ink">Em andamento</p>
          <span className="text-[11px] font-semibold text-slate-500">5 canais</span>
        </div>
        <ul className="vis-list mt-4 space-y-2.5">
          {actions.map((a) => (
            <li key={a.t} className="rounded-2xl bg-ice p-3 ring-1 ring-line">
              <div className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white text-electric ring-1 ring-line">
                  <a.icon className="size-4.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-bold text-ink">{a.t}</span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                    <span className="size-3.5">
                      <MarketplaceLogo id={a.ch} />
                    </span>
                    {marketplaces.find((m) => m.id === a.ch)!.name}
                  </span>
                </span>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-bold ${a.tone}`}>{a.st}</span>
              </div>
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white">
                <div className="vis-bar h-full rounded-full bg-gradient-to-r from-electric to-cyan" style={{ width: `${a.p}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="vis-pop grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white p-4 ring-1 ring-line">
          <p className="text-[11px] font-semibold text-slate-500">Preço revisado</p>
          <p className="mt-1 text-[13px] font-semibold text-slate-500 line-through tabular">R$ 189,90</p>
          <p className="text-xl font-extrabold text-electric tabular">R$ 179,90</p>
        </div>
        <div className="rounded-2xl bg-ink p-4 text-white">
          <p className="text-[11px] font-semibold text-white/70">Reputação</p>
          <div className="mt-2 flex gap-1">
            {["bg-rose-400", "bg-orange-400", "bg-amber-300", "bg-lime-300", "bg-emerald-400"].map((c, i) => (
              <span key={c} className={`h-2 flex-1 rounded-full ${c} ${i === 4 ? "ring-2 ring-white" : "opacity-40"}`} />
            ))}
          </div>
          <p className="mt-2 flex items-center gap-1 text-[12px] font-bold">
            <Star className="size-3.5 fill-amber-300 text-amber-300" /> Acompanhada diariamente
          </p>
        </div>
      </div>
    </div>
  );
}

/* ───────── Visual 03: painel completo (ilustrativo) ───────── */
function VisualIntel({ on }: { on: boolean }) {
  const byChannel = [
    { id: "mercado-livre" as const, v: 42 },
    { id: "shopee" as const, v: 27 },
    { id: "tiktok-shop" as const, v: 18 },
    { id: "amazon" as const, v: 13 },
  ];
  const top = [
    { n: "Kit ferramentas 110 peças", m: 31 },
    { n: "Bateria 48V 13Ah", m: 26 },
    { n: "Argamassa AC-III 20 kg", m: 12 },
  ];
  return (
    <div className={`vis flex h-full flex-col gap-3 ${on ? "is-on" : ""}`}>
      <p className="text-[12px] font-semibold text-slate-500">Dados ilustrativos · conceito de painel, não é um software disponível</p>
      <div className="rounded-3xl bg-ink p-4 text-white shadow-[0_40px_80px_-40px_rgba(12,37,85,0.8)] sm:p-5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            ["Vendas · 30 dias", "R$ 184 mil"],
            ["Margem média", "21,4%"],
            ["Custos e taxas", "R$ 58 mil"],
            ["Itens em estoque", "1.240"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-2xl bg-white/[0.07] p-3">
              <p className="text-[10.5px] font-semibold text-white/60">{k}</p>
              <p className="mt-1 text-[17px] font-extrabold tabular">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-[1.1fr_1fr]">
          <div className="rounded-2xl bg-white/[0.07] p-3.5">
            <p className="text-[11px] font-bold text-white/80">Vendas por canal</p>
            <div className="mt-3 flex h-28 items-end gap-3">
              {byChannel.map((c, i) => (
                <div key={c.id} className="flex flex-1 flex-col items-center gap-1.5">
                  <span className="text-[10.5px] font-bold tabular">{c.v}%</span>
                  <div className="relative w-full flex-1">
                    <div
                      className="vis-col absolute inset-x-0 bottom-0 rounded-t-lg bg-gradient-to-t from-electric to-cyan"
                      style={{ height: `${(c.v / 42) * 100}%`, transitionDelay: `${0.1 + i * 0.1}s` }}
                    />
                  </div>
                  <span className="flex size-5 items-center justify-center rounded bg-white p-0.5">
                    <MarketplaceLogo id={c.id} />
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.07] p-3.5">
            <p className="text-[11px] font-bold text-white/80">Mais rentáveis · margem</p>
            <ul className="mt-2.5 space-y-2.5">
              {top.map((t) => (
                <li key={t.n}>
                  <div className="flex justify-between gap-2 text-[11px]">
                    <span className="truncate font-semibold text-white/85">{t.n}</span>
                    <span className={`font-extrabold tabular ${t.m < 18 ? "text-amber-300" : "text-cyan"}`}>{t.m}%</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-white/10">
                    <div className={`vis-bar h-full rounded-full ${t.m < 18 ? "bg-amber-400" : "bg-cyan"}`} style={{ width: `${(t.m / 34) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <p className="flex items-start gap-2 rounded-2xl bg-electric/25 p-3 text-[12px] font-semibold leading-snug">
            <TrendingUp className="mt-0.5 size-4 shrink-0 text-cyan" />
            Oportunidade: kit de ferramentas tem margem alta e pode ganhar campanha.
          </p>
          <p className="flex items-start gap-2 rounded-2xl bg-amber-400/15 p-3 text-[12px] font-semibold leading-snug">
            <CircleDollarSign className="mt-0.5 size-4 shrink-0 text-amber-300" />
            Atenção: argamassa abaixo da margem mínima no canal com frete grátis.
          </p>
        </div>
      </div>
    </div>
  );
}

const visuals = [VisualSetup, VisualManage, VisualIntel];

export function Services() {
  const [active, setActive] = useState(0);
  const blocks = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    blocks.current.forEach((b) => b && io.observe(b));
    return () => io.disconnect();
  }, []);

  return (
    <section id="servicos" className="relative bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <Reveal variant="mask" className="max-w-4xl">
          <p className="text-sm font-bold text-electric-600">Serviços</p>
          <h2 className="h-section mt-3 text-[2.35rem] text-ink sm:text-[3.4rem] lg:text-[4rem]">
            Você tem os produtos. <span className="text-electric">Nós cuidamos da operação digital.</span>
          </h2>
        </Reveal>

        <div className="mt-10 lg:mt-6 lg:grid lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          {/* Narrativa: blocos de texto */}
          <div>
            {steps.map((s, i) => {
              const V = visuals[i];
              return (
                <div
                  key={s.n}
                  ref={(el) => {
                    blocks.current[i] = el;
                  }}
                  data-step={i}
                  className="flex flex-col justify-center border-t border-line py-8 first:border-t-0 sm:py-10 lg:min-h-[78vh] lg:border-t-0 lg:py-0"
                >
                  <div className={`transition-opacity duration-500 ${active === i ? "" : "js-dim"}`}>
                    <p className="flex items-center gap-3 text-sm font-bold text-electric-600">
                      <span className="grid size-9 place-items-center rounded-full bg-electric-600 text-[13px] text-white tabular">{s.n}</span>
                      {s.label}
                    </p>
                    <h3 className="mt-4 text-[1.75rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[2.3rem]">{s.title}</h3>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {s.items.map((it) => (
                        <li key={it} className="rounded-full bg-ice px-3.5 py-2 text-[13.5px] font-semibold text-ink ring-1 ring-line">
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* visual em linha: mobile, tablet e sem JavaScript */}
                  <div className="step-inline mt-6 rounded-[28px] bg-gradient-to-br from-ice to-brand-100/60 p-3 sm:mt-8 sm:p-6">
                    <V on />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Painel visual fixo (desktop com JavaScript) */}
          <div className="step-sticky hidden lg:block">
            <div className="sticky top-24 flex h-[calc(100vh-7rem)] max-h-[720px] items-center">
              <div className="relative w-full rounded-[36px] bg-gradient-to-br from-ice via-white to-brand-100/70 p-8 ring-1 ring-line">
                <div className="mb-6 flex items-center gap-2" aria-hidden>
                  {steps.map((s, i) => (
                    <span key={s.n} className="flex items-center gap-2">
                      <span
                        className={`grid size-8 place-items-center rounded-full text-[12px] font-bold transition-all duration-500 ${
                          active === i ? "bg-electric text-white" : "bg-white text-slate-500 ring-1 ring-line"
                        }`}
                      >
                        {s.n}
                      </span>
                      {i < steps.length - 1 ? (
                        <span className="h-px w-10 bg-line">
                          <span className="block h-full bg-electric transition-all duration-700" style={{ width: active > i ? "100%" : "0%" }} />
                        </span>
                      ) : null}
                    </span>
                  ))}
                </div>
                <div className="relative h-[520px]">
                  {visuals.map((V, i) => (
                    <div
                      key={i}
                      className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        active === i ? "translate-y-0 opacity-100" : i < active ? "-translate-y-6 opacity-0" : "translate-y-6 opacity-0"
                      }`}
                      aria-hidden={active !== i}
                    >
                      <V on={active === i} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
