"use client";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Baby,
  Bike,
  Boxes,
  Building2,
  Car,
  Cpu,
  Dumbbell,
  Gem,
  HardHat,
  Headphones,
  Lightbulb,
  NotebookPen,
  PawPrint,
  Shirt,
  ShoppingBasket,
  Sofa,
  Sparkles,
  Sprout,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { MarketplaceLogo, marketplaces } from "@/components/ui/MarketplaceLogo";

const lines: Record<string, string> = {
  "mercado-livre": "Anúncios otimizados, preços competitivos e gestão da reputação.",
  shopee: "Campanhas, cupons e estratégias para destacar seus produtos.",
  amazon: "Catálogo bem estruturado, preços competitivos e atenção às regras do canal.",
  magalu: "Cadastro completo e participação nas campanhas do canal para alcançar novos compradores.",
  "tiktok-shop": "Produtos, vídeos, campanhas e oportunidades no comércio por conteúdo.",
  ifood: "Estratégias comerciais para ampliar vendas e recorrência.",
};

const segments = [
  { icon: Store, t: "Lojas físicas", d: "Leve o estoque da loja para quem compra online." },
  { icon: Building2, t: "Distribuidores e atacado", d: "Volume e variedade para competir em vários canais." },
  { icon: HardHat, t: "Ferramentas e materiais de construção", d: "Produtos de alta procura com especificações claras." },
  { icon: Sparkles, t: "Cosméticos, beleza e perfumaria", d: "Kits, variações e recompra para aumentar o ticket." },
  { icon: Car, t: "Autopeças e acessórios automotivos", d: "Compatibilidade bem descrita para o comprador certo." },
  { icon: Sofa, t: "Casa, decoração e utilidades domésticas", d: "Fotos, medidas e variações que ajudam a decidir." },
  { icon: Shirt, t: "Moda e vestuário", d: "Grades de tamanho e cores bem cadastradas." },
  { icon: Gem, t: "Semijoias e acessórios femininos", d: "Fotos e descrições que valorizam cada detalhe." },
  { icon: PawPrint, t: "Pet shop", d: "Produtos de recompra para clientes fiéis." },
  { icon: Dumbbell, t: "Suplementos e produtos fitness", d: "Catálogo organizado e atenção às regras de cada canal." },
  { icon: Headphones, t: "Acessórios para eletrônicos e informática", d: "Preço, estoque e reputação acompanhados de perto." },
  { icon: Baby, t: "Produtos infantis e maternidade", d: "Datas comemorativas planejadas com antecedência." },
  { icon: Bike, t: "Bicicletas elétricas e acessórios", d: "Itens de valor alto que pedem anúncios completos." },
  { icon: Lightbulb, t: "Elétrica e iluminação", d: "Catálogo técnico organizado e fácil de comparar." },
  { icon: Cpu, t: "Produtos técnicos e industriais", d: "Fichas técnicas completas para compras com critério." },
  { icon: NotebookPen, t: "Papelaria e escritório", d: "Variedade de itens organizada por categoria." },
  { icon: Sprout, t: "Agro e jardinagem", d: "Produtos do campo e do jardim em novos canais." },
  { icon: UtensilsCrossed, t: "Restaurantes e delivery", d: "Cardápio organizado e campanhas no iFood para buscar mais pedidos e recorrência." },
  { icon: ShoppingBasket, t: "Mercados e conveniência", d: "Pedidos de proximidade com o iFood." },
  { icon: Boxes, t: "Outros segmentos", d: "Qualquer empresa com estoque próprio e potencial digital." },
];

const centers = [200, 600, 1000];

export function Marketplaces() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const lock = useRef(0);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [pp, setPp] = useState(1); // cartões visíveis por página
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 15%"] });
  const draw = useTransform(scrollYProgress, [0.25, 1], [reduce ? 1 : 0, 1]);

  const step = () => {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>("[data-card]");
    return (card?.offsetWidth ?? 280) + 16;
  };

  const goTo = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el) return;
      const n = Math.max(0, Math.min(segments.length - 1, i));
      setActive(n);
      const card = el.querySelectorAll<HTMLElement>("[data-card]")[n];
      if (!card) return;
      lock.current = Date.now() + 700;
      const left = Math.min(card.offsetLeft - el.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft), el.scrollWidth - el.clientWidth);
      el.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
    },
    [reduce],
  );

  // quantos cartões cabem na tela (as setas avançam a página inteira)
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => {
      const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
      setPp(Math.max(1, Math.floor((el.clientWidth - pad + 16) / step())));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const last = Math.max(0, segments.length - pp);
  const next = () => goTo(Math.min(active + pp, last));
  const prev = () => goTo(Math.max(active - pp, 0));

  // ao arrastar/deslizar, o destaque acompanha o cartão que está no início
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (Date.now() < lock.current) return;
        const max = el.scrollWidth - el.clientWidth;
        const idx = Math.round(el.scrollLeft / step());
        setActive((cur) => (el.scrollLeft >= max - 4 && cur >= idx ? cur : idx));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} id="canais" className="relative overflow-hidden bg-gradient-to-b from-ice to-white pb-16 pt-6 sm:pb-24 sm:pt-8">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <Reveal variant="mask" className="mx-auto max-w-4xl text-center">
          <h2 className="h-section text-[2.4rem] text-ink sm:text-[3.4rem] lg:text-[4rem]">
            Uma operação. <span className="text-electric">Múltiplas oportunidades de venda.</span>
          </h2>
        </Reveal>

        {/* conexões que nascem do hero e chegam às plataformas */}
        <div className="mx-auto -mb-2 mt-6 hidden max-w-[1200px] lg:block" aria-hidden>
          <svg viewBox="0 0 1200 150" className="h-[150px] w-full overflow-visible">
            <defs>
              <linearGradient id="branch" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#2563ff" stopOpacity="0.2" />
                <stop offset="1" stopColor="#04d5e8" />
              </linearGradient>
            </defs>
            {centers.map((x) => (
              <path key={`base-${x}`} d={`M600,0 V40 C600,95 ${x},70 ${x},150`} fill="none" stroke="#2563ff" strokeOpacity="0.14" strokeWidth="2.5" />
            ))}
            {centers.map((x) => (
              <motion.path
                key={x}
                d={`M600,0 V40 C600,95 ${x},70 ${x},150`}
                fill="none"
                stroke="url(#branch)"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ pathLength: draw }}
              />
            ))}
            <circle cx="600" cy="2" r="6" fill="#2563ff" />
          </svg>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:mt-0 lg:grid-cols-3">
          {marketplaces.map((m, i) => (
            <Reveal
              key={m.id}
              variant="scale"
              delay={0.08 * i}
              as="article"
              className="group relative flex flex-col rounded-[24px] bg-white p-4 shadow-[0_20px_50px_-34px_rgba(12,37,85,0.5)] ring-1 ring-line transition-[box-shadow,transform] duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(37,99,255,0.45)] sm:p-7"
              style={{ ["--brand" as string]: m.color } as CSSProperties}
            >
              <span
                className="pointer-events-none absolute inset-x-6 -bottom-px h-[3px] origin-center scale-x-0 rounded-full transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: "var(--brand)" }}
                aria-hidden
              />
              <div className="flex h-14 w-24 items-center justify-center rounded-2xl bg-ice px-3 py-2.5 ring-1 ring-line transition-transform duration-500 group-hover:scale-105 sm:h-20 sm:w-32 sm:px-4 sm:py-4">
                <MarketplaceLogo id={m.id} />
              </div>
              <h3 className="mt-4 text-[17px] font-extrabold tracking-tight text-ink sm:mt-5 sm:text-xl">{m.name}</h3>
              <p className="mt-1.5 text-[13px] font-medium leading-snug text-slate-600 sm:mt-2 sm:text-[15px] sm:leading-relaxed">{lines[m.id]}</p>
            </Reveal>
          ))}
        </div>

        {/* Carrossel: para quem é */}
        <div className="mt-12 sm:mt-20">
          <div className="flex items-end justify-between gap-6">
            <Reveal>
              <p className="text-sm font-bold text-electric-600">Para quem vende produtos físicos</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Do balcão para os marketplaces.</h3>
            </Reveal>
            <div className="flex items-center gap-3">
              <span className="tabular hidden text-sm font-bold text-slate-600 sm:block" aria-live="polite">
                <span className="text-ink">
                  {String(active + 1).padStart(2, "0")}
                  {pp > 1 ? `–${String(Math.min(active + pp, segments.length)).padStart(2, "0")}` : ""}
                </span>{" "}
                / {segments.length}
              </span>
              <div className="hidden gap-2 sm:flex">
                <button
                  type="button"
                  onClick={prev}
                  disabled={active === 0}
                  aria-label="Segmentos anteriores"
                  className="grid size-12 place-items-center rounded-full bg-white text-ink ring-1 ring-line transition hover:text-electric hover:ring-electric/40 disabled:opacity-40"
                >
                  <ArrowLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={active >= last}
                  aria-label="Próximos segmentos"
                  className="grid size-12 place-items-center rounded-full bg-electric-600 text-white shadow-[0_10px_24px_-10px_rgba(37,99,255,0.8)] transition hover:bg-ink disabled:opacity-40"
                >
                  <ArrowRight className="size-5" />
                </button>
              </div>
            </div>
          </div>

          <Reveal variant="slide">
            <div
              ref={track}
              className="no-scrollbar -mx-5 mt-6 flex snap-x snap-mandatory scroll-px-5 sm:scroll-px-8 gap-4 overflow-x-auto px-5 pb-6 pt-2 sm:-mx-8 sm:px-8"
              tabIndex={0}
              aria-label="Segmentos atendidos"
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") next();
                if (e.key === "ArrowLeft") prev();
              }}
            >
              {segments.map(({ icon: I, t, d }, i) => {
                const on = i === active;
                return (
                  <article
                    key={t}
                    data-card
                    className="seg-card min-w-0 shrink-0 basis-[78%] snap-start sm:basis-[300px]"
                    style={{ ["--i" as string]: Math.min(i, 6) } as CSSProperties}
                    onClick={() => goTo(i)}
                  >
                    <div
                      className={`seg-face relative h-full cursor-pointer overflow-hidden rounded-[26px] p-6 ${
                        on
                          ? "is-on bg-electric text-white shadow-[0_26px_50px_-22px_rgba(37,99,255,0.75)]"
                          : "bg-white text-ink ring-1 ring-line hover:-translate-y-1 hover:ring-electric/30"
                      }`}
                    >
                      <span className="seg-shine pointer-events-none absolute inset-0" aria-hidden />
                      <span
                        className={`relative grid size-12 place-items-center rounded-2xl transition-[background-color,color,transform] duration-500 ${
                          on ? "rotate-[-6deg] bg-white/20 text-white" : "bg-electric/10 text-electric-600"
                        }`}
                      >
                        <I className="size-6" aria-hidden />
                      </span>
                      <h4 className="relative mt-6 text-xl font-extrabold leading-tight tracking-tight sm:mt-10">{t}</h4>
                      <p className={`relative mt-2 text-[14.5px] font-medium leading-relaxed transition-colors duration-500 ${on ? "text-white" : "text-slate-600"}`}>{d}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </Reveal>

          {/* progresso */}
          <div className="mt-1 flex items-center gap-4">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-line" aria-hidden>
              <div
                className="h-full rounded-full bg-gradient-to-r from-electric to-cyan transition-[width] duration-500 ease-out"
                style={{ width: `${(Math.min(active + pp, segments.length) / segments.length) * 100}%` }}
              />
            </div>
            <div className="flex gap-2 sm:hidden">
              <button type="button" onClick={prev} aria-label="Segmentos anteriores" className="grid size-10 place-items-center rounded-full bg-white text-ink ring-1 ring-line">
                <ArrowLeft className="size-4" />
              </button>
              <button type="button" onClick={next} aria-label="Próximos segmentos" className="grid size-10 place-items-center rounded-full bg-electric-600 text-white">
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
