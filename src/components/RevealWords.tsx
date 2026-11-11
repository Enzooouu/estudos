'use client';

import { motion } from 'motion/react';

/**
 * Título que sobe palavra por palavra de dentro de uma máscara, à maneira das linhas
 * de texto do fluid.glass. Leitores de tela recebem o texto inteiro de uma vez.
 */
export function RevealWords({
  text,
  as = 'h2',
  className = '',
  id,
  delay = 0,
  onMount = false,
}: {
  text: string;
  as?: 'h1' | 'h2' | 'p';
  className?: string;
  id?: string;
  delay?: number;
  /** anima ao carregar (topo) em vez de ao entrar na tela */
  onMount?: boolean;
}) {
  const Tag = motion[as];
  const words = text.split(' ');
  const trigger = onMount
    ? { initial: 'hidden', animate: 'shown' }
    : { initial: 'hidden', whileInView: 'shown', viewport: { once: true, margin: '0px 0px -10% 0px' } };

  return (
    <Tag id={id} className={className} {...trigger}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top">
            <motion.span
              data-reveal
              className="inline-block"
              variants={{ hidden: { y: '110%' }, shown: { y: '0%' } }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.045 }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  );
}
