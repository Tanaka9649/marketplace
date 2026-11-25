"use client";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { BatteryCharging, Bike, Check, PaintBucket, RefreshCw, ShoppingBag } from "lucide-react";
import { BlingLogo, MarketplaceLogo, marketplaces } from "@/components/ui/MarketplaceLogo";

/*
  Cena do hero — "Ecossistema de vendas"
  Um estoque central (cartão) publicado em seis canais que orbitam ao redor.
  Tudo em CSS (órbita com @property + cos/sin), sem dependências pesadas.
  Sem JavaScript, a cena continua completa; o JS só adiciona parallax.
*/

const products = [
  { icon: BatteryCharging, name: "Bateria 48V 13Ah", qty: "24 un." },
  { icon: Bike, name: "Bicicleta elétrica aro 26", qty: "8 un." },
  { icon: PaintBucket, name: "Tinta acrílica 18 L", qty: "36 un." },
];

function Toast({ icon, title, children, className = "", style }: { icon: ReactNode; title: string; children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={`flex items-center gap-2.5 rounded-2xl bg-white/95 px-3 py-2.5 shadow-[0_18px_40px_-18px_rgba(12,37,85,0.45)] ring-1 ring-[#dde6f3] backdrop-blur ${className}`} style={style}>
      <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-[#e8efff] text-electric-600">{icon}</span>
      <span className="leading-tight">
        <span className="block whitespace-nowrap text-[12px] font-bold text-ink">{title}</span>
        <span className="flex items-center gap-1 whitespace-nowrap text-[11px] font-medium text-slate-600">{children}</span>
      </span>
    </div>
  );
}

export function HeroScene() {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  // a cena fica 100% visível até o centro dela passar do meio da tela;
  // só então começa a se afastar e a ficar transparente
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["center center", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 50]);
  const opacity = useTransform(scrollYProgress, [0.15, 1], [1, reduce ? 1 : 0.35]);

  // inclinação leve pelo ponteiro (somente mouse)
  useEffect(() => {
    const el = root.current;
    if (!el || reduce || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        const my = ((e.clientY - r.top) / r.height - 0.5) * 2;
        el.style.setProperty("--mx", Math.max(-1, Math.min(1, mx)).toFixed(3));
        el.style.setProperty("--my", Math.max(-1, Math.min(1, my)).toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <motion.div ref={wrap} style={{ y, opacity }} className="relative mx-auto w-full max-w-[620px] pb-2">
      <div
        ref={root}
        className="orbit-scene relative aspect-[1/1.08] w-full [container-type:inline-size] sm:aspect-square"
        role="img"
        aria-label="Ilustração: um estoque central publicado e sincronizado com Mercado Livre, Shopee, Amazon, Magalu, TikTok Shop e iFood, com os pedidos chegando ao Bling."
      >
        <div className="orbit-tilt absolute inset-0">
          {/* luz e piso */}
          <div
            className="absolute inset-[6%] rounded-full blur-2xl"
            style={{ background: "radial-gradient(circle at 50% 50%, rgba(4,213,232,0.30), rgba(37,99,255,0.16) 45%, transparent 70%)" }}
            aria-hidden
          />

          {/* piso, anéis da órbita e sinais circulando (mesmas medidas da órbita) */}
          <div className="orbit-ring" style={{ ["--k" as string]: 0.74 } as CSSProperties} aria-hidden>
            <span className="absolute inset-0 rounded-[50%] bg-[radial-gradient(closest-side,#ffffff,#e6efff_60%,rgba(37,99,255,0.08))]" />
          </div>
          <div className="orbit-ring rounded-[50%] border border-electric/10" style={{ ["--k" as string]: 1.16 } as CSSProperties} aria-hidden />
          <div className="orbit-ring orbit-ring-main" style={{ ["--k" as string]: 1 } as CSSProperties} aria-hidden />
          <div className="orbit-ring rounded-[50%] border border-dashed border-electric/20" style={{ ["--k" as string]: 0.83 } as CSSProperties} aria-hidden />
          <div className="orbit-spin-fast pulse-dot-group absolute inset-0" aria-hidden>
            {[0, 120, 240].map((a) => (
              <span key={a} className="orbit-dot" style={{ ["--a" as string]: `${a}deg` } as CSSProperties} />
            ))}
          </div>

          {/* seis canais em órbita */}
          <div className="orbit-spin absolute inset-0">
            {marketplaces.map((m, i) => (
              <div key={m.id} className="orbit-tile" style={{ ["--a" as string]: `${i * 60 - 90}deg` } as CSSProperties}>
                <div
                  className="scene-in grid h-full w-full place-items-center rounded-[22%] bg-white p-[18%] shadow-[0_16px_34px_-16px_rgba(12,37,85,0.5)] ring-1 ring-[#dde6f3]"
                  style={{ animationDelay: `${0.5 + i * 0.12}s` }}
                >
                  <MarketplaceLogo id={m.id} />
                </div>
              </div>
            ))}
          </div>

          {/* estoque central */}
          <div className="absolute left-1/2 top-1/2 z-[5] w-[clamp(214px,60cqw,318px)] sm:w-[clamp(214px,52cqw,318px)] -translate-x-1/2 -translate-y-1/2">
            <div className="scene-in" style={{ animationDelay: "0.25s" }}>
              <div className="orbit-card rounded-[22px] bg-white/95 p-3.5 shadow-[0_30px_70px_-30px_rgba(12,37,85,0.55)] ring-1 ring-[#dde6f3] backdrop-blur sm:p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="whitespace-nowrap text-[13px] font-extrabold tracking-tight text-ink sm:text-[15px]">Seu estoque</p>
                  <span className="flex items-center gap-1.5 rounded-full bg-[#e6fbfd] px-1.5 py-0.5 text-[10px] sm:px-2 font-bold text-[#006b7a] sm:text-[11px]">
                    <span className="relative flex size-1.5">
                      <span className="pulse-dot absolute inset-0 rounded-full bg-cyan" />
                      <span className="relative size-1.5 rounded-full bg-[#00a3b8]" />
                    </span>
                    Sincronizado
                  </span>
                </div>
                <ul className="mt-2.5 space-y-1.5">
                  {products.map(({ icon: I, name, qty }, i) => (
                    <li key={name} className={`${i === 2 ? "hidden sm:flex" : "flex"} items-center gap-2 rounded-xl bg-ice px-2 py-1.5 ring-1 ring-[#e3ebf7]`}>
                      <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-white text-electric-600 ring-1 ring-[#dde6f3] sm:size-8">
                        <I className="size-4" aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[11px] font-bold text-ink sm:text-[12.5px]">{name}</span>
                      <span className="tabular text-[10.5px] font-semibold text-slate-600 sm:text-[11.5px]">{qty}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2.5 border-t border-[#e3ebf7] pt-2.5">
                  <p className="text-[10.5px] font-semibold text-slate-600 sm:text-[11.5px]">Publicado em 6 canais</p>
                  <ul className="mt-1.5 grid grid-cols-6 gap-1">
                    {marketplaces.map((m, i) => (
                      <li key={m.id} className="relative grid aspect-[1.25] place-items-center rounded-lg bg-white p-[5px] ring-1 ring-[#dde6f3]" title={m.name}>
                        <MarketplaceLogo id={m.id} />
                        <span className="check-pop absolute -right-1 -top-1 grid size-3.5 place-items-center rounded-full bg-electric-600 text-white ring-2 ring-white" style={{ animationDelay: `${1.2 + i * 0.15}s` }}>
                          <Check className="size-2" strokeWidth={4} aria-hidden />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-medium text-slate-500">Exemplo ilustrativo</span>
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-600">
                    via <BlingLogo badge className="h-2.5 w-auto" />
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* notificações em sequência */}
      <div className="relative z-20 -mt-2 flex justify-center sm:absolute sm:bottom-[3%] sm:left-0 sm:mt-0 sm:block">
        <div className="scene-in relative" style={{ animationDelay: "1.6s" }}>
          <Toast icon={<ShoppingBag className="size-4" />} title="Pedido recebido" className="toast-cycle">
            Amazon <span aria-hidden>→</span> <BlingLogo badge className="h-3 w-auto" />
          </Toast>
          <Toast icon={<Check className="size-4" />} title="Anúncio publicado" className="toast-cycle absolute bottom-0 left-0" style={{ animationDelay: "3s" }}>
            Magalu · exemplo
          </Toast>
          <Toast icon={<RefreshCw className="size-4" />} title="Estoque atualizado" className="toast-cycle absolute bottom-0 left-0" style={{ animationDelay: "6s" }}>
            6 canais
          </Toast>
        </div>
      </div>
    </motion.div>
  );
}
