import { site } from "@/config/site";

/** Retorna o link do WhatsApp comercial ou null quando o número não foi configurado. */
export function whatsappLink(message: string = site.whatsapp.defaultMessage): string | null {
  if (!site.whatsapp.number) return null;
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export const hasWhatsapp = () => Boolean(site.whatsapp.number);
