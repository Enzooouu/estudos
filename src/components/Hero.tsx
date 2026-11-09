'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { waLink } from '@/content/site';
import { Icon, type IconName } from './Icon';
import { Media } from './media/Media';
import { RevealWords } from './RevealWords';
import { TopBar } from './TopBar';

const ease = [0.16, 1, 0.3, 1] as const;

const facts: { icon: IconName; text: string }[] = [
  { icon: 'ruler', text: 'Medição no local' },
  { icon: 'frame', text: 'Vidro temperado 8 mm' },
  { icon: 'ret', text: 'Instalação própria' },
];

/**
 * Topo: texto à esquerda, imagem principal à direita até a borda.
 * Um foco só (a imagem), um botão principal e três fatos curtos.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);

  const rise = (i: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease, delay: 0.15 + i * 0.08 },
  });

  return (
    <header ref={ref} id="topo" className="bg-deep text-frost relative isolate overflow-hidden lg:min-h-[max(100svh,720px)]">
      <TopBar />

      <div className="grid lg:absolute lg:inset-0 lg:grid-cols-12">
        {/* texto */}
        <div className="px-page flex flex-col justify-center pt-10 pb-14 lg:col-span-7 lg:pt-[110px] lg:pb-[104px]">
          <motion.p data-reveal {...rise(0)} className="label text-ice">
            Vidraçaria e serralheria
          </motion.p>
          <RevealWords
            as="h1"
            onMount
            delay={0.1}
            text="Vidro e alumínio sob medida"
            className="font-title mt-6 max-w-[12ch] text-[clamp(38px,5vw,80px)] leading-[1.02] font-medium tracking-[-0.04em]"
          />
          <motion.p data-reveal {...rise(2)} className="text-ice mt-7 max-w-[46ch] text-[clamp(17px,1.25vw,19px)]">
            Box de banheiro, janelas, portas e guarda-corpos. Medimos o vão, fabricamos a peça e instalamos com a mesma equipe.
          </motion.p>
          <motion.div data-reveal {...rise(3)} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a className="btn btn-amber" href={waLink('Olá, JEL Box! Gostaria de um orçamento.')} target="_blank" rel="noopener">
              <Icon name="ret" /> Pedir orçamento
            </a>
            <a href="#monte" className="btn btn-text text-ice hover:!text-frost">
              <Icon name="ret" /> Desenhar meu box
            </a>
          </motion.div>

          <motion.ul data-reveal {...rise(4)} className="border-ice/20 mt-12 grid gap-4 border-t pt-6 sm:grid-cols-3 lg:mt-14">
            {facts.map((f) => (
              <li key={f.text} className="text-ice flex items-center gap-3 text-[15px]">
                <Icon name={f.icon} className="text-amber !h-5 !w-5" />
                {f.text}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* imagem principal: entra como uma folha de vidro deslizando no trilho */}
        <motion.figure
          data-reveal-media
          className="relative order-first m-0 overflow-hidden lg:order-none lg:col-span-5"
          initial={{ clipPath: 'inset(0% 0% 0% 100%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
        >
          <motion.div className="h-full w-full" style={still ? undefined : { scale: imgScale, y: imgY }}>
            <Media id="hero-principal" priority sizes="(min-width:1024px) 42vw, 100vw" className="!aspect-[4/3] sm:!aspect-[16/10] lg:!aspect-auto lg:h-full [&_img]:object-[64%_42%]" />
          </motion.div>
          {/* perfil do trilho e moldura aberta: a linguagem de esquadria da marca */}
          <span aria-hidden="true" className="bg-ice/60 absolute top-0 left-0 hidden h-full w-[3px] lg:block" />
          <span aria-hidden="true" className="bg-ice/60 absolute top-0 left-0 hidden h-[3px] w-1/2 lg:block" />
          <figcaption className="glass-deep text-ice absolute bottom-5 left-5 px-3 py-2 text-[13px]">
            Porta de correr em alumínio · imagem ilustrativa
          </figcaption>
        </motion.figure>
      </div>
    </header>
  );
}
