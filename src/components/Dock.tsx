'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { nav, sections, site, waLink } from '@/content/site';
import { BrandMark } from './BrandMark';
import { Icon } from './Icon';

const ease = [0.165, 0.84, 0.44, 1] as const; // ease-out-quart

/**
 * Barra flutuante de vidro: marca, seção atual e menu.
 * O menu abre um painel de vidro logo acima da barra.
 */
export function Dock() {
  const [current, setCurrent] = useState<string>(sections[0].label);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // seção atual = a que cruza a linha do meio da tela
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const s = sections.find((x) => x.id === e.target.id);
            if (s) setCurrent(s.label);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    // no rodapé, o painel do próprio rodapé assume o papel da barra
    const footer = document.querySelector('footer');
    const fo = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { threshold: 0.35 });
    if (footer) fo.observe(footer);
    return () => {
      io.disconnect();
      fo.disconnect();
    };
  }, []);

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

  useEffect(() => {
    if (hidden) setOpen(false);
  }, [hidden]);

  return (
    <motion.div
      className="text-frost fixed bottom-5 left-1/2 z-50 w-[min(272px,calc(100vw-40px))] -translate-x-1/2"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: hidden ? 0 : 1, y: hidden ? 24 : 0 }}
      transition={{ duration: 0.6, ease, delay: hidden ? 0 : 0.6 }}
      style={{ pointerEvents: hidden ? 'none' : 'auto' }}
      aria-hidden={hidden || undefined}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panel}
            id="dock-menu"
            className="glass-deep absolute right-0 bottom-[calc(100%+6px)] left-0 origin-bottom p-7"
            initial={{ opacity: 0, y: 12, scaleY: 0.96 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: 8, scaleY: 0.98 }}
            transition={{ duration: 0.4, ease }}
          >
            <p className="label text-ice/80">Menu</p>
            <nav aria-label="Menu">
              <ul className="mt-5 grid gap-1">
                {nav.map((n) => (
                  <li key={n.id}>
                    <a
                      href={`#${n.id}`}
                      onClick={() => setOpen(false)}
                      className="hover:text-amber block py-0.5 text-[22px] leading-tight font-medium tracking-[-0.01em] transition-colors"
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="text-ice/85 mt-6 grid gap-1 text-sm">
              <a href={site.phoneHref} className="hover:text-frost">{site.phoneDisplay}</a>
              <a href={`mailto:${site.email}`} className="hover:text-frost">{site.email}</a>
            </div>
            <a className="btn btn-amber mt-6 w-full justify-center" href={waLink('Olá, JEL Box! Gostaria de um orçamento.')} target="_blank" rel="noopener">
              <Icon name="ret" /> Pedir orçamento
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass-deep grid h-12 grid-cols-[48px_1fr_48px] items-center">
        <a href="#topo" aria-label="Voltar ao início" className="grid h-full place-items-center" tabIndex={hidden ? -1 : 0}>
          <BrandMark className="text-amber h-[22px] w-[22px]" />
        </a>
        <span className="relative h-4 overflow-hidden text-center" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={current}
              className="absolute inset-0 text-[13px] leading-4 font-semibold tracking-[0.08em] uppercase"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.45, ease }}
            >
              {current}
            </motion.span>
          </AnimatePresence>
        </span>
        <button
          ref={button}
          type="button"
          aria-expanded={open}
          aria-controls="dock-menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
          tabIndex={hidden ? -1 : 0}
          className="grid h-full cursor-pointer place-items-center"
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
    </motion.div>
  );
}
