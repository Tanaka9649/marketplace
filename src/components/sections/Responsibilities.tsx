import Image from "next/image";
import { Building2, Package } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const dm = ["Implantação", "Anúncios", "Estratégias comerciais", "Promoções", "Integrações", "Indicadores"];
const client = ["Atendimento", "Estoque físico", "Embalagem", "Entregas", "Trocas e devoluções", "Emissão fiscal e conciliação financeira"];

export function Responsibilities() {
  return (
    <section className="bg-ice py-16 sm:py-24" aria-labelledby="resp-title">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <Reveal variant="mask" className="max-w-4xl">
          <p className="text-sm font-bold text-electric-600">Parceria</p>
          <h2 id="resp-title" className="h-section mt-3 text-[2.35rem] text-ink sm:text-[3.4rem] lg:text-[4rem]">
            Nós cuidamos dos marketplaces. <span className="text-electric">Sua empresa cuida dos pedidos.</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch lg:gap-0">
          {/* DM */}
          <Reveal variant="scale" className="relative overflow-hidden rounded-[32px] bg-electric p-7 text-white sm:p-9">
            <div className="absolute -right-16 -top-16 size-56 rounded-full bg-cyan/30 blur-3xl" aria-hidden />
            <span className="relative inline-flex items-center rounded-2xl bg-white px-4 py-2.5 shadow-[0_14px_30px_-14px_rgba(7,26,61,0.55)]">
              <Image src="/brand/dm-logo.png" alt="DM Empresarial" width={933} height={572} className="h-9 w-auto" />
            </span>
            <h3 className="relative mt-6 text-[1.9rem] font-extrabold leading-none tracking-[-0.035em]">DM Empresarial</h3>
            <p className="relative mt-2 text-[15px] font-semibold text-white">Antes do pedido: a operação nos canais.</p>
            <ul className="stagger relative mt-7 flex flex-wrap gap-2">
              {dm.map((t) => (
                <li key={t} className="rounded-full bg-electric-600 px-4 py-2 text-[14.5px] font-bold ring-1 ring-white/25">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* passagem do pedido */}
          <div className="relative flex items-center justify-center py-2 lg:w-40 lg:py-0" aria-hidden>
            <div className="relative h-14 w-full max-w-[220px] lg:h-full lg:max-w-none">
              <span className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-gradient-to-r from-electric via-cyan to-ink/30" />
              <span className="handoff absolute top-1/2 grid size-11 place-items-center rounded-2xl bg-white text-electric shadow-[0_14px_30px_-12px_rgba(37,99,255,0.7)] ring-1 ring-line">
                <Package className="size-5" />
              </span>
            </div>
            <span className="absolute -bottom-1 whitespace-nowrap rounded-full bg-white px-3 py-1 text-[11.5px] font-extrabold text-ink ring-1 ring-line lg:bottom-[calc(50%-58px)]">
              Pedido confirmado
            </span>
          </div>

          {/* Contratante */}
          <Reveal variant="scale" delay={0.12} className="rounded-[32px] bg-white p-7 ring-1 ring-line sm:p-9">
            <span className="grid size-11 place-items-center rounded-2xl bg-ink text-white">
              <Building2 className="size-5" aria-hidden />
            </span>
            <h3 className="mt-5 text-[1.9rem] font-extrabold leading-none tracking-[-0.035em] text-ink">Sua empresa</h3>
            <p className="mt-2 text-[15px] font-semibold text-slate-600">Depois do pedido: a operação física.</p>
            <ul className="stagger mt-7 flex flex-wrap gap-2">
              {client.map((t) => (
                <li key={t} className="rounded-full bg-ice px-4 py-2 text-[14.5px] font-bold text-ink ring-1 ring-line">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <p className="mt-6 max-w-3xl text-[14px] font-medium leading-relaxed text-slate-600">
          A DM pode oferecer ferramentas e automações de apoio, mas a execução dessas atividades continua com a sua empresa.
        </p>
      </div>
    </section>
  );
}
