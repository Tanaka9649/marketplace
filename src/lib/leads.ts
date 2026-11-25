export type Lead = {
  nome: string;
  empresa: string;
  whatsapp: string;
  segmento: string;
  vendeMarketplace: "sim" | "nao" | "";
  consentimento: boolean;
};

export type LeadErrors = Partial<Record<keyof Lead, string>>;

export const segmentOptions = [
  "Loja física / varejo",
  "Distribuidor / atacado",
  "Materiais de construção",
  "Bicicletas elétricas e acessórios",
  "Produtos técnicos / industriais",
  "Alimentação",
  "Outro segmento",
];

export function onlyDigits(v: string) {
  return v.replace(/\D/g, "");
}

export function formatPhone(v: string) {
  const d = onlyDigits(v).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function validateLead(l: Lead): LeadErrors {
  const e: LeadErrors = {};
  if (l.nome.trim().length < 3) e.nome = "Informe seu nome.";
  if (l.empresa.trim().length < 2) e.empresa = "Informe o nome da empresa.";
  const d = onlyDigits(l.whatsapp);
  if (d.length < 10 || d.length > 11) e.whatsapp = "Informe um WhatsApp com DDD.";
  if (!l.segmento) e.segmento = "Selecione o segmento.";
  if (!l.vendeMarketplace) e.vendeMarketplace = "Selecione uma opção.";
  if (!l.consentimento) e.consentimento = "É necessário autorizar o contato.";
  return e;
}

export function leadToWhatsappMessage(l: Lead) {
  return [
    "Olá! Quero solicitar um diagnóstico comercial para marketplaces.",
    "",
    `Nome: ${l.nome.trim()}`,
    `Empresa: ${l.empresa.trim()}`,
    `WhatsApp: ${formatPhone(l.whatsapp)}`,
    `Segmento: ${l.segmento}`,
    `Já vende em marketplaces: ${l.vendeMarketplace === "sim" ? "Sim" : "Não"}`,
  ].join("\n");
}
