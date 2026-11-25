import { NextResponse } from "next/server";
import { validateLead, type Lead } from "@/lib/leads";

/**
 * Recebe o lead e repassa para LEAD_WEBHOOK_URL (CRM, n8n, Make, Zapier…).
 * Sem webhook configurado, nada é gravado: responde { stored: false }
 * e o site conduz o visitante ao WhatsApp comercial.
 */
export async function POST(req: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  const str = (v: unknown) => (typeof v === "string" ? v.slice(0, 200) : "");
  const body: Lead & { website?: string } = {
    nome: str(raw.nome),
    empresa: str(raw.empresa),
    whatsapp: str(raw.whatsapp),
    segmento: str(raw.segmento),
    vendeMarketplace: raw.vendeMarketplace === "sim" || raw.vendeMarketplace === "nao" ? raw.vendeMarketplace : "",
    consentimento: raw.consentimento === true,
    website: str(raw.website),
  };

  // honeypot anti-spam
  if (body.website) {
    return NextResponse.json({ ok: true, stored: false });
  }

  const errors = validateLead(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) {
    return NextResponse.json({ ok: true, stored: false });
  }

  const payload = {
    nome: body.nome.trim(),
    empresa: body.empresa.trim(),
    whatsapp: body.whatsapp.replace(/\D/g, ""),
    segmento: body.segmento,
    vende_marketplace: body.vendeMarketplace === "sim",
    consentimento_lgpd: true,
    consentimento_em: new Date().toISOString(),
    origem: "landing-gestao-marketplaces",
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    return NextResponse.json({ ok: true, stored: true });
  } catch (err) {
    console.error("[leads] falha ao enviar para o webhook", err);
    return NextResponse.json({ ok: false, error: "webhook_failed" }, { status: 502 });
  }
}
