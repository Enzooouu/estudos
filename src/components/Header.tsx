'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { nav, products, site, waLink, type ProductId } from '@/content/site';
import { BrandMark } from './BrandMark';
import { GlassLens } from './GlassLens';
import { Icon } from './Icon';

/** Abre a seção de produtos já com o produto escolhido. */
export const PRODUCT_EVENT = 'jel:produto';

const ease = [0.165, 0.84, 0.44, 1] as const; // ease-out-quart

const pick = (id: ProductId) => window.dispatchEvent(new CustomEvent<ProductId>(PRODUCT_EVENT, { detail: id }));

/**
 * Barra fixa no topo: JEL Box volta ao início, cada produto leva à sua área.
 * Transparente sobre a foto do topo; grafite a partir da seção seguinte.
 * O botão de três traços abre um painel de vidro com todas as seções e o orçamento.
 */
export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // menu aberto: foco no primeiro link; Esc ou clique fora fecham
  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!panel.current?.contains(t) && !button.current?.contains(t)) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  // transparente enquanto a foto do topo está atrás da barra; grafite depois dela
  useEffect(() => {
    const hero = document.getElementById('topo');
    const onScroll = () => {
      const bar = window.innerWidth >= 1024 ? 72 : 104;
      const end = hero ? hero.offsetTop + hero.offsetHeight - bar : 24;
      setSolid(window.scrollY > end);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <header
      className={`text-frost fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-400 ${
        solid ? 'bg-graphite shadow-[0_1px_0_rgb(214_238_247/0.12)]' : 'bg-transparent'
      }`}
    >
      <div className="px-page flex h-16 items-center justify-between gap-6 lg:h-[72px]">
        <a href="#topo" aria-label="JEL Box, voltar ao início" className="font-title inline-flex shrink-0 items-center gap-2.5 text-[19px] leading-none font-medium tracking-[-0.02em]">
          <BrandMark className="text-bronze h-6 w-6" />
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

        <button
          ref={button}
          type="button"
          aria-expanded={open}
          aria-controls="menu-principal"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 grid h-11 w-11 shrink-0 cursor-pointer place-items-center hover:text-bronze transition-colors"
        >
          <Icon name={open ? 'close' : 'menu'} className="!h-7 !w-7" />
        </button>
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

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panel}
            id="menu-principal"
            className="glass-tint absolute top-full right-[var(--m)] w-[min(320px,calc(100vw-2*var(--m)))] origin-top p-7 max-lg:top-16"
            initial={{ opacity: 0, y: -12, scaleY: 0.96 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.98 }}
            transition={{ duration: 0.4, ease }}
          >
            <GlassLens />
            <p className="label text-frost/80">Menu</p>
            <nav aria-label="Menu">
              <ul className="mt-5 grid gap-1">
                {nav.map((n) => (
                  <li key={n.id}>
                    <a
                      href={`#${n.id}`}
                      onClick={() => setOpen(false)}
                      className="hover:text-bronze block py-0.5 text-[22px] leading-tight font-medium tracking-[-0.01em] transition-colors"
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="text-frost/85 mt-6 grid gap-1 text-sm">
              <a href={site.phoneHref} className="hover:text-frost">{site.phoneDisplay}</a>
              <a href={`mailto:${site.email}`} className="hover:text-frost">{site.email}</a>
            </div>
            <a className="btn btn-bronze mt-6 w-full justify-center" href={waLink('Olá, JEL Box! Gostaria de um orçamento.')} target="_blank" rel="noopener">
              <Icon name="ret" /> Pedir orçamento
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
