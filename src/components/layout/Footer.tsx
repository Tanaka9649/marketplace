import { Logo } from "@/components/ui/Logo";
import { footerExtra, nav } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-white text-slate-600">
      <div className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo variant="color" className="h-12 w-auto" />
            <p className="mt-5 text-sm leading-relaxed">
              Gestão profissional de marketplaces para empresas que vendem produtos físicos.
            </p>
          </div>
          <nav aria-label="Rodapé" className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="transition-colors hover:text-navy-900">
                {n.label}
              </a>
            ))}
            {footerExtra.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="transition-colors hover:text-navy-900">
                {n.label}
              </a>
            ))}
            <a href="/privacidade" className="transition-colors hover:text-navy-900">
              Privacidade
            </a>
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 text-xs leading-relaxed text-slate-600 lg:flex-row lg:justify-between">
          <p>© {new Date().getFullYear()} DM Empresarial. Todos os direitos reservados.</p>
          <p className="max-w-2xl lg:text-right">
            Mercado Livre, Shopee, Amazon, Magalu, TikTok Shop, iFood e Bling são marcas de seus respectivos titulares e aparecem apenas
            para identificar os canais com que trabalhamos. Gráficos e números exibidos nesta página são demonstrativos e
            não representam resultados de clientes.
          </p>
        </div>
      </div>
    </footer>
  );
}
