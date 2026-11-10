'use client';

import { useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { nav, site, waLink } from '@/content/site';
import { BrandMark } from './BrandMark';
import { Icon } from './Icon';

/** Rodapé: o nome gigante atrás e, na frente, o painel de vidro com o menu e os contatos. */
export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const panelY = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const still = useReducedMotion();
  const home = usePathname() === '/';

  return (
    <footer ref={ref} className="bg-deep text-ice relative isolate grid grid-rows-[1fr_auto] lg:min-h-[max(100svh,760px)] overflow-hidden">
      {/* trilho e o nome: a mesma linguagem do topo */}
      <div aria-hidden="true" className="bg-ice/25 absolute inset-x-[var(--m)] top-[clamp(64px,10vh,110px)] h-px" />
      <motion.p
        aria-hidden="true"
        style={{ scale: still ? 1 : scale }}
        className="font-title px-page text-ice/90 pointer-events-none absolute inset-x-0 bottom-[72px] origin-bottom text-center text-[18.4vw] leading-[0.8] font-bold tracking-[-0.06em] whitespace-nowrap md:bottom-[56px] md:text-[19.6vw]"
      >
        JEL BOX
      </motion.p>

      <div className="px-page relative z-10 flex items-center justify-center pt-[clamp(96px,16vh,170px)] pb-[calc(14.7vw+40px)] lg:pb-10">
        <motion.div style={{ y: still ? 0 : panelY }} className="glass-light text-frost w-full max-w-[380px] rounded-[calc(var(--r-sm)+32px)] p-8">
          <BrandMark className="text-bronze h-7 w-7" />
          <p className="label text-ice/80 mt-7">Menu</p>
          <ul className="mt-4 grid gap-0.5">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={home ? `#${n.id}` : `/#${n.id}`} className="hover:text-bronze block text-[24px] leading-tight font-medium tracking-[-0.01em] transition-colors">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="text-ice/90 mt-7 grid gap-1 text-sm">
            <a href={site.phoneHref} className="hover:text-frost">{site.phoneDisplay}</a>
            <a href={`mailto:${site.email}`} className="hover:text-frost">{site.email}</a>
            <span>{site.hours.join(' · ')}</span>
            <span>{site.address}</span>
          </div>
          <a className="btn btn-bronze mt-7 w-full justify-center" href={waLink('Olá, JEL Box! Gostaria de um orçamento.')} target="_blank" rel="noopener">
            <Icon name="ret" /> Pedir orçamento
          </a>
        </motion.div>
      </div>

      <div className="px-page text-small relative z-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pb-5 text-ice/80">
        <p>© {new Date().getFullYear()} {site.name} · Vidraçaria e serralheria</p>
        <p className="flex gap-5">
          <a href={site.instagram.url} rel="noopener" className="hover:text-frost">Instagram</a>
          <a href={site.facebook.url} rel="noopener" className="hover:text-frost">Facebook</a>
          <a href="#topo" className="hover:text-frost">Voltar ao topo</a>
        </p>
      </div>
    </footer>
  );
}
