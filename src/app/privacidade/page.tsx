import type { Metadata } from "next";
import { Logo } from "@/components/ui/Logo";
import { hasProductionUrl } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a DM Empresarial trata os dados enviados pelo formulário de diagnóstico comercial.",
  ...(hasProductionUrl ? { alternates: { canonical: "/privacidade" } } : {}),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "DM Empresarial",
    title: "Política de Privacidade | DM Empresarial",
    description: "Como a DM Empresarial trata os dados enviados pelo formulário de diagnóstico comercial.",
    ...(hasProductionUrl ? { url: "/privacidade", images: ["/opengraph-image"] } : {}),
  },
};

const sections: [string, string][] = [
  [
    "Quais dados coletamos",
    "Pelo formulário de diagnóstico comercial: nome, nome da empresa, número de WhatsApp, segmento de atuação e se a empresa já vende em marketplaces, além do registro do seu consentimento. Não solicitamos dados sensíveis.",
  ],
  [
    "Para que usamos",
    "Exclusivamente para entrar em contato sobre o serviço de gestão de marketplaces, entender a operação da sua empresa e preparar uma proposta comercial.",
  ],
  [
    "Base legal",
    "Consentimento do titular (art. 7º, I, da Lei nº 13.709/2018 — LGPD) e procedimentos preliminares relacionados a contrato, a pedido do titular (art. 7º, V).",
  ],
  [
    "Como os dados circulam",
    "Ao concluir o envio, você pode ser direcionado ao WhatsApp para continuar a conversa; nesse caso, a mensagem é enviada por você pelo aplicativo, sujeita também às políticas do WhatsApp. Quando houver uma ferramenta de gestão de contatos (CRM) configurada, os dados do formulário são enviados a ela para organizar o atendimento. Não vendemos nem cedemos seus dados para fins de marketing de terceiros.",
  ],
  [
    "Retenção",
    "Os dados são mantidos pelo tempo necessário ao atendimento comercial ou até que você solicite a exclusão, salvo obrigação legal de guarda.",
  ],
  [
    "Seus direitos",
    "Você pode solicitar confirmação, acesso, correção, anonimização, portabilidade ou exclusão dos seus dados e revogar o consentimento a qualquer momento, pelo mesmo canal de atendimento utilizado no contato com a DM Empresarial.",
  ],
  [
    "Cookies e medição",
    "Quando ativadas, ferramentas de medição de audiência (Google Analytics e Meta Pixel) registram dados de navegação para avaliar o desempenho da página e das campanhas.",
  ],
];

export default function Privacidade() {
  return (
    <main id="conteudo" className="min-h-screen bg-mist">
      <header className="bg-navy-950">
        <div className="mx-auto flex h-20 max-w-3xl items-center px-5">
          <a href="/" aria-label="Voltar para a página inicial">
            <Logo className="h-10 w-auto" />
          </a>
        </div>
      </header>
      <article className="mx-auto max-w-3xl px-5 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">LGPD</p>
        <h1 className="mt-3 text-4xl font-semibold text-navy-900">Política de Privacidade</h1>
        <p className="mt-4 text-slate-600">
          Esta política explica como a DM Empresarial trata os dados pessoais enviados por meio da página de gestão de
          marketplaces.
        </p>
        <p className="mt-2 text-sm text-slate-600">Última atualização: novembro de 2026.</p>
        <div className="mt-12 space-y-10">
          {sections.map(([t, p]) => (
            <section key={t}>
              <h2 className="text-xl font-semibold text-navy-900">{t}</h2>
              <p className="mt-3 leading-relaxed text-slate-700">{p}</p>
            </section>
          ))}
        </div>
        <a href="/" className="mt-14 inline-flex text-sm font-semibold text-electric-600 hover:underline">
          ← Voltar para a página inicial
        </a>
      </article>
    </main>
  );
}
