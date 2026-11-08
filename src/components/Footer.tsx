'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { products, site } from '@/content/site';

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const still = useReducedMotion();

  return (
    <footer ref={ref} className="bg-deep text-ice px-page grid min-h-[68svh] grid-rows-[auto_1fr_auto_auto] overflow-hidden pt-12 pb-6">
      <div className="border-ice/25 grid grid-cols-2 gap-x-5 gap-y-8 border-b pb-10 text-base leading-[1.8] [overflow-wrap:anywhere] md:grid-cols-4 md:gap-8">
        <div>
          <p className="text-frost font-semibold">{site.name}</p>
          <p>Vidraçaria e serralheria</p>
          <p>{site.address}</p>
        </div>
        <ul>
          <li className="text-frost font-semibold">Produtos</li>
          {products.slice(0, 4).map((p) => (
            <li key={p.id}>
              <a href="#produtos" className="hover:text-amber">
                {p.name}
              </a>
            </li>
          ))}
        </ul>
        <ul>
          <li className="text-frost font-semibold">Atendimento</li>
          {site.hours.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <ul>
          <li className="text-frost font-semibold">Contato</li>
          <li>
            <a href={site.phoneHref} className="hover:text-amber">
              {site.phoneDisplay}
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="hover:text-amber">
              {site.email}
            </a>
          </li>
          <li>
            <a href={site.instagram.url} rel="noopener" className="hover:text-amber">
              Instagram
            </a>
          </li>
        </ul>
      </div>
      <motion.p
        aria-hidden="true"
        style={{ scale: still ? 1 : scale }}
        className="font-title row-start-3 mb-[0.06em] ml-[-0.02em] origin-bottom-left text-[18.4vw] leading-[0.8] font-bold tracking-[-0.06em] whitespace-nowrap md:text-[19.6vw]"
      >
        JEL BOX
      </motion.p>
      <p className="text-small row-start-4 pt-3 text-ice/80">
        © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
      </p>
    </footer>
  );
}
