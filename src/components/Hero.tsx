'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { waLink } from '@/content/site';
import { Icon } from './Icon';
import { Nav } from './Nav';

const ease = [0.16, 1, 0.3, 1] as const;

/** Topo: o nome como monumento, com um painel de vidro que corre sobre ele no trilho. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const paneX = useTransform(scrollYProgress, [0, 1], ['0vw', '-42vw']);
  const wordScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  // com "reduzir movimento", nada acompanha a rolagem
  const still = useReducedMotion();

  const rise = (i: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease, delay: i * 0.08 },
  });

  return (
    <header
      ref={ref}
      id="topo"
      className="bg-deep text-frost relative isolate grid min-h-[max(100svh,680px)] grid-rows-[auto_auto_1fr] overflow-hidden"
    >
      <Nav />

      <div className="px-page relative z-30 max-w-[calc(560px+2*var(--m))] pt-8 md:pt-[clamp(40px,7vh,96px)]">
        <motion.p data-reveal {...rise(0)} className="font-title text-h2 leading-[1.1] font-medium tracking-[-0.03em]">
          Vidraçaria e serralheria
        </motion.p>
        <motion.p data-reveal {...rise(1)} className="text-ice mt-6 max-w-[44ch] md:mt-8">
          Box de banheiro, janelas, portas e guarda-corpos em vidro temperado e alumínio, sob medida.
          Medimos o vão, fabricamos a peça e instalamos com a mesma equipe.
        </motion.p>
        <motion.div data-reveal {...rise(2)} className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-5 md:mt-9">
          <a className="btn btn-amber" href={waLink('Olá, JEL Box! Gostaria de um orçamento.')} target="_blank" rel="noopener">
            <Icon name="whats" /> Pedir orçamento
          </a>
          <a href="#monte" className="text-ice group inline-flex items-center gap-2.5 border-b border-current pb-1 font-medium">
            Desenhar meu box
            <Icon name="arrow" className="!h-[18px] !w-[18px] transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>
        </motion.div>
      </div>

      <div className="relative mt-10 flex min-h-[62vw] items-end md:mt-[clamp(28px,5vh,56px)] md:min-h-[clamp(220px,34vh,360px)]">
        <motion.h1
          data-reveal
          initial={{ opacity: 0, y: '18%' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease, delay: 0.1 }}
          style={{ scale: still ? 1 : wordScale }}
          className="font-title text-ice relative z-10 mb-[-0.08em] origin-bottom text-[25vw] leading-[0.8] font-bold tracking-[-0.06em] whitespace-nowrap md:mb-[-0.09em] md:ml-[-0.02em] md:pl-[calc(var(--m)*0.4)] md:text-[19.6vw] md:leading-[0.78]"
        >
          <span className="sr-only">JEL Box, vidraçaria e serralheria sob medida</span>
          <span aria-hidden="true">
            JEL
            <span className="block h-0 overflow-hidden md:inline md:h-auto md:tracking-[-0.12em]"> </span>
            BOX
          </span>
        </motion.h1>
      </div>

      {/* trilho superior: a linha arquitetônica onde o painel corre */}
      <div aria-hidden="true" className="bg-ice/35 absolute inset-x-[var(--m)] bottom-[66vw] z-20 h-px md:top-[92px] md:bottom-auto" />

      {/* painel de vidro: entra deslizando e depois acompanha a rolagem */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, x: '30vw' }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.4, ease, delay: 0.35 }}
        className="absolute right-[10vw] bottom-0 z-20 h-[66vw] w-[34vw] md:top-[92px] md:right-[calc(var(--m)+4vw)] md:h-auto md:w-[clamp(200px,27vw,420px)]"
      >
        <motion.div style={{ x: still ? 0 : paneX }} className="glass-pane border-ice/85 relative h-full border-x-[3px]">
          <span className="bg-ice/85 absolute -left-[3px] top-0 h-[3px] w-[64%]" />
          <span className="bg-frost/45 absolute top-[9%] left-[22%] h-[30%] w-px -skew-x-[20deg]" />
          <span className="bg-amber absolute top-[34%] left-[18px] h-[72px] w-1" />
        </motion.div>
      </motion.div>
    </header>
  );
}
