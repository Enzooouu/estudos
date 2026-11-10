'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { menu, sections, site, waLink } from '@/content/site';
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
  const pathname = usePathname();
  const home = pathname === '/';
  const onBlog = pathname.startsWith('/blog');
  // fora da página inicial, os links das seções levam de volta a ela
  const to = (id: string) => (home ? `#${id}` : `/#${id}`);
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
      // sem a foto do topo (páginas do blog), a barra já começa cinza
      setSolid(hero ? window.scrollY > hero.offsetTop + hero.offsetHeight - bar : true);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  return (
    <header
      className={`text-frost fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-400 ${
        solid ? 'bg-graphite' : 'bg-transparent'
      }`}
    >
      <div className="px-page flex h-16 items-center justify-between gap-6 lg:h-[72px]">
        <a href={home ? '#topo' : '/'} aria-label="JEL Box, voltar ao início" className="font-title inline-flex shrink-0 items-center gap-2.5 text-[19px] leading-none font-medium tracking-[-0.02em]">
          <BrandMark className="text-bronze h-6 w-6" />
          JEL Box
        </a>

        <div className="-mr-2 flex items-center gap-2 sm:gap-4">
          <Link
            href="/blog/"
            aria-current={onBlog ? 'page' : undefined}
            // botão com contorno: é uma página à parte, diferente do menu (três traços) ao lado
            className={`inline-flex h-9 items-center rounded-[var(--r-sm)] border px-3.5 text-[12.5px] leading-none font-semibold tracking-[0.12em] uppercase transition-colors ${
              onBlog ? 'border-white/80 bg-white/10' : 'border-white/35 hover:border-white/70 hover:bg-white/10'
            }`}
          >
            Blog
          </Link>
        <button
          ref={button}
          type="button"
          aria-expanded={open}
          aria-controls="menu-principal"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center hover:text-bronze transition-colors"
        >
          <Icon name={open ? 'close' : 'menu'} className="!h-7 !w-7" />
        </button>
        </div>
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
              // cantos concêntricos: raio externo = raio do botão (4 px) + respiro (20 px)
              ref={panel}
              id="menu-principal"
              className="glass-tint isolate absolute top-[calc(100%+8px)] right-[var(--m)] rounded-[calc(var(--r-sm)+20px)] max-h-[calc(100svh-64px-var(--m))] w-[min(330px,calc(100vw-2*var(--m)))] overflow-y-auto overscroll-contain lg:max-h-[calc(100svh-72px-var(--m))]"
              initial={{ clipPath: 'inset(0 0 100% 0 round 24px)' }}
              animate={{ clipPath: 'inset(0 0 0% 0 round 24px)' }}
              exit={{ clipPath: 'inset(0 0 100% 0 round 24px)', transition: { duration: 0.45, ease: easeInOut } }}
              transition={{ duration: 0.7, ease: easeInOut }}
            >
              <GlassLens />

              <nav aria-label="Menu" className="px-2 pt-4">
                <ul>
                  {menu.map((n, i) => {
                    const here = n.id === current;
                    return (
                      <li key={n.id} className="overflow-hidden">
                        <motion.a
                          href={to(n.id)}
                          onClick={() => setOpen(false)}
                          aria-current={here ? 'location' : undefined}
                          className={`group/item flex items-center justify-between px-3 py-2.5 text-[19px] leading-tight font-medium transition-colors duration-300 hover:text-bronze ${
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
                className="grid gap-4 px-5 pt-4 pb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease, delay: 0.15 + menu.length * 0.04 }}
              >
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-white/10 pt-4 text-[13px] leading-snug">
                  <div>
                    <dt className="text-frost/45 mb-0.5 text-[10px] font-semibold tracking-[0.14em] uppercase">Telefone</dt>
                    <dd><a href={site.phoneHref} className="link-grow text-frost/90 hover:text-frost">{site.phoneDisplay}</a></dd>
                  </div>
                  <div>
                    <dt className="text-frost/45 mb-0.5 text-[10px] font-semibold tracking-[0.14em] uppercase">Instagram</dt>
                    <dd><a href={site.instagram.url} target="_blank" rel="noopener" className="link-grow text-frost/90 hover:text-frost">{site.instagram.handle}</a></dd>
                  </div>
                  {site.email ? (
                    <div className="col-span-2">
                      <dt className="text-frost/45 mb-0.5 text-[10px] font-semibold tracking-[0.14em] uppercase">E-mail</dt>
                      <dd><a href={`mailto:${site.email}`} className="link-grow text-frost/90 hover:text-frost">{site.email}</a></dd>
                    </div>
                  ) : (
                    <div className="col-span-2">
                      <dt className="text-frost/45 mb-0.5 text-[10px] font-semibold tracking-[0.14em] uppercase">Facebook</dt>
                      <dd><a href={site.facebook.url} target="_blank" rel="noopener" className="link-grow text-frost/90 hover:text-frost">{site.facebook.handle}</a></dd>
                    </div>
                  )}
                </dl>
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
