/**
 * Camada única de eventos. Envia para Meta Pixel e Google Analytics
 * apenas quando os scripts estiverem carregados (IDs configurados).
 */
type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const META_STANDARD = new Set(["Lead", "Contact", "ViewContent", "CompleteRegistration"]);

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  try {
    if (window.fbq) {
      window.fbq(META_STANDARD.has(event) ? "track" : "trackCustom", event, params);
    }
    if (window.gtag) {
      window.gtag("event", event, params);
    }
  } catch {
    /* analytics nunca deve quebrar a página */
  }
}
