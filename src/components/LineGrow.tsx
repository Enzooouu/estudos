'use client';

import { motion } from 'motion/react';

/** Linha arquitetônica que se desenha da esquerda para a direita ao entrar na tela. */
export function LineGrow({ dark = false }: { dark?: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      data-reveal
      className={`h-px origin-left ${dark ? 'bg-ice/25' : 'bg-line'}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
    />
  );
}
