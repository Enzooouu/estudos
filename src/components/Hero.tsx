'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { waLink } from '@/content/site';
import { Icon, type IconName } from './Icon';
import { Media } from './media/Media';
import { RevealWords } from './RevealWords';

const ease = [0.16, 1, 0.3, 1] as const;

const facts: { icon: IconName; text: string }[] = [
  { icon: 'ruler', text: 'Medição no local' },
  { icon: 'frame', text: 'Vidro temperado 8 mm' },
  { icon: 'ret', text: 'Instalação própria' },
];

/**
 * Topo: foto em tela cheia, escurecida (sem mudar as cores),
 * com o texto à esquerda sobre a parte mais escura.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  const rise = (i: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease, delay: 0.25 + i * 0.08 },
  });

  return (
    <header
      ref={ref}
      id="topo"
      className="bg-deep text-frost relative isolate flex min-h-[max(100svh,640px)] flex-col overflow-hidden lg:min-h-[max(100svh,720px)]"
    >
      {/* foto de fundo: entra de uma escala maior e desliza devagar com a rolagem */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0, scale: 1.12 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease }}
      >
        <motion.div className="absolute inset-0" style={still ? { scale: 1.04 } : { scale: imgScale, y: imgY }}>
          <Media id="hero-principal" fill priority sizes="100vw" className="[&_img]:object-[60%_50%]" />
        </motion.div>
        {/* escurecimento neutro: mantém as cores reais da foto, só mais escura para o texto ler bem */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(0_0_0/0.55)_0%,rgb(0_0_0/0.25)_45%,rgb(0_0_0/0)_75%)] max-lg:bg-[linear-gradient(0deg,rgb(0_0_0/0.6)_0%,rgb(0_0_0/0.25)_55%,rgb(0_0_0/0)_100%)]" />
      </motion.div>

      <div className="px-page flex flex-1 flex-col justify-end pt-36 pb-24 lg:justify-center lg:pt-28 lg:pb-[104px]">
        <motion.p data-reveal {...rise(0)} className="label text-ice">
          Vidraçaria e serralheria
        </motion.p>
        <RevealWords
          as="h1"
          onMount
          delay={0.2}
          text="Vidro e alumínio sob medida"
          className="font-title mt-6 max-w-[12ch] text-[clamp(38px,5vw,80px)] leading-[1.02] font-medium tracking-[-0.04em]"
        />
        <motion.p data-reveal {...rise(2)} className="text-ice mt-7 max-w-[46ch] text-[clamp(17px,1.25vw,19px)]">
          Box de banheiro, espelhos, janelas, portas e guarda-corpos. Medimos o vão, fabricamos a peça e instalamos com a mesma equipe.
        </motion.p>
        <motion.div data-reveal {...rise(3)} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a className="btn btn-bronze" href={waLink('Olá, JEL Box! Gostaria de um orçamento.')} target="_blank" rel="noopener">
            <Icon name="ret" /> Pedir orçamento
          </a>
          <a href="#monte" className="btn btn-text text-ice hover:!text-frost">
            <Icon name="ret" /> Desenhar meu box
          </a>
        </motion.div>

        <motion.ul data-reveal {...rise(4)} className="border-ice/25 mt-12 grid max-w-[760px] gap-4 border-t pt-6 sm:grid-cols-3 lg:mt-14">
          {facts.map((f) => (
            <li key={f.text} className="text-ice flex items-center gap-3 text-[15px]">
              <Icon name={f.icon} className="text-bronze !h-5 !w-5" />
              {f.text}
            </li>
          ))}
        </motion.ul>
      </div>
    </header>
  );
}
