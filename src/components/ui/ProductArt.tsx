/* Ilustrações vetoriais de produtos (originais), reutilizadas na cena e nas etapas. */

export function Battery({ uid = "a" }: { uid?: string }) {
  return (
    <svg viewBox="0 0 120 150" className="h-full w-full drop-shadow-[0_18px_22px_rgba(12,37,85,0.35)]" aria-hidden>
      <defs>
        <linearGradient id={`bat-front-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#1b3a7a" />
          <stop offset="0.55" stopColor="#12295c" />
          <stop offset="1" stopColor="#0b1d45" />
        </linearGradient>
        <linearGradient id={`bat-side-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#0a1a3d" />
          <stop offset="1" stopColor="#081633" />
        </linearGradient>
        <linearGradient id={`bat-top-${uid}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#3a5fb0" />
          <stop offset="1" stopColor="#24468f" />
        </linearGradient>
      </defs>
      {/* topo */}
      <path d="M18 26 L78 14 L104 24 L44 36 Z" fill={`url(#bat-top-${uid})`} />
      {/* alça */}
      <path d="M40 24 q20 -18 40 -8" fill="none" stroke="#0b1d45" strokeWidth="5" strokeLinecap="round" />
      {/* frente */}
      <path d="M18 26 L44 36 L44 138 L18 128 Z" fill={`url(#bat-side-${uid})`} />
      <path d="M44 36 L104 24 L104 126 L44 138 Z" fill={`url(#bat-front-${uid})`} />
      {/* reflexo */}
      <path d="M50 42 L60 40 L60 130 L50 132 Z" fill="#ffffff" opacity="0.08" />
      {/* indicador de carga */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={70 + i * 7} y={52 - i * 1.4} width="5" height="9" rx="1.2" fill={i < 3 ? "#04d5e8" : "#2a4f9a"} />
      ))}
      <path d="M62 84 l10 -14 v9 h7 l-10 14 v-9 z" fill="#04d5e8" opacity="0.9" />
      <rect x="54" y="112" width="40" height="5" rx="2.5" fill="#2563ff" opacity="0.7" />
    </svg>
  );
}

export function Bucket({ uid = "a" }: { uid?: string }) {
  return (
    <svg viewBox="0 0 120 130" className="h-full w-full drop-shadow-[0_16px_18px_rgba(12,37,85,0.3)]" aria-hidden>
      <defs>
        <linearGradient id={`bk-body-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#cfdcf2" />
          <stop offset="0.35" stopColor="#ffffff" />
          <stop offset="0.7" stopColor="#e3ebf8" />
          <stop offset="1" stopColor="#b7c7e2" />
        </linearGradient>
        <linearGradient id={`bk-band-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#1a4fe0" />
          <stop offset="0.4" stopColor="#3b7bff" />
          <stop offset="1" stopColor="#1640b8" />
        </linearGradient>
        <linearGradient id={`bk-lid-${uid}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f7faff" />
          <stop offset="1" stopColor="#c9d6ec" />
        </linearGradient>
      </defs>
      {/* alça */}
      <path d="M18 34 C20 4 100 4 102 34" fill="none" stroke="#8fa3c4" strokeWidth="3" />
      {/* corpo */}
      <path d="M14 34 L22 116 C24 124 96 124 98 116 L106 34 Z" fill={`url(#bk-body-${uid})`} />
      {/* faixa/rótulo */}
      <path d="M17 62 L103 62 L100 92 C80 98 40 98 20 92 Z" fill={`url(#bk-band-${uid})`} />
      <rect x="40" y="70" width="40" height="4" rx="2" fill="#ffffff" opacity="0.9" />
      <rect x="46" y="79" width="28" height="3" rx="1.5" fill="#ffffff" opacity="0.55" />
      {/* tampa */}
      <ellipse cx="60" cy="34" rx="46" ry="11" fill={`url(#bk-lid-${uid})`} stroke="#a8b8d4" strokeWidth="1" />
      <ellipse cx="60" cy="33" rx="36" ry="7" fill="none" stroke="#b9c8e2" strokeWidth="1.2" />
      {/* reflexo */}
      <path d="M34 44 L38 110" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

