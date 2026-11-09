'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { nav, sections, waLink } from '@/content/site';
import { BrandMark } from './BrandMark';
import { GlassLens } from './GlassLens';
import { Icon } from './Icon';

/** Abre a seção de produtos já com o produto escolhido. */
export const PRODUCT_EVENT = 'jel:produto';

const ease = [0.165, 0.84, 0.44, 1] as const; // ease-out-quart
const easeInOut = [0.77, 0, 0.175, 1] as const; // ease-in-out-quart

/**
 * Barra fixa no topo: JEL Box volta ao início e os três traços abrem o menu.
 * Transparente sobre a foto do topo; grafite a partir da seção seguinte.
 * O botão de três traços abre um painel de vidro com as seções (a atual em bronze) e o
 * botão de orçamento, e escurece a página atrás.
 */
export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string>(sections[0].id);
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

  // seção atual = a que cruza a linha do meio da tela (marcada no menu)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id)),
      { rootMargin: '-50% 0px -50% 0px' },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // transparente enquanto a foto do topo está atrás da barra; grafite depois dela
  useEffect(() => {
    const hero = document.getElementById('topo');
    const onScroll = () => {
      const bar = window.innerWidth >= 1024 ? 72 : 64;
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
        solid ? 'bg-graphite' : 'bg-transparent'
      }`}
    >
      <div className="px-page flex h-16 items-center justify-between gap-6 lg:h-[72px]">
        <a href="#topo" aria-label="JEL Box, voltar ao início" className="font-title inline-flex shrink-0 items-center gap-2.5 text-[19px] leading-none font-medium tracking-[-0.02em]">
          <BrandMark className="text-bronze h-6 w-6" />
          JEL Box
        </a>

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

      {/* filete de vidro sob a barra, de ponta a ponta */}
      <div aria-hidden="true" className="glass-hairline pointer-events-none absolute inset-x-0 bottom-0" />

      <AnimatePresence>
        {open && (
          <>
            {/* escurece a página inteira atrás do menu, inclusive atrás da barra; clicar fora fecha */}
            <motion.div
              key="veu"
              aria-hidden="true"
              className="fixed inset-0 -z-10 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
            />

            <motion.div
              key="painel"
              ref={panel}
              id="menu-principal"
              className="glass-tint isolate absolute top-full right-[var(--m)] max-h-[calc(100svh-64px-var(--m))] w-[min(260px,calc(100vw-2*var(--m)))] overflow-y-auto overscroll-contain lg:max-h-[calc(100svh-72px-var(--m))]"
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)' }}
              exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.45, ease: easeInOut } }}
              transition={{ duration: 0.7, ease: easeInOut }}
            >
              <GlassLens />

              <nav aria-label="Menu" className="px-2 pt-3">
                <ul>
                  {nav.map((n, i) => {
                    const here = n.id === current;
                    return (
                      <li key={n.id} className="overflow-hidden">
                        <motion.a
                          href={`#${n.id}`}
                          onClick={() => setOpen(false)}
                          aria-current={here ? 'location' : undefined}
                          className={`group/item flex items-center justify-between px-3 py-2 text-[16px] leading-tight font-medium transition-colors duration-300 hover:text-bronze ${
                            here ? 'text-bronze' : 'text-frost'
                          }`}
                          initial={{ y: '100%', opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.04 }}
                        >
                          {n.label}
                          <span className="-translate-x-1.5 opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100 group-focus-visible/item:translate-x-0 group-focus-visible/item:opacity-100">
                            <Icon name="ret" />
                          </span>
                        </motion.a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <motion.div
                className="px-5 pt-3 pb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease, delay: 0.15 + nav.length * 0.04 }}
              >
                <a className="btn btn-bronze !min-h-10 w-full justify-center" href={waLink('Olá, JEL Box! Gostaria de um orçamento.')} target="_blank" rel="noopener">
                  <Icon name="ret" /> Pedir orçamento
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
