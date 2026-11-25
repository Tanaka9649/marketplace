import type { CSSProperties, HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  delay?: number;
  as?: "div" | "section" | "article" | "li";
  /** mask: título revelado por máscara · scale: entrada com profundidade */
  variant?: "fade" | "mask" | "scale" | "slide";
  /** compatibilidade com a versão anterior */
  mask?: boolean;
};

/**
 * Entrada ao rolar, implementada em CSS (ver globals.css + reveal-script).
 * Sem JavaScript ou com movimento reduzido, o conteúdo aparece imediatamente.
 */
export function Reveal({ delay = 0, as: Tag = "div", variant, mask, style, children, ...rest }: Props) {
  const v = variant ?? (mask ? "mask" : "fade");
  return (
    <Tag
      data-reveal={v === "fade" ? "" : v}
      suppressHydrationWarning
      style={{ ...style, ["--d" as string]: `${delay * 1000}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}
