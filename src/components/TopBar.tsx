import { site, waLink } from '@/content/site';
import { BrandMark } from './BrandMark';
import { Icon } from './Icon';

/** Topo mínimo: telefone à esquerda, nome no centro, orçamento à direita. O menu fica na barra flutuante. */
export function TopBar() {
  return (
    <div className="px-page relative z-40 flex items-center justify-between py-[22px] md:grid md:grid-cols-[1fr_auto_1fr]">
      <a href={site.phoneHref} className="link-grow text-ice hidden justify-self-start md:col-start-1 text-sm font-medium md:block">
        {site.phoneDisplay}
      </a>
      <a href="#topo" aria-label="JEL Box, início" className="font-title inline-flex md:col-start-2 items-center gap-2.5 text-[19px] leading-none font-medium tracking-[-0.02em]">
        <BrandMark className="text-amber h-6 w-6" />
        JEL Box
      </a>
      <a
        href={waLink('Olá, JEL Box! Gostaria de um orçamento.')}
        target="_blank"
        rel="noopener"
        className="link-grow inline-flex md:col-start-3 items-center gap-2 justify-self-end text-[13px] font-semibold tracking-[0.08em] uppercase"
      >
        <Icon name="ret" className="!h-4 !w-4" />
        <span className="hidden sm:inline">Pedir orçamento</span>
        <span className="sm:hidden">Orçamento</span>
      </a>
    </div>
  );
}
