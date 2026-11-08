'use client';

import { motion, type HTMLMotionProps } from 'motion/react';

type Props = HTMLMotionProps<'div'> & {
  /** ordem dentro da seção: cada passo atrasa 80 ms */
  order?: number;
  as?: 'div' | 'li' | 'p';
};

/** Entrada única ao entrar na tela: sobe 24 px e aparece. */
export function Reveal({ order = 0, as = 'div', children, ...rest }: Props) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      data-reveal
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: Math.min(order, 4) * 0.08 }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
