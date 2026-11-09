'use client';

import { useEffect, useState } from 'react';
import { products, waLink, type ProductId } from '@/content/site';
import { BrandMark } from './BrandMark';
import { Icon } from './Icon';

/** Abre a seção de produtos já com o produto escolhido. */
export const PRODUCT_EVENT = 'jel:produto';

const pick = (id: ProductId) => window.dispatchEvent(new CustomEvent<ProductId>(PRODUCT_EVENT, { detail: id }));

/**
 * Barra fixa no topo: JEL Box volta ao início, cada produto leva à sua área.
 * Transparente sobre a foto do topo; com vidro azul depois que a página rola.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`text-frost fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled ? 'glass-deep shadow-[0_1px_0_rgb(214_238_247/0.12)]' : 'bg-transparent'
      }`}
    >
      <div className="px-page flex h-16 items-center justify-between gap-6 lg:h-[72px]">
        <a href="#topo" aria-label="JEL Box, voltar ao início" className="font-title inline-flex shrink-0 items-center gap-2.5 text-[19px] leading-none font-medium tracking-[-0.02em]">
          <BrandMark className="text-amber h-6 w-6" />
          JEL Box
        </a>

        <nav aria-label="Produtos" className="hidden lg:block">
          <ul className="flex items-center gap-[clamp(14px,1.6vw,28px)]">
            {products.map((p) => (
              <li key={p.id}>
                <a href="#produtos-lista" onClick={() => pick(p.id)} className="link-grow block py-2 text-[14.5px] font-medium whitespace-nowrap text-ice hover:text-frost">
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={waLink('Olá, JEL Box! Gostaria de um orçamento.')}
          target="_blank"
          rel="noopener"
          className="btn btn-amber !min-h-10 shrink-0 !px-4"
        >
          <Icon name="ret" />
          <span className="hidden sm:inline">Pedir orçamento</span>
          <span className="sm:hidden">Orçamento</span>
        </a>
      </div>

      {/* celular e tablet: produtos numa linha que desliza para o lado */}
      <nav aria-label="Produtos" className="lg:hidden">
        <ul className="px-page flex gap-2 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {products.map((p) => (
            <li key={p.id} className="shrink-0">
              <a
                href="#produtos-lista"
                onClick={() => pick(p.id)}
                className="border-ice/30 hover:bg-ice/10 block border px-3 py-1.5 text-[13.5px] font-medium whitespace-nowrap text-ice"
              >
                {p.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
