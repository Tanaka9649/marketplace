import type { CSSProperties } from "react";

/**
 * Revela palavra por palavra por trás de uma máscara (CSS puro).
 * Roda mesmo sem JavaScript; com movimento reduzido, aparece pronto.
 */
export function MaskWords({
  text,
  start = 0,
  step = 70,
  className = "",
}: {
  text: string;
  start?: number;
  step?: number;
  className?: string;
}) {
  return (
    <>
      {text.split(" ").map((w, i, arr) => (
        <span key={i}>
          <span className={`mword ${className}`}>
            <span style={{ animationDelay: `${start + i * step}ms` } as CSSProperties}>{w}</span>
          </span>
          {i < arr.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}
