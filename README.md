# DM Empresarial · Landing de Gestão de Marketplaces

Landing page comercial (Next.js 15 · TypeScript · Tailwind CSS 4 · Motion · Lucide).

## Publicar na Vercel (sem terminal)

1. Crie um repositório no GitHub e envie **todo o conteúdo desta pasta** (Add file → Upload files).
   Não envie `node_modules`, `.next` nem `out`, se existirem.
2. Na Vercel: **Add New → Project → Import** o repositório. O framework é detectado como Next.js; não altere nada.
3. Em **Settings → Environment Variables**, cadastre as variáveis abaixo e faça **Redeploy**.

## Variáveis de ambiente

| Variável | Obrigatória | Para que serve |
|---|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | **Sim** | WhatsApp comercial, só números com DDI + DDD (formato `55DDXXXXXXXXX`). Sem ela, os botões levam ao formulário e o botão flutuante não aparece. |
| `NEXT_PUBLIC_SITE_URL` | Opcional | Domínio final. Usado em canonical, Open Graph e sitemap. Se vazio, a Vercel usa automaticamente o domínio de produção do projeto. |
| `NEXT_PUBLIC_WHATSAPP_MESSAGE` | Não | Mensagem inicial padrão do WhatsApp. |
| `LEAD_WEBHOOK_URL` | Não | Endereço que recebe os leads (n8n, Make, Zapier, CRM). Sem ela, nada é gravado e o visitante é conduzido ao WhatsApp com os dados preenchidos. |
| `LEAD_WEBHOOK_TOKEN` | Não | Token enviado como `Authorization: Bearer …` ao webhook. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Não | Ativa o Meta Pixel (PageView, Lead, Contact). |
| `NEXT_PUBLIC_GA_ID` | Não | Ativa o Google Analytics 4 (`G-XXXXXXX`). |

Variáveis `NEXT_PUBLIC_*` são aplicadas no build: depois de alterar, faça Redeploy.

### Formato do lead enviado ao webhook (POST JSON)

```json
{
  "nome": "…", "empresa": "…", "whatsapp": "34999999999",
  "segmento": "Materiais de construção", "vende_marketplace": true,
  "consentimento_lgpd": true, "consentimento_em": "2026-11-24T12:00:00.000Z",
  "origem": "landing-gestao-marketplaces"
}
```

## Checklist antes de publicar

1. **WhatsApp comercial** — cadastrar `NEXT_PUBLIC_WHATSAPP_NUMBER` (só números, com 55 + DDD). Sem ele, os botões
   levam ao formulário e o formulário informa que o canal está indisponível.
2. **Destino dos leads** — cadastrar `LEAD_WEBHOOK_URL` (e, se o destino exigir, `LEAD_WEBHOOK_TOKEN`).
   Sem ele, **nenhum lead é registrado**: o visitante é levado ao WhatsApp com a mensagem preenchida.
   Depois do deploy, envie um lead de teste e confirme que ele chegou ao CRM/automação.
3. **Domínio** — na Vercel, canonical, Open Graph, sitemap e robots usam automaticamente o domínio de produção do
   projeto. `NEXT_PUBLIC_SITE_URL` só é necessário para forçar outro domínio.
4. **Analytics (opcional)** — `NEXT_PUBLIC_META_PIXEL_ID` e `NEXT_PUBLIC_GA_ID`.
5. Após alterar variáveis `NEXT_PUBLIC_*`, faça **Redeploy**.

### Comportamento do formulário

| Situação | O que o visitante vê |
|---|---|
| Webhook configurado e respondeu 2xx | "Recebemos seus dados." + botão para continuar no WhatsApp |
| Webhook configurado, mas falhou (erro ou fora do ar) | "Não conseguimos registrar o envio." + envio pelo WhatsApp |
| Webhook não configurado | "Falta só um passo." + envio pelo WhatsApp (nada é gravado) |
| Campo de isca antispam preenchido (robô) | Descartado no servidor; nada é enviado ao webhook |

## Onde editar

- Textos gerais, menu e segmentos: `src/config/site.ts`
- Seções: `src/components/sections/*` (uma por arquivo)
- Perguntas frequentes: `src/components/sections/faq-data.ts`
- Cores e fontes: `src/app/globals.css` (bloco `@theme`; cores extraídas da logo: `#2A4D7C` e `#0199A8`)
- Logo: `public/brand/` · Logos dos marketplaces: `public/marketplaces/`
- Política de privacidade: `src/app/privacidade/page.tsx`

## Logos dos marketplaces

Os arquivos em `public/marketplaces/` são as marcas oficiais em SVG (Mercado Livre — símbolo do aperto de mãos;
Shopee; TikTok; iFood). Se a DM receber os kits de marca oficiais dos parceiros (ex.: o selo específico "TikTok Shop"),
basta substituir o arquivo mantendo o mesmo nome.

## Rodar localmente (opcional)

```bash
npm install
cp .env.example .env.local
npm run dev      # http://localhost:3000
npm run build    # build de produção
```
