export function DemoBadge({ label = "Dados demonstrativos", light }: { label?: string; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${
        light ? "bg-navy-900/[0.05] text-slate-500 ring-1 ring-navy-900/10" : "bg-white/[0.06] text-slate-400 ring-1 ring-white/10"
      }`}
    >
      <span className="size-1.5 rounded-full bg-amber-400" aria-hidden />
      {label}
    </span>
  );
}
