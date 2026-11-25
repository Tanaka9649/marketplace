import { Reveal } from "./Reveal";

type Props = {
  label?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  dark?: boolean;
  align?: "left" | "center";
  className?: string;
  as?: "h2" | "h3";
  id?: string;
};

/** Rótulo discreto de seção: texto normal, sem caixa alta espaçada. */
export function Label({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`flex items-center gap-2 text-sm font-medium ${dark ? "text-teal-300" : "text-teal-700"}`}>
      <span className={`size-1.5 rotate-45 ${dark ? "bg-teal-400" : "bg-teal-600"}`} aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({ label, title, description, dark, align = "left", className = "", as: H = "h2", id }: Props) {
  const center = align === "center";
  return (
    <Reveal className={`${center ? "mx-auto text-center [&_p]:justify-center" : ""} max-w-2xl ${className}`}>
      {label ? <Label dark={dark}>{label}</Label> : null}
      <H
        id={id}
        className={`${label ? "mt-4" : ""} text-[1.85rem] font-semibold leading-[1.12] sm:text-4xl lg:text-[2.6rem] ${
          dark ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </H>
      {description ? (
        <p className={`mt-4 text-[17px] leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}>{description}</p>
      ) : null}
    </Reveal>
  );
}
