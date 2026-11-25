"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import {
  formatPhone,
  leadToWhatsappMessage,
  segmentOptions,
  validateLead,
  type Lead,
  type LeadErrors,
} from "@/lib/leads";
import { whatsappLink } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

type Status = "idle" | "sending" | "stored" | "handoff" | "error";

const empty: Lead = { nome: "", empresa: "", whatsapp: "", segmento: "", vendeMarketplace: "", consentimento: false };

const field =
  "w-full rounded-xl border bg-white px-4 py-3 text-base placeholder:text-slate-500 outline-none transition-all duration-200 focus:ring-4 focus:ring-electric/15";

export function LeadForm() {
  const [lead, setLead] = useState<Lead>(empty);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honey, setHoney] = useState("");

  const set = <K extends keyof Lead>(k: K, v: Lead[K]) => {
    setLead((l) => ({ ...l, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const wa = whatsappLink(leadToWhatsappMessage(lead));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateLead(lead);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`lead-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, website: honey }),
      });
      if (res.status === 422) {
        const data = await res.json();
        setErrors(data.errors ?? {});
        setStatus("idle");
        return;
      }
      if (res.status === 502) {
        setStatus("error");
        return;
      }
      const data = res.ok ? await res.json().catch(() => ({})) : {};
      track("Lead", { segmento: lead.segmento, vende_marketplace: lead.vendeMarketplace });
      setStatus(data.stored ? "stored" : "handoff");
    } catch {
      // sem API disponível (ex.: prévia estática) → segue para o WhatsApp
      track("Lead", { segmento: lead.segmento, vende_marketplace: lead.vendeMarketplace });
      setStatus("handoff");
    }
  }

  const err = (k: keyof Lead) =>
    errors[k] ? (
      <p id={`lead-${k}-err`} className="mt-1.5 flex items-center gap-1 text-[13px] text-rose-600">
        <AlertCircle className="size-3.5" aria-hidden /> {errors[k]}
      </p>
    ) : null;

  const border = (k: keyof Lead) => (errors[k] ? "border-rose-400 focus:border-rose-500" : "border-slate-200 focus:border-electric");

  if (status === "stored" || status === "handoff" || status === "error") {
    const title =
      status === "stored" ? "Recebemos seus dados." : status === "error" ? "Não conseguimos registrar o envio." : "Falta só um passo.";
    const text =
      status === "stored"
        ? "Nossa equipe vai analisar as informações e falar com você pelo WhatsApp informado. Se preferir, adiante a conversa agora."
        : status === "error"
          ? "Houve uma falha ao registrar seus dados. Envie as mesmas informações pelo WhatsApp para não perder o contato."
          : "Envie suas informações pelo WhatsApp comercial para concluir a solicitação do diagnóstico. A mensagem já está preenchida.";
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        role="status"
        aria-live="polite"
        className="flex min-h-[480px] flex-col items-center justify-center rounded-2xl bg-white p-8 text-center text-navy-900 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)] sm:p-10"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
          className={`grid size-16 place-items-center rounded-full ${
            status === "error" ? "bg-amber-50 text-amber-600" : "bg-teal-50 text-teal-700"
          }`}
        >
          {status === "error" ? <AlertCircle className="size-8" /> : <CheckCircle2 className="size-8" />}
        </motion.span>
        <h3 className="mt-6 text-2xl font-semibold text-navy-900">{title}</h3>
        <p className="mt-3 max-w-sm leading-relaxed text-slate-600">{text}</p>
        {wa ? (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("Contact", { origem: "formulario" })}
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#25D366] px-6 font-semibold text-navy-950 transition-all hover:brightness-110"
          >
            <MessageCircle className="size-5" aria-hidden />
            {status === "stored" ? "Continuar no WhatsApp" : "Enviar pelo WhatsApp"}
          </a>
        ) : (
          <p className="mt-8 rounded-xl bg-mist px-4 py-3 text-sm text-slate-600">
            O canal de WhatsApp ainda não está disponível. Tente novamente em breve.
          </p>
        )}
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setLead(empty);
          }}
          className="mt-5 text-sm text-slate-500 underline-offset-4 hover:text-navy-900 hover:underline"
        >
          Preencher novamente
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label="Solicitar meu diagnóstico"
      className="relative rounded-[28px] bg-white p-5 text-ink shadow-[0_40px_90px_-40px_rgba(7,26,61,0.75)] sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="lead-nome" className="mb-1.5 block text-sm font-bold text-ink">
            Nome
          </label>
          <input
            id="lead-nome"
            autoComplete="name"
            value={lead.nome}
            onChange={(e) => set("nome", e.target.value)}
            aria-invalid={Boolean(errors.nome)}
            aria-describedby={errors.nome ? "lead-nome-err" : undefined}
            className={`${field} ${border("nome")} text-navy-900`}
            placeholder="Seu nome completo"
          />
          {err("nome")}
        </div>
        <div>
          <label htmlFor="lead-empresa" className="mb-1.5 block text-sm font-bold text-ink">
            Empresa
          </label>
          <input
            id="lead-empresa"
            autoComplete="organization"
            value={lead.empresa}
            onChange={(e) => set("empresa", e.target.value)}
            aria-invalid={Boolean(errors.empresa)}
            aria-describedby={errors.empresa ? "lead-empresa-err" : undefined}
            className={`${field} ${border("empresa")} text-navy-900`}
            placeholder="Nome da empresa"
          />
          {err("empresa")}
        </div>
        <div>
          <label htmlFor="lead-whatsapp" className="mb-1.5 block text-sm font-bold text-ink">
            WhatsApp
          </label>
          <input
            id="lead-whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            value={lead.whatsapp}
            onChange={(e) => set("whatsapp", formatPhone(e.target.value))}
            aria-invalid={Boolean(errors.whatsapp)}
            aria-describedby={errors.whatsapp ? "lead-whatsapp-err" : undefined}
            className={`${field} ${border("whatsapp")} tabular text-navy-900`}
            placeholder="(00) 00000-0000"
          />
          {err("whatsapp")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="lead-segmento" className="mb-1.5 block text-sm font-bold text-ink">
            Segmento de atuação
          </label>
          <select
            id="lead-segmento"
            value={lead.segmento}
            onChange={(e) => set("segmento", e.target.value)}
            aria-invalid={Boolean(errors.segmento)}
            aria-describedby={errors.segmento ? "lead-segmento-err" : undefined}
            className={`${field} ${border("segmento")} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E")] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10 ${
              lead.segmento ? "text-navy-900" : "text-slate-500"
            }`}
          >
            <option value="" disabled className="">
              Selecione
            </option>
            {segmentOptions.map((s) => (
              <option key={s} value={s} className="">
                {s}
              </option>
            ))}
          </select>
          {err("segmento")}
        </div>

        <fieldset
          className="sm:col-span-2"
          aria-invalid={Boolean(errors.vendeMarketplace)}
          aria-describedby={errors.vendeMarketplace ? "lead-vendeMarketplace-err" : undefined}
        >
          <legend className="mb-1.5 block text-sm font-bold text-ink">Já vende em marketplaces?</legend>
          <div className="grid grid-cols-2 gap-3">
            {(["sim", "nao"] as const).map((v, i) => (
              <label
                key={v}
                className={`flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-lg border has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-electric/20 text-[15px] font-medium transition-all ${
                  lead.vendeMarketplace === v
                    ? "border-electric bg-brand-100 text-ink"
                    : errors.vendeMarketplace
                      ? "border-rose-400 text-slate-600"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                <input
                  id={i === 0 ? "lead-vendeMarketplace" : undefined}
                  type="radio"
                  name="vende"
                  value={v}
                  checked={lead.vendeMarketplace === v}
                  onChange={() => set("vendeMarketplace", v)}
                  className="sr-only"
                />
                <span
                  className={`size-4 rounded-full border-2 transition-all ${
                    lead.vendeMarketplace === v ? "border-electric bg-electric shadow-[inset_0_0_0_3px_#fff]" : "border-slate-300"
                  }`}
                  aria-hidden
                />
                {v === "sim" ? "Sim" : "Não"}
              </label>
            ))}
          </div>
          {err("vendeMarketplace")}
        </fieldset>

        {/* honeypot */}
        <div className="hidden" aria-hidden>
          <label>
            Website
            <input tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} />
          </label>
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-slate-600">
            <input
              id="lead-consentimento"
              type="checkbox"
              checked={lead.consentimento}
              onChange={(e) => set("consentimento", e.target.checked)}
              aria-invalid={Boolean(errors.consentimento)}
              aria-describedby={errors.consentimento ? "lead-consentimento-err" : undefined}
              className="mt-0.5 size-5 shrink-0 accent-electric"
            />
            <span>
              Autorizo a DM Empresarial a utilizar os dados informados para entrar em contato sobre este serviço, conforme
              a{" "}
              <a href="/privacidade" target="_blank" className="font-medium text-teal-700 underline underline-offset-2 hover:text-teal-600">
                Política de Privacidade
              </a>{" "}
              (LGPD).
            </span>
          </label>
          {err("consentimento")}
        </div>
      </div>

      <p role="alert" className="mt-6 text-sm font-medium text-rose-600 empty:hidden">
        {(() => {
          const n = Object.values(errors).filter(Boolean).length;
          return n ? `Revise ${n === 1 ? "o campo destacado" : `os ${n} campos destacados`} para continuar.` : "";
        })()}
      </p>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-4 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-electric px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_16px_32px_-14px_rgba(37,99,255,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-electric-600 sm:text-base disabled:cursor-wait disabled:opacity-80"
      >
        <AnimatePresence mode="wait" initial={false}>
          {status === "sending" ? (
            <motion.span key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2">
              <Loader2 className="size-5 animate-spin" aria-hidden /> Enviando…
            </motion.span>
          ) : (
            <motion.span key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2">
              Solicitar meu diagnóstico
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
      <p className="mt-4 text-center text-[13px] text-slate-500">Seus dados são usados apenas para este contato comercial.</p>
    </form>
  );
}
