'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

const curtain = [0.65, 0, 0.35, 1] as const; // in-out, como uma persiana
const settle = [0.16, 1, 0.3, 1] as const;

/**
 * Revela a mídia como uma folha que sobe (máscara) e assenta de uma escala maior.
 * Com `parallax`, a mídia desliza alguns por cento contra a rolagem.
 */
export function MediaReveal({
  children,
  className = '',
  parallax = 0,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  /** deslocamento máximo em % da altura (ex.: 6) */
  parallax?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`${parallax}%`, `${-parallax}%`]);
  const view = { once: true, margin: '0px 0px -10% 0px' } as const;

  return (
    <motion.div
      ref={ref}
      data-reveal-media
      className={`relative overflow-hidden rounded-[var(--r)] ${className}`}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={view}
      transition={{ duration: 1.1, ease: curtain, delay }}
    >
      <motion.div
        className="h-full w-full"
        data-reveal
        initial={{ scale: 1.14 }}
        whileInView={{ scale: 1 }}
        viewport={view}
        transition={{ duration: 1.6, ease: settle, delay: delay + 0.15 }}
      >
        <motion.div className="h-full w-full" style={parallax && !still ? { y, scale: 1 + (parallax * 2.2) / 100 } : undefined}>
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
