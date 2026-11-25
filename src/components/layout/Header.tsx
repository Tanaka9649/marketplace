"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { nav } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { track } from "@/lib/analytics";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const bar = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // observa todas as seções: fora das seções do menu, nenhum item fica destacado
    const ids = new Set<string>(nav.map((n) => n.id));
    const els = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(ids.has(e.target.id) ? e.target.id : "")),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // no celular, o item ativo da barra rola para ficar visível
  useEffect(() => {
    const ul = bar.current;
    const el = ul?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!ul || !el) return;
    ul.scrollTo({ left: el.offsetLeft - ul.clientWidth / 2 + el.offsetWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <header className="drop-in fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5" style={{ animationDelay: "50ms" }}>
      <div
        className={`mx-auto flex h-[60px] max-w-[1320px] items-center justify-between rounded-full pl-4 pr-2 transition-all duration-500 sm:pl-6 ${
          scrolled
            ? "bg-white/90 shadow-[0_12px_34px_-16px_rgba(12,37,85,0.35)] ring-1 ring-ink/[0.06] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <a href="#topo" aria-label="DM Empresarial — início" className="shrink-0">
          <Logo variant="color" className="h-9 w-auto sm:h-10" priority />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className={`relative rounded-full px-4 py-2 text-[14px] font-semibold transition-colors ${
                    active === n.id ? "text-electric" : "text-ink/75 hover:text-ink"
                  }`}
                >
                  {active === n.id ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-electric/[0.08]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative">{n.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#diagnostico"
            onClick={() => track("cta_header")}
            className="inline-flex min-h-11 items-center rounded-full bg-electric px-4 text-[13px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(37,99,255,0.8)] transition-all hover:-translate-y-0.5 hover:bg-electric-600 sm:px-5 sm:text-[14px]"
          >
            <span className="sm:hidden">Avaliar empresa</span>
            <span className="hidden sm:inline">Avaliar minha empresa</span>
          </a>
        </div>
      </div>

      {/* barra de seções no celular e tablet */}
      <nav aria-label="Seções" className="mx-auto mt-2 max-w-[1320px] lg:hidden">
        <ul
          ref={bar}
          className="no-scrollbar flex gap-1 overflow-x-auto rounded-full bg-white/90 p-1.5 shadow-[0_12px_30px_-16px_rgba(12,37,85,0.4)] ring-1 ring-ink/[0.06] backdrop-blur-xl"
        >
          {nav.map((n) => (
            <li key={n.id} className="shrink-0">
              <a
                href={`#${n.id}`}
                data-id={n.id}
                aria-current={active === n.id ? "true" : undefined}
                className={`relative flex min-h-9 items-center rounded-full px-3.5 text-[13.5px] font-bold transition-colors duration-300 ${
                  active === n.id ? "text-white" : "text-ink/75"
                }`}
              >
                {active === n.id ? (
                  <motion.span
                    layoutId="nav-chip"
                    className="absolute inset-0 rounded-full bg-electric-600"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative">{n.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
