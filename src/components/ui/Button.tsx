"use client";
import { ArrowRight } from "lucide-react";
import { track } from "@/lib/analytics";

type Variant = "primary" | "ghost" | "outline" | "dark" | "light" | "electric" | "white";

const styles: Record<Variant, string> = {
  primary:
    "bg-teal-500 text-navy-950 hover:bg-teal-400",
  ghost: "text-white ring-1 ring-inset ring-white/20 hover:bg-white/10 hover:ring-white/35",
  outline: "bg-white/70 text-ink ring-1 ring-inset ring-ink/15 hover:ring-electric/50 hover:text-electric",
  light: "bg-ink text-white shadow-[0_14px_30px_-14px_rgba(12,37,85,0.55)] hover:bg-electric",
  electric:
    "bg-electric text-white shadow-[0_18px_36px_-14px_rgba(37,99,255,0.75)] hover:bg-electric-600 hover:shadow-[0_22px_44px_-14px_rgba(37,99,255,0.9)] hover:-translate-y-0.5",
  white: "bg-white text-electric shadow-[0_18px_36px_-16px_rgba(7,26,61,0.5)] hover:-translate-y-0.5",
  dark: "bg-navy-900 text-white hover:bg-navy-800 shadow-[0_10px_30px_-12px_rgba(6,18,41,0.6)]",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  arrow?: boolean;
  external?: boolean;
  event?: string;
  className?: string;
  icon?: React.ReactNode;
};

export function Button({ href, children, variant = "primary", arrow, external, event, className = "", icon }: Props) {
  return (
    <a
      href={href}
      onClick={() => event && track(event, { href })}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-bold transition-all duration-300 active:scale-[0.98] ${styles[variant]} ${className}`}
    >
      {icon}
      <span>{children}</span>
      {arrow ? (
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
      ) : null}
    </a>
  );
}
